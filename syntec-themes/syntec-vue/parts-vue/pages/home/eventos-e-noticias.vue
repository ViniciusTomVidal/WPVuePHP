<template>
    <section class="eventos">
        <div class="titulo">
            <h2>{{this.page.traducoes.eventos_e_noticias}}</h2>
        </div>
        <ul>
            <li v-for="item in this.posts" class="animated zoomIn">
                <router-link :to="'/news/' + item.post_name">
                    <img v-bind:src="item.thumbnail_url">
                    <div class="texto">
                        <h3>{{item.post_title}}</h3>
                        <p>{{item.post_excerpt}}</p>
                        <router-link :to="'/news/' + item.post_name">Leia mais</router-link>
                    </div>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['page'],
        data: function () {
            return {
                posts: '',
                loading:'',
            }
        },
        mounted:function () {
            this.getPosts();
        },
        methods: {
            getPosts: function () {
                axios
                    .get('$%url%$/wp-json/posts/ultimos')
                    .then(response => {
                            this.posts = response.data;
                            console.log(response.data);
                        }
                    );
            }
        }
    });
</script>

<style scoped>

</style>