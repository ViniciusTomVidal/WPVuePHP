<?php

class VueChleba
{
    public $routes = array();
    public $html_public = array();
    public $script = array();

    public function Init() {
        $this->RegisterVue();
    }

    //REGISTER - PRIVATE
    private function RegisterVue() {
        echo "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js\" integrity=\"sha256-chlNFSVx3TdcQ2Xlw7SvnbLAavAQLO0Y/LBiWX04viY=\" crossorigin=\"anonymous\"></script>";
        echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js" integrity="sha256-S1J4GVHHDMiirir9qsXWc8ZWw74PHHafpsHp5PXtjTs=" crossorigin="anonymous"></script>';
        echo "<script src=\"https://unpkg.com/vue-router/dist/vue-router.js\"></script>";
        echo '<script src="https://cdn.jsdelivr.net/npm/vue-carousel@0.18.0/dist/vue-carousel.min.js" async></script>';
        echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>';
        echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css" integrity="sha256-PHcOkPmOshsMBC+vtJdVr5Mwb7r0LkSVJPlPrp/IMpU=" crossorigin="anonymous" />';
        echo '<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>';
        echo '<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js" async ></script>';
        echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.7.2/jquery.flexslider.min.js" async integrity="sha256-wql/MDbyML50PJjxoPTgCa8ByZzyPX6HftEDWu6jovY=" crossorigin="anonymous"></script>';
        echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css" integrity="sha256-8rfHbJr+ju3Oc099jFJMR1xAPu8CTPHU8uP5J3X/VAY=" crossorigin="anonymous" />';
        echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery.min.js" integrity="sha256-GnThhVDusd6Mnhplk3lS6eX/C+Q9jaSR6KctYP8OlAo=" crossorigin="anonymous"></script>';
        echo "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.4/jquery-confirm.min.js\" integrity=\"sha256-Ka8obxsHNCz6H9hRpl8X4QV3XmhxWyqBpk/EpHYyj9k=\" crossorigin=\"anonymous\"></script>";
        echo "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.4/jquery-confirm.min.css\" integrity=\"sha256-VxlXnpkS8UAw3dJnlJj8IjIflIWmDUVQbXD9grYXr98=\" crossorigin=\"anonymous\" />";
        do_action('register-js-vue');
    }

    public function RegisterPage($name, $src, $route) {
        $routes[]['name'] = $name;
        $routes[]['src'] = $src;
        $routes[]['route'] = $route;
        $this->RegisterComponent($name, $src);
    }

    function curl_get_contents($url) {
        // Initiate the curl session
        $ch = curl_init();
        // Set the URL
        curl_setopt($ch, CURLOPT_URL, $url);
        // Return the output instead of displaying it directly
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt( $ch, CURLOPT_CUSTOMREQUEST, 'GET' );
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,false);
        // Execute the curl session
        $output = curl_exec($ch);
        // Close the curl session
        curl_close($ch);
        // Return the output as a variable
        return $output;
    }
    //PUBLIC
    public function RegisterComponent($name, $src) {
        $content = $this->curl_get_contents(get_stylesheet_directory_uri().'/'.$src.'.vue');
            if(preg_match("@<template>(.*?)</template>@si", $content, $matches)){
                $html =  $matches[1];

                $html = str_replace('$%url_template%$', get_stylesheet_directory_uri(), $html);
                $html = str_replace('$%url%$', get_site_url(), $html);
                require_once(get_stylesheet_directory().'/replaceHTML.php');

                $menu_name = 'header';
                $locations = get_nav_menu_locations();
                $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
                $defaults = array(
                    'theme_location' => 'header',
                    'xpath' => "./li[contains(@class,'current-menu-item') or contains(@class,'current-menu-ancestor')]/ul",
                    'before' => '',
                    'after' => '',
                    'echo' => true
                );
                $args = wp_parse_args( $args, $defaults );
                $args = (object) $args; 
                $html = str_replace('$%menu_header%$', wp_nav_menu( array( 'header' => $args->theme_location, 'container' => '', 'echo' => false, 'walker' => new Excerpt_Walker()) ), $html);
                ?>
                    <template class="Component<?php echo $name ?>">
                        <?php echo $html ?>
                    </template>
            <?php
            } else {
                echo $name.": Falha no HTML! Retorno inesperado!";
            }
            if(preg_match("@<script>(.*?)</script>@si", $content, $matches)){
                $script = str_replace('$NameComponent$', $name.'template', str_replace('$NameComponentVar$', 'Component'.$name, $matches[1]));
                $script = str_replace('$%url%$', home_url(), $script);
                require(get_stylesheet_directory().'/replaceSCRIPTS.php');
                ?>
                <script>
                    Component<?php echo $name ?> = $('.Component<?php echo $name ?>').html();
                    <?php echo $script?>
                </script>
                <?php
            }
            else {
                echo  $name.":Falha no Script! Retorno inesperado!";
            }
    }
}

