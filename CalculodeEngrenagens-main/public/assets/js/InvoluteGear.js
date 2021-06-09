require('jquery')
require('jquery')



const InvoluteGear = function (options) {

    this.numberOfTeeth = options.numberOfTeeth || 14;
    this.circularPitch = options.circularPitch;    // Arc distance along a specified pitch circle or pitch line between corresponding profiles of adjacent teeth.
    this.diametralPitch = options.diametralPitch;  // Ratio of the number of teeth to the standard pitch diameter in inches.
    this.pressureAngle = options.pressureAngle || 20; // Most common stock gears have a 20° pressure angle, with 14½° and 25° pressure angle gears being much less
    // common. Increasing the pressure angle increases the width of the base of the gear tooth, leading to greater strength and load carrying capacity. Decreasing
    // the pressure angle provides lower backlash, smoother operation and less sensitivity to manufacturing errors. (reference: http://en.wikipedia.org/wiki/Involute_gear)

    this.clearance = options.clearance || 0;
    this.boreDiameter = options.boreDiameter || 0;
    //var circles = options.circles || 0;
    this.backlash = options.backlash || 0;
    this.involuteFacetsCount = options.involuteFacetsCount || 5;
    this.showHelperLines = options.showHelperLines;

    if (!(this.circularPitch || this.diametralPitch)) {
        throw "gear module needs either a diametralPitch or circularPitch";
    }

    this._center = [0, 0]; // center of the gear
    this._angle = 0; // angle in degrees of the complete gear (changes during rotation animation)

    //Convert diametrial pitch to our native circular pitch
    this.circularPitch = this.circularPitch ? this.circularPitch : 180 / this.diametralPitch;

    // Pitch diameter: Diameter of pitch circle.
    this.pitchDiameter = this.numberOfTeeth * this.circularPitch / 180;
    this.pitchRadius = this.pitchDiameter / 2;
    //alert("Teeth:", numberOfTeeth, " Pitch radius:", pitchRadius);

    // Base Circle
    this.baseRadius = this.pitchRadius * Math.cos(this.pressureAngle * Math.PI / 180);

    // Diametrial pitch: Number of teeth per unit length.
    this.pitchDiametrial = this.numberOfTeeth / this.pitchDiameter;

    // Addendum: Radial distance from pitch circle to outside circle.
    this.addendum = 1 / this.pitchDiametrial;

    //Outer Circle
    this.outerRadius = this.pitchRadius + this.addendum;

    // Dedendum: Radial distance from pitch circle to root diameter
    this.dedendum = this.addendum + this.clearance;

    // Root diameter: Diameter of bottom of tooth spaces.
    this.rootRadius = this.pitchRadius - this.dedendum;
    this.backlashAngleRad = this.backlash / this.pitchRadius;
    this.halfThickAngleRad = (2 * Math.PI / this.numberOfTeeth - this.backlashAngleRad) / 4;

    this._createSVG();
}
InvoluteGear.prototype.getCenter = function () {
    return this._center;
}
InvoluteGear.prototype.setCenter = function (newCenter) {
    this._center = newCenter;
    this._updateSvgConfig();
}
InvoluteGear.prototype.getAngle = function () {
    return this._angle;
}
InvoluteGear.prototype.setAngle = function (newAngle) {
    this._setAngleNoSideEffect(newAngle)
    if (this.connectedGear != null) {
        // we need to turn the connected gear as well
        const ratio = this.pitchRadius / this.connectedGear.pitchRadius;
        // we need an angle offset of half a tooth for the two gears to mesh
        const offset = 180 / this.connectedGear.numberOfTeeth;
        this.connectedGear._setAngleNoSideEffect(offset - newAngle * ratio);
    }
}
InvoluteGear.prototype._setAngleNoSideEffect = function (newAngle) {
    // does not call into a connected gear and hence does not run the risk of an infinite loop
    this._angle = newAngle;
    this._updateSvgConfig();
}
InvoluteGear.prototype._updateSvgConfig = function () {
    svg.configure(this.gearGroup, {transform: "rotate({0}, {1}, {2}) translate({1},{2})".format(this._angle, this._center[0], this._center[1])});
}
InvoluteGear.prototype._createSVG = function () {
    this.gearGroup = svg.group();
    if (this.showHelperLines) {
        var helperLinesGroup = svg.group(this.gearGroup, helperLinesStyle);
        svg.circle(helperLinesGroup, 0, 0, this.outerRadius);
        svg.circle(helperLinesGroup, 0, 0, this.rootRadius);

        var length = 5;
        svg.line(helperLinesGroup, -length, 0, length, 0);
        svg.line(helperLinesGroup, 0, -length, 0, length);
    }

    var gearToothPoints = this._calculateGearToothPoints();

    var gearPoints = [];
    var deltaRad = -2 * Math.PI / this.numberOfTeeth;

    gearPoints.push(gearToothPoints);
    for (var i = 1; i < this.numberOfTeeth; i++) {
        var rotationAngleRad = i * deltaRad;
        gearPoints.push(rotatePoints(rotationAngleRad, gearToothPoints));
    }

    var gearPath = svg.polygon(this.gearGroup, gearPoints, regularLinesStyle);
}
InvoluteGear.prototype._calculateGearToothPoints = function () {
    var minRadius = Math.max(this.baseRadius, this.rootRadius); // radius of the beginning of the involute

    var pitchPoint = involute(this.baseRadius, involuteIntersectAngleRad(this.baseRadius, this.pitchRadius));
    var pitchAngleRad = Math.atan2(pitchPoint[1], pitchPoint[0]);
    var centerAngleRad = pitchAngleRad + this.halfThickAngleRad;

    var startAngleRad = involuteIntersectAngleRad(this.baseRadius, minRadius);
    var stopAngleRad = involuteIntersectAngleRad(this.baseRadius, this.outerRadius);
    var deltaRad = (stopAngleRad - startAngleRad) / this.involuteFacetsCount;

    var points = [];
    for (var i = 0; i < this.involuteFacetsCount + 1; i++) {
        var point = involute(this.baseRadius, startAngleRad + deltaRad * i);

        var leftSidePoint = rotatePoint(centerAngleRad, point);
        points.push(leftSidePoint);
    }
    // we mirror the calculate side to create the second face of the tooth
    for (var i = 0; i < this.involuteFacetsCount + 1; i++) {
        var leftSidePoint = points[this.involuteFacetsCount - i];
        var rightSidePoint = mirrorPoint(leftSidePoint);
        points.push(rightSidePoint);
    }

    // finally we add the straight lines from the root radius to the beginning of the involute
    var endFirstStraightSegment = points[0];
    var angleRad = Math.atan2(endFirstStraightSegment[1], endFirstStraightSegment[0]);

    var startFirstStraightSegment = [this.rootRadius * Math.cos(angleRad), this.rootRadius * Math.sin(angleRad)];
    var startSecondStraightSegement = mirrorPoint(startFirstStraightSegment);

    var gearToothPoints = [startFirstStraightSegment].concat(points, [startSecondStraightSegement]);
    return gearToothPoints;
}

export {InvoluteGear};