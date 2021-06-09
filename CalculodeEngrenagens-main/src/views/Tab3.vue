<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Minha conta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Minha conta</ion-title>
        </ion-toolbar>
      </ion-header>
      <Login></Login>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import Login from '@/components/Login.vue';

export default  {
  name: 'Tab3',
  components: { Login, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
}
</script>