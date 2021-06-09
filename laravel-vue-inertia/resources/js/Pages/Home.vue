<template>
    <div>
        <Header></Header>
        <section class="wrap">
            <div class="container">
                <h1 class="mb-5">Cadastro de moradores</h1>

                <div class="row">
                    <div class="col-12 col-md-7 mb-3">
                        <div class="form-group">
                            <label for="">Nome completo</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>

                    <div class="col-12 col-md-3 mb-3">
                        <div class="form-group">
                            <label for="">Data de Nascimento</label>
                            <input type="text" class="input--text js-datepicker js-mask-date"
                                   data-referencia="input-idade">
                        </div>
                    </div>

                    <div class="col-12 col-md-2 mb-3">
                        <div class="form-group">
                            <label for="">Idade</label>
                            <input type="text" class="input--text" id="input-idade" readonly value="">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">CPF</label>
                            <input type="text" class="input--text js-mask-cpf">
                        </div>
                    </div>

                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">RG</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>

                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">NIS</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">Nacionalidade</label>
                            <select name="" class="select--form js-select-nacionalidade">
                                <option value="">Selecione</option>
                                <option value="Brasileiro">Brasileiro</option>
                                <option value="Estrangeiro">Estrangeiro</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-12 col-md-4 mb-3 d-none" id="bloco-pais">
                        <div class="form-group">
                            <label for="">País</label>
                            <select name="" class="select--form js-select-paises"></select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">Naturalidade</label>
                            <select name="" class="select--form">
                                <option value="">Selecione</option>
                                <option value="AC">Acre (AC)</option>
                                <option value="AL">Alagoas (AL)</option>
                                <option value="AP">Amapá (AP)</option>
                                <option value="AM">Amazonas (AM)</option>
                                <option value="BA">Bahia (BA)</option>
                                <option value="CE">Ceará (CE)</option>
                                <option value="DF">Distrito Federal (DF)</option>
                                <option value="ES">Espírito Santo (ES)</option>
                                <option value="GO">Goiás (GO)</option>
                                <option value="MA">Maranhão (MA)</option>
                                <option value="MT">Mato Grosso (MT)</option>
                                <option value="MS">Mato Grosso do Sul (MS)</option>
                                <option value="MG">Minas Gerais (MG)</option>
                                <option value="PA">Pará (PA)</option>
                                <option value="PB">Paraíba (PB)</option>
                                <option value="PR">Paraná (PR)</option>
                                <option value="PE">Pernambuco (PE)</option>
                                <option value="PI">Piauí (PI)</option>
                                <option value="RJ">Rio de Janeiro (RJ)</option>
                                <option value="RN">Rio Grande do Norte (RN)</option>
                                <option value="RS">Rio Grande do Sul (RS)</option>
                                <option value="RO">Rondônia (RO)</option>
                                <option value="RR">Roraima (RR)</option>
                                <option value="SC">Santa Catarina (SC)</option>
                                <option value="SP">São Paulo (SP)</option>
                                <option value="SE">Sergipe (SE)</option>
                                <option value="TO">Tocantins (TO)</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">Cidade natal</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">Estado civil</label>
                            <select name="" class="select--form">
                                <option value="">Selecione</option>
                                <option value="">Solteiro(a)</option>
                                <option value="">Casado(a)</option>
                                <option value="">Divorciado(a)</option>
                                <option value="">Viúvo(a)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-8 mb-3">
                        <div class="form-group">
                            <label for="">Nome da mãe</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-8 mb-3">
                        <div class="form-group">
                            <label for="">Nome do pai</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6 mb-3">
                        <div class="form-group">
                            <label for="">Você se considera</label>
                            <select name="" class="select--form">
                                <option value="">Selecione</option>
                                <option value="">Preto</option>
                                <option value="">Branco</option>
                                <option value="">Indígena</option>
                                <option value="">Pardo</option>
                                <option value="">Amarelo/Asiático</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-12 col-md-6 mb-3">
                        <div class="form-group">
                            <label for="">Escolaridade</label>
                            <select name="" class="select--form">
                                <option value="Selecione">Selecione</option>
                                <option value="Ensino fundamental incompleto">Ensino fundamental incompleto</option>
                                <option value="Ensino fundamental completo">Ensino fundamental completo</option>
                                <option value="Ensino médio incompleto">Ensino médio incompleto</option>
                                <option value="Ensino médio completo">Ensino médio completo</option>
                                <option value="Ensino superior incompleto">Ensino superior incompleto</option>
                                <option value="Ensino superior completo">Ensino superior completo</option>
                                <option value="Pós-graduação">Pós-graduação</option>
                                <option value="Não estudou">Não estudou</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-5 mb-3">
                        <div class="form-group">
                            <label for="">Profissão</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-5 mb-3">
                        <div class="form-group">
                            <label for="">E-mail</label>
                            <input type="email" class="input--text">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-5 mb-3">
                        <div class="form-group">
                            <label for="">Telefone 1</label>
                            <input type="text" class="input--text js-mask-phone">
                        </div>
                    </div>

                    <div class="col-12 col-md-5 mb-3">
                        <div class="form-group">
                            <label for="">Telefone 2</label>
                            <input type="text" class="input--text js-mask-phone">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-5 mb-3">
                        <div class="form-group">
                            <label for="">Comunidade</label>
                            <select class="select--form">
                                <option value="Selecione">Selecione</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-12 col-md-5 mb-3">
                        <div class="form-group">
                            <label for="">Favela</label>
                            <select class="select--form">
                                <option value="Selecione">Selecione</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">CEP</label>
                            <input type="text" class="input--text js-mask-cep" id="input-cep" placeholder="Somente números">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-6 mb-3">
                        <div class="form-group">
                            <label for="">Rua</label>
                            <input type="text" class="input--text js-input-rua">
                        </div>
                    </div>

                    <div class="col-12 col-md-2 mb-3">
                        <div class="form-group">
                            <label for="">Número</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>

                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">Complemento</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">Cidade</label>
                            <input type="text" class="input--text js-input-cidade">
                        </div>
                    </div>

                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">Bairro</label>
                            <input type="text" class="input--text js-input-bairro">
                        </div>
                    </div>

                    <div class="col-12 col-md-4 mb-3">
                        <div class="form-group">
                            <label for="">Ponto de referência</label>
                            <input type="text" class="input--text">
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-12 d-flex justify-content-center">
                        <div class="g-recaptcha" data-sitekey="6LefwRcbAAAAAGVDiXweyvluDSD1Jmr9Z6fZn-kn"></div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                        <button type="submit" class="btn__raised">Enviar</button>
                    </div>
                </div>
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
    name: "Home",
    components: {Header, Footer},
    mounted() {
        $('.js-mask-date').mask('00/00/0000');
        $('.js-mask-cpf').mask('000.000.000-00');
        $('.js-mask-phone').mask('(00) 0000-000#0');
        $('.js-mask-cep').mask('00000000');
        $('.js-mask-money').mask("#.##0,00", {reverse: true});

        // Funcionamento da nacionalidade
        $('.js-select-nacionalidade').on('change', function () {
            var valor = $(this).val();

            $('.js-select-paises').append('<option value="">Selecione</option>');

            switch (valor) {
                case 'Brasileiro':
                    $('.js-select-paises').html("");
                    $("#bloco-pais").addClass('d-none');
                    break;

                case 'Estrangeiro':
                    $("#bloco-pais").removeClass('d-none');

                    axios.get('https://servicodados.ibge.gov.br/api/v1/paises/')
                        .then(function (response) {
                            Array.prototype.forEach.call(response.data, function (dado) {

                                if (dado.nome.abreviado != "Brasil") {
                                    $('.js-select-paises').append(`<option value="${dado.nome.abreviado}">${dado.nome.abreviado}</option>`);
                                }
                            })
                        })
                    break;

                default:
                    $('.js-select-paises').html("");
                    $("#bloco-pais").addClass('d-none');
                    break;
            }
        })

        // Preenchimento automático do CEP
        $('#input-cep').on('change', function () {

            $('.js-input-rua').attr('readonly', true);
            $('.js-input-bairro').attr('readonly', true);
            $('.js-input-cidade').attr('readonly', true);

            axios.get(`https://viacep.com.br/ws/${$(this).val()}/json/`)
                .then(function (response) {
                    $('.js-input-rua').val(response.data.logradouro);
                    $('.js-input-bairro').val(response.data.bairro);
                    $('.js-input-cidade').val(response.data.localidade);

                    $('.js-input-rua').removeAttr('readonly');
                    $('.js-input-bairro').removeAttr('readonly');
                    $('.js-input-cidade').removeAttr('readonly');
                })
                .catch(function (error) {
                    $('.js-input-rua').removeAttr('readonly');
                    $('.js-input-bairro').removeAttr('readonly');
                    $('.js-input-cidade').removeAttr('readonly');
                })
        });

        this.datePicker();

        // Funcionamento da nacionalidade
        $('.js-select-nacionalidade').on('change', function () {
            var valor = $(this).val();

            $('.js-select-paises').append('<option value="">Selecione</option>');

            switch (valor) {
                case 'Brasileiro':
                    $('.js-select-paises').html("");
                    $("#bloco-pais").addClass('d-none');
                    break;

                case 'Estrangeiro':
                    $("#bloco-pais").removeClass('d-none');

                    axios.get('https://servicodados.ibge.gov.br/api/v1/paises/')
                        .then(function (response) {
                            Array.prototype.forEach.call(response.data, function (dado) {

                                if (dado.nome.abreviado != "Brasil") {
                                    $('.js-select-paises').append(`<option value="${dado.nome.abreviado}">${dado.nome.abreviado}</option>`);
                                }
                            })
                        })
                    break;

                default:
                    $('.js-select-paises').html("");
                    $("#bloco-pais").addClass('d-none');
                    break;
            }
        })

        // Preenchimento automático do CEP
        $('#input-cep').on('change', function () {

            $('.js-input-rua').attr('readonly', true);
            $('.js-input-bairro').attr('readonly', true);
            $('.js-input-cidade').attr('readonly', true);

            axios.get(`https://viacep.com.br/ws/${$(this).val()}/json/`)
                .then(function (response) {
                    $('.js-input-rua').val(response.data.logradouro);
                    $('.js-input-bairro').val(response.data.bairro);
                    $('.js-input-cidade').val(response.data.localidade);

                    $('.js-input-rua').removeAttr('readonly');
                    $('.js-input-bairro').removeAttr('readonly');
                    $('.js-input-cidade').removeAttr('readonly');
                })
                .catch(function (error) {
                    $('.js-input-rua').removeAttr('readonly');
                    $('.js-input-bairro').removeAttr('readonly');
                    $('.js-input-cidade').removeAttr('readonly');
                })
        })


    },
    methods: {
        datePicker() {
            const vm = this;

            $('.js-datepicker').daterangepicker({
                "singleDatePicker": true,
                "autoApply": true,
                "autoUpdateInput": false,
                "locale": {
                    "format": "DD/MM/YYYY",
                    "applyLabel": "Aplicar",
                    "cancelLabel": "Cancelar",
                    "daysOfWeek": [
                        "D", "S", "T", "Q", "Q", "S", "S"
                    ],
                    "monthNames": [
                        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                    ],
                    "firstDay": 1
                },
            },
                (start, end) => {
                    console.log("Callback has been called!");
                    $('.js-datepicker').val(start.format('DD/MM/YYYY'));
                    var referencia =  $('.js-datepicker').attr('data-referencia');
                    console.log(this.idade(start.format('YYYY'),start.format('MM'), start.format('DD')));
                    $('#input-idade').val(this.idade(start.format('YYYY'),start.format('MM'), start.format('DD')));
                }
            );

            $('.js-datepicker').on('cancel.daterangepicker', function (ev, picker) {
                $(this).val('');
            });
        },
        idade(ano_aniversario, mes_aniversario, dia_aniversario) {
            var d = new Date,
                ano_atual = d.getFullYear(),
                mes_atual = d.getMonth() + 1,
                dia_atual = d.getDate(),

                ano_aniversario = +ano_aniversario,
                mes_aniversario = +mes_aniversario,
                dia_aniversario = +dia_aniversario,

                quantos_anos = ano_atual - ano_aniversario;

            if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
                quantos_anos--;
            }

            return quantos_anos < 0 ? 0 : quantos_anos;
        }
    }
}
</script>

<style scoped>
</style>
