<template>
    <section class="bannerNoticia animated fadeIn">
        <div class="loading-vue" v-if="!this.loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <img v-if="this.news" v-bind:src="this.news.imagem_noticia">
        <div class="content">
            <div class="texto" v-if="news">
                <div class="titulo">
                    <h2>{{this.news.infos.titulo}}</h2>
                </div>
                <div v-html="this.news.infos.descricao">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['news'],
        data: function () {
            return {
                posts: '',
                loading:'',
            }
        },
        mounted:function () {
            console.log(this.news);
        },
        watch: {
          news:function (value) {
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