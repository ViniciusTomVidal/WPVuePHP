<template>
    <div>
        <Header></Header>
        <MenuAdmin></MenuAdmin>
        <section class="wrap">
            <div class="container">
                <h4 class="mb-3">Moradores</h4>

                <div class="table-scroll">
                    <table class="table--style">
                        <thead>
                        <tr>
                            <th width="50">ID</th>
                            <th>Nome completo</th>
                            <th width="200">Data</th>
                            <th width="150"></th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Nome completo</td>
                            <td>06/06/2021 às 13:00</td>
                            <td><a href="./detalhe-morador.php"><i class="mdi mdi-eye"></i> Visualizar</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import MenuAdmin from '../components/MenuAdmin.vue';
import Footer from '../components/Footer.vue';
export default {
    name: "Moradores",
    components: {Header, Footer, MenuAdmin},
}
</script>

<style scoped>

</style>
