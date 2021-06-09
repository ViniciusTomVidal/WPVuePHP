import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { Network } from '@ionic-native/network/ngx';

import store from './store';


import axios from 'axios'
import VueAxios from 'vue-axios'

import firebase from 'firebase';


/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyBFc8vTr2zE959lMN3FqLrfsPaQbhW6Z2A",
  authDomain: "calculodeengrenagens.firebaseapp.com",
  projectId: "calculodeengrenagens",
  storageBucket: "calculodeengrenagens.appspot.com",
  messagingSenderId: "857736696611",
  appId: "1:857736696611:web:fcb1fc3cc3047f9be8f296",
  measurementId: "G-C5W936EZGY"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  .use(VueAxios, axios)


router.isReady().then(() => {
  app.mount('#app');
});

