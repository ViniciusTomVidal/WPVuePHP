<template>
    <div>
        <footer>
            <div class="container container-footer py-4">
                <div class="row">
                    <div class="col-12 col-sm-4 col-lg-3">
                        <img :src="$inertia.page.props.subFolder + 'assets/images/logo-bemtequero.png'" class="img-fluid" alt="">
                    </div>

                    <div class="col-12 col-sm-8 col-lg-6 px-3 mb-3">
                        <p class="text-white">Quando se fala em doação sempre vem a cabeça doar algo material, grandioso, mas pequenos gestos também são importantes e podem fazer a diferença para alguém. Uma boa conversa, escutando genuinamente, estendendo a mão para ajudar alguém, são atitudes que podem fazer toda a diferença. Por isso, penso que “todos” podemos doar algo; basta querer.</p>
                        <img :src="$inertia.page.props.subFolder + 'assets/images/divisoria-footer.png'" alt="" class="img-fluid">
                    </div>

                    <div class="col-12 col-lg-3 pb-4">
                        <div class="mb-4 text-center text-lg-end">
                            <h6 class="text-white">entre em contato</h6>
                            <a href="mailto:contato@bemquetequero.org">contato@bemquetequero.org</a>
                        </div>

                        <div class="d-flex justify-content-center justify-content-lg-end">
                            <a class="icon-social" href="http://facebook.com/obemquetequero" target="_blank">
                                <img src="assets/images/ico-facebook.svg" alt="">
                            </a>

                            <a class="icon-social" href="http://instagram.com/bem_que_te_quero" target="_blank">
                                <img src="assets/images/ico-instagram.svg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bottom-footer">
                <div class="container text-center text-white">
                    <h6>bemquetequero   (c) luizalves </h6>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>

</style>
