<template>
    <section class="contato">
        <div class="content">
            <div class="titulo">
                <h2>{{this.page.traducoes.contato}}</h2>
                <p v-html="this.page.traducoes.descricao_contato" v-if="this.page.traducoes.descricao_contato"></p>
            </div>
            <form class="form-contato">
                <input type="text" name="name" v-model="nome" placeholder="Seu nome:" required>
                <input type="text" name="email" v-model="email" placeholder="Seu email:" required>
                <input type="phone" name="telefone" v-model="telefone" placeholder="Seu telefone:" required>
                <select required v-model="assunto" required>
                    <option value="" disabled selected>Assunto</option>
                    <option value="Duvida Produto – SAC" >Dúvida Produto – SAC</option>
                    <option value="Sugestao" >Sugestão</option>
                    <option value="Reclamacao" >Reclamação</option>
                    <option value="Distribuidor" >Distribuidor</option>
                    <option value="Outros" >Outros</option>
                </select>
                <textarea placeholder="Sua mensagem:" v-model="mensagem" rows="6" required></textarea>
                <input type="submit" name="" class="btn"  value="Enviar" @click.stop.prevent="enviaContato()">
            </form>
        </div>
    </section>
</template>

<script>
    Vue.component('$NameComponent$', {
        template: $NameComponentVar$,
        props: ['page'],
        data: function () {
            return {
                email:'',
                assunto:'',
                nome:'',
                mensagem:'',
                posts: '',
                loading:'',
                resposta:'',
                telefone:''
            }
        },
        mounted:function () {
        },
        methods: {
            enviaContato: function () {
                $('.btn').val('Carregando...');
                axios
                    .get('$%url%$/wp-json/envia/email?' + 'nome=' + this.nome + '&email=' + this.email + '&assunto=' + this.assunto + '&mensagem=' + this.mensagem + '&telefone=' + this.telefone)
                    .then(response => {
                            this.resposta = response.data;
                            if(this.resposta.msg) {
                                $.alert('Mensagem enviada com sucesso! Aguarde nosso contato!');
                                $('.btn').val('Sucesso!');
                                $('.form-contato').reset();
                            }
                        }
                    );
            }
        }
    });
</script>

<style scoped>

</style>