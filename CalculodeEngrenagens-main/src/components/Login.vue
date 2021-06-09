<template>
  <div class="options">
    <div class="content Logged" v-if="Logged">
      <div class="flex img">
        <img :src="dataImg" alt="Profile IMG" width="96" height="96">
      </div>
      <div class="flex infos">
        <p>{{userName}}</p>
        <p style="font-size: 14px;margin-top: 0px">{{email}}</p>
      </div>
      <div class="buttons">
        <button>Meus cálculos</button>
        <button>Política de privacidade</button>
        <button @click="Sair">Sair</button>
      </div>
    </div>
    <div class="content notLogged" v-if="!Logged">
      <h1>Faça seu login :)</h1>
      <p style="font-size: 15px;">Você pode registar seus cálculos<br>para pode utiliza-los depois.</p>
      <div class="buttons">
        <a @click="SignGoogle">
          <img src="assets/googlePng.png" width="35" height="35">
          Continuar com o Google
        </a>

        <a @click="SignFacebook" class="facebook">
          <img src="assets/facebook.png" width="35" height="35">
          Continuar com o Facebook
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {IonButton, alertController, isPlatform} from '@ionic/vue';
import { defineComponent } from 'vue';
import firebase from 'firebase';
import {FacebookLogin} from "@capacitor-community/facebook-login";
import {Plugins, registerWebPlugin} from "@capacitor/core";
registerWebPlugin(FacebookLogin);


export default {
components: [isPlatform],
name: "Login",
  data() {
    return{
      dataImg:null,
      userName:null,
      Logged:false,
      'fbLogin': FacebookLogin,
      'user' : null,
      'token' : null,
    }
  },
  mounted() {
    this.setupFbLogin(); 
    if(localStorage.user && localStorage.user != "false") {
      this.Logged = true;
      this.dataImg = localStorage.dataImgURL;
      this.userName = localStorage.userName;
      this.email = localStorage.email;
    } else {
      this.setupFbLogin();
    }
  },
  methods: {
    async Sair() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: 'Ahhh :(',
            message: 'Tem certeza que deseja sair?',
            buttons: [
              {
                text: 'Não',
                role: 'cancel',
                cssClass: 'secondary',
                handler: blah => {
                  console.log('Confirm Cancel:', blah)
                },
              },
              {
                text: 'Sim',
                handler: () => {
                  this.Logged = false;
                  localStorage.user = null;
                  localStorage.userName = null;
                  localStorage.email = null;
                  localStorage.dataImg = null;
                  localStorage.dataImgURL = null;
                },
              },
            ],
          });
      return alert.present();
    },
    async CheckData() {
      this.Logged = true;
      this.dataImg = localStorage.dataImgURL;
      this.userName = localStorage.userName;
      this.email = localStorage.email;
    },
    async setupFbLogin() {
      if(isPlatform('desktop')) {
        this.fbLogin = FacebookLogin;
      } else {
        const { FacebookLogin } = Plugins;
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
            this.CheckData();
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
      console.log('result', result);

      if (result.accessToken && result.accessToken.userId) {
        this.token = result.accessToken;
        this.$emit('update:modalV', false);
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
        this.CheckData();
        this.getDataUri(localStorage.dataImgURL, (dataUri) => {
          localStorage.dataImg = dataUri;
        });
        this.$emit('update:modalV', false);
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

  .options {
    height: 100%;
  }

  .content {
    padding: 20px;
  }

  .img {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .buttons {
    margin-top: 40px;
  }

  p {
    text-align: center;
    font-size: 18px;
    margin: 5px;
  }

  button {
    font-size: 16px;
    padding: 10px 20px;
    display: block;
    margin: 15px auto;
    width: 250px;
  }

  .buttons {
    width: 100%;
    justify-content: center;
  }

  .img img {
    max-width: 96px;
    border-radius: 50%;
  }

  .infos {
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .notLogged .buttons {
    margin-top: 20px;
  }

  .notLogged .buttons a.facebook {
    background-color: #3f5d94;
    color: white;
  }

  .notLogged .buttons a img {
    margin-right: 15px;
  }

  .notLogged .buttons a {
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

  .notLogged .buttons a + a {
    margin-top: 10px;
  }
</style>