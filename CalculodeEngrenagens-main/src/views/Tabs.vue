<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="calculator" />
          <ion-label>Calculadora</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="scene3D" href="/tabs/TabScene">
          <ion-icon :icon="cog" />
          <ion-label>3D</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="peopleCircle" />
          <ion-label>Minha conta</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { calculator, home, peopleCircle, cog } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage},
  setup() {
    return {
      home,
      calculator,
      peopleCircle,
      cog
    }
  }
}
</script>