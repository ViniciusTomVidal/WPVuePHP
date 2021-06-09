<template>
    <section class="sobrenos">
        <div class="content">
            <div class="titulo">
                <h2>{{page.sobre_nos.label_do_bloco}}</h2>
            </div>
            <div class="textoImagem">
                <div v-if="page" class="animated fadeIn" v-html="page.sobre_nos.descricao">
                </div>
                <div class="imagem animated fadeIn" v-if="page" >
                    <img v-bind:src="page.sobre_nos.imagem">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['page'],
        data: function () {
            return {
                loading:'',
            }
        },
        mounted:function () {

        },
        watch: {

        }
    });
</script>

<style scoped>

</style>