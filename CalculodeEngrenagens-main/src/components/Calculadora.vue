<template>
  <div class="calcs">
    <div class="content">
      <div class="flex">
        <ion-item>
          <ion-label>Itens salvos</ion-label>
          <ion-select placeholder="Selecione" v-model.lazy="calc" :value="1" cancel-text="Cancelar" ok-text="Selecionar" @ionChange="onChangeSaves($event)">
            <ion-select-option :value="index" v-bind:key="index" v-for="(save, index) in saves">Cálculo {{ index + 1 }}</ion-select-option>
          </ion-select>
        </ion-item>
      </div>
      <div class="flex new">
        <button :disabled="!entradas.mG"  @click="SaveLocal()">
          <ion-icon :icon="save" />
          Salvar
        </button>
        <button :disabled="!entradas.mG" @click="SaveNewLocal">
          <ion-icon :icon="save"/>
          Salvar Novo
        </button>
        <button :disabled="!entradas.mG || calc == 0" @click="DeleteSave">
          <ion-icon :icon="trash"/>
          Excluir
        </button>
      </div>
    </div>
    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label for="">Tipo de engrenagem</label>
      <ion-segment v-model.lazy="type" @ionChange="ChangeType($event)">
        <ion-segment-button :value="1">
          <ion-label>
            <img src="assets/icon/reto.png" alt="" style="max-width: 25px">
            Engrenagem <br>
            de dente reto
          </ion-label>
        </ion-segment-button>
        <ion-segment-button :value="2">
          <ion-label>
            <img src="assets/icon/helicoidal.png" alt="" style="max-width: 25px">
            Engrenagem<br>
            helicoidal
          </ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>

    <div class="content breve" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label for="">Norma técnica</label>
      <ion-segment v-model.lazy="norma">
        <ion-segment-button value="1">
          <ion-label>
            AGMA
          </ion-label>
        </ion-segment-button>
        <ion-segment-button value="2" disabled>
          <ion-label>
            BS <span style="font-size: 9px">(breve)</span>
          </ion-label>
        </ion-segment-button>
        <ion-segment-button value="3" disabled>
          <ion-label>
            DIN <span style="font-size: 9px">(breve)</span>
          </ion-label>
        </ion-segment-button>
        <ion-segment-button value="4" disabled>
          <ion-label>
            ISO <span style="font-size: 9px">(breve)</span>
          </ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>

    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label for="">Condições iniciais</label>
      <div class="flex" style="margin-top: 20px">
        <ion-item>
          <ion-label>Multiplicador</ion-label>
          <ion-select placeholder="Select One" :value="'1'" v-model="ganho">
            <ion-select-option value="1">Torque</ion-select-option>
            <ion-select-option value="2">Velocidade</ion-select-option>
          </ion-select>
        </ion-item>
      </div>
      <div class="flex entradas">
        <ion-item @click="showTooltip('Razão de engrenamento', 'mG')" id="mG">
          <ion-label position="position">
            m<span style="font-size: 9px">G</span>
          </ion-label>
          <ion-input type="number" v-model.lazy="entradas.mG" @click="$event.target.select()"
                     @change="onChangeMG($event)"></ion-input>
          <div class="popupInfo">
            <p></p>
          </div>
        </ion-item>
        <ion-item @click="showTooltip(ganho == 1 ? 'Razão de torque' : 'Razão de velocidade', 'mA')" id="mA"
                  :style="ganho == 1 ? 'order:1' : 'order:2'">
          <ion-label position="position">m<span style="font-size: 9px">{{ ganho == 1 ? 'A' : 'V' }}</span></ion-label>
          <ion-input type="number" v-model.lazy="entradas.mA" @click="$event.target.select()"
                     disabled="disabled"></ion-input>
        </ion-item>
        <ion-item @click="showTooltip(ganho == 1 ? 'Razão de velocidade' : 'Razão de torque', 'mV')" id="mV"
                  :style="ganho == 1 ? 'order:2' : 'order:1'">
          <ion-label position="position">m<span style="font-size: 9px">{{ ganho == 1 ? 'V' : 'A' }}</span></ion-label>
          <ion-input type="number" v-model.lazy="entradas.mV" @click="$event.target.select()"
                     disabled="disabled"></ion-input>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <div class="flexSelect">
          <ion-item @click="showTooltip('Módulo', 'm', 1)" id="m">
            <ion-label position="position" >m</ion-label>
            <ion-select v-model.lazy="entradas.M" @ionChange="onChangeM($event)">
              <ion-select-option :value="0.3">0,3</ion-select-option>
              <ion-select-option :value="0.4">0,4</ion-select-option>
              <ion-select-option :value="0.8">0,8</ion-select-option>
              <ion-select-option :value="1">1</ion-select-option>
              <ion-select-option :value="1.25">1,25</ion-select-option>
              <ion-select-option :value="1.5">1,5</ion-select-option>
              <ion-select-option :value="2">2</ion-select-option>
              <ion-select-option :value="3">3</ion-select-option>
              <ion-select-option :value="4">4</ion-select-option>
              <ion-select-option :value="5">5</ion-select-option>
              <ion-select-option :value="6">6</ion-select-option>
              <ion-select-option :value="8">8</ion-select-option>
              <ion-select-option :value="10">10</ion-select-option>
              <ion-select-option :value="12">12</ion-select-option>
              <ion-select-option :value="16">16</ion-select-option>
              <ion-select-option :value="20">20</ion-select-option>
              <ion-select-option :value="25">25</ion-select-option>
            </ion-select>
            <div class="tool">mm</div>
          </ion-item>
          <div class="info" data-id="m"></div>
        </div>
        <div class="flexSelect">
          <ion-item @click="showTooltip('Ângulo de pressão', 'phi', 1)" id="phi">
            <ion-label position="position">ϕ</ion-label>
            <ion-select v-model="entradas.phi" :value="20" @ionChange="onChangePhi($event)">
              <ion-select-option :value="14.5">14,5º</ion-select-option>
              <ion-select-option :value="20">20º</ion-select-option>
              <ion-select-option :value="25">25º</ion-select-option>
            </ion-select>
          </ion-item>
          <div class="info" data-id="phi"></div>
        </div>
        <ion-item @click="showTooltip('Distância entre centros', 'Ce')" id="Ce">
          <ion-label position="position">C</ion-label>
          <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="entradas.CE"
                     @click="$event.target.select()" disabled="disabled"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
        <ion-item @click="showTooltip('Comprimento de Ação', 'Z', 1)" id="Z">
          <ion-label position="position">Z</ion-label>
          <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="entradas.Z"
                     @click="$event.target.select()" disabled></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Distância entre centros nova', 'Cn')" id="Cn">
          <ion-label position="position">Cn</ion-label>
          <ion-input type="number" v-model.lazy="entradas.Cn" @click="$event.target.select()"
                     @change="onChangeCn($event)"></ion-input>
          <div class="tool">mm</div>
        </ion-item>
        <ion-item @click="showTooltip('Ângulo de pressão novo', 'phin', 1)" id="phin">
          <ion-label position="position">ϕn</ion-label>
          <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="entradas.phiN"
                     @click="$event.target.select()" disabled="disabled"></ion-input>
          <div class="tool">°</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>

      <div class="flex entradas">
          <div class="flexSelect" v-if="type == 2">
            <ion-item @click="showTooltip('Ângulo de hélice', 'psi', 1)" id="psi" >
              <ion-label position="position">Ψ</ion-label>
              <ion-select v-model="entradas.u" :value="10" @ionChange="onChangeU($event)">
                <ion-select-option :value="10">10º</ion-select-option>
                <ion-select-option :value="15">15º</ion-select-option>
                <ion-select-option :value="20">20º</ion-select-option>
                <ion-select-option :value="25">25º</ion-select-option>
                <ion-select-option :value="30">30º</ion-select-option>
              </ion-select>
            </ion-item>
            <div class="info" data-id="psi"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Largura de face', 'F')" id="F">
              <ion-label position="position">F</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="entradas.F"
                         @click="$event.target.select()" @change="ChangeF($event)"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <span v-if="msgErro === true" style="color:red">
                A largura da face precisa estar entre 8 e 16 vezes o módulo.
            </span>
            <div class="tooltip"></div>

          </div>
          <ion-item @click="showTooltip('Razão de contato', 'rc')" id="rc">
            <ion-label position="position">m<span style="font-size: 9px">P</span></ion-label>
            <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="entradas.Mp"
                       @click="$event.target.select()" disabled></ion-input>
          </ion-item>
      </div>
    </div>

    <div class="content">
      <label style="margin-bottom: 20px;display: block">Características geométricas</label>
      <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
        <div class="flex" style="justify-content: space-between;align-items: center">
          <label for="" style="flex:inherit">Pinhão</label>
          <button style="flex:inherit" @click="!morePinhao ? morePinhao = true : morePinhao = false">
            {{ !morePinhao ? '+' : '-' }}
          </button>
        </div>
        <div class="flex entradas">
          <ion-item @click="showTooltip('Número de dentes', 'N1', 1)" id="N1">
            <ion-label position="position">N</ion-label>
            <ion-input type="number" v-model.lazy="pinhao.N1" @click="$event.target.select()"
                       @change="ChangePinhao('N1')"></ion-input>
          </ion-item>
          <ion-item @click="showTooltip('Diâmetro primitivo do pinhão', 'dp1')" id="dp1">
            <ion-label position="position">dp</ion-label>
            <ion-input type="number" v-model.lazy="pinhao.dp" @click="$event.target.select()"
                       @change="ChangePinhao('dp')"></ion-input>
            <div class="tool">mm</div>
          </ion-item>
          <ion-item @click="showTooltip('Diâmetro externo do pinhão', 'de1')" id="de1">
            <ion-label position="position">de</ion-label>
            <ion-input type="number" v-model.lazy="pinhao.de" id="de" @click="$event.target.select()"
                       @change="ChangePinhao('de')"></ion-input>
            <div class="tool">mm</div>
          </ion-item>
          <div class="tooltip"></div>
        </div>

        <div class="more" v-if="morePinhao">
          <div class="flex entradas">
            <ion-item @click="showTooltip('Diâmetro interno do pinhão', 'di1', 1)" id="di1">
              <ion-label position="position">di</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.di"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Diâmetro base do pinhão', 'db1', 1)" id="db1">
              <ion-label position="position">db</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.db"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Raio primitivo do pinhão', 'r1', 1)" id="r1">
              <ion-label position="position">rp</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.r"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas">
            <ion-item @click="showTooltip('Altura do adendo', 'a', 1)" id="a">
              <ion-label position="position">a</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.a"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Altura do dedendo', 'b')" id="b">
              <ion-label position="position">b</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.b"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Altura total do dente', 'ht')" id="ht">
              <ion-label position="position">ht</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.ht"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas">
            <ion-item @click="showTooltip('Folga', 'c')" id="c">
              <ion-label position="position">c</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.c"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Espessura do dente de pinhão', 't1')" id="t1">
              <ion-label position="position">t</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.t"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Largura do vão do pinhão', 'v1')" id="v1">
              <ion-label position="position">v</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.v"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas">
            <ion-item @click="showTooltip('Passo circular de referência do pinhão', 'pc1')" id="pc1">
              <ion-label position="position">pc</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.pc"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Passo circular de base do pinhão', 'pb1')" id="pb1">
              <ion-label position="position">pb</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.pb"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Passo diametral do pinhão', 'pd1')" id="pd1">
              <ion-label position="position">pd</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="pinhao.pd"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>

        </div>
      </div>
      <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
        <div class="flex" style="justify-content: space-between;align-items: center">
          <label for="" style="flex:inherit">Coroa</label>
          <button style="flex:inherit" @click="!moreEngrenagem ? moreEngrenagem = true : moreEngrenagem = false">
            {{ !moreEngrenagem ? '+' : '-' }}
          </button>
        </div>
        <div class="flex entradas">
          <ion-item @click="showTooltip('Número de dentes', 'N2', 1)" id="N2">
            <ion-label position="position">N</ion-label>
            <ion-input type="number" v-model.lazy="engrenagem.N1" @change="ChangeEngrenagem('N1')"
                       @click="$event.target.select()"></ion-input>
          </ion-item>
          <ion-item @click="showTooltip('Diâmetro primitivo', 'dp2')" id="dp2">
            <ion-label position="position">dp</ion-label>
            <ion-input type="number" v-model.lazy="engrenagem.dp" @change="ChangeEngrenagem('dp')"
                       @click="$event.target.select()"></ion-input>
            <div class="tool">mm</div>
          </ion-item>
          <ion-item @click="showTooltip('Diâmetro externo', 'de2')" id="de2">
            <ion-label position="position">de</ion-label>
            <ion-input type="number" v-model.lazy="engrenagem.de" id="de2" @change="ChangeEngrenagem('de')"
                       @click="$event.target.select()"></ion-input>
            <div class="tool">mm</div>
          </ion-item>
          <div class="tooltip"></div>
        </div>
        <div class="moreEngrenagem" v-if="moreEngrenagem">
          <div class="flex entradas">
            <ion-item @click="showTooltip('Diâmetro interno', 'di2', 1)" id="di2">
              <ion-label position="position">di</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.di"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Diâmetro base', 'db2', 1)" id="db2">
              <ion-label position="position">db</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.db"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Raio primitivo', 'r2', 1)" id="r2">
              <ion-label position="position">rp</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.r"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas">
            <ion-item @click="showTooltip('Altura do adendo', 'a2', 1)" id="a2">
              <ion-label position="position">a</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.a"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Altura do dedendo', 'b2')" id="b2">
              <ion-label position="position">b</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.b"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Altura total do dente', 'ht2')" id="ht2">
              <ion-label position="position">ht</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.ht"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas">
            <ion-item @click="showTooltip('Folga', 'c2')" id="c2">
              <ion-label position="position">c</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.c"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Espessura do dente', 't2')" id="t2">
              <ion-label position="position">t</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.t"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Largura do vão', 'v2')" id="v2">
              <ion-label position="position">v</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.v"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas">
            <ion-item @click="showTooltip('Passo circular de referência', 'pc2')" id="pc2">
              <ion-label position="position">pc</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.pc"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Passo circular de base', 'pb2')" id="pb2">
              <ion-label position="position">pb</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.pb"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
            <ion-item @click="showTooltip('Passo diametral', 'pd2')" id="pd2">
              <ion-label position="position">pd</ion-label>
              <ion-input type="number" onkeydown="$('.tooltip').hide()" v-model.lazy="engrenagem.pd"
                         @click="$event.target.select()"></ion-input>
              <div class="tool">mm</div>
            </ion-item>
          </div>
        </div>
      </div>
    </div>

    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <div class="flex" style="justify-content: space-between;align-items: center">
        <label for="" style="flex:inherit">Carregamento</label>
        <button style="flex:inherit" @click="!moreCarregamento ? moreCarregamento = true : moreCarregamento = false">
          {{ !moreCarregamento ? '+' : '-' }}
        </button>
      </div>
      <div class="flex entradas">
        <ion-item @click="showTooltip('Potência', 'P')" id="P">
          <ion-label position="position">P</ion-label>
          <ion-input type="number" @click="$event.target.select()" v-model.lazy="tensoes.p"
                     @change="onChangeHP($event)"></ion-input>
          <div class="tool" for="">hp</div>
        </ion-item>
        <ion-item @click="showTooltip('Potência em Watts', 'pw')" id="pw">
          <ion-label position="position">Pw</ion-label>
          <ion-input type="number" @click="$event.target.select()" @change="onChangePw($event)"
                     v-model.lazy="tensoes.pw"></ion-input>
          <div class="tool" for="">w</div>
        </ion-item>
        <ion-item @click="showTooltip('Rotações por minuto', 'RPM')" id="RPM">
          <ion-label position="position">RPM</ion-label>
          <ion-input type="number" @click="$event.target.select()" @change="onChangeRPM($event)" v-model.lazy="tensoes.rpm"></ion-input>
        </ion-item>
        <div class="tooltip"></div>
      </div>
      <div class="carregamento" v-if="moreCarregamento">

        <div class="flex entradas">
          <ion-item @click="showTooltip('Torque no pinhão', 'Tp')" id="Tp">
            <ion-label position="position">Tp</ion-label>
            <ion-input @click="$event.target.select()" readonly="readonly" v-model.lazy="tensoes.tp"
                       disabled></ion-input>
            <div class="tool">Nm</div>
          </ion-item>
          <ion-item @click="showTooltip('Torque na engrenagem', 'Tg')" id="Tg" v-model.lazy="tensoes.tg">
            <ion-label position="position">Tg</ion-label>
            <ion-input @click="$event.target.select()" readonly="readonly" v-model.lazy="tensoes.tg"
                       disabled></ion-input>
            <div class="tool">Nm</div>
          </ion-item>
          <ion-item @click="showTooltip('Força axial', 'Wa')" id="Wa" v-if="type == 2">
            <ion-label position="position">Wa</ion-label>
            <ion-input @click="$event.target.select()" v-model.lazy="tensoes.wa" disabled></ion-input>
            <div class="tool">N</div>
          </ion-item>
          <div class="tooltip"></div>
        </div>

        <div class="flex entradas">
          <ion-item @click="showTooltip('Força radial', 'Wr')" id="Wr">
            <ion-label position="position">Wr</ion-label>
            <ion-input @click="$event.target.select()" v-model.lazy="tensoes.wr" disabled></ion-input>
            <div class="tool">N</div>
          </ion-item>
          <ion-item @click="showTooltip('Força tangencial', 'Wt')" id="Wt">
            <ion-label position="position">Wt</ion-label>
            <ion-input @click="$event.target.select()" v-model.lazy="tensoes.wt" disabled></ion-input>
            <div class="tool">N</div>
          </ion-item>
          <ion-item @click="showTooltip('Força resultante', 'W')" id="W">
            <ion-label position="position">W</ion-label>
            <ion-input @click="$event.target.select()" v-model.lazy="tensoes.w" disabled></ion-input>
            <div class="tool">N</div>
          </ion-item>
          <div class="tooltip"></div>
        </div>

        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label position="position">Engrenagem motora</ion-label>
              <ion-select v-model.lazy="Abs.EM" @ionChange="AbsChangeEM()">
                <ion-select-option :value="1">
                  Pinhão
                </ion-select-option>
                <ion-select-option :value="2">
                  Coroa
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Velocidade Tangencial', 'VT')" id="VT">
              <ion-label position="position">Vt</ion-label>
              <ion-input @click="$event.target.select()" type="number" v-model.lazy="tensoes.vt" disabled></ion-input>
              <div class="tool">m/s</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="content" :style="type == 1 ? 'border-top: 1px solid var(--ion-color-light-shade)' : 'border-top: 1px solid var(--ion-color-light-shade);opacity:0.2;pointer-events:none'">
      <div class="flex" style="justify-content: space-between;align-items: center">
        <label for="" style="flex:inherit">Análise de tensões na raiz do dente <span v-if="type == 2">(Em breve)</span></label>
        <button style="flex:inherit" @click="!moreAnalise ? moreAnalise = true : moreAnalise = false">
          {{ !moreAnalise ? '+' : '-' }}
        </button>
      </div>
      <div class="flex entradas">
        <ion-item @click="showTooltip('Tensão de flexão na raiz do dente do pinhão', 'σb1')" id="σb1">
          <ion-label position="position">σb1</ion-label>
          <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes.ab" disabled="disabled"
                     @change="onChangeHP($event)"></ion-input>
          <div class="tool" for="">MPa</div>
        </ion-item>
        <ion-item @click="showTooltip('Tensão de flexão na raiz do dente da coroa', 'σb2')" id="σb2">
          <ion-label position="position">σb2</ion-label>
          <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes.ab2" disabled="disabled"
                     @change="onChangeHP($event)"></ion-input>
          <div class="tool" for="">MPa</div>
        </ion-item>
        <div class="tooltip"></div>
      </div>
      <div class="analise" v-if="moreAnalise">
        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label position="position">Projeto do dente</ion-label>
              <ion-select v-model.lazy="Abs.PD" @ionChange="AbsChange($event, 'PD')">
                <ion-select-option value="PROF. COMPLETA">
                  PROF. COMPLETA
                </ion-select-option>
                <ion-select-option value="ADENDO ALONGADO 25%">
                  ADENDO ALONGADO 25%
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas">
            <ion-item>
              <ion-label position="position">Carregamento</ion-label>
              <ion-select v-model.lazy="Abs.CR" @ionChange="AbsChange($event, 'CR')" disabled>
                <ion-select-option value="HPSTC">
                  HPSTC
                </ion-select-option>
                <ion-select-option value="CARR. PONTA DO DENTE">
                  CARR. PONTA DO DENTE
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Fator geométrico de resistência de flexão do pinhão', 'J1')" id="J1">
              <ion-label position="position">J1</ion-label>
              <ion-input type="text" @click="$event.target.select()" @change="onChangePw($event)"
                         v-model.lazy="anatensoes.j" disabled></ion-input>
            </ion-item>
            <ion-item @click="showTooltip('Fator geométrico de resistência de flexão da coroa', 'J2')" id="J2">
              <ion-label position="position">J2</ion-label>
              <ion-input type="text" @click="$event.target.select()" @change="onChangePw($event)"
                         v-model.lazy="anatensoes.j2" disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
        </div>
        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label position="position">Máquina Motora</ion-label>
              <ion-select v-model.lazy="Abs.MM" @ionChange="AbsChange($event, 'MM')">
                <ion-select-option value="Uniforme (motor elétrico, turbina)">
                  Uniforme (motor elétrico, turbina)
                </ion-select-option>
                <ion-select-option value="Choque leve (motor multi-cilindros)">
                  Choque leve (motor multi-cilindros)
                </ion-select-option>
                <ion-select-option value="Choque médio (motor de um único cilindro)">
                  Choque médio (motor de um único cilindro)
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas">
            <ion-item>
              <ion-label position="position">Condições de aplicação na Máquina Movida</ion-label>
              <ion-select v-model.lazy="Abs.CO" @ionChange="AbsChange($event, 'CO')">
                <ion-select-option value="Uniforme">
                  Uniforme
                </ion-select-option>
                <ion-select-option value="Choque moderado">
                  Choque moderado
                </ion-select-option>
                <ion-select-option value="Choque severo">
                  Choque severo
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Fator de aplicação', 'Ka')" id="Ka">
              <ion-label position="position">Ka</ion-label>
              <ion-input type="number" @click="$event.target.select()" @change="onChangeRPM($event)"
                         v-model.lazy="anatensoes.ka" disabled="disabled"></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
        </div>
        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label position="position">Para</ion-label>
              <ion-select v-model.lazy="Abs.type" @ionChange="AbsChangeKi($event)">
                <ion-select-option value="1.42">
                  Engrenagem livre
                </ion-select-option>
                <ion-select-option value="1">
                  Engrenagem não solta
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Fator de ciclo de carga', 'Ki')" id="Ki">
              <ion-label position="position">Ki</ion-label>
              <ion-input @click="$event.target.select()" v-model.lazy="anatensoes.ki" disabled="disabled"></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
        </div>
        <div class="context">
          <div class="flex entradas">
            <ion-item @click="showTooltip('Escolha entre velocidade de referência, aplicação ou rugosidade', 'EKv')"
                      id="EKv">
              <ion-label position="position">Velocidade, aplicação ou rugosidade</ion-label>
              <ion-select v-model.lazy="Abs.App" @ionChange="ChangeApp($event)">
                <ion-select-option :value="1">
                  Velocidade
                </ion-select-option>
                <ion-select-option :value="2">
                  Aplicação
                </ion-select-option>
                <ion-select-option :value="3">
                  Rugosidade
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas" v-if="Abs.App == 2">
            <ion-item @click="showTooltip('Escolha entre velocidade de referência ou aplicação', 'App')" id="App">
              <ion-label position="position">Aplicação</ion-label>
              <ion-select v-model.lazy="Abs.Application" @ionChange="AbsAppKv($event)">
                <ion-select-option value="Acionador do tambor do misturador de cimento">
                  Acionador do tambor do misturador de cimento
                </ion-select-option>
                <ion-select-option value="Forno de cimento">
                  Forno de cimento
                </ion-select-option>
                <ion-select-option value="Acionadores de fresa de aço">
                  Acionadores de fresa de aço
                </ion-select-option>
                <ion-select-option value="Selecionador de milho">
                  Selecionador de milho
                </ion-select-option>
                <ion-select-option value="Guindaste">
                  Guindaste
                </ion-select-option>
                <ion-select-option value="Prensa de esmagamento">
                  Prensa de esmagamento
                </ion-select-option>
                <ion-select-option value="Esteira de mineração">
                  Esteira de mineração
                </ion-select-option>
                <ion-select-option value="Máquina de fabricação de caixa de papel">
                  Máquina de fabricação de caixa de papel
                </ion-select-option>
                <ion-select-option value="Mecanismo do medidor de gás">
                  Mecanismo do medidor de gás
                </ion-select-option>
                <ion-select-option value="Furadeira de baixa potência">
                  Furadeira de baixa potência
                </ion-select-option>
                <ion-select-option value="Prensa de impressão">
                  Prensa de impressão
                </ion-select-option>
                <ion-select-option value="Mecanismo de computador">
                  Mecanismo de computador
                </ion-select-option>
                <ion-select-option value="Máquina de lavar roupas ">
                  Máquina de lavar roupas
                </ion-select-option>
                <ion-select-option value="Transmissão de automóveis ">
                  Transmissão de automóveis
                </ion-select-option>
                <ion-select-option value="Acionador de antena de radar">
                  Acionador de antena de radar
                </ion-select-option>
                <ion-select-option value="Acionador de propulsor marítmo">
                  Acionador de propulsor marítmo
                </ion-select-option>
                <ion-select-option value="Acionador de motor de avião">
                  Acionador de motor de avião
                </ion-select-option>
                <ion-select-option value="Giroscópio">
                  Giroscópio
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas" v-if="Abs.App == 3">
            <ion-item @click="showTooltip('Rugosidade', 'Ra')" id="Ra">
              <ion-label position="position">Ra</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="Abs.Ru"
                         @change="AbsAppQv()"></ion-input>
              <div class="tool" for="">μm</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas" v-if="Abs.App == 1 || Abs.App == 3">
            <ion-item @click="showTooltip('Índice de qualidade', 'qv')" id="qv">
              <ion-label position="position">Qv</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes.qv"
                         disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>

          <div class="flex entradas" v-if="Abs.App != 1 && Abs.App != 3">
            <ion-item @click="showTooltip('Índice de qualidade', 'qv')" id="qv">
              <ion-label position="position">Qv</ion-label>
              <ion-select v-model.lazy="anatensoes.qv" @ionChange="AbsAppQv($event, true)">
                <ion-select-option v-for="kv in anatensoes.kv" :key="kv.Qv" :value="kv.Qv">
                  {{ kv.Qv }}
                </ion-select-option>
              </ion-select>
            </ion-item>

            <div class="tooltip"></div>
          </div>

          <div class="flex entradas">
            <ion-item @click="showTooltip('Fator dinâmico', 'Kv')" id="Kv">
              <ion-label position="position">Kv</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="tensoes.kv" disabled></ion-input>
            </ion-item>

            <div class="tooltip"></div>
          </div>

        </div>

        <div class="context">

          <div class="context">
            <div class="flex entradas">
              <ion-item @click="showTooltip('Pinhão feito a partir', 'Ad')" id="Ad">
                <ion-label position="position">Pinhão feito a partir</ion-label>
                <ion-select v-model.lazy="Abs.AP" @ionChange="ChangeAP(1)">
                  <ion-select-option value="1">
                    Disco Sólido
                  </ion-select-option>
                  <ion-select-option value="2">
                    Anel ou catraca
                  </ion-select-option>
                </ion-select>
              </ion-item>
              <div class="tooltip"></div>
            </div>
            <div class="flex entradas" v-if="Abs.AP == 2">
              <ion-item @click="showTooltip('Espessura de borda do pinhao', 'tr')" id="tr">
                <ion-label position="position">tr¹</ion-label>
                <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes.tr"
                           @change="ChangeAP(1)"></ion-input>
                <div class="tool" for="">mm</div>
              </ion-item>
              <div class="tooltip"></div>
            </div>
            <div class="flex entradas" v-if="anatensoes.kb > 0">
              <ion-item @click="showTooltip('Fator de espessura de borda do pinhão', 'Kb')" id="Kb">
                <ion-label position="position">Kb¹</ion-label>
                <ion-input @click="$event.target.select()" v-model.lazy="anatensoes.kb" disabled></ion-input>
              </ion-item>
              <div class="tooltip"></div>
            </div>
            <p style="color: red" v-if="anatensoes.kb === 0">Razões de recuo &lt; 0,5 não são recomendadas</p>
          </div>
          <div class="context">
            <div class="flex entradas">
              <ion-item @click="showTooltip('Coroa feita a partir', 'Ad2')" id="Ad2">
                <ion-label position="position">Coroa feita a partir</ion-label>
                <ion-select v-model.lazy="Abs.AP2" @ionChange="ChangeAP(2)">
                  <ion-select-option value="1">
                    Disco Sólido
                  </ion-select-option>
                  <ion-select-option value="2">
                    Anel ou catraca
                  </ion-select-option>
                </ion-select>
              </ion-item>
            </div>
            <div class="flex entradas" v-if="Abs.AP2 == 2">
              <ion-item @click="showTooltip('Espessura de borda da coroa', 'tr2')" id="tr2">
                <ion-label position="position">tr²</ion-label>
                <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes.tr2"
                           @change="ChangeAP(2)"></ion-input>
                <div class="tool" for="">mm</div>
              </ion-item>
              <div class="tooltip"></div>
            </div>
            <div class="flex entradas" v-if="anatensoes.kb2 > 0">
              <ion-item @click="showTooltip('Fator de espessura de borda da coroa', 'Kb2')" id="Kb2">
                <ion-label position="position">Kb²</ion-label>
                <ion-input @click="$event.target.select()" v-model.lazy="anatensoes.kb2" disabled></ion-input>
              </ion-item>
              <div class="tooltip"></div>
            </div>
            <p style="color: red" v-if="anatensoes.kb2 === 0">Razões de recuo &lt; 0,5 não são recomendadas</p>
          </div>

          <div class="flex entradas">
            <ion-item @click="showTooltip('Fator de distribuição de carga', 'Km')" id="Km">
              <ion-label position="position">Km</ion-label>
              <ion-input @click="$event.target.select()" type="number" v-model.lazy="anatensoes.km"
                         disabled></ion-input>
            </ion-item>
            <ion-item @click="showTooltip('Fator de tamanho', 'Ks')" id="Ks">
              <ion-label position="position">Ks</ion-label>
              <ion-input @click="$event.target.select()" v-model.lazy="anatensoes.ks" disabled="disabled"></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
        </div>
      </div>

      <div class="popupInfosDs" style="display: none !important">
        <div class="flex">

        </div>
      </div>
    </div>

    <div class="content" :style="type == 1 ? 'border-top: 1px solid var(--ion-color-light-shade)' : 'border-top: 1px solid var(--ion-color-light-shade);opacity:0.2;pointer-events:none'">
      <div class="flex" style="justify-content: space-between;align-items: center">
        <label for="" style="flex:inherit">Análise de tensões na superfice do dente <span v-if="type == 2">(Em breve)</span></label>
        <button style="flex:inherit" @click="!moreAnalise2 ? moreAnalise2 = true : moreAnalise2 = false">
          {{ !moreAnalise2 ? '+' : '-' }}
        </button>
      </div>
      <div class="flex entradas">
        <div>
          <ion-item @click="showTooltip('Tensão de superfíce', 'ac')" id="ac">
            <ion-label position="position">σc</ion-label>
            <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.ac"
                       disabled></ion-input>
            <div class="tool">MPa</div>
          </ion-item>
          <div class="tooltip"></div>
        </div>
        <div class="tooltip"></div>
      </div>
      <div class="analise" v-if="moreAnalise2">
        <div class="flex entradas">
          <div>
            <ion-item @click="showTooltip('Fator geométrico', 'i')" id="i">
              <ion-label position="position">I</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.i"
                         disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Fator de distribuição de carga', 'Cm')" id="Cm"
                      :style="anatensoes2.Cm == 0 ? 'border:1px solid red' : ''">
              <ion-label position="position">Cm</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Cm"
                         disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
            <span v-if="anatensoes2.Cm == 0" style="color:red">
                Para calcular os fatores de superfície, defina os parâmetros na raiz do dente.
              </span>
          </div>
          <div class="tooltip"></div>
        </div>
        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label>Material do pinhão</ion-label>
              <ion-select v-model.lazy="Abs.Cp" :value="data.Material[0].M" @ionChange="ChangeAb()">
                <ion-select-option :value="MA.M" v-for="MA in data.Material" v-bind:key="MA.M">
                  {{ MA.M }}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas">
            <ion-item>
              <ion-label>Material da coroa</ion-label>
              <ion-select v-model.lazy="Abs.Cp2" :value="data.Material[0].M" @ionChange="ChangeAb()">
                <ion-select-option :value="MA.M" v-for="MA in data.Material" v-bind:key="MA.M">
                  {{ MA.M }}
                </ion-select-option>
              </ion-select>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Coeficiente elástico', 'Cp')" id="Cp">
              <ion-label position="position">Cp</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Cp"
                         disabled></ion-input>
              <div class="tool">MPa^0.5</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>
        </div>
        <div class="flex entradas">
          <div>
            <ion-item @click="showTooltip('Fator de acabamento superficial', 'Cf')" id="Cf">
              <ion-label position="position">Cf</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Cf"
                         disabled></ion-input>
            </ion-item>
            <p v-if="anatensoes2.Cf == 0" style="color:red">
              Para calcular os fatores de superfície, defina os parâmetros na raiz do dente.
            </p>
            <div class="tooltip"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Fator de aplicação', 'Ca')" id="Ca"
                      :style="anatensoes2.Ca == 0 ? 'border:1px solid red' : ''">
              <ion-label position="position">Ca</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Ca"
                         disabled></ion-input>
            </ion-item>
            <span v-if="anatensoes2.Ca == 0" style="color:red">
              Para calcular os fatores de superfície, defina os parâmetros na raiz do dente.
            </span>
            <div class="tooltip"></div>
          </div>
          <div class="tooltip"></div>
        </div>
        <div class="flex entradas">
          <div>
            <ion-item @click="showTooltip('Fator dinâmico', 'Cv')" id="Cv"
                      :style="anatensoes2.Cv == 0 ? 'border:1px solid red' : ''">
              <ion-label position="position">Cv</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Cv"
                         disabled></ion-input>
            </ion-item>
            <span v-if="anatensoes2.Cv == 0" style="color:red">
              Para calcular os fatores de superfície, defina os parâmetros na raiz do dente.
            </span>
            <div class="tooltip"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Fator dinâmico', 'Cs')" id="Cs">
              <ion-label position="position">Cs</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Cs"
                         disabled></ion-input>
            </ion-item>
            <span v-if="anatensoes2.Cs == 0" style="color:red">
              Para calcular os fatores de superfície, defina os parâmetros na raiz do dente.
            </span>
            <div class="tooltip"></div>
          </div>
          <div class="tooltip"></div>
        </div>

        <div class="flex entradas">
          <div>
            <ion-item @click="showTooltip('Dureza Brinell HB', 'Hb')" id="Hb">
              <ion-label position="position">Hb</ion-label>
              <ion-input type="number" @click="$event.target.select()" @change="ChangeAb()"
                         v-model.lazy="anatensoes2.Hb"></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Resistência à fadiga de flexão (AGMA) - Grau 1', 'Sfb1')" id="Sfb1">
              <ion-label position="position">Sfb'</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Sfb1"
                         disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Resistência à fadiga de flexão (AGMA) - Grau 2', 'Sfb2')" id="Sfb2">
              <ion-label position="position">Sfb'</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Sfb2"
                         disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="tooltip"></div>
        </div>

        <div class="flex entradas">
          <div>
            <ion-item @click="showTooltip('Temperatura em fahrenheit', 'TF')" id="TF">
              <ion-label position="position">TF</ion-label>
              <ion-input type="number" @click="$event.target.select()" @change="ChangeFT()"
                         v-model.lazy="anatensoes2.FT"></ion-input>
              <div class="tool">ºF</div>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Fator de temperatura', 'Kt')" id="Kt">
              <ion-label position="position">Kt</ion-label>
              <ion-input type="number" @click="$event.target.select()" @change="ChangeAb()"
                         v-model.lazy="anatensoes2.Kt"
                         disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="tooltip"></div>
        </div>

        <div class="context">
            <div class="flex entradas">
              <ion-item>
                <ion-label>Tipo de operação</ion-label>
                <ion-select v-model.lazy="Abs.TO" :value="1" @ionChange="ChangeTO()">
                  <ion-select-option :value="1">
                    Suavidade de operação e níveis baixos de vibração
                  </ion-select-option>
                  <ion-select-option :value="2">
                    Aplicação comercial
                  </ion-select-option>
                </ion-select>
              </ion-item>
              <div class="tooltip"></div>
            </div>
            <div class="flex entradas">
              <ion-item>
                <ion-label>Número de ciclos</ion-label>
                <ion-select v-model.lazy="Abs.NC" @ionChange="ChangeTO()">
                  <ion-select-option :value="10000000">
                    10^7
                  </ion-select-option>
                  <ion-select-option :value="100000000">
                    10^8
                  </ion-select-option>
                  <ion-select-option :value="1000000000">
                    10^9
                  </ion-select-option>
                  <ion-select-option :value="10000000000">
                    10^10
                  </ion-select-option>
                </ion-select>
              </ion-item>
              <div class="tooltip"></div>

            </div>
            <div class="flex entradas">
              <ion-item @click="showTooltip('Fator de vida', 'Kl')" id="Kl">
                <ion-label position="position">Kl</ion-label>
                <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Kl"
                           disabled></ion-input>
              </ion-item>
              <div class="tooltip"></div>
            </div>
          </div>

        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label>Confiabilidade (%)</ion-label>
              <ion-select v-model.lazy="Abs.CF" :value="1" @ionChange="ChangeCO()">
                <ion-select-option :value="0.85">
                  90%
                </ion-select-option>
                <ion-select-option :value="1">
                  99%
                </ion-select-option>
                <ion-select-option :value="1.25">
                  99,9%
                </ion-select-option>
                <ion-select-option :value="1.5">
                  99,99%
                </ion-select-option>
              </ion-select>
            </ion-item>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Fator de confiabilidade', 'Kr')" id="Kr">
              <ion-label>Kr</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Kr"
                         disabled></ion-input>
            </ion-item>
          </div>
        </div>

        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label>Resistência à fadiga de flexão</ion-label>
              <ion-select v-model.lazy="Abs.GR" @ionChange="ChangeSfb()">
                <ion-select-option :value="1">
                  AGMA Grau 1
                </ion-select-option>
                <ion-select-option :value="2">
                  AGMA Grau 2
                </ion-select-option>
              </ion-select>
            </ion-item>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Resistência à fadiga de flexão corrigida', 'Sfb')" id="Sfb">
              <ion-label>Sfb</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Sfb"
                         disabled></ion-input>
            </ion-item>
          </div>
        </div>

        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label>Tipo de operação para superfície</ion-label>
              <ion-select v-model.lazy="Abs.TOS" :value="1" @ionChange="ChangeTOS()">
                <ion-select-option :value="1">
                  Suavidade de operação e níveis baixos de vibração
                </ion-select-option>
                <ion-select-option :value="2">
                  Aplicação comercial
                </ion-select-option>
              </ion-select>
            </ion-item>
          </div>
          <div class="flex entradas">
            <ion-item>
              <ion-label>Número de ciclos</ion-label>
              <ion-select v-model.lazy="Abs.NCS" @ionChange="ChangeTOS()">
                <ion-select-option :value="10000000">
                  10^7
                </ion-select-option>
                <ion-select-option :value="100000000">
                  10^8
                </ion-select-option>
                <ion-select-option :value="1000000000">
                  10^9
                </ion-select-option>
                <ion-select-option :value="10000000000">
                  10^10
                </ion-select-option>
              </ion-select>
            </ion-item>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Fator de vida CL', 'CL')" id="CL">
              <ion-label position="position">CL</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.CL"
                         disabled></ion-input>
            </ion-item>
          </div>
        </div>

        <div class="flex entradas">
          <div>
            <ion-item @click="showTooltip('Dureza Brinell HB (Superfície)', 'Hbc')" id="Hbc">
              <ion-label position="position">Hb</ion-label>
              <ion-input type="number" @click="$event.target.select()" @change="ChangeAb()"
                         v-model.lazy="anatensoes2.Hbc"></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Resistência à fadiga de superfície (AGMA) - Grau 1', 'Sfc1')" id="Sfc1">
              <ion-label position="position">Sfc'</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Sfc1"
                         disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div>
            <ion-item @click="showTooltip('Resistência à fadiga de superfície (AGMA) - Grau 2', 'Sfc2')" id="Sfc2">
              <ion-label position="position">Sfc''</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Sfc2"
                         disabled></ion-input>
            </ion-item>
            <div class="tooltip"></div>
          </div>
          <div class="tooltip"></div>
        </div>

        <div class="flex entradas">
          <ion-item @click="showTooltip('Fator de razão de dureza', 'Ch')" id="Ch">
            <ion-label position="position">Ch</ion-label>
            <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Ch"></ion-input>
          </ion-item>
          <ion-item @click="showTooltip('Fator de temperatura CT', 'Ct')" id="Ct">
            <ion-label position="position">Ct</ion-label>
            <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Kt"></ion-input>
          </ion-item>
          <ion-item @click="showTooltip('Fator de confiabilidade', 'Cr')" id="Cr">
            <ion-label position="position">Cr</ion-label>
            <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Kr"></ion-input>
          </ion-item>
          <div class="tooltip"></div>
        </div>

        <div class="context">
          <div class="flex entradas">
            <ion-item>
              <ion-label>Resistência à fadiga de superfície</ion-label>
              <ion-select v-model.lazy="Abs.GR2" @ionChange="ChangeSfc()">
                <ion-select-option :value="1">
                  AGMA Grau 1
                </ion-select-option>
                <ion-select-option :value="2">
                  AGMA Grau 2
                </ion-select-option>
              </ion-select>
            </ion-item>
          </div>
          <div class="flex entradas">
            <ion-item @click="showTooltip('Resistência à fadiga de superfície corrigida', 'Sfc')" id="Sfc">
              <ion-label>Sfc</ion-label>
              <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Sfc"
                         disabled></ion-input>
            </ion-item>
          </div>
        </div>

      </div>
    </div>

    <div class="content" :style="type == 1 ? 'border-top: 1px solid var(--ion-color-light-shade)' : 'border-top: 1px solid var(--ion-color-light-shade);opacity:0.2;pointer-events:none'">
      <label style="flex:inherit">Coeficiente de segurança <span v-if="type == 2">(Em breve)</span></label>
      <div class="flex entradas">
        <ion-item @click="showTooltip('Coeficiente de segurança do pinhão', 'NBp')" id="NBp">
          <ion-label>NBp</ion-label>
          <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.NBp"
                     disabled></ion-input>
          <div class="tooltip"></div>
        </ion-item>
        <ion-item @click="showTooltip('Coeficiente de segurança do coroa', 'NBe')" id="NBe">
          <ion-label>NBe</ion-label>
          <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.NBe"
                     disabled></ion-input>
        </ion-item>
        <div class="tooltip"></div>
      </div>
      <div class="flex entradas">
        <ion-item @click="showTooltip('Coeficiente de segurança contra falha', 'Nc')" id="Nc">
          <ion-label>Nc</ion-label>
          <ion-input type="number" @click="$event.target.select()" v-model.lazy="anatensoes2.Nc"
                     disabled></ion-input>
        </ion-item>
        <div class="tooltip"></div>
      </div>
    </div>

    <div class="content" style="border-top: 1px solid var(--ion-color-light-shade)">
      <label style="flex:inherit">Visualização</label>
      <SceneDrGoogle :update="update" style="margin-top: 60px" v-if="update"></SceneDrGoogle>
    </div>

  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";

