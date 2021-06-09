<template>
    <div class="animated fadeIn">
		<div class="loading-vue" v-if="!this.loading">
           <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
       </div>
      <section class="bannerQS animated fadeIn sipeagro" v-if="this.sipeagro">
		<img :src="this.sipeagro.imagem_do_banner_principal">
		<div class="texto">
			<h2>{{this.sipeagro.titulo_do_banner}}</h2>
			<div v-html="this.sipeagro.texto_do_banner">Lorem ipsum dolor sit amet, consetetur <br> sadipscing elitr, sed diam</div>
		</div>
	</section>
	<section>

		<div class="content" v-if="this.sipeagro">
			<div class="breadcrumb">
				<router-link :to="'/'">Home</router-link> > <span>Sipeagro</span>
			</div>
			<section  class="conteudo" v-html="this.sipeagro.texto">
			</section>
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
				loading: '',
				sipeagro: '',
            }
        },
		watch: {
        	institucional:function () {
				this.$nextTick(() => {
					this.loading = true;
				});
			},
			sipeagro: function () {
				this.$nextTick(() => {
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
                    .get('$%url%$/wp-json/page/sipeagro?' + Math.random())
                    .then(response => {
                            this.sipeagro = response.data;
							this.loading = true;
							document.title = this.sipeagro.titulo_do_banner + " - %$title$% - %$description$%"
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>