<template>
    <section class="bannerTV" >
        <div class="flexslider" id="bannerTV" v-if="this.page">
            <ul class="slides  animated fadeIn">
                <li v-for="item in this.page.slider">
                    <img class="animated fadeIn" v-bind:src="item.url" />
                </li>
            </ul>
        </div>
        <div class="loading-vue" v-if="!this.loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <a href="#produtos" class="goBottom"><img src="$%url_template%$/assets/imagens/gobottom.png"></a>
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
            this.$nextTick(() => {
                console.log( this.page);
                $('#bannerTV').flexslider({
                    animation: "slide",
                    start: function () {
                        this.loading = 1;
                    }
                });
                $('.goBottom').click(function() {
                    var target = $(this).attr('href');
                    scrollTo(target);
                    return false;
                });
            });
        },
        watch: {
            page:function (value) {
                this.$nextTick(() => {
                    $('#bannerTV').flexslider({
                        animation: "slide",
                        start: function () {

                        }
                    });
                    $('.goBottom').click(function() {
                        var target = $(this).attr('href');
                        scrollTo(target);
                        return false;
                    });
                    $('#bannerTV').imagesLoaded( function() {
                        this.loading = 1;
                    });
                });
            }
        }
    });
</script>

<style scoped>

</style>