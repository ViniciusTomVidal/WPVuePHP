<?php
echo '<pre>';

echo '</pre>';

    //PAGE HOME
    $VueChleba->RegisterComponent('contato', 'parts-vue/pages/home/contato');
    $VueChleba->RegisterComponent('eventoenoticias', 'parts-vue/pages/home/eventos-e-noticias');
    $VueChleba->RegisterComponent('sobrenos', 'parts-vue/pages/home/sobrenos');
    $VueChleba->RegisterComponent('categoria', 'parts-vue/components/categorias');
    $VueChleba->RegisterComponent('slider', 'parts-vue/pages/home/slider');
    $VueChleba->RegisterComponent('footer', 'parts-vue/footer');
    $VueChleba->RegisterComponent('header', 'parts-vue/header');
    $VueChleba->RegisterPage('page', 'parts-vue/pages/page-home', '/');
    //PAGE NEWS
$timeB1 = microtime(true);
    $VueChleba->RegisterComponent('itensnoticia', 'parts-vue/pages/news/itens', '/');
    $VueChleba->RegisterComponent('carouselnoticia', 'parts-vue/pages/news/carouselNoticias', '/');
    $VueChleba->RegisterComponent('bannernoticia', 'parts-vue/pages/news/bannerNoticia', '/');
    $VueChleba->RegisterPage('news', 'parts-vue/pages/page-news', '/news');
echo '<script>console.log('.$timeB1.')</script>';

    //PAGE SINGLE NEWS
    $VueChleba->RegisterComponent('bannernoticiasingle', 'parts-vue/pages/single-news/bannerNoticiaSingle');
    $VueChleba->RegisterPage('singlenews', 'parts-vue/pages/single-news', '/news');

    //VITRINE
    $VueChleba->RegisterComponent('produtosingle', 'parts-vue/pages/single-produtos');
    $VueChleba->RegisterComponent('listprodutos', 'parts-vue/pages/vitrine/listprodutos');
    $VueChleba->RegisterComponent('bannervitrine', 'parts-vue/pages/vitrine/bannervitrine');
    $VueChleba->RegisterPage('vitrine', 'parts-vue/pages/vitrine-produtos', '/news');

	//INSTITUCIONAL
	$VueChleba->RegisterPage('institucional', 'parts-vue/pages/page-institucional', '/institucional');

	//CONTATO
	 $VueChleba->RegisterComponent('bannercontato', 'parts-vue/pages/contato/bannercontato');
	 $VueChleba->RegisterPage('pagecontato', 'parts-vue/pages/page-contato', '/contato');


    //SIPEAGRO
    $VueChleba->RegisterPage('pagesipeagro', 'parts-vue/pages/page-sipeagro', '/contato');


?>

<script>

    const routes = [
        { path: '/',
            component: pagetemplate,
        },
        { path: '/news',
            component: newstemplate,
        },
        { path: '/news/:slug',
            component: singlenewstemplate,
        },
        { path: '/produtos/',
            component: vitrinetemplate,
        },
        { path: '/produtos/:slug',
            component: vitrinetemplate,
        },
        { path: '/produtos/:slug/:categoria',
            component: vitrinetemplate,
        },
        { path: '/produtos/:slug/:categoria/:categoria',
            component: vitrinetemplate,
        },
		{ path: '/institucional/',
            component: institucionaltemplate,
        },
		{ path: '/contato/',
            component: pagecontatotemplate,
        },
        { path: '/sipeagro/',
            component: pagesipeagrotemplate,
        }
    ];

    const router = new VueRouter({
        mode: 'history',
        history: true,
        linkActiveClass: 'active',
        base: '/<?php if(get_locale() == 'en_US') echo 'en'; else if(get_locale() == 'es_ES') echo 'es'?>',
        routes,
        scrollBehavior (to, from, savedPosition) {
            // page scroll to top for all route navigations
            return { x: 0, y: 0 }
        }// short for `routes: routes`
    });

    const app = new Vue({
        router,

    }).$mount('#app')
</script>
