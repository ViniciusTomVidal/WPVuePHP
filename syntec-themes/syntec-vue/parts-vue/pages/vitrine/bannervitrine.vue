<template>
    <section class="bannerVitrine">

        <img v-if="this.pageprodutos" :src="this.pageprodutos.banner_principal.sizes.large">
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['pageprodutos'],
        data: function () {
            return {
                posts: '',
                loading:'',
            }
        },
        mounted:function () {
            console.log(this.pageprodutos);
        },
        watch: {
            pageprodutos:function (value) {
                this.$nextTick(() => {
                    this.loading = true;
                    console.log(value);
                });
            },
            deep: true

        },
        methods: {
            loaded: function () {
                this.loading = true;
            },

        }
    });
</script>

<style scoped>

</style>