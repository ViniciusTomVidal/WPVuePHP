<template>
    <div class="animated fadeIn">
            <bannernoticiatemplate v-bind:news="this.news"></bannernoticiatemplate>
            <carouselnoticiatemplate></carouselnoticiatemplate>
            <itensnoticiatemplate ></itensnoticiatemplate>
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
        mounted: function () {
            this.fetchBanner();
        },
        methods: {
            fetchBanner: function () {
                axios
                    .get('$%url%$/wp-json/page/noticias?' + Math.random())
                    .then(response => {
                            this.news = response.data;
                            document.title = this.news.infos.titulo + " - %$title$% - %$description$%"
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>