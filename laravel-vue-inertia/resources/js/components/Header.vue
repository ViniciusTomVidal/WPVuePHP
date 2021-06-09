<template>
    <section>
        <header>
            <div class="container">
                <div class="row">
                    <div class="col-7 col-md-4">
                        <a href="#">
                            <img :src="$inertia.page.props.subFolder + '/assets/images/logo-bemtequero.png'" alt="" class="img-fluid">
                        </a>
                    </div>

                    <div class="col-5 col-md-8 d-flex justify-content-end align-items-center">
                        <div class="abrir-menu js-menu-mobile d-block d-sm-none">
                            <i class="mdi mdi-menu"></i>
                        </div>

                        <ul class="list-menu-header d-none d-sm-block">
                            <li><a href="https://bemquetequero.org/">home</a></li>
                            <li><a href="https://bemquetequero.org/campanhas">campanhas</a></li>
                            <li><a href="https://bemquetequero.org/outras-acoes">outras ações</a></li>
                            <li><a class="active" href="https://bemquetequero.org/contato">contato</a></li>
                        </ul>
                    </div>
                </div>

                <img :src="$inertia.page.props.subFolder + '/assets/images/banner-destaque.jpg'" class="img-fluid" />
            </div>
        </header>
        <div class="menu-mobile">
            <div class="close js-menu-mobile">
                <i class="mdi mdi-close"></i>
            </div>
            <ul>
                <li><a href="https://bemquetequero.org/">home</a></li>
                <li><a href="https://bemquetequero.org/campanhas">campanhas</a></li>
                <li><a href="https://bemquetequero.org/outras-acoes">outras ações</a></li>
                <li><a class="active" href="https://bemquetequero.org/contato">contato</a></li>
            </ul>
        </div>
        <div class="overlay js-menu-mobile"></div>
    </section>
</template>

<script>
export default {
    name: "Header",
    mounted() {
        $('.js-admin-mobile').on('click', function(){
            $('.lista-menu-admin').slideToggle();
        })
    },
}
</script>

<style scoped>

</style>
