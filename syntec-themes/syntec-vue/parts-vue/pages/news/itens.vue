<template>
    <section class="noticias">
        <div class="content">
            <ul>
                <li v-for="item in this.posts" class="animated bounceIn">
                    <router-link :to="'/news/' + item.post_name">
                    <div class="imagem">
                            <img v-bind:src="item.thumbnail_url">
                        </div>
                        <div class="info">
                            <div>
                                <h3>{{item.post_title}}</h3>
                            </div>
                            <div>
                                <b>{{item.category_child}}</b>
                                <router-link :to="'/news/' + item.post_name" class="btnBlue">Leia mais</router-link>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        data: function () {
            return {
                paged: 1,
                posts: '',
                loading:'',
                loadinsPosts:false,

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
                    .get('$%url%$/wp-json/posts/all?page=' + this.paged)
                    .then(response => {
                            this.posts = response.data;
                            this.$nextTick(() => {
                                window.onscroll = () => {
                                    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 300) {
                                        if(!this.loadinsPosts) {
                                            this.getPostsInfinit();
                                            this.loadinsPosts = true;
                                        }
                                    }
                                };
                            });
                        }

                    );
            },
            getPostsInfinit: function () {
                this.paged++;
                axios
                    .get('$%url%$/wp-json/posts/all?page=' + this.paged)
                    .then(response => {
                            this.posts.push.apply(this.posts, response.data);
                            this.$nextTick(() => {
                                this.loadinsPosts = false;
                            });
                            console.log(response.data);
                        }

                    );
            }

        }
    });
</script>

<style scoped>

</style>