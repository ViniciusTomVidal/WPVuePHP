<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Devisor</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Bem vindo ao Devisor - Cálculo de Engrenagens</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Bem vindo ao Devisor - Cálculo de Engrenagens" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  {
  name: 'Tab1',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>