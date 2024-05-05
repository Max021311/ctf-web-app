<template>
  <div>
    <VueFinalModal
      v-if="employee"
      v-model="showModal"
      :esc-to-close="true"
      :click-to-close="true"
      class="modal-container"
      content-class="modal-content"
    >
      <div class="p-4 shadow-sm bg-gray-600 rounded overflow-y-auto max-w-screen-sm w-full">
        <div class="flex justify-end">
          <button
            type="button"
            class="text-red-600 hover:opacity-50"
            @click="showModal = false"
          >
            <XCircleIcon />
          </button>
        </div>
        <EmployeeForm
          action="PUT"
          :employee="employee"
          @after-submit='getEmployee($route.params.codigo)'
        />
      </div>
    </VueFinalModal>
    <header class="bg-gray-700 p-2 flex justify-between items-center">
      <h1 v-if="employee">
        {{ employee.nombre + ' ' + employee.apellidos }}
      </h1>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hover:opacity-50"
          @click="showModal = true"
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          class="text-red-600 hover:opacity-50"
          @click="deleteEmployee(employee.codigo)"
        >
          <XCircleIcon />
        </button>
      </div>
    </header>
    <section
      v-if="employee"
      class="bg-gray-700 mx-2 mt-2 p-2 rounded"
    >
      <Card
        class="flex flex-col gap-2"
      >
        <span>Codigo: {{ employee.codigo }}</span>
        <span>Email: {{ employee.email }}</span>
        <span>NSS: {{ employee.nss }}</span>
        <span>RFC: {{ employee.rfc }}</span>
        <span>CURP: {{ employee.curp }}</span>
        <span>Fecha de nacimiento: {{ employee.fecha_nacimiento }}</span>
        <span>Sueldo: {{ employee.sueldo }}</span>
      </Card>
    </section>
  </div>
</template>

<script>
import axios from './../../common/axios'
import XCircleIcon from './../icons/x-circle.vue'
import Card from './../atoms/card.vue'
import PencilIcon from './../icons/pencil-icon.vue'
import EmployeeForm from './../employee-form.vue'

export default {
  name: 'employee.vue',
  components: {
    XCircleIcon,
    Card,
    PencilIcon,
    EmployeeForm
  },
  async beforeRouteUpdate (to, _from) {
    await this.getEmployee(to.params.codigo)
  },
  data () {
    return {
      employee: null,
      showModal: false
    }
  },
  async mounted () {
    await this.getEmployee(this.$route.params.codigo)
  },
  methods: {
    async getEmployee (codigo) {
      const response = await axios.get('/employee/' + codigo)
      console.log(response.data)
      this.employee = response.data
    },
    async deleteEmployee (codigo) {
      try {
        await axios.delete('/employee/' + codigo)
        await this.$router.push('/employees')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
::v-deep(*) .modal-container {
  @apply flex justify-center items-center;
}
::v-deep(*) .modal-content {
  @apply flex flex-col p-4 justify-center items-center;
  max-height: 100vh;
}
</style>
