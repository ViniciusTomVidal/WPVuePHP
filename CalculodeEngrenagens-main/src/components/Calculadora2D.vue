<template>
  <div class="calcs">
    <div class="content">
      <div class="flex">
        <ion-item>
          <ion-label>Itens salvos</ion-label>
          <ion-select placeholder="Selecione" v-model="calc" value="1" cancel-text="Cancelar" ok-text="Selecionar">
            <ion-select-option value="1">Cálculo 1</ion-select-option>
          </ion-select>
        </ion-item>
      </div>
      <div class="flex new">
        <button disabled>
          <ion-icon :icon="save" />
          Salvar
        </button>
        <button disabled>
          <ion-icon :icon="save" />
          Salvar Novo
        </button>
        <button disabled>
          <ion-icon :icon="trash" />
          Excluir
        </button>
      </div>
    </div>
    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label for="">Tipo de engrenagem</label>
      <ion-segment v-model="type">
        <ion-segment-button value="1">
          <ion-label>
            <img src="assets/reto.png" alt="">
            Engrenagem <br>
            de dente reto
          </ion-label>
        </ion-segment-button>
        <ion-segment-button value="2">
          <ion-label>
            <img src="assets/reto.png" alt="">
            Engrenagem<br>
            helicoidal
          </ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>
    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label for="">Norma técnica</label>
      <ion-segment v-model="norma">
        <ion-segment-button value="1">
          <ion-label>
            AGMA
          </ion-label>
        </ion-segment-button>
        <ion-segment-button value="2">
          <ion-label>
            BS
          </ion-label>
        </ion-segment-button>
        <ion-segment-button value="3">
          <ion-label>
            DIN
          </ion-label>
        </ion-segment-button>
        <ion-segment-button value="4">
          <ion-label>
            ISO
          </ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>
    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label for="">Entradas</label>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Razão de engrenamento', 'mG')" id="mG">
          <ion-label position="position">mG</ion-label>
          <ion-input v-model="entradas.mG"></ion-input>
        </ion-item>
        <ion-item @click="showTooltip('Razão de torque', 'mA')" id="mA">
          <ion-label position="position">mA</ion-label>
          <ion-input v-model="entradas.mA"></ion-input>
        </ion-item>
        <ion-item @click="showTooltip('Razão de velocidade', 'mV')" id="mV">
          <ion-label position="position">mV</ion-label>
          <ion-input v-model="entradas.mV"></ion-input>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Módulo', 'm', 1)" id="m">
          <ion-label position="position">m</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="entradas.M"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Ângulo de pressão', 'phi', 1)" id="phi">
          <ion-label position="position">ϕ</ion-label>
          <ion-select onkeydown="$('.tooltip').hide()" v-model="entradas.phi" value="20.0">
            <ion-select-option value="14.5">14,5º</ion-select-option>
            <ion-select-option value="20.0">20º</ion-select-option>
            <ion-select-option value="25.0">25º</ion-select-option>
          </ion-select>
          <div class="tool">°</div>
        </ion-item>
        <ion-item @click="showTooltip('Distância entre centros', 'C')" id="C">
          <ion-label position="position">C</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="entradas.C"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Comprimento de Ação', 'Z', 1)" id="Z">
          <ion-label position="position">Z</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="entradas.Z"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Distância entre centros nova', 'Cn')" id="Cn">
          <ion-label position="position">Cn</ion-label>
          <ion-input v-model="entradas.Cn"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Ângulo de pressão novo', 'phin', 1)" id="phin">
          <ion-label position="position">ϕn</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="entradas.phiN"></ion-input>
          <div class="tool">°</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>
    </div>
    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label for="">Pinhão</label>
      <div class="flex entradas">
        <ion-item @click="showTooltip('Número de dentes', 'N1', 1)" id="N1">
          <ion-label position="position">N</ion-label>
          <ion-input v-model.lazy="pinhao.N1" @keyup="onKeyPinhaoN1"> </ion-input>
        </ion-item>
        <ion-item @click="showTooltip('Diâmetro primitivo do pinhão', 'dp1')" id="dp1">
          <ion-label position="position">dp</ion-label>
          <ion-input v-model.lazy="pinhao.dp" @keyup="onKeyPinhaoDP"></ion-input>
        </ion-item>
        <ion-item @click="showTooltip('Diâmetro externo do pinhão', 'de1')" id="de1">
          <ion-label position="position">de</ion-label>
          <ion-input v-model.lazy="pinhao.de" @keyup="onKeyPinhaoDE" id="de"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Diâmetro interno do pinhão', 'di1', 1)" id="di1">
          <ion-label position="position">di</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.di"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Diâmetro base do pinhão', 'db1', 1)" id="db1">
          <ion-label position="position">db</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.db"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Raio primitivo do pinhão', 'r1', 1)" id="r1">
          <ion-label position="position">r</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.r"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Adendo', 'a', 1)" id="a">
          <ion-label position="position">a</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.a"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Dedendo', 'b')" id="b">
          <ion-label position="position">b</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.b"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Altura total do dente', 'ht')" id="ht">
          <ion-label position="position">ht</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.ht"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Folga', 'c')" id="c">
          <ion-label position="position">c</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.c"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Espessura do dente de pinhão', 't1')" id="t1">
          <ion-label position="position">t</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.t"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Largura do vão do pinhão', 'v1')" id="v1">
          <ion-label position="position">v</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.v"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Passo circular de referência do pinhão', 'pc1')" id="pc1">
          <ion-label position="position">pc</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.pc"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Passo circular de base do pinhão', 'pb1')" id="pb1">
          <ion-label position="position">pb</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.pb"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Passo diametral do pinhão', 'pd1')" id="pd1">
          <ion-label position="position">pd</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="pinhao.pd"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>
    </div>
    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label for="">Engrenagem</label>
      <div class="flex entradas">
        <ion-item @click="showTooltip('Número de dentes', 'N1', 1)" id="N1">
          <ion-label position="position">N</ion-label>
          <ion-input v-model.lazy="engrenagem.N1" @keyup="onKeyEngrenagemN1"></ion-input>
        </ion-item>
        <ion-item @click="showTooltip('Diâmetro primitivo', 'dp1')" id="dp1">
          <ion-label position="position">dp</ion-label>
          <ion-input v-model.lazy="engrenagem.dp" @keyup="onKeyEngrenagemDP"></ion-input>
        </ion-item>
        <ion-item @click="showTooltip('Diâmetro externo', 'de1')" id="de1">
          <ion-label position="position">de</ion-label>
          <ion-input v-model.lazy="engrenagem.de" id="de" @keyup="onKeyEngrenagemDE"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Diâmetro interno', 'di1', 1)" id="di1">
          <ion-label position="position">di</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.di"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Diâmetro base', 'db1', 1)" id="db1">
          <ion-label position="position">db</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.db"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Raio primitivo', 'r1', 1)" id="r1">
          <ion-label position="position">r</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.r"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Adendo', 'a', 1)" id="a">
          <ion-label position="position">a</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.a"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Dedendo', 'b')" id="b">
          <ion-label position="position">b</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.b"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Altura total do dente', 'ht')" id="ht">
          <ion-label position="position">ht</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.ht"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Folga', 'c')" id="c">
          <ion-label position="position">c</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.c"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Espessura do dente', 't1')" id="t1">
          <ion-label position="position">t</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.t"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Largura do vão', 'v1')" id="v1">
          <ion-label position="position">v</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.v"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Passo circular de referência', 'pc1')" id="pc1">
          <ion-label position="position">pc</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.pc"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Passo circular de base', 'pb1')" id="pb1">
          <ion-label position="position">pb</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.pb"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Passo diametral', 'pd1')" id="pd1">
          <ion-label position="position">pd</ion-label>
          <ion-input onkeydown="$('.tooltip').hide()" v-model="engrenagem.pd"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
      </div>
    </div>
    <Scene2D :M="entradas.M" :pa="entradas.phi" :ht="pinhao.ht" :n="pinhao.N1" :n2="engrenagem.N1" :mV="entradas.mV" :de="pinhao.de"></Scene2D>
  </div>
