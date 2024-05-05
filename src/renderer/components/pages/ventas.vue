<template>
  <Card
    class='mx-2 mt-2 p-2 rounded-md'
    classes='bg-gray-700'
  >
    <h1 class='text-xl mb-2'>Ventas</h1>
    <div v-if='sales.length > 0' class='grid gap-2'>
      <Card
        v-for='sale in sales'
        :key='sale.codigo'
        class='mx-w p-2 rounded-md shadow-md'
      >
        <div class='flex flex-col gap-1'>
          <div class='flex justify-between items-center'>
            <span>Código: {{ sale.codigo }}</span>
            <div class='inline-flex gap-1'>
              <RouterLink :to='`/sale/${sale.codigo}`' class='rounded-md border px-2 py-1 hover:opacity-50'>Ver</RouterLink>
            </div>
          </div>
          <hr />
          <span>Fecha: {{ sale.fecha }}</span>
          <span>Ruta: {{ sale.route.nombre }}</span>
          <span>Total: ${{ total(sale.entriesOfSale) }}</span>
        </div>
      </Card>
    </div>
    <div v-else>
      <h2 class='text-md mt-2'>No se ha encontrado ventas registradas</h2>
    </div>
  </Card>
</template>

<script>
import axios from '../../common/axios'
import Card from './../atoms/card.vue'

export default {
  components: {
    Card
  },
  name: 'ventas.vue',
  data () {
    return {
      sales: []
    }
  },
  mounted () {
    this.getSales()
  },
  methods: {
    async getSales () {
      const response = await axios.get('/sale')
      console.log(response.data.rows)
      this.sales = response.data.rows
    },
    total (entriesOfSale) {
      return entriesOfSale.reduce((acum, e) => {
        console.log(e.precio * e.cantidad)
        return acum + (e.precio * e.cantidad)
      }, 0)
    }
  }
}
</script>

<style scoped>

</style>
