<template>
  <div>
    <p>Colaboradores</p>
    <ul>
      <li>
        <ion-icon :icon="bookOutline"/>
        <a href="http://lattes.cnpq.br/6218847264452522" target="_blank">Carlos Henrique da Silva</a>
      </li>
      <li>
        <ion-icon :icon="build"/>
        <a href="https://www.linkedin.com/in/thiagobtom/" target="_blank">Thiago Bueno Tom</a>
      </li>
      <li>
        <ion-icon :icon="build"/>
        <a href="https://www.linkedin.com/in/vinicius-leles-de-paulo-17977316b/" target="_blank">Vinicius Leles de Paulo</a>
      </li>
      <li>
        <ion-icon :icon="code"/>
        <a href="https://www.linkedin.com/in/vinicius-tom-vidal-899a0168/" target="_blank">Vinicius Tom Vidal</a>
      </li>
    </ul>
    <div class="content">
      <p>Apoio</p>
      <div class="flex">
        <a href="https://www.linkedin.com/in/lasc-utfpr" target="_blank"><img src="logo-lasc.png" alt=""></a>
        <a href="http://portal.utfpr.edu.br/" target="_blank"><img src="logo-utfpr.png" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script>
import {IonIcon} from "@ionic/vue";
import {bookOutline, home, build, code} from "ionicons/icons";

export default {
  name: "Colaboradores",
  components: {IonIcon},
  setup() {
    return {
      home,
      bookOutline,
      build,
      code
    }
  }
}
</script>

<style scoped>
ul, li {
  list-style: none;
  padding: 0px;
  font-size: 16px;
  color: var(--ion-color-primary);
}

li {
  display: flex;
  align-items: center;
}

li ion-icon {
  font-size: 20px;
  margin-right: 10px;
}

li + li {
  margin-top: 14px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.flex img {
  max-width: 160px;
  margin: 10px;
}

.flex > img + img {
  background-color: white;
  padding: 10px 15px;
}
</style>