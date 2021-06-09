<template>
    <nav class="menu-admin">
        <div class="container">
            <div class="menu-admin-mobile d-flex d-md-none js-admin-mobile">
                <i class="mdi mdi-menu me-2"></i> Menu
            </div>

            <div class="lista-menu-admin d-md-block">
                <ul class="d-block d-md-flex">
                    <li><a href="./usuarios.php" class="active">Usuários</a></li>
                    <li><a href="./listagem-moradores.php">Moradores</a></li>
                    <li><a href="./listagem-comunidades.php">Comunidades</a></li>
                    <li><a href="./listagem-socioeconomico.php">Questionário socioeconomico</a></li>
                    <li><a :href="$inertia.page.props.subFolder + 'logout'">Sair</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "MenuAdmin"
}
</script>

<style scoped>

</style>