import SceneDrGoogle from "@/components/SceneDrGoogle.vue";

import {
  IonSegment,
  IonSelectOption,
  IonItem,
  IonInput,
  IonLabel,
  IonSegmentButton,
  IonIcon,
  IonSelect,
  IonButton,
  modalController
} from '@ionic/vue';

import Modal from './../views/Modal.vue'

import {save, trash} from 'ionicons/icons';

import $ from 'jquery';

import {CalcGear} from '/src/modules/Calc.js'
import axios from "axios";


export default {
  components: {
    IonSegment,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonSegmentButton,
    IonIcon,
    modalController,
    axios,
    SceneDrGoogle

  },
  name: "Calculadora",
  setup() {
    return {
      save,
      trash,
      IonSelect,
      IonSelectOption,
      IonButton,
      IonSegment,
    }
  },
  mounted() {
    if(localStorage.saves) {
      this.saves = JSON.parse(localStorage.saves);
      this.LoadSaveState(0);
      const event = {
        target: {
          value: this.entradas.mG,
        }
      };
      this.onChangeMG(event);
    }
    else {
      this.saves = [{index:0}];
      this.entradas.m = 4;
      const event = {
        target: {
          value: 2.00
        }
      };
      setTimeout(() => {
        this.onChangeMG(event);
      }, 1000);
    }
    const vm = this;
    $('.tooltip').click(function () {
      vm.openModal($(this).attr('data-id'));
    });

    $('.info').click(function () {
      vm.openModal($(this).attr('data-id'));
    });

  },
  methods: {
    async openModal(data) {

      const modal = await modalController
          .create({
            component: Modal,
            cssClass: 'my-custom-class',
            componentProps: {
              data: data,
            },
          })
      return modal.present();
    },
    ...mapActions([
      "ChangePinhaoState", "ChangeEngrenagemState",
      "ChangeEntradasState", "onChangeMGState", "onChangeMState",
      "onChangePhiState", "onChangeCnState",
      "ChangeHPState", "ChangePWState", "ChangeRPMState",
      "ChangeKAState",
      "ChangeJState",
      "ChangeTypeState",
      "SaveNewState",
      "SaveState",
      "LoadSaveState",
      "DeleteSaveState"
    ]),
    SaveNewLocal() {
      this.saves.push({});
      this.calc = this.saves.length - 1;
      this.SaveNewState();
    },
    DeleteSave() {
        this.DeleteSaveState(this.calc);
        this.saves = JSON.parse(localStorage.saves);
        this.calc = this.calc - 1;
        this.LoadSaveState(this.calc);
        const event = {
          target: {
            value: this.entradas.mG,
          }
        };
        this.onChangeMG(event);
    },
    onChangeSaves(event) {
      this.LoadSaveState(event.target.value);
      const event2 = {
        target: {
          value: this.entradas.mG,
        }
      };
      this.onChangeMG(event2);
    },
    SaveLocal() {
      this.SaveState(this.calc);
    },
    ChangePinhao(field = null, number = null) {
      this.ChangePinhaoState(field, number);
      this.ChangeJState(this.Abs);
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.update++;
    },
    ChangeEngrenagem(field = null, number = null) {
      this.ChangeEngrenagemState(field, number);
      this.ChangeJState(this.Abs);
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.update++;
    },
    ChangeEntradas(field = null, number = null) {
      this.ChangeEntradasState(field, number);
      this.ChangeJState(this.Abs);
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.update++;
    },
    onChangeMG(event) {
      this.onChangeMGState(event.target.value);
      this.ChangeJState(this.Abs)
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.Changed = true;
      this.ChangeAb();
      this.update++;
    },
    onChangeM(event) {
      this.onChangeMState(parseFloat(event.target.value));
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.ChangeAb();
      this.update++;
    },
    onChangePhi(event) {
      this.onChangePhiState(parseFloat(event.target.value));
      this.ChangeJState(this.Abs);
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.ChangeAb();
      this.update++;
    },
    onChangeCn(event) {
      this.onChangeCnState(event.target.value);
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
    },
    onChangeHP(event) {
      this.ChangeHPState(event.target.value);
      if(this.tensoes.rpm) this.ChangeRPMState(this.tensoes.rpm);

      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.ChangeAb();
    },
    onChangePw(event) {
      this.ChangePWState(event.target.value);
      if(this.tensoes.rpm) this.ChangeRPMState(this.tensoes.rpm);
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.ChangeAb();

    },
    onChangeRPM(event) {
      this.ChangeRPMState(event.target.value);
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.ChangeAb();
    },
    onChangeU() {
      if(this.tensoes.rpm)
      this.ChangeRPMState(this.tensoes.rpm);
    },
    AbsChange(event, type) {
      if (type == 'MM') {
        this.Abs.MM = event.target.value;
      } else if (type == 'CO') {
        this.Abs.CO = event.target.value;
      } else if (type == 'PD') {
        this.Abs.PD = event.target.value;
      } else if (type == 'CR') {
        this.Abs.CR = event.target.value;
      }

      if (this.Abs.MM && this.Abs.CO && (type == 'MM' || type == 'CO')) {
        this.ChangeKAState(this.Abs);
      }

      if (this.Abs.CR && this.Abs.PD && (type == 'CR' || type == 'PD')) {
        this.ChangeJState(this.Abs);
      }

      this.ChangeAb();
    },
    AbsChangeKi(event) {
      this.anatensoes.ki = event.target.value;
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.ChangeAb();
    },
    AbsAppKv(event) {
      this.anatensoes.kv = CalcGear.kvApp(event.target.value);
      this.anatensoes.qv = this.anatensoes.kv[0].Qv;
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.ChangeAb();
    },
    AbsAppKvelo(ent) {
      this.anatensoes.kv = CalcGear.kvVelo(ent);
      this.anatensoes.kvS = this.anatensoes.kv[0].Qv;
      this.AbsChangeEM();
      this.AbsAppQv(this.tensoes.vt);
      this.ChangeAb();
    },
    AbsAppQv(ent, select = false) {
      if (this.Abs.App == 1)
        this.anatensoes.qv = CalcGear.QvApp(this.tensoes.vt);

      if (this.Abs.App == 3)
        this.anatensoes.qv = CalcGear.RuApp(this.Abs.Ru);

      if (this.Abs.App == 2 && select) {
        console.log('teste');
        this.anatensoes.qv = ent.target.value;
      }

      const b = Math.pow((12 - parseFloat(this.anatensoes.qv)), (2 / 3)) / 4,
          a = 50 + (56 * (1 - b));

      this.tensoes.kv = parseFloat(this.anatensoes.qv) <= 5 ? (50 / (50 + Math.sqrt(200 * parseFloat(this.tensoes.vt)))).toFixed(3) : (Math.pow((a / (a + Math.sqrt(200 - parseFloat(this.tensoes.vt)))), b)).toFixed(3);
      this.ChangeAb();
    },
    ChangeApp(event) {
      if (event.target.value == 1) {
        this.AbsAppKvelo((parseFloat(this.tensoes.rpm) * 2 * Math.PI * parseFloat(this.pinhao.dp) / 2000) / 60);
      } else if (event.target.value == 2) {
        this.AbsAppQv(parseFloat(this.tensoes.vt));
      } else {
        this.AbsAppQv(parseFloat(this.tensoes.vt));
      }
      this.ChangeAb();
    },
    showTooltip(string, item, first = null) {
      $('.tooltip').hide();
      this.tooltipSelected = item;
      first = first ? 0 : 15;
      this.first = first ? 0 : 15;
      $('.tooltip', $('#' + item).parent()).html(string).css('left', $('#' + item).position().left + first).attr('data-id', item).fadeIn();
    },
    ChangeAP(type) {
      let mb = 0.0;
      let mb2 = 0.0;
      if (type == 1) {
        if (this.Abs.AP == 1) {
          this.anatensoes.kb = 1;

        } else {
          mb = parseFloat(this.anatensoes.tr) / parseFloat(this.pinhao.ht);
          if (mb < 0.5) {
            this.anatensoes.kb = 0;
          } else if (mb <= 1.2) {
            this.anatensoes.kb = -2 * mb + 3.4;
          } else {
            this.anatensoes.kb = 1;
          }
        }
      }

      if (type == 2) {
        if (this.Abs.AP2 == 1) {
          this.anatensoes.kb2 = 1;
        } else {
          mb2 = parseFloat(this.anatensoes.tr2) / parseFloat(this.engrenagem.ht);
          if (mb2 < 0.5) {
            this.anatensoes.kb2 = 0;
          } else if (mb2 <= 1.2) {
            this.anatensoes.kb2 = -2 * mb2 + 3.4;
          } else {
            this.anatensoes.kb2 = 1;
          }
        }
      }
      this.ChangeAb();
    },
    AbsChangeEM() {
      if (this.Abs.EM == 1 && this.tensoes.rpm) {
        this.tensoes.vt = ((parseFloat(this.tensoes.rpm) * 2 * Math.PI / 60) * (parseFloat(this.pinhao.r) / 1000)).toFixed(3);
        this.AbsAppQv(this.tensoes.vt);
      } else {
        this.tensoes.vt = ((parseFloat(this.tensoes.rpm) * 2 * Math.PI / 60) * (parseFloat(this.engrenagem.r) / 1000)).toFixed(3);
        this.AbsAppQv(this.tensoes.vt);
      }
      this.ChangeAb();
    },
    ChangeAb(event = null) {
      const ab = ((parseFloat(this.tensoes.wt) / (parseFloat(this.entradas.F) * parseFloat(this.entradas.M) * parseFloat(this.anatensoes.j)))
          * parseFloat(this.anatensoes.ka) * parseFloat(this.anatensoes.km) * parseFloat(this.anatensoes.ks) * parseFloat(this.anatensoes.kb)
          * parseFloat(this.anatensoes.ki) / parseFloat(this.tensoes.kv)).toFixed(3);

      const ab2 = ((parseFloat(this.tensoes.wt) / (parseFloat(this.entradas.F) * parseFloat(this.entradas.M) * parseFloat(this.anatensoes.j2)))
          * parseFloat(this.anatensoes.ka) * parseFloat(this.anatensoes.km) * parseFloat(this.anatensoes.ks) * parseFloat(this.anatensoes.kb2)
          * parseFloat(this.anatensoes.ki) / parseFloat(this.tensoes.kv)).toFixed(3);

      this.anatensoes.ab = ab;
      this.anatensoes.ab2 = ab2;

      const
          XP = this.Abs.PD == "PROF. COMPLETA" ? 0.0 : 0.25,

          PP = Math.sqrt(Math.pow(parseFloat(this.pinhao.r) + ((1 + XP) / parseFloat(this.pinhao.pd)), 2) - Math.pow((parseFloat(this.pinhao.r) * Math.cos(parseFloat(this.entradas.phi) * (Math.PI / 180))), 2)) - ((Math.PI / parseFloat(this.pinhao.pd)) * (Math.cos(parseFloat(this.entradas.phi) * (Math.PI / 180)))),
          PG = this.entradas.CE * Math.sin(parseFloat(this.entradas.phi) * (Math.PI / 180)) + PP;

      this.anatensoes2.i = (Math.cos(this.entradas.phi * (Math.PI / 180)) / (((1 / PP) + (1 / PG)) * this.pinhao.dp)).toFixed(3);

      if (this.Abs.Cp && this.Abs.Cp) {
        const tabela = CalcGear.CheckMaterial(this.Abs.Cp);
        const tabela2 = CalcGear.CheckMaterial(this.Abs.Cp2);
        this.anatensoes2.Cp = (Math.sqrt(1 / (Math.PI * (((1 - Math.pow(parseFloat(tabela.PV), 2)) / (parseFloat(tabela.GPA) * 1000))
            + ((1 - Math.pow(parseFloat(tabela2.PV), 2)) / (parseFloat(tabela2.GPA) * 1000)))))).toFixed(2);
      }
      this.anatensoes2.Ca = this.anatensoes.ka;
      this.anatensoes2.Cv = this.tensoes.kv;
      this.anatensoes2.Cm = this.anatensoes.km;
      this.anatensoes2.Cs = 1;

      if (this.anatensoes2.Hb) {
        this.anatensoes2.Sfb1 = -274 + (167 * this.anatensoes2.Hb) - (0.152 * Math.pow(this.anatensoes2.Hb, 2));
        this.anatensoes2.Sfb1 = this.anatensoes2.Sfb1 * 0.00689476;
        this.anatensoes2.Sfb2 = 6235 + (174 * this.anatensoes2.Hb) - (0.126 * Math.pow(this.anatensoes2.Hb, 2));
        this.anatensoes2.Sfb2 = this.anatensoes2.Sfb2 * 0.00689476;
        this.ChangeSfb();
      }

      if (this.anatensoes2.Hbc) {
        this.anatensoes2.Sfc1 = (26000 + (327 * this.anatensoes2.Hbc)).toFixed(3);
        this.anatensoes2.Sfc1 = this.anatensoes2.Sfc1 * 0.00689476;
        this.anatensoes2.Sfc2 = (27000 + (364 * this.anatensoes2.Hbc)).toFixed(3);
        this.anatensoes2.Sfc2 = this.anatensoes2.Sfc2 * 0.00689476;
        this.ChangeSfc();
      }

      //this.anatensoes2.ac = (parseFloat(this.anatensoes2.Cp) * Math.sqrt((parseFloat(this.tensoes.wt) / (parseFloat(this.entradas.F) * parseFloat(this.anatensoes2.i) * parseFloat(this.pinhao.dp))) * ((parseFloat(this.anatensoes2.Ca) * parseFloat(this.anatensoes2.Cm)) / parseFloat(this.anatensoes2.Cv)) * parseFloat(this.anatensoes2.Cs) * parseFloat(this.anatensoes2.Cf)) * 0.00689476).toFixed(3);
      this.anatensoes2.ac = (parseFloat(this.anatensoes2.Cp) * Math.sqrt((parseFloat(this.tensoes.wt) / (parseFloat(this.entradas.F) * parseFloat(this.anatensoes2.i) * parseFloat(this.pinhao.dp))) * ((parseFloat(this.anatensoes2.Ca) * parseFloat(this.anatensoes2.Cm)) / parseFloat(this.anatensoes2.Cv)) * parseFloat(this.anatensoes2.Cs) * parseFloat(this.anatensoes2.Cf))).toFixed(3);

      this.ChangeFinal();
    },
    ChangeF(event) {
      const f = event.target.value;

      if (f <= this.entradas.M * 16 && f >= this.entradas.M * 8) {
        this.msgErro = false;
      } else if (f > this.entradas.M * 16) {
        this.entradas.F = this.entradas.M * 16;
        this.msgErro = true;
      } else if (f < this.entradas.M * 8) {
        this.entradas.F = this.entradas.M * 8;
        this.msgErro = true;
      }
      this.ChangePinhao();
      this.ChangeSfb();
    },
    ChangeFT() {
      if (this.anatensoes2.FT && this.anatensoes2.FT < 250) {
        this.anatensoes2.Kt = 1;
      } else if (this.anatensoes2.FT != 0) {
        this.anatensoes2.Kt = (460 + parseFloat(this.anatensoes2.FT)) / 620;
      }
      this.ChangeSfb();
    },
    ChangeTO() {
      if (this.Abs.TO && this.Abs.NC) {
        if (this.Abs.TO == 1) this.anatensoes2.Kl = 1.6831 * (Math.pow(this.Abs.NC, -0.0323));
        if (this.Abs.TO == 2) this.anatensoes2.Kl = 1.3558 * (Math.pow(this.Abs.NC, -0.0178));

        this.ChangeSfb();
      }
    },
    ChangeTOS() {
      if (this.Abs.TOS && this.Abs.NCS) {
        if (this.Abs.TOS == 1) this.anatensoes2.CL = 2.4666 * (Math.pow(this.Abs.NCS, -0.056));
        if (this.Abs.TOS == 2) this.anatensoes2.CL = 1.4488 * (Math.pow(this.Abs.NCS, -0.023));

        this.ChangeSfc();
      }
    },
    ChangeType(event) {
      this.ChangeTypeState(event.target.value);
      this.entradas.u = 10;
    },
    ChangeCO() {
      this.anatensoes2.Kr = this.Abs.CF;
      this.ChangeFinal();
    },
    ChangeSfb() {
      if (this.Abs.GR == 1) {
        this.anatensoes2.Sfb = ((parseFloat(this.anatensoes2.Kl)) / (parseFloat(this.anatensoes2.Kt) * parseFloat(this.anatensoes2.Kr))) * parseFloat(this.anatensoes2.Sfb1) ;
      } else if (this.Abs.GR == 2) {
        this.anatensoes2.Sfb = ((parseFloat(this.anatensoes2.Kl)) / (parseFloat(this.anatensoes2.Kt) * parseFloat(this.anatensoes2.Kr))) * parseFloat(this.anatensoes2.Sfb2);
      }

      this.ChangeFinal();
    },
    ChangeSfc() {
      if (this.Abs.GR2 == 1) {
        this.anatensoes2.Sfc = ((parseFloat(this.anatensoes2.CL)) * (parseFloat(this.anatensoes2.Ch)) / (parseFloat(this.anatensoes2.Kt) * parseFloat(this.anatensoes2.Kr))) * parseFloat(this.anatensoes2.Sfc1);
      } else if (this.Abs.GR2 == 2) {
        this.anatensoes2.Sfc = ((parseFloat(this.anatensoes2.CL)) * (parseFloat(this.anatensoes2.Ch)) / (parseFloat(this.anatensoes2.Kt) * parseFloat(this.anatensoes2.Kr))) * parseFloat(this.anatensoes2.Sfc2);
      }

      this.ChangeFinal();
    },
    ChangeFinal() {
      if (this.anatensoes2.Sfb) {
        this.anatensoes2.NBp = (this.anatensoes2.Sfb / this.anatensoes.ab).toFixed(3);
        this.anatensoes2.NBe = (this.anatensoes2.Sfb / this.anatensoes.ab2).toFixed(3);
      }

      if (this.anatensoes2.Sfb && this.anatensoes2.Sfc)
        this.anatensoes2.Nc = (Math.pow(parseFloat(this.anatensoes2.Sfc) / parseFloat(this.anatensoes2.ac), 2)).toFixed(3);
    }

  },
  data() {
    return {
      data: {
        Material: CalcGear.GetMaterial(1),
      },
      saves: [],
      msgErro: false,
      update: 0,
      morePinhao: false,
      moreEngrenagem: false,
      moreCarregamento: false,
      moreAnalise: false,
      moreAnalise2: false,
      CalcGear: Object,
      norma: 1,
      calc: 0,
      Changed: false,
      tooltipSelected: 0,
      first: 0,
      ganho: '1',
    }
  },
  computed: mapGetters(["pinhao", "engrenagem", "entradas", "tensoes", "anatensoes", "Abs", "anatensoes2", "type"]),
}
</script>

