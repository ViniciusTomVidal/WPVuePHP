<template>
  <div class="flex" style="justify-content: center;align-items: center">
    <div class="canvasRotate">
      <canvas id="involute_id"></canvas>
    </div>
    <div class="left">
      <div class="canvasRotate2" :style="'position:relative;transform:rotate('+ (180 - 180/this.n2) +'deg);'">
        <canvas id="involute_id2"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { gears } from '/public/assets/js/gears.js'
import { graphics } from '/public/assets/js/graphics.js'

export default {
  components:[$, gears],
  props: ['pa', 'n', 'M', 'n2', 'mV', 'ht', 'de'],
  name: "Scene2D",
  data () {
    return {

    }
  },
  watch: {
    pa: function(newVal, oldVal) { // watch it
      this.updateGear();
      this.updateGear2();
    },
    n: function(newVal, oldVal) { // watch it
      this.updateGear();
      this.updateGear2();
    },
    n2: function(newVal, oldVal) { // watch it
      this.updateGear();
      this.updateGear2();
    },
    M: function(newVal, oldVal) { // watch it
      this.updateGear();
      this.updateGear2();
    },
    ht: function(newVal, oldVal) { // watch it
      this.updateGear();
      this.updateGear2();
    },
    mV: function(newVal, oldVal) { // watch it
      this.updateGear();
      this.updateGear2();
    },
    de: function(newVal, oldVal) { // watch it
      this.updateGear();
      this.updateGear2();
    }
  },
  methods: {
    updateGear() {
      const pa = this.pa * Math.PI/180.0;
      const m  = this.M;
      const N  = this.n;
      const gear = gears.generate( m, pa, N );
      const Rp = gears.pitchDiameter(m,pa,N)/ 2.0;
      const Ra = Rp + gears.addendum(m,pa,N);
      const Rd = Rp - gears.dedendum(m,pa,N);
      const Rb = gears.baseDiameter(m,pa,N)/2.0;
      const t  = gears.toothThickness(m,pa,N);

      /*$("#pitch_diameter").val( gears.pitchDiameter(m,pa,N) );
      $("#base_diameter").val( gears.pitchDiameter(m,pa,N)-2.0*gears.dedendum(m,pa,N) );
      $("#outer_diameter").val( gears.pitchDiameter(m,pa,N)+2.0*gears.addendum(m,pa,N) );
      $("#addendum").val( gears.addendum(m,pa,N) );
      $("#dedendum").val( gears.dedendum(m,pa,N) );
      $("#tooth_thickness").val( Math.floor(gears.toothThickness(m,pa,N)*1000)/1000 );*/

      // start drawing the gear
      const ctx = graphics.init( document.getElementById("involute_id"), [-1*Ra,1*Ra,-1*Ra,1*Ra] );

      const uiWidth = (window.innerWidth / 2 * this.n / this.n2);


      //$('#involute_id').css('left', );
          //.css('animation-duration', 20 * this.mV + 's');

      graphics.resize( ctx, uiWidth, uiWidth );
      graphics.clear( ctx );

      // draw the gear
      graphics.color( ctx, 128, 128, 128);
      graphics.polyline( ctx, gear, true );

    },
    updateGear2() {
      const pa = this.pa * Math.PI/180.0;
      const m  = this.M;
      const N  = this.n2;
      const gear = gears.generate( m, pa, N );
      const Rp = gears.pitchDiameter(m,pa,N)/ 2.0;
      const Ra = Rp + gears.addendum(m,pa,N);
      const Rd = Rp - gears.dedendum(m,pa,N);
      const Rb = gears.baseDiameter(m,pa,N)/2.0;
      const t  = gears.toothThickness(m,pa,N);

      /*$("#pitch_diameter").val( gears.pitchDiameter(m,pa,N) );
      $("#base_diameter").val( gears.pitchDiameter(m,pa,N)-2.0*gears.dedendum(m,pa,N) );
      $("#outer_diameter").val( gears.pitchDiameter(m,pa,N)+2.0*gears.addendum(m,pa,N) );
      $("#addendum").val( gears.addendum(m,pa,N) );
      $("#dedendum").val( gears.dedendum(m,pa,N) );
      $("#tooth_thickness").val( Math.floor(gears.toothThickness(m,pa,N)*1000)/1000 );*/

      // start drawing the gear
      const ctx = graphics.init( document.getElementById("involute_id2"), [-1*Ra,1*Ra,-1*Ra,1*Ra] );

      const uiWidth = window.innerWidth / 2;
      $('.canvasRotate2').css('width', uiWidth);
      $('.left').css('right', $('#involute_id2').width() * (m * 2) / (Ra * 2));

      graphics.resize( ctx, uiWidth, uiWidth );
      graphics.clear( ctx );

      // draw the gear
      graphics.color( ctx, 128, 128, 128 );
      graphics.polyline( ctx, gear, true );

    },
  }
}
</script>

<style>
  canvas {
    position: relative;
    display: block;
  }

  .left {
    position: relative;
  }

  .rotating {
    animation: rotating 20s linear infinite;
  }

  .rotating2 {
    animation: rotating2 20s linear infinite;
  }

  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  #involute_id {
    position: relative;
  }
  @-webkit-keyframes rotating2 /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(-360deg);
      -o-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }
  @keyframes rotating2 {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(-360deg);
      -moz-transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
      -o-transform: rotate(-360deg);
      transform: rotate(-360deg);
    }
  }
</style>