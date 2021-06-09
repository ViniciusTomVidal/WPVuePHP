<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable = 0, initial-scale=1.0, maximum-scale=1.0">
    <link rel="icon" href="<?php echo get_stylesheet_directory_uri()?>/favicon.ico" type="image/x-icon">
    <title><?php echo wp_title();?></title>
    <?php
        wp_head();
        $VueChleba->Init();
    ?>
</head>
	<style>
		.detalhenoticia ol, .detalhenoticia ol li {
			font-size: 17px;
			font-family: 'Roboto';
			color: rgb(0,0,0,0.6);
			margin: 15px 0px;
		}
		.conteudo ul {
			padding:0px 30px;
		}
		
		
		.conteudo ul li {
			list-style:disc;
			font-size: 17px;
			font-family: 'Roboto';
			color: rgb(0,0,0,0.6);
			margin: 6px 0px;
		}
	</style>
<body>
    <div id="app">
        <headertemplate></headertemplate>
            <router-view></router-view>
        <footertemplate></footertemplate>
    </div>
    <?php wp_footer(); ?>
    <?php include get_stylesheet_directory().'/registerComponents.php'?>
</body>
</html>
