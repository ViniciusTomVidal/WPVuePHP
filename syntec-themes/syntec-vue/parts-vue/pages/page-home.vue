<template>
    <div class="animated fadeIn">
            <slidertemplate v-bind:page="this.page"></slidertemplate>
            <categoriatemplate v-if="this.page" v-bind:page="this.page"></categoriatemplate>
            <sobrenostemplate v-if="this.page" v-bind:page="this.page"></sobrenostemplate>
            <eventoenoticiastemplate   v-if="this.page" v-bind:page="this.page"></eventoenoticiastemplate>
            <contatotemplate v-if="this.page" v-bind:page="this.page"></contatotemplate>
    </div>
</template>

<script>
    const $NameComponent$ = {
        template: $NameComponentVar$,
        data: function () {
            return {
                page:'',
            }
        },
        mounted: function () {
            this.fetchBanner();
            document.title = "Página Inicial - %$title$% - %$description$%"
        },
        methods: {
            fetchBanner: function () {
                axios
                    .get('$%url%$/wp-json/page/home')
                    .then(response => {
                            this.page = response.data;
                            console.log(this.page);
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>