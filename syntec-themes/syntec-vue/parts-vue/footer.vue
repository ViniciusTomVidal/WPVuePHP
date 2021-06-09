<template>

    <footer>

        <div class="content">

            <div class="line1">

                <p>Entre em contato</p>

                <ul class="language">

                    <li style="width: 87px;position: relative">

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

            </div>

            <div class="line2">

                <div>

                    <router-link to="/" style="display: inline-block; ">

                        <img src="$%url_template%$/assets/imagens/logo.png" class="logo">

                    </router-link>

                    <div class="end" style="    display: inline-block;">

                        <h3>Endereço</h3>

                        <p>Av. Andrômeda, 885<br>Green Valley Alphaville - Barueri SP<br>Edifício Brascan Century Plaza,<br>Torre A, 15º Andar</p>

                    </div>

                </div>

                <div class="end">

                    <h3>Contato</h3>

                    <p>Tel.: 11 4702-5425</p>

                </div>

                <div>

                    <h3>Redes sociais</h3>

                    <ul>

                        <li><a href="https://www.facebook.com/syntecdobrasil/" target="_blank"><img src="$%url_template%$/assets/imagens/facebook.png"></a></li>

                        <li><a href="https://www.instagram.com/syntecdobrasil/" target="_blank"><img src="$%url_template%$/assets/imagens/instagram.png"></a></li>

                        <li><a href="https://www.youtube.com/channel/UCCtRtDmk9n2rc-tx48qJcKw" target="_blank"><img src="$%url_template%$/assets/imagens/youtube.png"></a></li>

                    </ul>

                </div>

            </div>

        </div>

        <div class="copyright">

            <p>@2019 - Todos os direitos reservados</p>

        </div>

    </footer>

</template>



<script>

    Vue.component('$NameComponent$', {

        template: $NameComponentVar$,

        data: function () {

            return {

                language: '$%language%$',

                EN: true,

            }

        },

        methods: {

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