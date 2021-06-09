<template>
    <div class="animated fadeIn">
		<div class="loading-vue" v-if="!this.loading">
           <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
       </div>
		<section class="bannerQS animated fadeIn"  v-if="this.institucional">
			<img v-if="!this.institucional.imagem_do_banner_principal" src="$%url_template%$/assets/imagens/bannerqm.jpg">
			<img v-if="this.institucional.imagem_do_banner_principal" :src="this.institucional.imagem_do_banner_principal">
			<div class="texto" v-html="this.institucional.texto_do_banner">
				<!-- <span>Lorem</span>
				<h2>Lorem</h2>
				<p>Lorem ipsum dolor sit amet, consetetur <br> sadipscing elitr, sed diam</p> -->
			</div>
		</section>

	<section class="quemSomos animated fadeIn" v-if="this.institucional">
		<div class="content">			
			<div class="textoVideo">
				<div>
					<div class="titulo" v-if="this.institucional.quem_somos.label_do_bloco != ''">
					<h2 >{{this.institucional.quem_somos.label_do_bloco}}</h2>
				</div>
				<p>
					<span v-if="this.institucional.quem_somos.titulo">{{this.institucional.quem_somos.titulo}}</span> <br><br>
					<font v-html="this.institucional.quem_somos.descricao">
						
					</font>
				</p>
				</div>
				<div class="video">
					<iframe width="597" height="435" :src="this.institucional.quem_somos.video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</section>
	
	<categoriatemplate v-if="this.institucional"></categoriatemplate>

	<section class="nossaHistoria animated fadeIn" v-if="this.institucional" :style="'background:url(' + this.institucional.imagem_nossa_historia + ') no-repeat left center #E3DFE0; background-size: auto 100%;'">
		<div class="content">
			<div class="titulo" v-if="this.institucional.label_nossa_historia">
				<h2>{{this.institucional.label_nossa_historia}}</h2>
			</div>
			<div v-html="this.institucional.nossa_historia"></div>
		</div>
	</section>
	<section v-if="this.institucional" class="quemSomos qualidade">
		<div class="content">
			<div class="textoVideo">
				<div>
					<div class="titulo" v-if="this.institucional.qualidade_farmaceutica.label_do_bloco">
						<h2>{{this.institucional.qualidade_farmaceutica.label_do_bloco}}</h2>
				</div>
				<div v-html="this.institucional.qualidade_farmaceutica.descricao">

				</div>
				</div>
				<div class="video">
					<img v-if="!this.institucional.qualidade_farmaceutica.imagem" src="$%url_template%$/assets/imagens/qualidade.png">
					<img v-if="this.institucional.qualidade_farmaceutica.imagem" :src="this.institucional.qualidade_farmaceutica.imagem">
				</div>
			</div>
		</div>
	</section>
    </div>
</template>

<script>
    const $NameComponent$ = {
        template: $NameComponentVar$,
        data: function () {
            return {
                institucional:'',
				loading: false,
            }
        },
		watch: {
			institucional:function () {
				this.$nextTick(() => {
					document.title = this.institucional.post_title + " - %$title$% - %$description$%"
					this.loading = true;
				});
			}
		},
        mounted: function () {
            this.fetchBanner();

        },
        methods: {
            fetchBanner: function () {
                axios
                    .get('$%url%$/wp-json/page/institucional?' + Math.random())
                    .then(response => {
                            this.institucional = response.data;
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>