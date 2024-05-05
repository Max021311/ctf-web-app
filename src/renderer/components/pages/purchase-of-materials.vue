<template>
  <div>
    <header class="bg-gray-700 p-2 flex justify-between items-center">
      <h1>
        Alta de materiales
      </h1>
    </header>
    <section class="bg-gray-700 mx-2 mt-2 p-2 rounded">
      <FormKit
        type="form"
        submit-label="Registrar compra"
        actions-class="mt-2"
        :disabled="disableForm"
        @submit="submitHandler"
      >
        <div class="flex flex-col gap-2">
          <FormKit
            type="select"
            label="Material"
            :options="selectMaterial"
            name="codigo_material"
            validation="required"
            :validation-rules="{ required: (v) => v.value !== 0 }"
          />
          <FormKit
            type="number"
            label="Cantidad"
            name="cantidad"
            validation="required"
          />
          <FormKit
            type="number"
            label="Precio"
            name="precio"
            validation="required"
          />
        </div>
      </FormKit>
      <div
        v-if="error"
        class="bg-red-600 rounded-md p-2"
      >
        <span>Ha habido un error con el registro</span>
      </div>
      <div
        v-else-if="success"
        class="bg-green-600 rounded-md p-2"
      >
        <span>Se ha registrado con exito</span>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '~/common/axios'

export default {
  name: 'PurchaseOfMaterials',
  data () {
    return {
      materials: [],
      success: false,
      error: false,
      disableForm: false
    }
  },
  computed: {
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
    this.getMaterials()
  },
  methods: {
    async getMaterials () {
      const response = await axios.get('/material')
      this.materials = response.data.rows
    },
    async submitHandler (form) {
      try {
        this.disableForm = true
        await axios.post(
          '/material/add',
          form,
          { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } }
        )
        this.disableForm = false
        this.success = true
        setTimeout((vueInstance) => {
          vueInstance.success = false
        }, 5000, this)
      } catch (err) {
        this.error = true
        setTimeout((vueInstance) => {
          vueInstance.error = false
        }, 5000, this)
        console.error(err)
      }

    }
  }
}
</script>

<style scoped>

</style>
