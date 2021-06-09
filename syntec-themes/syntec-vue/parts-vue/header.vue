<template>
        <header>
            <div class="content">
                <h1 class="logo"><router-link to="/" style="display: block; height: 100%;">Syntec</router-link></h1>
                <div class="menuMob" style="display: none;">
                    <img src="$%url_template%$/assets/imagens/menumobile.png">
                </div>
                <nav>
                    $%menu_header%$
                    <!-- <ul>
                        <li class="hassub">
                            <a href="">PRODUTOS</a>
                            <ul class="submenu">
                                <li class="hassub">
                                    <a href="">Pets</a>
                                    <ul class="submenu">
                                        <li>
                                            <a href="">Anestésicos</a>
                                        </li>
                                        <li>
                                            <a href="">Anti-inflamatórios</a>
                                        </li>
                                        <li>
                                            <a href="">Antibióticos</a></li>
                                        <li>
                                            <a href="">Antiparasitários</a>
                                        </li>
                                        <li>
                                            <a href="">Dermatológicos</a>
                                        </li>
                                        <li>
                                            <a href="">Higiene</a>
                                        </li>
                                        <li>
                                            <a href="">Oftalmológicos</a>
                                        </li>
                                        <li>
                                            <a href="">Otológico</a>
                                        </li>
                                        <li>
                                            <a href="">Suplementos</a>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="">Equinos</a></li>
                                <li><a href="">Animais de Produção</a></li>
                                <li><a href="">Aves</a></li>
                                <li><a href="">Suínos</a></li>
                            </ul>
                        </li>
                        <li v-for="item in this.menu_header" v-if="item.post_parent == 0">
                            <a href="">{{item.title}}</a>
                            <ul class="submenu">
                                <li class="hassub" v-for="item2 in this.menu_header">
                                    <a href="">Pets</a>
                                    <ul class="submenu">
                                        <li>
                                            <a href="">Anestésicos</a>
                                        </li>
                                        <li>
                                            <a href="">Anti-inflamatórios</a>
                                        </li>
                                        <li>
                                            <a href="">Antibióticos</a></li>
                                        <li>
                                            <a href="">Antiparasitários</a>
                                        </li>
                                        <li>
                                            <a href="">Dermatológicos</a>
                                        </li>
                                        <li>
                                            <a href="">Higiene</a>
                                        </li>
                                        <li>
                                            <a href="">Oftalmológicos</a>
                                        </li>
                                        <li>
                                            <a href="">Otológico</a>
                                        </li>
                                        <li>
                                            <a href="">Suplementos</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><router-link to="/news" >Noticias</router-link></li>
                        <li><router-link to="/institucional" >Institucional</router-link></li>
                        <li><a href="">Contato</a></li>

                    </ul>-->
                <ul class="language">
                        <li style="width: 87px;">
                            <div class="combo_idioma" style="position: absolute;top: -15px;"  v-if="this.language === 'pt_BR'">
                                <a href="$%url%$/pb" id="pb" v-on:click.prevent.stop="ChangeLanguage('pb')" class="act"><img src="$%url_template%$/assets/imagens/br.png">PT</a>
                                <a href="$%url%$/en" id="en" v-on:click.prevent.stop="ChangeLanguage('en')" v-bind:class="[language]"><img src="$%url%$/wp-content/plugins/qtranslate-x/flags/gb.png">EN</a>
                                <a href="$%url%$/es"  id="es"   v-on:click.prevent.stop="ChangeLanguage('es')" ><img src="$%url%$/wp-content/plugins/qtranslate-x/flags/es.png">ES</a>
                            </div>
                            <div class="combo_idioma" style="position: absolute;top: -15px;" v-if="this.language === 'en_US'">
                                <a href="$%url%$/en" id="en" class="act" v-bind:class="[language]"><img src="$%url%$/wp-content/plugins/qtranslate-x/flags/gb.png">EN</a>
                                <a href="$%url%$/pb"  id="pb" v-on:click.prevent.stop="ChangeLanguage('pb')"><img src="$%url_template%$/assets/imagens/br.png">PT</a>
                                <a href="$%url%$/es"  id="es"  v-on:click.prevent.stop="ChangeLanguage('es')"><img src="$%url%$/wp-content/plugins/qtranslate-x/flags/es.png">ES</a>
                            </div>
                            <div class="combo_idioma" style="position: absolute;top: -15px;" v-if="this.language === 'es_ES'">
                                <a href="$%url%$/es" id="es"  v-on:click.prevent.stop="ChangeLanguage('es')" class="act"><img src="$%url%$/wp-content/plugins/qtranslate-x/flags/es.png">ES</a>
                                <a href="$%url%$/en" id="en"    v-on:click.prevent.stop="ChangeLanguage('en')" v-bind:class="[language]"><img src="$%url%$/wp-content/plugins/qtranslate-x/flags/gb.png">EN</a>
                                <a href="$%url%$/pb"  id="pb" v-on:click.prevent.stop="ChangeLanguage('pb')"><img src="$%url_template%$/assets/imagens/br.png">PT</a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div class="bgmob">
                </div>
            </div>
        </header>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        data: function () {
            return {
                paged: 1,
                posts: '',
                loading:'',
                loadinsPosts:false,
                language: '$%language%$',
                EN: true,
            }
        },
        mounted: function () {

            $('.combo_idioma').click(function() {
                $(this).toggleClass('act');
            });
            $('.menuMob').click(function() {
                $(this).toggleClass('act');
                $(this).next().slideToggle();
                $('.bgmob').toggleClass('act');
                return false;
            });
            $('.more').click(function() {
                $(this).toggleClass('act');
                $(this).next().next().slideToggle();
                return false;
            });
            $('.filtro .title').click(function() {
                $(this).toggleClass('act');
                $(this).next().slideToggle();
                return false;
            });
        },
        methods: {
            closeMenu: function () {
                if (window.matchMedia('screen and (max-width: 768px)').matches) {
                    $('.menuMob').toggleClass('act');
                    $('nav').slideToggle();
                    $('.bgmob').toggleClass('act');
                }
            },
            ChangeLanguage: function(object) {
                var url = $("#" + object).attr('href');
                var url_site = '$%url%$';
                var current_url = window.location.href;
                var new_current = current_url;
                new_current = new_current.replace(url_site, url);
                window.location.href = new_current;
                return false;
            }
        }
    })

</script>

<style scoped>

</style>