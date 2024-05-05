<template>
  <div class="mx-2 mt-2 p-2 shadow-md bg-gray-700 rounded-md">
    <FormKit
      v-model="form"
      type="form"
      submit-label="Registrar venta"
      @submit="submitHandler"
    >
      <div class="grid sm:grid-cols-2 gap-2 mb-2">
        <FormKit
          type="select"
          name="codigo_ruta"
          label="Tienda"
          validation="required"
          :options="selectRoute"
        />
      </div>
      <FormKit
        name="entriesOfSale"
        type="group"
      >
        <h3 class="text-lg">
          Ventas
        </h3>
        <div class="flex flex-col gap-1 mb-2">
          <Card class="grid grid-cols-5 gap-2">
            <span class="col-span-3">Producto</span>
            <span>Cantidad</span>
            <span>Precio</span>
          </Card>
          <EntryOfSale
            v-for="(v, i) in Array(6).fill(0)"
            :id="i"
            :key="i"
            :select-product="selectProduct"
            :products="products"
          />
        </div>
      </FormKit>
      <FormKit
        type="group"
        name="removeMaterials"
      >
        <h3 class="text-lg">
          Baja de materiales
        </h3>
        <div class="flex flex-col gap-1 mb-2">
          <Card class="grid grid-cols-3 gap-2">
            <span class="col-span-2">Material</span>
            <span>Cantidad</span>
          </Card>
          <RemoveMaterial
            v-for="(_v, i) in Array(6).fill(0)"
            :id="i"
            :key="i"
            :materials="materials"
            :select-material="selectMaterial"
          />
        </div>
      </FormKit>
    </FormKit>
  </div>
</template>

<script>
import axios from '../../common/axios'
import EntryOfSale from '../entry-of-sale.vue'
import RemoveMaterial from '../baja-de-material.vue'
import Card from './../atoms/card.vue'

export default {
  components: {
    EntryOfSale,
    RemoveMaterial,
    Card
  },
  data () {
    return {
      // employees: [],
      routes: [],
      products: [],
      form:  {},
      materials: []
    }
  },
  computed: {
    // selectEmployee () {
    //   return this.employees.map((e) => ({
    //     label: `${e.nombre} ${e.apellidos}`,
    //     value: e.rfc
    //   }))
    // },
    selectRoute () {
      return this.routes.map(r => ({
        label: r.nombre,
        value: r.codigo
      }))
    },
    selectProduct () {
      return [
        { label: 'Ninguno', value: 0 },
        ...this.products.map(p => ({
          label: p.nombre,
          value: p.codigo
        }))
      ]
    },
    selectMaterial () {
      return [
        { label: 'Ninguno', value: 0 },
        ...this.materials.map(m => ({
          label: m.nombre,
          value: m.codigo
        }))
      ]
    }
  },
  mounted () {
    console.log(import.meta.env)
    // this.getEmployees()
    this.getRoutes()
    this.getProducts()
    this.getMaterials()
  },
  methods: {
    // async getEmployees () {
    //   const response = await axios.get('/api/employee')
    //   this.employees = response.data.rows
    // },
    async getRoutes () {
      const response = await axios.get('/route')
      this.routes = response.data.rows
    },
    async getProducts () {
      const response = await axios.get('/product')
      this.products = response.data.rows
    },
    async getMaterials () {
      const response = await axios.get('/material')
      this.materials = response.data.rows
    },
    async submitHandler (v) {;
      const form = {
        codigo_ruta: v.codigo_ruta,
        entriesOfSale: Object.entries(v.entriesOfSale)
          .filter(e => e[1].codigo_producto !== 0)
          .map(e => ({
            codigo_producto: e[1].codigo_producto,
            cantidad: e[1].cantidad,
            precio: e[1].precio
          })),
        removeMaterials: Object.entries(v.removeMaterials)
          .filter(e => e[1].codigo_material !== 0)
          .map(e => ({
            codigo_material: e[1].codigo_material,
            cantidad: e[1].cantidad
          }))
      }

      console.log(form)
      try {
        const response = await axios.post(
          '/sale',
          form,
          {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        )
        this.$router.push('/sale/' + response.data.codigo)
      } catch (err) {
        console.error(err)
      }

    }
  }
}
</script>
