<template>
  <div>
    <div id="canvas"></div>
  </div>
</template>

<script>
import * as $ from 'jquery';
import * as THREE from "three";
import {mapGetters} from "vuex";


export default {
  name: "SceneDrGoogle",
  mounted() {
    this.updateGear();
  },
  props: ['update'],
  data() {
    return {
      canvas: Object,
      ctx: Object,
    }
  },
  methods: {
    involuteIntersectAngleRad(baseRadius, radius) {
      return Math.sqrt(Math.pow(radius / baseRadius, 2) - 1);
    },
    rotatedInvolute(rotateRad, baseRadius, involuteAngleRad) {
      return [
        Math.cos(rotateRad) * this.involute(baseRadius, involuteAngleRad)[0] + Math.sin(rotateRad) * this.involute(baseRadius, involuteAngleRad)[1],
        Math.cos(rotateRad) * this.involute(baseRadius, involuteAngleRad)[1] - Math.sin(rotateRad) * this.involute(baseRadius, involuteAngleRad)[0]
      ];
    },

    updateGear() {

      $('#canvas').html('');
      const helperLinesStyle = {
        fill: 'none',
        stroke: 'none',
        'stroke-width': 0.1
      };

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, (window.innerWidth - 40) / window.innerWidth, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({ alpha: true} );
      renderer.setSize(window.innerWidth - 40, window.innerWidth);
      const object = document.getElementById('canvas')
      object.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
      const cube = new THREE.Mesh(geometry, material);
      //scene.add( cube );

      const regularLinesStyle = {
        fill: 'blue',
        stroke: 'black',
        'stroke-width': 0.1
      };

      // Gear class
      function InvoluteGear(options) {
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
        this.WGear = options.WGear;

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

        this._createSVG(this.WGear);
      }
      InvoluteGear.prototype.gear1Width = 0;
      InvoluteGear.prototype.gear2Width = 0;
      InvoluteGear.gN1 = this.pinhao.N1;
      InvoluteGear.gN2 = this.engrenagem.N1;
      InvoluteGear.M = this.entradas.M;
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
        //svg.configure(this.gearGroup, {transform: "rotate({0}, {1}, {2}) translate({1},{2})".format(this._angle, this._center[0], this._center[1])});
      }
      InvoluteGear.prototype._createSVG = function (whatG) {

        const svg = document.querySelector('#svg');
        const gearToothPoints = this._calculateGearToothPoints();

        const gearPoints = [];
        const deltaRad = -2 * Math.PI / this.numberOfTeeth;

        gearPoints.push(gearToothPoints);
        for (let i = 0; i < this.numberOfTeeth; i++) {
          const rotationAngleRad = i * deltaRad;
          gearPoints.push(this.rotatePoints(rotationAngleRad, gearToothPoints));
        }


        const points = [];
        for (const value of gearPoints) {
          for (const v of value) {
            const point = [v[0], v[1]];
            points.push(point);
          }
        }



        if (whatG == 1) {
          const shape = new THREE.Shape();
          shape.moveTo(points[0][0], points[0][1])
          let i = 0;
          for (const value of points) {
            if (i > 0)
              shape.lineTo(value[0], value[1])
            i++;
          }


          const geometry = new THREE.ShapeGeometry(shape);


          const material = new THREE.LineBasicMaterial({color: 0xb9b9b9});

          const object = new THREE.Mesh(geometry, material);

          const box = new THREE.Box3().setFromObject( object );

          object.position.set(box.getSize().x/2 - InvoluteGear.M, 0, 0);
          object.rotation.z = Math.PI - (Math.PI) / InvoluteGear.gN2;

          InvoluteGear.gear1Width = box.getSize().x;
          scene.add(object);

          const animate = function () {
            requestAnimationFrame( animate );
            object.rotation.z -= 0.002;
            renderer.render( scene, camera );
          };
          animate();
        }
        else {
          const shape = new THREE.Shape();
          shape.moveTo(points[0][0], points[0][1])
          let i = 0;
          for (const value of points) {
            if (i > 0)
              shape.lineTo(value[0], value[1])
            i++;
          }


          const geometry = new THREE.ShapeGeometry(shape);

          const material = new THREE.LineBasicMaterial({color: 0xb9b9b9});

          const object = new THREE.Mesh(geometry, material);
          const box = new THREE.Box3().setFromObject( object );
          object.position.set(-box.getSize().x/2 + InvoluteGear.M, 0, 0)
          scene.add(object);

          camera.position.z = (InvoluteGear.gear1Width + box.getSize().x) * 0.7;
          camera.position.x = InvoluteGear.gear1Width/2 - box.getSize().x/2;

          const animate = function () {
            requestAnimationFrame( animate );
            object.rotation.z += 0.002 * InvoluteGear.gN2 / InvoluteGear.gN1;
            renderer.render( scene, camera );
          };
          animate();
        }

      }


      InvoluteGear.prototype._calculateGearToothPoints = function () {
        const minRadius = Math.max(this.baseRadius, this.rootRadius); // radius of the beginning of the involute

        const pitchPoint = this.involute(this.baseRadius, this.involuteIntersectAngleRad(this.baseRadius, this.pitchRadius));
        const pitchAngleRad = Math.atan2(pitchPoint[1], pitchPoint[0]);
        const centerAngleRad = pitchAngleRad + this.halfThickAngleRad;

        const startAngleRad = this.involuteIntersectAngleRad(this.baseRadius, minRadius);
        const stopAngleRad = this.involuteIntersectAngleRad(this.baseRadius, this.outerRadius);
        const deltaRad = (stopAngleRad - startAngleRad) / this.involuteFacetsCount;

        const points = [];
        for (let i = 0; i < this.involuteFacetsCount + 1; i++) {
          const point = this.involute(this.baseRadius, startAngleRad + deltaRad * i);

          const leftSidePoint = this.rotatePoint(centerAngleRad, point);
          points.push(leftSidePoint);
        }
        // we mirror the calculate side to create the second face of the tooth
        for (let i = 0; i < this.involuteFacetsCount + 1; i++) {
          const leftSidePoint = points[this.involuteFacetsCount - i];
          const rightSidePoint = this.mirrorPoint(leftSidePoint);
          points.push(rightSidePoint);
        }

        // finally we add the straight lines from the root radius to the beginning of the involute
        const endFirstStraightSegment = points[0];
        const angleRad = Math.atan2(endFirstStraightSegment[1], endFirstStraightSegment[0]);

        const startFirstStraightSegment = [this.rootRadius * Math.cos(angleRad), this.rootRadius * Math.sin(angleRad)];
        const startSecondStraightSegement = this.mirrorPoint(startFirstStraightSegment);

        const gearToothPoints = [startFirstStraightSegment].concat(points, [startSecondStraightSegement]);
        return gearToothPoints;
      }
      InvoluteGear.prototype.involuteIntersectAngleRad = function (baseRadius, radius) {
        return Math.sqrt(Math.pow(radius / baseRadius, 2) - 1);
      }
      InvoluteGear.prototype.involute = function (baseRadius, involuteAngleRad) {
        return [
          baseRadius * (Math.cos(involuteAngleRad) + involuteAngleRad * Math.sin(involuteAngleRad)),
          baseRadius * (Math.sin(involuteAngleRad) - involuteAngleRad * Math.cos(involuteAngleRad)),
        ]
      };
      InvoluteGear.prototype.rotatePoint = function (rotateRad, point) {
        const cos = Math.cos(rotateRad);
        const sin = Math.sin(rotateRad);
        return [
          cos * point[0] + sin * point[1],
          cos * point[1] - sin * point[0]
        ]
      }
      InvoluteGear.prototype.mirrorPoint = function (point) {
        return [
          point[0],
          -point[1]
        ];
      };
      InvoluteGear.prototype.rotatePoints = function (rotateRad, points) {
        const rotatedPoints = [];
        const cos = Math.cos(rotateRad);
        const sin = Math.sin(rotateRad);
        for (let i = 0; i < points.length; i++) {
          rotatedPoints.push(
              [
                cos * points[i][0] + sin * points[i][1],
                cos * points[i][1] - sin * points[i][0]
              ]
          );
        }
        return rotatedPoints;
      };
      /*GearSet.prototype.getGearsDistance = function () {
        return this.gear1.pitchRadius + this.gear2.pitchRadius;
      }
      GearSet.prototype.getGearRatio = function () {
        return this.gear1.pitchRadius / this.gear2.pitchRadius;
      }*/

      const M = this.entradas.M;
      const circularPitch = M * 180;
      const pressureAngle = this.entradas.phi;
      const clearance = 0.25 * this.entradas.M;
      const backlash = 0;
      const showHelperLines = true;
      const involuteFacetsCount = 5;

      const gear1 = new InvoluteGear({
        numberOfTeeth: this.engrenagem.N1,
        circularPitch: circularPitch,
        pressureAngle: pressureAngle,
        clearance: clearance,
        backlash: backlash,
        showHelperLines: showHelperLines,
        involuteFacetsCount: involuteFacetsCount,
        WGear: 1,
      });


      const gear2 = new InvoluteGear({
        numberOfTeeth: this.pinhao.N1,
        circularPitch: circularPitch,
        clearance: clearance,
        pressureAngle: pressureAngle,
        backlash: backlash,
        showHelperLines: showHelperLines,
        involuteFacetsCount: involuteFacetsCount,
        WGear: 2,
      });

      //const gearSet = new GearSet(gear1, gear2);

      //gear1.setCenter([-10,0]);

      // const border = 5;
      // const width = gear1.outerRadius + gear2.outerRadius + 2 * border;
      // const height = 2 * Math.max(gear1.outerRadius, gear2.outerRadius) + 2 * border;
      /*
           const sizeConfig = {
            width: "{0}mm".format(width),
            height: "{0}mm".format(height),
            viewBox: "{0} {1} {2} {3}".format(-width / 2, -height / 2, width, height)
          };
      */
      //svg.configure(sizeConfig);

      //gear1.setCenter([(border + gear1.outerRadius) - width / 2, 0]);
      //gear2.setCenter([(border + gear1.outerRadius) - width / 2, 0]);


      //svg.configure(gear, {transform: 'translate(-10,20)'});
      //const xml = svg.toSVG();
      //$('#result').val(xml);

      // based on code from Andreas K򢥲le (http://stackoverflow.com/questions/10120975/how-to-save-an-svg-generated-by-raphael)
      //const anchor = document.getElementById('download');
      //anchor.innerHTML = "Download SVG";
      //anchor.download = 'involute.svg';
      //anchor.type = 'image/svg+xml';

      // see Eric Bidelman: http://updates.html5rocks.com/2012/06/Don-t-Build-Blobs-Construct-Them
      //const blob = new Blob([xml], {type: 'image/svg+xml'});
      //anchor.href = (window.URL).createObjectURL(blob);

      //a.click();

      function animate() {
        let angle = 0;
        const rotationAnglePerSec = 2;
        let lastFrame = +new Date; // return milliseconds (for explanation see http://stackoverflow.com/questions/9430357/please-explain-why-and-how-new-date-works-as-workaround-for-date-now-in)
        setInterval(
            function () {
              const now = +new Date;
              const deltaT = now - lastFrame;
              lastFrame = now;

              angle += rotationAnglePerSec * deltaT / 1000;
              gear1.setAngle(angle);
            },
            50
        );
      }

      animate();
    }
  },
  watch: {
    'update': function (newVal, oldVal) { // watch it
      this.updateGear();
    },
  },
  computed: mapGetters(["pinhao", "engrenagem", "entradas"])
}
</script>

<style>
svg polygon {
  fill: white;
}

svg g:last-child {
  transform: translate(120px, 0px);
}
</style>