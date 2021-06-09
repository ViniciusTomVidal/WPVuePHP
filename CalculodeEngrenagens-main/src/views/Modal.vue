<template>
  <ion-header>
    <ion-toolbar>

      <div class="flex">
        <ion-title>Informações</ion-title>
        <ion-button @click="closeModal">Fechar</ion-button>
      </div>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding" v-html="html">
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  modalController,
} from "@ionic/vue";
import {defineComponent} from "vue";
import axios from "axios";

export default defineComponent({
  name: "Modal",
  components: {IonContent, IonHeader, IonTitle, IonToolbar, IonButton},
  props: ['data'],
  data() {
    return {
      html:"",
    }
  },
  mounted() {
    axios.get("/popup/"+this.data+".html").then(response => {
        this.html = response.data;
    })
  },
  setup() {
    const closeModal = () => {
      modalController.dismiss();
    };

    return {closeModal};
  },
});
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
}

img {
  min-width: 200px;
}
</style>