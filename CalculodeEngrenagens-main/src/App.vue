<template>
  <ion-app>
    <ion-router-outlet />
    <Modal v-if="modalV" v-model:modal-v="this.modalV"></Modal>
  </ion-app>
</template>

<script lang="ts">

import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

import Modal from '@/components/ModalBemVindo.vue'

import { Network } from '@ionic-native/network/ngx';


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Modal
  },
  mounted() {
    if (localStorage.user && localStorage.user != "null") {
      this.modalV = false;
    } else {
      this.modalV = true;
    }
  },
  data() {
    return {
      'modalV': false,
      'user': null,
    }
  }
});
</script>