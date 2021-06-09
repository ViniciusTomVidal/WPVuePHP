<template>
    <div>
        <div class="loading-vue" v-if="!this.loaded" style="position: fixed;top:0px;left:0px;    background-color: rgb(214, 214, 214);z-index: 100000000">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <bannervitrinetemplate v-bind:pageprodutos="this.pageprodutos" v-if="!this.isProduct"></bannervitrinetemplate>
        <section class="vitrine" v-if="!this.isProduct">
            <div class="content" v-if="this.pageprodutos">
                <div class="titulo">
                    <h2><img :src="this.img_title">{{this.pageprodutos.traducoes.produtos_para}} {{this.title}}</h2>
                </div>
                <div class="breadcrumb">
                    <router-link to="/" >Home</router-link> > <span>Produtos para {{ this.title }}</span>
                </div>
            </div>
            <div class="boxProd">
                <div class="content">
                    <div class="filtro">
                        <div class="line">
                            <span class="title">Pesquisar Produtos</span>
                            <div class="search">
                                <input type="text" v-on:change="getSearch()" name="search" id="search" v-model="searchInput">
                                <a v-on:click="getSearch();"><img src="$%url_template%$/assets/imagens/btnPesquisar.png"></a>
                            </div>
                        </div>
                        <div class="line">
                            <span class="title">Para</span>
                            <ul>
                                <li v-for="item in this.categories.produtos">
                                    <router-link :to="'/produtos/' + item.slug">{{item.name}}</router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="line">
                            <span class="title">Categorias</span>
                            <ul>
                                <li v-for="item in this.categories.nivel1"><router-link :to="'/produtos/'+ $route.params.slug + '/' + item.slug">{{item.name}}</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="produtos" v-if="this.produtos">
                        <p style="font-size: 25px; text-align: center; margin-bottom: 30px;" v-if="this.search">Resultados de busca para: {{this.search}}</p>
                        <a v-if="this.pageprodutos.baixar_doses_url" data-id="novo" :href="this.pageprodutos.baixar_doses_url" target="_blank" style="display: block; text-align: center; margin: 30px auto; padding: 7px 10px; max-width: 200px; background: #00a389; color: white; font-size: 19px; border-radius: 7px; margin-top: -5px; " class="btn">Baixar doses</a>
                        <ul>
                            <li v-for="item in this.produtos" class="animated zoomIn">
                                <router-link :to="item.link_url" class="vermais">
                                    <div class="selos">
                                        <img v-for="indicados in item.category_thumbs" :src="indicados" v-if="indicados">
                                    </div>
                                    <div class="imagem">
                                        <img :src="item.thumbnail_url">
                                    </div>
                                    <div class="descricao">
                                        <h3>{{item.post_title}}</h3>
                                        <router-link :to="item.link_url" class="vermais">
                                            <img src="$%url_template%$/assets/imagens/verMais.png">
                                        </router-link>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                        <div v-if="this.produtos.length == 0 && this.loaded == true">
                            <p>Não há produtos disponíveis para esta pesquisa ou seção</p>
                        </div>
                    </div>
                   <!-- <ul class="pagination">
                        <li class="act"><a href="">1</a></li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a href="">4</a></li>
                        <li class="next"><a href=""><img src="imagens/next.png"></a></li>
                    </ul> -->
                </div>
            </div>
        </section>
        <produtosingletemplate v-bind:produto="this.produto" v-if="this.isProduct"></produtosingletemplate>
    </div>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['pageprodutos'],
        data: function () {
            return {
                posts: '',
                produtos: [],
                loaded:false,
                categories:'',
                title:'',
                searchInput: '',
                isProduct: false,
                paged: 1,
                loadinsPosts:false,
                produto: '',
                search: '',
                img_title: '',
            }
        },
        mounted:function () {
            this.fetchCategories();
            if(this.$route.params.slug) {
                this.fetchCategoria();
                this.getPosts();
            }
        },
        watch: {
            pageprodutos:function (value) {

            },
            produto: function (value) {
                this.$nextTick(() => {
                    if(value.length > 0)
                        this.loaded = true;

                });
            },
            produtos: function (value) {
                this.$nextTick(() => {
                   if(value.length > 0)
                    this.loaded = true;

                });
            },
            $route (to, from){
                this.searchInput = '';
                this.search = '';
                this.isProduct = false;
                this.loaded = false;
                this.produtos = [];
                this.paged = 1;
                this.fetchCategories();
                this.fetchCategoria();
                this.getPosts();
            },
            deep: true

        },
        methods: {
            loaded: function () {
                this.loading = true;
            },
            fetchCategories: function () {
                axios
                    .get('$%url%$/wp-json/categories/' + this.$route.params.slug)
                    .then(response => {
                            this.categories = response.data;
                        }
                    );
            },
            fetchCategoria: function() {
                this.loaded = 0;
                axios
                    .get('$%url%$/wp-json/categorie/' + this.$route.params.slug)
                    .then(response => {
                            this.title = response.data.name;
                            this.img_title = response.data.icone_para_pagina_da_categoria;
                            document.title = this.title+" - %$title$% - %$description$%";
                        }
                    );
            },
            checkCategoryOrProduct: function () {

            },
            getPosts: function () {
                this.loaded = false;
                if(!this.$route.params.categoria) {
                    axios
                        .get('$%url%$/wp-json/produtos/' + this.$route.params.slug + '?search=' + this.searchInput)
                        .then(response => {
                                this.produtos = response.data.items;
                                this.$nextTick(() => {
                                    window.onscroll = () => {
                                        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 300) {
                                            if (!this.loadinsPosts) {
                                                this.getPostsInfinit();
                                                this.loadinsPosts = true;
                                            }
                                        }
                                    };
                                });
                            }
                        );
                }
                else {
                    this.loaded  = false;
                    axios
                        .get('$%url%$/wp-json/produtos/' + this.$route.params.categoria + '?search=' + this.search)
                        .then(response => {
                                if(!response.data.isProduct) {
                                    this.produtos = response.data.items;
                                }
                                else {
                                    this.produto = response.data.item;
                                    this.isProduct = true;
                                    this.loaded  = true;
                                }
                                this.$nextTick(() => {
                                    window.onscroll = () => {
                                        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 300) {
                                            if (!this.loadinsPosts) {
                                                this.getPostsInfinit();
                                                this.loaded = true;
                                            }
                                        }
                                    };
                                });
                            }
                        );
                }
            },
            getPostsInfinit: function () {
                this.paged++;
                if(!this.$route.params.categoria) {
                    axios
                        .get('$%url%$/wp-json/produtos/' + this.$route.params.slug + '?page=' + this.paged + '&search=' +this.search)
                        .then(response => {
                                this.produtos.push.apply(this.produtos, response.data.items);
                                this.$nextTick(() => {
                                    this.loadinsPosts = false;
                                    this.loaded = true;
                                });
                                console.log(response.data);
                            }
                        );
                }
                else {
                    axios
                        .get('$%url%$/wp-json/produtos/' + this.$route.params.categoria + '?page=' + this.paged + '&search=' +this.search)
                        .then(response => {
                                this.produtos.push.apply(this.produtos, response.data);
                                this.$nextTick(() => {
                                    this.loadinsPosts = false;
                                });
                                console.log(response.data);
                            }
                        );
                }
            },
            getPet: function (value) {
                return value.includes('pet');
            },
            getEquino: function (value) {
                return value.includes('equinos');
            },
            getProducao: function (value) {
                return value.includes('animais-de-producao');
            },
            getSearch: function () {
                this.loading = true;
                this.search = this.searchInput;
                console.log(this.search );
                this.getPosts();
            }

        }
    });
</script>

<style scoped>

</style>