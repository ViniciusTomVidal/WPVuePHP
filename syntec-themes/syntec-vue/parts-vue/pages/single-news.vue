<template>
    <div class="animated fadeIn">
        <bannernoticiasingletemplate v-bind:news="this.news"></bannernoticiasingletemplate>
        <section class="detalhenoticia">
            <div class="content" v-if="this.news">
                <div class="breadcrumb">
                    <router-link :to="'/'">Home</router-link> > <span>Notícias</span>
                </div>
                <div class="detalhe">
                    <div class="compartilhar">
                        <ul>
                            <li><a href=""><img src="$%url_template%$/assets/imagens/like.png"></a></li>
                            <li><a href=""><img src="$%url_template%$/assets/imagens/facebook.png"></a></li>
                            <li><a href=""><img src="$%url_template%$/assets/imagens/twitter.png"></a></li>
                            <li><a href=""><img src="$%url_template%$/assets/imagens/linkedin.png"></a></li>
                        </ul>
                    </div>
                    <h2>{{this.news.post_title}}</h2>
                    <div class="postagem">

                        <span v-html="this.news.post_date"></span> <span>{{this.news.category_child}}</span>
                    </div>
                    <div class="conteudo galeria" v-if="this.news.galeria">
                        <h3>Galeria de fotos</h3>
                        <div id="animated-thumbnials">
                            <a :href="gallery.sizes.medium" v-for="gallery in this.news.galeria">
                                <img :src="gallery.sizes.medium" />
                            </a>
                        </div>
                    </div>
                    <div class="conteudo"  v-html="this.news.post_content">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    const $NameComponent$ = {
        template: $NameComponentVar$,
        data: function () {
            return {
                news:'',
            }
        },
        watch: {
            news:function (value) {
                this.$nextTick(() => {
                    if(value.galeria) {
                        $("#animated-thumbnials").lightGallery();
                    }
                });
            },
        },
        mounted: function () {
            $('html').scrollTop();
            this.fetchPost();
        },
        methods: {
            fetchPost: function () {
                axios
                    .get('$%url%$/wp-json/news/' + this.$route.params.slug)
                    .then(response => {
                            this.news = response.data;
                            console.log(   this.news);
                            document.title = this.news.post_title + " - %$title$% - %$description$%";

                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>