<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Visualização 3D
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <SceneDrGoogle3D></SceneDrGoogle3D>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import SceneDrGoogle3D from "@/components/SceneDrGoogle3D.vue";

export default  {
  name: 'TabScene',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, SceneDrGoogle3D},
}
</script>