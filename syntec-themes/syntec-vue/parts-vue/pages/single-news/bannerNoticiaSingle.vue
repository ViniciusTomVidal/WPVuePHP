<template>
    <section class="bannerNoticia Single">
        <div class="loading-vue" v-if="!this.loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <img src="$%url%$/wp-content/uploads/2019/09/NOT%C3%8DCIAS.jpg"  v-if="this.loading">
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['news'],
        data: function () {
            return {
                posts: '',
                loading:'',
            }
        },
        mounted:function () {
            console.log(this.news);
        },
        watch: {
          news:function (value) {
              this.$nextTick(() => {
                this.loaded();
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