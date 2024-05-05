<template>
  <div>
    <header class="bg-gray-700 p-2 flex justify-between items-center">
      <h1>Venta</h1>
    </header>
    <section
      v-if="sale"
      class="bg-gray-700 mx-2 mt-2 p-2 rounded"
    >
      <div class="flex flex-col gap-2">
        <div>
          Codigo de venta: {{ sale.codigo }}
        </div>
        <div>
          Ruta: {{ sale.route.nombre }}
        </div>
        <div>
          Empleado: {{ sale.employee ? sale.employee.nombre + ' ' + sale.employee.apellidos : `El empleado que realizo esta venta ya no existe` }}
        </div>
        <div class='mt-2'>
          Ventas
        </div>
        <Card class="hidden sm:block">
          <div class="grid grid-cols-4 gap-2">
            <span class="col-span-2">Código de producto</span>
            <span>Cantidad</span>
            <span>Precio</span>
          </div>
        </Card>
        <div class='flex flex-col gap-1'>
          <Card
            v-for="entry in sale.entriesOfSale"
            :key="entry.codigo"
          >
            <div class="sm:grid sm:grid-cols-4 gap-2">
              <div class="col-span-2">
                <span class="sm:hidden">Código de producto: </span>
                <span>{{ entry.codigo_producto }}</span>
              </div>
              <div>
                <span class="sm:hidden">Cantidad: </span>
                <span>{{ entry.cantidad }}</span>
              </div>
              <div>
                <span class="sm:hidden">Precio: </span>
                <span>${{ entry.precio }}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from './../../common/axios'
import Card from './../atoms/card.vue'

export default {
  name: 'Venta',
  components: {
    Card
  },
  async beforeRouteUpdate (to, _from) {
    await this.getSale(to.params.id)
  },
  data () {
    return {
      sale: null
    }
  },
  mounted () {
    this.getSale(this.$route.params.id)
  },
  methods: {
    async getSale (id) {
      try {
        const response = await axios.get('/sale/' + id)
        console.log(response.data)
        this.sale = response.data
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
