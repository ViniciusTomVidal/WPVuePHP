<template>
  <div id="container">
    <div class="border">
      <img src="assets/conjunto.png" style="max-width: 100%">
      <p>Usuário</p>
      <strong>{{ name }}</strong>
      <p>Aplicação destinada à comunidade acadêmica.</p>
    </div>
    <Colaboradores></Colaboradores>
  </div>
</template>

<script lang="ts">
import Colaboradores from '@/components/Colaboradores.vue';
export default {
  name: 'ExploreContainer',
  components: { Colaboradores },
  props: {
    name: String
  }
}
</script>

<style scoped>
img {
  max-width: 271px;
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
}
#container {
  text-align: left;
  margin:20px;
}
.border {
  border:1px solid var(--ion-color-primary);
  padding: 10px;

}

#container strong {
  margin-top: 13px;
  display: block;
  font-size: 24px;
  line-height: normal;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: var(--ion-color-primary);
  margin: 10px 0;
}

#container a {
  text-decoration: none;
}
</style>