</template>

<script>
import Scene2D from "@/components/Scene2D.vue";

import {IonSegment, IonItem, IonInput, IonLabel, IonSegmentButton, IonIcon} from '@ionic/vue';
import {save, trash} from 'ionicons/icons';
import $ from 'jquery';

export default {
  components: {IonSegment, IonItem, IonInput, IonLabel, IonSegmentButton, IonIcon, Scene2D},
  name: "Calculadora",
  setup() {
    return {
      save,
      trash
    }
  },
  mounted() {
    this.onKeyPinhaoN1();
    this.onKeyEngrenagemN1();
    this.onKeyRelacao();
  },
  methods: {
    showTooltip(string, item, first = null) {
      $('.tooltip').hide();
      this.tooltipSelected = item;
      first = first ? 0 : 15;
      this.first = first ? 0 : 15;
      $('.tooltip', $('#' + item).parent()).html(string).css('left', $('#' + item).position().left + first).fadeIn();
      $('ion-content').click(function () {
        if (!$(event.target).hasClass('item-input') && !$(event.target).hasClass('native-input') && !$(event.target).hasClass('tool')) {
          $('.tooltip').fadeOut();
        }
      })
    },
    onKeyPinhaoN1(event = null) {
      let N1 = 13;
      if(event != null) {
        N1 = event.target.value;
      }
      const dp = parseFloat(N1) * parseFloat(this.entradas.M);
      const de = parseFloat(this.entradas.M) * (parseFloat(N1) + 2);
      const a = parseFloat(this.entradas.M);
      const b = 1.167 * parseFloat(this.entradas.M);
      const ht = parseFloat(a) + parseFloat(b);
      const di = parseFloat(dp) - 2 * parseFloat(b);
      const db = parseFloat(dp) * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const r = parseFloat(dp) / 2;
      const c = parseFloat(b) - parseFloat(a);
      const t = parseFloat(this.entradas.M) * parseFloat(N1) * Math.sin((90 / N1 * (Math.PI / 180)));
      const v = (parseFloat(this.entradas.M) * Math.PI) / 2;
      const pc = Math.PI * dp / N1;
      const pb = pc * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const pd = N1 / dp;

      this.pinhao.dp = dp;
      this.pinhao.de = de;
      this.pinhao.a = a;
      this.pinhao.b = b;
      this.pinhao.ht = ht;
      this.pinhao.di = di;
      this.pinhao.db = db;
      this.pinhao.r = r;
      this.pinhao.c = c;
      this.pinhao.t = t;
      this.pinhao.v = v;
      this.pinhao.pc = pc;
      this.pinhao.pb = pb;
      this.pinhao.pd = pd;
      this.onKeyRelacao();
    },
    onKeyPinhaoDP(event) {
      const dp = event.target.value;
      const N1 =  dp / parseFloat(this.entradas.M);
      const de = parseFloat(this.entradas.M) * (parseFloat(N1) + 2);
      const a = parseFloat(this.entradas.M);
      const b = 1.167 * parseFloat(this.entradas.M);
      const ht = parseFloat(a) + parseFloat(b);
      const di = parseFloat(dp) - 2 * parseFloat(b);
      const db = parseFloat(dp) * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const r = parseFloat(dp) / 2;
      const c = parseFloat(b) - parseFloat(a);
      const t = parseFloat(this.entradas.M) * parseFloat(N1) * Math.sin((90 / N1 * (Math.PI / 180)));
      const v = (parseFloat(this.entradas.M) * Math.PI) / 2;
      const pc = Math.PI * dp / N1;
      const pb = pc * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const pd = N1 / dp;

      this.pinhao.N1 = N1;
      this.pinhao.de = de;
      this.pinhao.a = a;
      this.pinhao.b = b;
      this.pinhao.ht = ht;
      this.pinhao.di = di;
      this.pinhao.db = db;
      this.pinhao.r = r;
      this.pinhao.c = c;
      this.pinhao.t = t;
      this.pinhao.v = v;
      this.pinhao.pc = pc;
      this.pinhao.pb = pb;
      this.pinhao.pd = pd;
      this.onKeyRelacao();
    },
    onKeyPinhaoDE(event) {
      const de = event.target.value;
      const N1 = (de - 2 * this.entradas.M) / this.entradas.M;
      const dp = parseFloat(N1) * parseFloat(this.entradas.M);
      const a = parseFloat(this.entradas.M);
      const b = 1.167 * parseFloat(this.entradas.M);
      const ht = parseFloat(a) + parseFloat(b);
      const di = parseFloat(dp) - 2 * parseFloat(b);
      const db = parseFloat(dp) * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const r = parseFloat(dp) / 2;
      const c = parseFloat(b) - parseFloat(a);
      const t = parseFloat(this.entradas.M) * parseFloat(N1) * Math.sin((90 / N1 * (Math.PI / 180)));
      const v = (parseFloat(this.entradas.M) * Math.PI) / 2;
      const pc = Math.PI * dp / N1;
      const pb = pc * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const pd = N1 / dp;

      this.pinhao.N1 = N1;
      this.pinhao.de = de;
      this.pinhao.dp = dp;
      this.pinhao.a = a;
      this.pinhao.b = b;
      this.pinhao.ht = ht;
      this.pinhao.di = di;
      this.pinhao.db = db;
      this.pinhao.r = r;
      this.pinhao.c = c;
      this.pinhao.t = t;
      this.pinhao.v = v;
      this.pinhao.pc = pc;
      this.pinhao.pb = pb;
      this.pinhao.pd = pd;
      this.onKeyRelacao();
    },

    onKeyEngrenagemN1(event = null) {
      let N1 = 16;
      if(event != null) {
        N1 = event.target.value;
      }
      const dp = parseFloat(N1) * parseFloat(this.entradas.M);
      const de = parseFloat(this.entradas.M) * (parseFloat(N1) + 2);
      const a = parseFloat(this.entradas.M);
      const b = 1.167 * parseFloat(this.entradas.M);
      const ht = parseFloat(a) + parseFloat(b);
      const di = parseFloat(dp) - 2 * parseFloat(b);
      const db = parseFloat(dp) * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const r = parseFloat(dp) / 2;
      const c = parseFloat(b) - parseFloat(a);
      const t = parseFloat(this.entradas.M) * parseFloat(N1) * Math.sin((90 / N1 * (Math.PI / 180)));
      const v = (parseFloat(this.entradas.M) * Math.PI) / 2;
      const pc = Math.PI * dp / N1;
      const pb = pc * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const pd = N1 / dp;

      this.engrenagem.dp = dp;
      this.engrenagem.de = de;
      this.engrenagem.a = a;
      this.engrenagem.b = b;
      this.engrenagem.ht = ht;
      this.engrenagem.di = di;
      this.engrenagem.db = db;
      this.engrenagem.r = r;
      this.engrenagem.c = c;
      this.engrenagem.t = t;
      this.engrenagem.v = v;
      this.engrenagem.pc = pc;
      this.engrenagem.pb = pb;
      this.engrenagem.pd = pd;
      this.onKeyRelacao();
    },
    onKeyEngrenagemDP(event) {
      const dp = event.target.value;
      const N1 =  dp / parseFloat(this.entradas.M);
      const de = parseFloat(this.entradas.M) * (parseFloat(N1) + 2);
      const a = parseFloat(this.entradas.M);
      const b = 1.167 * parseFloat(this.entradas.M);
      const ht = parseFloat(a) + parseFloat(b);
      const di = parseFloat(dp) - 2 * parseFloat(b);
      const db = parseFloat(dp) * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const r = parseFloat(dp) / 2;
      const c = parseFloat(b) - parseFloat(a);
      const t = parseFloat(this.entradas.M) * parseFloat(N1) * Math.sin((90 / N1 * (Math.PI / 180)));
      const v = (parseFloat(this.entradas.M) * Math.PI) / 2;
      const pc = Math.PI * dp / N1;
      const pb = pc * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const pd = N1 / dp;

      this.engrenagem.N1 = N1;
      this.engrenagem.de = de;
      this.engrenagem.a = a;
      this.engrenagem.b = b;
      this.engrenagem.ht = ht;
      this.engrenagem.di = di;
      this.engrenagem.db = db;
      this.engrenagem.r = r;
      this.engrenagem.c = c;
      this.engrenagem.t = t;
      this.engrenagem.v = v;
      this.engrenagem.pc = pc;
      this.engrenagem.pb = pb;
      this.engrenagem.pd = pd;
      this.onKeyRelacao();
    },
    onKeyEngrenagemDE(event) {
      const de = event.target.value;
      const N1 = (de - 2 * this.entradas.M) / this.entradas.M;
      const dp = parseFloat(N1) * parseFloat(this.entradas.M);
      const a = parseFloat(this.entradas.M);
      const b = 1.167 * parseFloat(this.entradas.M);
      const ht = parseFloat(a) + parseFloat(b);
      const di = parseFloat(dp) - 2 * parseFloat(b);
      const db = parseFloat(dp) * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const r = parseFloat(dp) / 2;
      const c = parseFloat(b) - parseFloat(a);
      const t = parseFloat(this.entradas.M) * parseFloat(N1) * Math.sin((90 / N1 * (Math.PI / 180)));
      const v = (parseFloat(this.entradas.M) * Math.PI) / 2;
      const pc = Math.PI * dp / N1;
      const pb = pc * Math.cos((this.entradas.phi * (Math.PI / 180)));
      const pd = N1 / dp;

      this.engrenagem.N1 = N1;
      this.engrenagem.de = de;
      this.engrenagem.dp = dp;
      this.engrenagem.a = a;
      this.engrenagem.b = b;
      this.engrenagem.ht = ht;
      this.engrenagem.di = di;
      this.engrenagem.db = db;
      this.engrenagem.r = r;
      this.engrenagem.c = c;
      this.engrenagem.t = t;
      this.engrenagem.v = v;
      this.engrenagem.pc = pc;
      this.engrenagem.pb = pb;
      this.engrenagem.pd = pd;
      this.onKeyRelacao();
    },

    onKeyRelacao() {
      const mV = this.pinhao.r / this.engrenagem.r;
      const mA = this.engrenagem.r / this.pinhao.r;
      const mG = this.entradas.mV > this.entradas.mA ? this.entradas.mV : this.entradas.mA;
      const C = this.engrenagem.r + this.pinhao.r;
      let Z = Math.sqrt(Math.pow((this.pinhao.r + this.pinhao.a), 2) - Math.pow(this.pinhao.r * Math.cos((this.entradas.phi * (Math.PI / 180))), 2));
      Z = Z + Math.sqrt( Math.pow((this.engrenagem.r + this.engrenagem.a), 2) - Math.pow(this.engrenagem.r * Math.cos(this.entradas.phi * (Math.PI / 180)), 2));
      Z = Z - (this.entradas.C * Math.sin(this.entradas.phi * (Math.PI / 180)));
      let phiN = Math.cos(this.entradas.phi * (Math.PI / 180)) / (this.entradas.Cn / this.entradas.C);
      phiN = Math.acos(phiN) * (180 / Math.PI);

      this.entradas.mV = mV;
      this.entradas.mA = mA;
      this.entradas.mG = mG;
      this.entradas.C = C;
      this.entradas.Z = Z
      this.entradas.phiN = phiN;
    },
  },
  data() {
    return {
      type: 1,
      norma: 1,
      calc: 1,
      pa: 20,
      n: 12,
      M: 1.0,
      tooltipSelected: 0,
      first: 0,
      pinhao: {
        N1 : 13.0,
        dp : 52.00,
        de: 0.00,
        di: 0.00,
        db: 0.00,
        r: 0.00,
        a: 0.00,
        b: 0.00,
        ht: 0.00,
        c:0.00,
        t:0.00,
        v:0.00,
        pc:0.00,
        pb:0.00,
        pd:0.00,
      },
      engrenagem: {
        N1 : 28.0,
        dp : 0.00,
        de: 0.00,
        di: 0.00,
        db: 0.00,
        r: 0.00,
        a: 0.00,
        b: 0.00,
        ht: 0.00,
        c:0.00,
        t:0.00,
        v:0.00,
        pc:0.00,
        pb:0.00,
        pd:0.00,
      },
      entradas: {
        mG: 0.0,
        mV: 0.0,
        mA: 0.0,
        phi: 20.0,
        M: 4.0,
        C:0.0,
        Cn:0.0,
        Z:0.0,
        phiN: 0.0,
      }
    }
  },
}
</script>

