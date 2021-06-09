<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <title><?php echo wp_title();?></title>
    <?php
        wp_head();
        $VueChleba->Init();
    ?>
</head>
<body>
    <div id="app">
        <router-view></router-view>
    </div>
    <?php wp_footer(); ?>
    <?php include get_stylesheet_directory().'/registerComponents.php'?>
</body>
</html>
