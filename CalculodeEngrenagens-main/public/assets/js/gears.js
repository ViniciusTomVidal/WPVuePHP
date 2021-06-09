/*
	gears.js
	James Gregson (2015)
	Library of spur gear utility routines
*/
const gears = {

	dupliatePoints: function( pnts ){
		const ret = [];
		for( let i=0; i<pnts.length; i++ ){
			ret[i] = [ pnts[i][0], pnts[i][1] ];
		}
		return ret;
	},

	pointRadius: function( pnt ){
		return Math.sqrt( pnt[0]*pnt[0] + pnt[1]*pnt[1] );
	},

	lerp: function( val, v0, p0, v1, p1 ){
		const w = (val - v0)/(v1-v0);
		return [p1[0]*w+p0[0]*(1.0-w), p1[1]*w+p0[1]*(1.0-w)];
	},

	rotatePoint: function( cen, pnt, theta ){
		const tpnt = [ pnt[0]-cen[0], pnt[1]-cen[1] ];
		const rpnt = [ Math.cos(theta)*tpnt[0] + Math.sin(theta)*tpnt[1], -Math.sin(theta)*tpnt[0]+Math.cos(theta)*tpnt[1] ];
		return [ rpnt[0]+cen[0], rpnt[1]+cen[1] ];
	}, 

	involutePoint: function( r, theta ){
		return [ r*(Math.cos(theta)+theta*Math.sin(theta)), -r*(Math.sin(theta)-theta*Math.cos(theta)) ];
	},

	involuteBisect: function( rBase, rTarget ){
		let thetaLo = 0.0;
		let rLo = this.pointRadius( this.involutePoint( rBase, thetaLo ) );
		let thetaHi = Math.PI;
		let rHi = this.pointRadius( this.involutePoint( rBase, thetaHi ) );
		// check if the target is achievable
		if( rHi < rTarget )
			return -1.0;

		let thetaMi = (thetaLo+thetaHi)/2.0;
		let rMi;
		for(let i=0; i<20; i++ ){
			thetaMi = (thetaLo+thetaHi)/2.0;
			rMi = this.pointRadius( this.involutePoint( rBase, thetaMi ) );
			if( rMi <= rTarget ){
				rLo     = rMi;
				thetaLo = thetaMi;
			} else {
				rHi     = rMi;
				thetaHi = thetaMi;
			}
		}
		return thetaMi;
	},

	involuteCurve: function( rBase, thetaMax, rMin, rMax, N ){
		const thetaLo = 0.0;
		const thetaHi = this.involuteBisect( rBase, rMax );
		const curve = [];
		let cnt=0;
		if( rMin < rBase ){
			curve[cnt++] = [ rMin, 0 ];
		}
		const dtheta = (thetaHi-thetaLo)/(N-1);
		for( let i=0; i<N; i++ ){
			curve[cnt++] = this.involutePoint( rBase, i*dtheta+thetaLo );
		}
		return curve;
	},

	pitchDiameter: function( module, pressureAngle, numTeeth ){
		return module * numTeeth;
	},

	baseDiameter: function( module, pressureAngle, numTeeth ){
		return this.pitchDiameter(module,pressureAngle,numTeeth)*Math.cos(pressureAngle);
	},

	dedendum: function( module, pressureAngle, numTeeth ){
		return 1.25*module;
	},

	addendum: function( module, pressureAngle, numTeeth ){
		return 1.0*module;
	},

	toothThickness: function( module, pressureAngle, numTeeth ){
		return Math.PI*this.pitchDiameter(module,pressureAngle,numTeeth)/(2.0*numTeeth);
		//return module * numTeeth * Math.sin(((90 / numTeeth) * 180) / Math.PI);
	},

	generate: function( module, pressureAngle, numTeeth ){
		const Rp = this.pitchDiameter(module,pressureAngle,numTeeth)/2.0; //RAIO PRIMITIVO
		const Rb = this.baseDiameter(module,pressureAngle,numTeeth)/2.0; //RAIO BASE
		const Rd = Rp - this.dedendum(module,pressureAngle,numTeeth); //RAIO INTERNO
		const Ra = Rp + this.addendum(module,pressureAngle,numTeeth); //RAIO EXTERNO
		const t  = this.toothThickness(module,pressureAngle,numTeeth);  ///

		// find the crossing point of the involute curve with the pitch circle
		const pCross = this.involutePoint( Rb, this.involuteBisect( Rb, Rp ) );
		const thetaCross = Math.atan2( pCross[1], pCross[0] );
		const dtheta = t/Rp;

		// compute whether the gear profile will self-intersect once patterned
		const tmp = this.involuteCurve(Rb,Math.PI/2, Rd, Ra, 20);
		console.log('RA'+ Ra);
		console.log('RB'+ Rb);
		console.log('Rd'+ Rd);
		console.log('Rp'+ Rp);
		console.log('t '+ t);

		let cnt = 0;
		const involute = [];
		for(let i=0; i<tmp.length; i++) {
			const tpnt = this.rotatePoint( [0,0], tmp[i], +thetaCross-dtheta/2 );
			const angle1 = Math.atan2( tpnt[1], tpnt[0] );
			if (angle1 < Math.PI/numTeeth && tpnt[1] > 0) {
				involute[cnt++] = [ tmp[i][0], tmp[i][1] ];
			}
		}


		cnt = 0;
		const gear = [];
		for( let i=0; i<numTeeth; i++ ){
			const theta = i*Math.PI*2.0/(numTeeth)+thetaCross-dtheta/2;
			const theta2 = i*Math.PI*2.0/(numTeeth)-thetaCross+dtheta/2;

			for( let j=0; j<involute.length; j++ ){
				gear[cnt++] = this.rotatePoint( [0,0], [ involute[j][0], involute[j][1] ], theta );
			}
			for( let j=involute.length-1; j>=0; j-- ){
				gear[cnt++] = this.rotatePoint( [0,0], [ involute[j][0], -involute[j][1] ], theta2 );
			}
		}
		return gear;
	}

};

export {gears}