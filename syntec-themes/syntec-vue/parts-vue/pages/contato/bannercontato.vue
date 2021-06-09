<template>
    <section class="bannerNoticia contact">
        <div class="loading-vue" v-if="!this.loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <img v-if="this.contato" v-bind:src="this.contato.contato.imagem_banner">
        <div class="content">
            <div class="texto" v-if="this.contato.contato">
                <div class="titulo">
                    <h2 style="display: block; max-width: 360px; margin: 0 auto;">{{this.contato.contato.titulo}}</h2>
                </div>
                <div style="text-align: center;" v-html="this.contato.contato.descricao">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['contato'],
        data: function () {
            return {
                posts: '',
                loading:'',
            }
        },
        mounted:function () {
        },
        watch: {
          contato:function (value) {
              console.log(value);
              this.$nextTick(() => {
                this.loaded();
              });
          },
            deep: true

        },
        methods: {
            loaded: function () {
                this.loading = true;
            },

        }
    });
</script>

<style scoped>

</style>