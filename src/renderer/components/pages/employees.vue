<template>
  <div>
    <VueFinalModal
      v-model="showModal"
      :esc-to-close="true"
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
          v-if="showModal"
          action="POST"
          @after-submit="getEmployees"
        />
      </div>
    </VueFinalModal>
    <header class="bg-gray-700 p-2 flex justify-between items-center">
      <h1>
        Empleados
      </h1>
      <div>
        <button
          type="button"
          class="hover:opacity-50 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isAdmin"
          @click="showModal = true"
        >
          <PlusCircleOutline class="w-6 h-6" />
        </button>
      </div>
    </header>
    <section class="bg-gray-700 mx-2 mt-2 p-2 rounded flex flex-col gap-2">
      <div
        v-if="!isAdmin"
        class="flex flex-col gap-2"
      >
        <Card
          v-for="employee in employees"
          :key="employee.rfc"
        >
          <div class="flex flex-col gap-1">
            <div class="flex justify-between items-center">
              <span>{{ employee.nombre + ' ' + employee.apellidos }}</span>
              <div class="flex gap-2">
                <RouterLink
                  class="rounded-md border px-2 py-1 hover:opacity-50"
                  :to="`/employee/${employee.codigo}`"
                >
                  Ver
                </RouterLink>
                <button
                  class="text-red-600 hover:opacity-50"
                  @click="deleteEmployee(employee.codigo)"
                >
                  <XCircleIcon />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div
        v-else
      >
        <Message
          title="Sin autorización"
          description="No cuenta autorización para realizar esta acción. Contacta al administrador."
          type="error"
        />
      </div>
    </section>
  </div>
</template>

<script>
import axios from './../../common/axios'
import Card from './../atoms/card.vue'
import PlusCircleOutline from './../icons/plus-circle-outline.vue'
import XCircleIcon from './../icons/x-circle.vue'
import EmployeeForm from './../employee-form.vue'
import Message from './../molecules/Message.vue'
import decode from 'jwt-decode'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Employees',
  components: {
    Card,
    PlusCircleOutline,
    XCircleIcon,
    EmployeeForm,
    Message
  },
  data () {
    const token = localStorage.getItem('token')
    const user = decode(token)
    const isAdmin = user?.codigo_puesto_laboral === 1
    return {
      token,
      employees: [],
      showModal: false,
      isAdmin: !isAdmin
    }
  },
  async mounted () {
    await this.getEmployees()
  },
  methods: {
    async getEmployees () {
      const response = await axios.get('/employee', {
        headers: {
          authorization: 'Bearer ' + this.token
        }
      })
      this.employees = response.data.rows
    },
    async deleteEmployee (codigo) {
      try {
        await axios.delete('/employee/' + codigo, {
          headers: {
            authorization: 'Bearer ' +this.token
          }
        })
        await this.getEmployees()
      } catch (err) {
        console.error(err)
      }
    }
  }
})
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
