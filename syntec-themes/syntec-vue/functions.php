<?php


add_theme_support('post-thumbnails');

// Register style sheet.
add_action('wp_enqueue_scripts', 'register_custom_plugin_styles');
/**
 * Register style sheet.
 */
function register_custom_plugin_styles()
{
    wp_register_style('default', get_stylesheet_directory_uri() . '/assets/css/style.css?v22020');
    wp_enqueue_style('default');
}

add_action('rest_api_init', function () {
    register_rest_route('page', '/(?P<page>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'page_home'
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('news', '/(?P<post>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'post_single'
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('posts', '/ultimos', array(
        'methods' => 'GET',
        'callback' => 'posts_ultimos'
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('posts', '/carousel', array(
        'methods' => 'GET',
        'callback' => 'posts_carousel'
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('envia', '/email', array(
        'methods' => 'GET',
        'callback' => 'envia_email'
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('posts', '/all', array(
        'methods' => 'GET',
        'callback' => 'posts_all'
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('categories', '/(?P<parent>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_categoriesParent'
    ));
});

add_action('rest_api_init', function () {
    register_rest_route('categorie', '/(?P<category>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_categorie'
    ));
});


add_action('rest_api_init', function () {
    register_rest_route('produtos', '/(?P<category>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'get_produtos'
    ));
});

function page_home($params)
{
    $page = get_page_by_path($params['page']);
    if ($params['page'] == 'home') {
        $page->sobre_nos = get_field('sobre_nos', $page->ID);
        $page->traducoes = get_field('traducoes', $page->ID);
        $page->slider = get_field('slider', $page->ID);
    }
    if ($params['page'] == 'noticias') {
        $page->imagem_noticia = get_field('imagem_noticia', $page->ID);
        $page->infos = get_field('infos_noticia', $page->ID);
    }

    if ($params['page'] == 'produtos') {
        $page->banner_principal = get_field('banner_principal', $page->ID);
        $page->baixar_doses_url = get_field('baixar_doses_url', $page->ID);
        $page->traducoes = get_field('traducoes', $page->ID);
    }

    if ($params['page'] == 'institucional') {
        $page->imagem_do_banner_principal = get_field('imagem_do_banner_principal', $page->ID);
        $page->texto_do_banner = get_field('texto_do_banner', $page->ID);
        $page->quem_somos = get_field('quem_somos', $page->ID);
        $page->nossa_historia = get_field('nossa_historia', $page->ID);
        $page->imagem_nossa_historia = get_field('imagem_nossa_historia', $page->ID);
        $page->label_nossa_historia = get_field('label_nossa_historia', $page->ID);
        $page->qualidade_farmaceutica = get_field('qualidade_farmaceutica', $page->ID);
    }
    if ($params['page'] == 'contato') {
        $page->contato = get_field('contato', $page->ID);
        $page->traducoes = get_field('traducoes', $page->ID);
    }
    if ($params['page'] == 'sipeagro') {
        $page->imagem_do_banner_principal = get_field('imagem_do_banner_principal', $page->ID);
        $page->titulo_do_banner = get_field('titulo_do_banner', $page->ID);
        $page->texto = get_field('texto', $page->ID);
        $page->texto_do_banner = get_field('texto_do_banner', $page->ID);
    }
    return $page;
}

function page_news($params)
{
    $page = get_page_by_path($params['page']);
    return $page;
}

function posts_ultimos()
{
    $args = array(
        'post_type' => 'post',
        'category_name' => 'news',
        'showposts' => 4
    );

    $posts = get_posts($args);
    foreach ($posts as $key => $post) {
        $posts[$key]->thumbnail_url = get_the_post_thumbnail_url($post->ID, 'medium');
        $my_post_categories = get_the_category($post->ID);
        $my_post_child_cats = array();
        foreach ($my_post_categories as $post_cat) {
            if (0 != $post_cat->category_parent) {
                $posts[$key]->category_child = $post_cat->cat_name;
            }
        }
    }
    return $posts;
}

function posts_carousel()
{
    $args = array(
        'post_type' => 'post',
        'category_name' => 'news',
        'show_posts' => 10,
        'meta_query' => array(
            array(
                'key' => 'destaque',
                'value' => '',
                'compare' => '!=',
            ),
        ),
    );
    $posts = get_posts($args);
    foreach ($posts as $key => $post) {
        $posts[$key]->thumbnail_url = get_the_post_thumbnail_url($post->ID, 'medium');
        $my_post_categories = get_the_category($post->ID);
        $my_post_child_cats = array();
        foreach ($my_post_categories as $post_cat) {
            if (0 != $post_cat->category_parent) {
                $posts[$key]->category_child = $post_cat->cat_name;
                $posts[$key]->img_thumb = $post_cat->cat_name;
            }
        }
    }
    return $posts;
}

function posts_all()
{
    $args = array(
        'post_type' => 'post',
        'category_name' => 'news',
        'paged' => $_GET['page'],
        'posts_per_page' => 10
    );
    $posts = get_posts($args);
    foreach ($posts as $key => $post) {
        $posts[$key]->thumbnail_url = get_the_post_thumbnail_url($post->ID, 'medium');
        $my_post_categories = get_the_category($post->ID);
        $my_post_child_cats = array();
        foreach ($my_post_categories as $post_cat) {
            if (0 != $post_cat->category_parent) {
                $posts[$key]->category_child = $post_cat->cat_name;
            }
        }
    }
    return $posts;
}

function post_single($params)
{
    $post = wp_get_post_by_slug($params['post']);
    $post->post_content = wpautop(do_shortcode($post->post_content));
    $post->galeria = get_field('galeria', $post->ID);
    $my_post_categories = get_the_category($post->ID);
    $my_post_child_cats = array();

    foreach ($my_post_categories as $post_cat) {
        if (0 != $post_cat->category_parent) {
            $post->category_child = $post_cat->cat_name;
        }
    }
    return $post;
}

function get_categoriesParent($params)
{
    $parent = get_category_by_slug($params['parent']);
    $produtos2 = get_category_by_slug('produtos');
    $produtos = get_categories(array(
            'parent' => $produtos2->cat_ID,
            'hide_empty' => false,
            'orderby' => 'name',
            'order' => 'ASC',
        )
    );
    $nivel1 = get_categories(array(
            'parent' => $parent->cat_ID,
            'hide_empty' => false,
            'orderby' => 'name',
            'order' => 'ASC',
        )
    );
    foreach ($nivel1 as $id) {
        $nivel2 = get_categories(array(
                'parent' => $id->term_id,
                'hide_empty' => false,
                'orderby' => 'name',
                'order' => 'ASC',
            )
        );
        foreach ($nivel2 as $cat) {
            $nivel22[] = $cat;
        }
    }
    foreach ($produtos as $key => $cat_product) {
        $produtos[$key]->icone_para_pagina_da_categoria = get_field('icone_para_pagina_da_categoria', $cat_product->taxonomy . '_' . $cat_product->term_id);
        $produtos[$key]->icone_para_as_thumbs_dos_produtos = get_field('icone_para_as_thumbs_dos_produtos', $cat_product->taxonomy . '_' . $cat_product->term_id);
        $produtos[$key]->icone_para_os_produtos = get_field('icone_para_os_produtos', $cat_product->taxonomy . '_' . $cat_product->term_id);
    }
    $categories['produtos'] = $produtos;
    $categories['nivel1'] = $nivel1;
    $categories['nivel2'] = $nivel22;
    return $categories;
}

function get_categorie($params)
{
    $category = get_category_by_slug($params['category']);
    $category->icone_para_pagina_da_categoria = get_field('icone_para_pagina_da_categoria', $category->taxonomy . '_' . $category->term_id);
    return $category;
}

function get_produtos($params)
{
    $category = $params['category'];
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 9,
        'paged' => $_GET['page'],
        'category_name' => $category
    );
    if ($_GET['search']) {
        $args['category_name'] = 'produtos';
        $args['s'] = $_GET['search'];
    }
    $posts = get_posts($args);
    foreach ($posts as $key => $post) {
        $posts[$key]->thumbnail_url = get_the_post_thumbnail_url($post->ID, 'medium');
        $my_post_categories = get_the_category($post->ID);
        $my_post_child_cats = array();
        $posts[$key]->category_child = array();
        $posts[$key]->category_thumbs = array();

        $posts[$key]->link_url = str_replace(get_site_url(), '', get_permalink($post->ID));
        if (get_locale() == 'en_US') {
            $posts[$key]->link_url = str_replace('/en', '', $posts[$key]->link_url);
        }

        if (get_locale() == 'es_ES') {
            $posts[$key]->link_url = str_replace('/es', '', $posts[$key]->link_url);
        }


        foreach ($my_post_categories as $post_cat) {
            if ($post_cat->category_parent === 324) {
                $posts[$key]->category_child[] = $post_cat->slug;
                if (!get_field('utilizar_somente_icones_personalizados', $post->ID)) {
                    $posts[$key]->category_thumbs[] = get_field('icone_para_as_thumbs_dos_produtos', $post_cat->taxonomy . '_' . $post_cat->term_id);
                }
            }
        }

        if (get_field('utilizar_somente_icones_personalizados', $post->ID)) {
            $field_icones = get_field('icones_personalizados', $post->ID);
            foreach ($field_icones as $icone) {
                $posts[$key]->category_thumbs[] = $icone['icone_para_thumb'];
            }
        }
    }
    if (count($data['items'] = $posts) != 0) {
        $data['isProduct'] = false;
    } else {
        $post = wp_get_post_by_slug($params['category']);
        if (count($post) == 0) {
            $data['isProduct'] = false;
        } else {
            $my_post_categories = get_the_category($post->ID);
            $my_post_child_cats = array();
            $post->category_child = array();
            $post->category_child_name = array();
            $post->category_child_child = array();
            $post->category_child_child_name = array();
            $post->category_thumbs = array();
            $post->post_content = wpautop($post->post_content);
            if (get_locale() == 'pt_BR') {
                $post->pdf_post_1 = get_field('cpt_pdf_attachment1', $post->ID);
                $post->pdf_post_2 = get_field('cpt_pdf_attachment2', $post->ID);
            } else if (get_locale() == 'en_US') {
                $post->pdf_post_1 = get_field('cpt_pdf_attachment3', $post->ID) ? get_field('cpt_pdf_attachment3', $post->ID) : get_field('cpt_pdf_attachment1', $post->ID);
                $post->pdf_post_2 = get_field('cpt_pdf_attachment4', $post->ID) ? get_field('cpt_pdf_attachment4', $post->ID) : get_field('cpt_pdf_attachment2', $post->ID);
            } else {
                $post->pdf_post_1 = get_field('cpt_pdf_attachment5', $post->ID) ? get_field('cpt_pdf_attachment5', $post->ID) : get_field('cpt_pdf_attachment1', $post->ID);
                $post->pdf_post_2 = get_field('cpt_pdf_attachment6', $post->ID) ? get_field('cpt_pdf_attachment6', $post->ID) : get_field('cpt_pdf_attachment2', $post->ID);
            }
            foreach ($my_post_categories as $post_cat) {
                if ($post_cat->category_parent === 324) {
                    $post->category_child[] = $post_cat->slug;
                    $post->category_child_name[] = $post_cat->name;
                    if (!get_field('utilizar_somente_icones_personalizados', $post->ID)) {
                        $post->category_thumbs[] = get_field('icone_para_os_produtos', $post_cat->taxonomy . '_' . $post_cat->term_id);
                    }

                } else {
                    $post->category_child_child[] = $post_cat->slug;
                    $post->category_child_child_name[] = $post_cat->name;
                    if (!get_field('utilizar_somente_icones_personalizados', $post->ID)) {
                        $post->category_thumbs[] = get_field('icone_para_os_produtos', $post_cat->taxonomy . '_' . $post_cat->term_id);
                    }
                }
            }

            if (get_field('utilizar_somente_icones_personalizados', $post->ID)) {
                $field_icones = get_field('icones_personalizados', $post->ID);
                foreach ($field_icones as $icone) {
                    $post->category_thumbs[] = $icone['icone_para_produto'];
                }
            }
            $args = array(
                'post_type' => 'post',
                'post__not_in' => array($post->ID),
                'category_name' => $post->category_child_child_name[0],
                'showposts' => 3
            );
            $post->related = get_posts($args);
            if (count($post->related) == 0) {
                $args = array(
                    'post_type' => 'post',
                    'post__not_in' => array($post->ID),
                    'category_name' => $post->category_child_name[0],
                    'showposts' => 3
                );
                $post->related = get_posts($args);
            }
            foreach ($post->related as $key_rel => $rel) {
                $my_post_categories = get_the_category($rel->ID);
                $my_post_child_cats = array();
                $post->related[$key_rel]->category_child = array();
                $post->related[$key_rel]->link_url = str_replace(get_site_url(), '', get_permalink($rel->ID));
                $post->related[$key_rel]->link_url = str_replace('/en', '', $post->related[$key_rel]->link_url);

                foreach ($my_post_categories as $post_cat) {
                    if ($post_cat->category_parent === 324) {
                        $post->related[$key_rel]->category_thumbs = array();
                        $post->related[$key_rel]->category_child[] = $post_cat->slug;
                        if (!get_field('utilizar_somente_icones_personalizados', $rel->ID)) {
                            $post->related[$key_rel]->category_thumbs[] = get_field('icone_para_as_thumbs_dos_produtos', $post_cat->taxonomy . '_' . $post_cat->term_id);
                        }
                    }
                }

                if (get_field('utilizar_somente_icones_personalizados', $rel->ID)) {
                    $field_icones = get_field('icones_personalizados', $rel->ID);
                    foreach ($field_icones as $icone) {
                        $post->related[$key_rel]->category_thumbs[] = $icone['icone_para_thumb'];
                    }
                }
                $post->related[$key_rel]->thumbnail_url = get_the_post_thumbnail_url($rel->ID, 'medium');
            }

            $post->thumbnail_url = get_the_post_thumbnail_url($post->ID, 'large');
            $data['isProduct'] = true;
        }
    }
    if (is_category($params['category'])) {
        $data['isProduct'] = false;
    }
    if ($data['isProduct'] == false) {
        $data['items'] = $posts;
    } else {
        $data['item'] = $post;
    }
    return $data;
}

function wp_get_post_by_slug($slug, $post_type = 'post', $unique = true)
{
    $args = array(
        'post_name__in' => [$slug],
        'post_type' => $post_type,
        'post_status' => 'publish',
        'posts_per_page' => 1
    );
    $my_posts = get_posts($args);
    if ($my_posts) {
        //echo 'ID on the first post found ' . $my_posts[0]->ID;
        if ($unique) {
            return $my_posts[0];
        } else {
            return $my_posts;
        }
    }
    return false;
}


add_action('after_setup_theme', 'register_custom_nav_menus');
function register_custom_nav_menus()
{
    register_nav_menus(array(
        'header' => 'Header Menu',
    ));
}

function change_menu($items)
{

    if (!is_front_page()) {

        foreach ($items as $item) {


            $item->url = get_bloginfo("url") . "/" . $item->url;


        }

    }

    return $items;

}


add_filter('wp_nav_menu_objects', 'change_menu');

class Excerpt_Walker extends Walker_Nav_Menu
{
    function start_el(&$output, $item, $depth, $args)
    {
        global $wp_query;
        $indent = ($depth) ? str_repeat("\t", $depth) : '';

        $class_names = $value = '';

        $classes = empty($item->classes) ? array() : (array)$item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = ' class="' . esc_attr($class_names) . '"';

        $id = apply_filters('nav_menu_item_id', 'menu-item-item-' . $item->ID, $item, $args);
        $id = strlen($id) ? ' id="' . esc_attr($id) . '"' : '';

        $output .= $indent . '<li' . $id . $value . $class_names . '>';


        $url_link = $item->url;

        $url_link = str_replace($url_link . '/en', '', $url_link);
        $url_link = str_replace($url_link . '/es', '', $url_link);
        $url_link = str_replace('//', '/', str_replace(get_site_url(), '', $url_link));

        $url_link = str_replace('/en/en', '', $url_link);
        $url_link = str_replace('/es/es', '', $url_link);


        $attributes = !empty($item->attr_title) ? ' title="' . esc_attr($item->attr_title) . '"' : '';
        $attributes .= !empty($item->target) ? ' target="' . esc_attr($item->target) . '"' : '';
        $attributes .= !empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) . '"' : '';
        $attributes .= !empty($item->url) ? ' to="' . esc_attr($url_link) . '"' : '';

        $item_output = $args->before;
        if ($item->title) {
            if ($url_link != '/#') {
                $item_output .= '<router-link @click.native="closeMenu()" ' . $attributes . '>';
            } else {
                $item_output .= '<router-link ' . $attributes . '>';
            }

            $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;

            /*GET THE EXCERPT*/ /*
            $q = new WP_Query(array('post__in' => $item->object_id));
            if ($q->have_posts()) : while ($q->have_posts()) : $q->the_post();
                $item_output .= '<span class="menu-excerpt">' . get_the_excerpt() . '</span>';
            endwhile;endif;*/
            /*****************/

            $item_output .= '</router-link>';
            $item_output .= $args->after;
        }

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}


function envia_email()
{
    $nome = $_GET['nome'];
    $assunto = $_GET['assunto'];
    $email = $_GET['email'];
    $telefone = $_GET['telefone'];
    $mensagem = $_GET['mensagem'];


    $mail = new PHPMailer();
    $mail->SMTPDebug = 1;

    $mail->IsHTML(true);
    $mail->CharSet = "UTF-8";

    $mail->IsSMTP();
    $mail->Host = 'email-ssl.com.br';
    $mail->Port = 587;
    $mail->SMTPAuth = true;
    $mail->Username = 'sitesuporte@syntecvet.com.br';
    $mail->Password = 'Syntec001Site1478!';

    $receptor = 'sac@syntec.com.br';

    $mail->SMTPSecure = 'tls';
    $mail->From = 'sitesuporte@syntecvet.com.br';

    $mail->FromName = "$nome";
    $mail->AddReplyTo("$email", "$nome");
    $mail->AddAddress("$receptor", "SAC - Syntec");

    $mail->WordWrap = 50;
    $mail->Subject = $assunto;
    $mail->Body = '<b>E-mail</b><br>'.$email.'<br><b>Telefone</b><br>' . $telefone . '<br><br><b>Mensagem</b><br>' . $mensagem;

    if (!$mail->Send()) {
        echo $mail->ErrorInfo;
    } else {
        $mens['msg'] = 'Sucesso';
    }
    return $mens;
}

?>