<style scoped>

.new button ion-icon {
  margin-right: 5px;
}

.new button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 10px 12px 5px;
}
.tooltip:after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  top: -10px;
  left: 20px;
  border-style: solid;
  border-width: 0 5px 10px 5px;
  border-color: transparent transparent var(--ion-color-primary-shade) transparent;
}

.flex {
  position: relative;
}

.tooltip {
  z-index: 100000;
  position: absolute;
  background: var(--ion-color-primary-shade);
  padding: 6px 15px;
  font-size: 12px;
  color: var(--ion-color-dark-contrast);
  border-radius: 5px;
  display: none;
  top: 60px;
}

ion-input {
  text-align: right;
}

.tool {
  font-size: 9px;
  margin-left: 5px;
  position: relative;
  top: 2px;
}

.entradas {
  margin-top: 20px;
}

.entradas ion-label {
  font-size: 16px;
  color: var(--ion-color-primary)
}

br {
  display: block !important;
}

button {
  display: block;
  padding: 8px 10px;
}


.content {
  padding: 15px 20px;
}

ion-segment > * {
  flex: 1;
  min-width: auto;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.flex > * {
  flex: 1;
}

.content + .content {
  margin-top: 15px;
}

ion-segment {
  margin-top: 17px;
  display: flex;
  justify-content: center;
}

ion-item ion-label {
}

ion-label {
  text-align: left;
  align-items: center;
  display: flex;
  font-size: 12px;
  line-height: normal;
}

ion-label img {
  margin-right: 5px;
}

.entradas ion-item + ion-item {
  margin-left: 15px
}
</style>