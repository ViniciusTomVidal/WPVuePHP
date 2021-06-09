<?php
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
$script = str_replace('$%language%$', get_locale(), $script);
$script = str_replace('%$title$%', get_bloginfo('name'), $script);
$script = str_replace('%$description$%', get_bloginfo('description'), $script);

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
$script = str_replace('$%language%$', get_locale(), $script);
$script = str_replace('%$title$%', get_bloginfo('name'), $script);
$script = str_replace('%$description$%', get_bloginfo('description'), $script);