<style scoped>

.entradas ion-select {
  padding-left: 0px;
  min-width: 50px;
  text-align: right;
}

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

.popupInfosDs {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: black;
  z-index: 10000;
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
  padding-right: 32px;
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


ion-item {
  pointer-events: visible;
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

.popupInfo {
  display: none !important;
}

.context {
  border: 1px solid var(--ion-color-light-shade);
  padding: 15px;
  margin-top: 20px;
}

.context .flex.entradas:first-child {
  margin-top: 0px;
}

.context .flex.entradas {
  margin-top: 10px;
}

.breve ion-label span, ion-segment-button .breve {
  position: relative;
  top: -7px;
  left: 7px;
  font-size: 8px !important;
  color: #927108 !important;
}

.flex.entradas > * + * {
  margin-left: 15px;
}

.flex.entradas > div > span {
  font-size: 12px;
  color: red;
  margin-top: 8px;
  display: block;
}

.tooltip:before {
  content: '';
  display: block;
  background-image: url('../../public/information.svg');
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
  top: 5px;
}

.tooltip {
  cursor: pointer;
}

.flexSelect {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--ion-item-background, var(--ion-background-color, #fff));
}

.flexSelect ion-item {
  width: 100%;
}

.flexSelect > .info {
  display: block;
  background-image: url('../../public/information.svg');
  width: 15px;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  width: 20px;
  background-size: 15px;
  margin-right: 5px;
  cursor:pointer;
}

@media (prefers-color-scheme: dark) {
  .flexSelect > .info {
    background-image: url('../../public/informationWhite.svg');
  }
}

</style>