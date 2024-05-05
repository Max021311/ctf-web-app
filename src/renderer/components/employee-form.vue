<template>
  <FormKit
    type="form"
    actions-class="mt-2"
    :submit-label="isNewEmployee ? 'Crear' : 'Actualizar'"
    form-class="flex flex-col gap-2"
    @submit="submitHandler"
  >
    <FormKit
      type="email"
      label="Correo"
      name="email"
      validation="required"
      :value="employee?.email|| ''"
    />
    <FormKit
      v-if="isNewEmployee"
      type="password"
      label="Contraseña"
      name="password"
      validation="required"
      :value="employee?.password || ''"
    />
    <FormKit
      type="text"
      label="RFC"
      name="rfc"
      validation="required"
      :value="employee?.rfc || ''"
    />
    <FormKit
      type="text"
      label="Nombre"
      name="nombre"
      validation="required"
      :value="employee?.nombre || ''"
    />
    <FormKit
      type="text"
      label="Apellidos"
      name="apellidos"
      validation="required"
      :value="employee?.apellidos || ''"
    />
    <FormKit
      type="date"
      label="Fecha de nacimiento"
      name="fecha_nacimiento"
      validation="required"
      :value="employee?.fecha_nacimiento || ''"
    />
    <FormKit
      type="text"
      label="CURP"
      name="curp"
      validation="required|length:18,18"
      :value="employee?.curp || ''"
    />
    <FormKit
      type="text"
      label="NSS"
      name="nss"
      validation="required"
      :value="employee?.nss || ''"
    />
    <FormKit
      type="number"
      label="Sueldo"
      name="sueldo"
      validation="required|min:0"
      :value="employee?.sueldo || ''"
    />
    <FormKit
      type="select"
      label="Rol"
      name="codigo_puesto_laboral"
      validation="required"
      :value="employee?.codigo_puesto_laboral || 0"
    >
      <option
        v-for="jobTitle in jobTitles"
        :key="jobTitle.codigo"
        :value="jobTitle.codigo"
      >
        {{ jobTitle.nombre }}
      </option>
    </FormKit>
  </FormKit>
</template>

<script>
import { defineComponent } from 'vue'
import axios from './../common/axios'

export default defineComponent({
  name: 'EmployeeForm',
  props: {
    action: {
      type: String,
      required: true,
      validator (value) {
        return ['POST', 'PUT'].includes(value)
      }
    },
    employee: {
      type: Object
    }
  },
  emits: ['afterSubmit'],
  computed: {
    isNewEmployee () {
      return this.action === 'POST'
    }
  },
  data () {
    return {
      jobTitles: []
    }
  },
  async mounted () {
    await this.getJobTitles()
  },
  methods: {
    async submitHandler (form) {
      try {
        console.log(form)
        if (this.isNewEmployee) {
          await this.postEmployee(form)
        } else {
          await this.putEmployee(form)
        }
        this.$emit('afterSubmit', form)
      } catch (err) {
        console.error(err)
      }
    },
    async postEmployee (form) {
      await axios.post(
        '/employee',
        form,
        { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } }
      )
    },
    async putEmployee (form) {
      await axios.put('employee/' + this.employee.codigo, {
        ...form
      }, {
        headers: { authorization: 'Bearer ' + localStorage.getItem('token') }
      })
    },
    async getJobTitles () {
      const response = await axios.get('/job-title')
      this.jobTitles = response.data.rows
    }
  }
})
</script>
