<template>
    <section class="categorias animated fadeIn" id="produtos">
        <div class="content">
            <div class="titulo">
               <h2>{{this.page.traducoes.nossos_produtos}}</h2>
            </div>
            <ul>
                <li>
                    <router-link to="/produtos/pet">
                        <img src="$%url_template%$/assets/imagens/gatop.png">
                        <div class="info">PETS</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/produtos/equinos">
                        <img src="$%url_template%$/assets/imagens/cavalop.png">
                        <div class="info">Equinos</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/produtos/animais-de-producao">
                        <img src="$%url_template%$/assets/imagens/ovelhap.png">
                        <div class="info">Animais de produção</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/produtos/aves">
                        <img src="$%url_template%$/assets/imagens/cacatuap.png">
                        <div class="info">Aves</div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/produtos/suinos">
                        <img src="$%url_template%$/assets/imagens/porcop.png">
                        <div class="info">Suínos</div>
                    </router-link>
                </li>
            </ul>
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
        watch: {}
    });
</script>

<style scoped>

</style>