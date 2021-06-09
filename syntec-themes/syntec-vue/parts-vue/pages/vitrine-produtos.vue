<template>
    <div class="animated fadeIn">
        <div class="loading-vue" v-if="!this.pageprodutos" style="position: fixed;top:0px;left:0px;    background-color: rgb(214, 214, 214);z-index: 100000000">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <listprodutostemplate v-bind:pageprodutos="this.pageprodutos"></listprodutostemplate>
    </div>
</template>

<script>
    const $NameComponent$ = {
        template: $NameComponentVar$,
        data: function () {
            return {
                pageprodutos:'',
            }
        },
        mounted: function () {
            this.fetchBanner();
        },
        watch: {
            $route (to, from){
            },
        },
        methods: {
            fetchBanner: function () {
                axios
                    .get('$%url%$/wp-json/page/produtos/?v2')
                    .then(response => {
                            this.pageprodutos = response.data;
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>