<template>
    <section class="carouselNoticias">
        <div class="content">
            <div class="breadcrumb">
                <router-link :to="'/'">Home</router-link> > <span>Notícias</span>
            </div>
            <div class="flexslider carousel" id="sliderNoticias">
                <ul class="slides" v-if="this.posts">
                    <li v-for="item in this.posts" class=" zoomIn animated fadeIn" >
                        <router-link :to="'/news/' + item.post_name">
                            <img v-bind:src="item.thumbnail_url" />
                            <div class="legenda">
                                <h3>{{item.post_title}}</h3>
                                <b>{{item.category_child}}</b>
                                <router-link :to="'/news/' + item.post_name" class="btnBlue">Leia mais</router-link>
                            </div>
                        </router-link>
                    </li>
                    <!-- items mirrored twice, total of 12 -->
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        data: function () {
            return {
                posts: '',
                loading:'',
            }
        },
        mounted:function () {
            this.getPosts();
        },
        watch: {

        },
        methods: {
            loaded: function () {
                this.loading = true;
            },
            getPosts: function () {
                console.log('teste');
                axios
                    .get('$%url%$/wp-json/posts/carousel')
                    .then(response => {
                       this.posts = response.data;
                        this.$nextTick(() => {
                            $('#sliderNoticias').flexslider({
                                animation: "slide",
                                animationLoop: false,
                                itemWidth: 591,
                                itemMargin: 12,
                                minItems: 1,
                                maxItems: 2
                            });
                        });
                    }

                    );
            }

        }
    });
</script>

<style scoped>

</style>