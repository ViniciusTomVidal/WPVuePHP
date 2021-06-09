<template>
    <div>
        <Header></Header>
        <section class="wrap position-relative">
            <div class="container">
                <form class="login-box border border-secondary" @submit.prevent="handleForm" method="post"
                      action="/bemquetequero/login">
                    <h4 class="mb-4 text-center">Entrar</h4>

                    <div class="form-group mb-4">
                        <label for="">E-mail</label>
                        <input type="text" class="input--text" v-model="form.email" required>
                    </div>

                    <div class="form-group mb-5 position-relative">
                        <label for="">Senha</label>
                        <input type="password" class="input--text" v-model="form.password" required>
                        <span v-if="$inertia.page.props.flash.error" class="mb-2"
                              style="color: red;display: block;position: absolute;bottom: -35px;font-size: 14px">
                                {{ $inertia.page.props.flash.error }}
                        </span>
                    </div>

                    <div class="flex mt-2">
                        <button type="submit" class="btn__raised">Entrar</button>
                    </div>
                    <div class="flex mt-4" style="bottom: 50px; left: 0px;align-items: center;">
                        <div class="background animate__flipInX animate__animated">
                            <label for="" style="font-size: 12px;color: white;margin-right: 5px;font-weight: 500">Feito
                                com:</label>
                            <a href="https://vuejs.org/" target="_blank">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png"
                                    alt="" style="max-height: 20px">
                            </a>
                            <a href="https://laravel.com/" target="_blank">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png"
                                    alt="" style="max-height: 25px" class="ml-2">
                            </a>
                        </div>
                    </div>
                </form>
            </div>
            <div class="copyright">@2021 - TODOS OS DIREITOS RESERVADOS CRIAÇÃO E DESENVOLVIMENTO - CHLEBA AGÊNCIA
                DIGITAL
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
    name: "Painel",
    components: {Header, Footer},
    props: {
        errors: Object,
    },
    data: () => {
        return {
            form: {
                email: null,
                password: null,
            }
        }
    },
    methods: {
        handleForm() {
            this.$inertia.post(this.$inertia.page.props.subFolder + 'login', this.form,
                {
                    preserveScroll: (page) => true,
                }
            );
        }
    }
}
</script>
<style>
body {
    background-color: black;
}
</style>
<style scoped>
.logo {
    max-width: 260px;
    margin: 0 auto;
    display: block;
    filter: invert(1);
}

.flex {
    display: flex;
    justify-content: center;
    width: 100%;
}

.copyright {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: calc(100vw - 40px);
    padding: 3px;
    font-size: 11px;
    text-align: center;
    background-color: #07070745;
    color: white;
}

.absolute {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    opacity: 0.7;
}

.body.flex {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
}

.login {
    padding: 20px;
    max-width: 300px;
    width: 100%;
    border-radius: 8px;
    background-color: rgb(34 34 34 / 79%);
    box-shadow: 0px 10px 20px 0px rgb(255 255 255 / 38%);
}

.background a img {
    transition: all ease-in-out 300ms;
    filter: invert(0);
}

.background a:hover img {
    filter: invert(1);
}

.background {
    background-color: #07070745;
    padding: 8px;
}
</style>
