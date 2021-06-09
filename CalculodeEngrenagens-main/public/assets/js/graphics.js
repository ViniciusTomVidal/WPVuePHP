
const graphics = {

	componentToHex: function(c) {
		const hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	},

	rgbToHex: function(r, g, b) {
		return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
	},

	init: function( canvas, bounds ){
		const gctx = {
			canvas: canvas, 
			context: canvas.getContext("2d"), 
			width: canvas.width,
			height: canvas.height,
			bounds: bounds, 
			colour: this.rgbToHex(255,255,0)
		};
		return gctx;
	}, 

	resize: function( gctx, width, height ){
		gctx.canvas.width = width;
		gctx.canvas.height = height;
		gctx.width = width;
		gctx.height = height;
	},

	clear: function( gctx ){
		gctx.context.clearRect(0, 0, gctx.canvas.width, gctx.canvas.height );
		gctx.context.fillStyle='transparent';
		gctx.context.fillRect( 0, 0, gctx.canvas.width, gctx.canvas.height );
		gctx.context.fillStyle='none';
	},  

	color: function( gctx, r, g, b ){
		gctx.colour = this.rgbToHex( r, g, b );
	},

	mapPoint: function( gctx, pnt ){
		const mp = [ gctx.width*(pnt[0]-gctx.bounds[0])/(gctx.bounds[1]-gctx.bounds[0]), gctx.height*(pnt[1]-gctx.bounds[2])/(gctx.bounds[3]-gctx.bounds[2]) ];
		return mp;
	},

	rotatePoint: function( cen, pnt, theta ){
		const tpnt = [ pnt[0]-cen[0], pnt[1]-cen[1] ];
		const rpnt = [ Math.cos(theta)*tpnt[0] + Math.sin(theta)*tpnt[1], -Math.sin(theta)*tpnt[0]+Math.cos(theta)*tpnt[1] ];
		return [ rpnt[0]+cen[0], rpnt[1]+cen[1] ];
	},

	rotateCurve: function( cen, pnts, theta ){
		const s = Math.sin(theta);
		const c = Math.cos(theta);
		const ret = [];
		for( let i=0; i<pnts.length; i++ ){
			const x = pnts[i][0]-cen[0];
			const y = pnts[i][1]-cen[1];
			ret[i] = [ c*x + s*y + cen[0], -s*x + c*y + cen[1] ];
		}
		return ret;
	},

	circle: function( gctx, center, rad ){
		const cen = this.mapPoint( gctx, center );
		const beg = this.mapPoint( gctx, [center[0]+rad, center[1]] );
		gctx.context.beginPath();
		gctx.context.arc( cen[0], cen[1], beg[0]-cen[0], beg[1]-cen[1], 2*Math.PI );
		gctx.context.strokeStyle = gctx.colour;
		gctx.context.stroke();
	},

	line: function( gctx, p0, p1 ){
		const mp0 = this.mapPoint( gctx, p0 );
		const mp1 = this.mapPoint( gctx, p1 );
		gctx.context.beginPath();
		gctx.context.moveTo( mp0[0], mp0[1] );
		gctx.context.lineTo( mp1[0], mp1[1] );
		gctx.context.strokeStyle = gctx.colour;
		gctx.context.stroke();
	},

	polyline: function( gctx, pnts, close ){
		gctx.context.fillStyle = gctx.colour;
		gctx.context.beginPath();
		const p = this.mapPoint( gctx, pnts[0] );
		gctx.context.moveTo( p[0], p[1] );
		for( let i=1; i<pnts.length; i++ ){
			const p = this.mapPoint( gctx, pnts[i] );
			gctx.context.lineTo( p[0], p[1] );
		}
		gctx.context.closePath();
		gctx.context.fill();
		gctx.context.stroke();
	}


};

export {graphics}