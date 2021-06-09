<template>
    <div class="animated fadeIn">
            <bannercontatotemplate v-bind:contato="this.contato"></bannercontatotemplate>
            <contatotemplate v-bind:page="this.contato"></contatotemplate>
    </div>
</template>

<script>
    const $NameComponent$ = {
        template: $NameComponentVar$,
        data: function () {
            return {
                contato:'',
            }
        },
        mounted: function () {
            this.fetchBanner();
        },
        methods: {
            fetchBanner: function () {
                axios
                    .get('$%url%$/wp-json/page/contato')
                    .then(response => {
                            this.contato = response.data;
                            console.log(this.contato);
                            document.title = this.contato.traducoes.contato + " - %$title$% - %$description$%"
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>