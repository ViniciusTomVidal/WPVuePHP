<template>
    <div>
        <section class="pdp animated fadeIn">
            <div class="content">
                <div class="breadcrumb">
                    <span>Você está em: </span>Medicamentos > <router-link :to="'/produtos/' + this.produto.category_child[0]">{{this.produto.category_child_name[0]}}</router-link> >  <router-link v-if="this.produto.category_child_child_name[0]" :to="'/produtos/' + this.produto.category_child[0] + '/' + this.produto.category_child_child[0]">{{this.produto.category_child_child_name[0]}}</router-link>  > <span>{{this.produto.post_title}}</span>
                </div>
                <div class="detalheProd">
                    <div class="imagem">
                        <img :src="this.produto.thumbnail_url">
                    </div>
                    <div class="descricao">
                        <h2>{{this.produto.post_title}}</h2>
                        <div v-html="this.produto.post_content">

                        </div>
                        <div class="indicacao">
                            <b>Indicado para:</b>
                            <img v-for="indicados in this.produto.category_thumbs" v-if="indicados" :src="indicados">
                        </div>
                        <div class="botoes">
                            <a v-if="this.produto.pdf_post_1" :href="this.produto.pdf_post_1" class="pdf" target="_blank">Bula</a>
                            <a v-if="this.produto.pdf_post_2" :href="this.produto.pdf_post_2" class="pdf" target="_blank">Fispq</a>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <div class="boxProdSugeridos">
                <div class="content">
                    <div class="titulo">
                        <h2>Produtos Relacionados</h2>
                    </div>
                    <div class="produtos">
                        <ul>
                           <li v-for="item in this.produto.related">
                               <router-link class="vermais" :to="item.link_url">
                                <div class="selos">
                                    <img v-for="indicados in item.category_thumbs" :src="indicados" v-if="indicados">
                                </div>
                                <div class="imagem">
                                    <img :src="item.thumbnail_url">
                                </div>
                                <div class="descricao">
                                    <h3>{{item.post_title}}</h3>
                                    <router-link class="vermais" :to="item.link_url"><img src="$%url_template%$/assets/imagens/verMais.png"></router-link>
                                </div>
                               </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['produto'],
        data: function () {
            return {
                loaded:'',
                categories:'',
            }
        },
        mounted:function () {
            document.title = this.produto.post_title + " - %$title$% - %$description$%";
        },
        watch: {
            produto:function (value) {
                this.$nextTick(() => {
                    this.loaded();
                });
            },
            $route (to, from){
                this.loaded = false;

            },
            deep: true

        },
        methods: {
            loaded: function () {
                this.loading = true;
            },
            getPet: function (value) {
                return value.includes('pet');
            },
            getEquino: function (value) {
                return value.includes('equinos');
            },
            getProducao: function (value) {
                return value.includes('animais-de-producao');
            }
        }
    });
</script>

<style scoped>

</style>