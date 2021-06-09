<template>
  <div class="popup">
    <div class="content">
      <h2 style="text-align: center">Seja bem vindo!</h2>
      <div class="container">
        <p>Aplicação destinada à comunidade acadêmica.
          Faça seu login para salvar os dados de cálculo:
        </p>
      </div>
      <div class="buttons">
        <a @click="SignGoogle()">
          <img src="assets/googlePng.png" width="35" height="35">
          Continuar com o Google
        </a>

        <a @click="SignFacebook" class="facebook">
          <img src="assets/facebook.png" width="35" height="35">
          Continuar com o Facebook
        </a>
      </div>
      <p><a @click="WithOutLogin" style="text-align: center;display: block">Continuar sem login</a></p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import "@codetrix-studio/capacitor-google-auth";
import {FacebookLogin, FacebookLoginPlugin} from '@capacitor-community/facebook-login';
import { isPlatform } from '@ionic/vue';
import {Plugins, registerWebPlugin} from '@capacitor/core';
registerWebPlugin(FacebookLogin);

export default {
  components: [isPlatform],
  name: "Modal",
  props: { 
    'modalV' : Boolean
  },
  data () {
    return {
      'amodal':null,
      'fbLogin': FacebookLogin,
      'user' : null,
      'token' : null,
    }
  },
  mounted() {
    this.setupFbLogin();
  },
  methods: {
    async setupFbLogin() {
      if(isPlatform('desktop')) {
          this.fbLogin = FacebookLogin;
      } else {
          const {FacebookLogin } = Plugins;
          this.fbLogin = FacebookLogin;
      }
    },
    SignGoogle() {
     Plugins.GoogleAuth.signIn(null)
          .then((result) => {
            localStorage.user = result.id;
            localStorage.userName = result.displayName;
            localStorage.email = result.email;
            localStorage.dataImgURL = result.imageUrl;
            this.$emit('update:modalV', false);
            this.getDataUri(result.imageUrl, (dataUri) => {
              localStorage.dataImg = dataUri;
            });
          }).catch((error) => {
            console.log(error);
            this.$emit('update:modalV', true);
      });
    },
    async SignFacebook() {

      const FACEBOOK_PERMISSIONS = ['email'];
      const result = await this.fbLogin.login({permissions: FACEBOOK_PERMISSIONS});

      //const provider = new firebase.auth.FacebookAuthProvider();

      if (result.accessToken && result.accessToken.userId) {
        this.token = result.accessToken;
        await this.loadUserData();
      } else if (result.accessToken && !result.accessToken.userId) {
        // Web only gets the token but not the user ID
        // Directly call get token to retrieve it now
        await this.getCurrentToken();
      } else {
        // Login failed
      }

    },
    WithOutLogin() {
      this.$emit('update:modalV', false);
    },
    async getCurrentToken() {
      const result = await this.fbLogin.getCurrentAccessToken();

      if (result.accessToken) {
        this.token = result.accessToken;
        await this.loadUserData();
      } else {
        // Not logged in.
      }
    },
    async loadUserData() {
      const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),email&access_token=${this.token.token}`;
      this.axios.get(url).then((res) => {
        localStorage.user = res.data.id;
        localStorage.userName = res.data.name;
        localStorage.email = res.data.email;
        localStorage.dataImgURL = res.data.picture.data.url;
        this.$emit('update:modalV', false);
        this.getDataUri(localStorage.dataImgURL, (dataUri) => {
          localStorage.dataImg = dataUri;
        });
      });
    },
    getDataUri(url, callback){
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }
  }
}
</script>

<style scoped>

p {
  text-align: center;
}

.buttons {
  margin-top: 20px;
}

.buttons a.facebook {
  background-color: #3f5d94;
  color: white;
}

.buttons a img {
  margin-right: 15px;
}

.buttons a {
  border-radius: 35px;
  display: flex;
  font-weight: 500;
  align-items: center;
  text-decoration: none;
  font-size: 15px;
  padding: 5px 10px;
  background-color: white;
  color: #666666;
  max-width: 270px;
  margin: 5px auto;
}
.buttons a + a {
  margin-top: 10px;
}

.container {
  margin-top: 20px;
}

p {
  margin: 15px 0px;
  line-height: 1.4;
}

h2 {
  margin-top: 0px;
  text-transform: uppercase;
}

.popup {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #0000009e;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
}

.content {
  max-width: 420px;
  width: 85vw;
  padding: 20px;
  background-color: var(--ion-color-dark-contrast);
}
</style>