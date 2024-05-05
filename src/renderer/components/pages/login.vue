<template>
  <overlay-notification
    v-if="notification !== null"
    :title="notification.title"
    :description="notification.description"
    :type="notification.type"
    @close="closeNotification"
  />
  <Card
    class="mx-auto transform top-0 translate-y-1/2 md:w-3/4 lg:w-2/3 mt-2 p-2 rounded-md"
    classes="bg-gray-700"
  >
    <h1 class="text-2xl mb-2 text-center font-bold">Inicia sesión</h1>
    <FormKit
      type="form"
      :actions="false"
      #default="{ disabled }"
      @submit="submitHandler"
    >
      <div class="grid grid-cols-1 gap-6">
        <FormKit
          type="email"
          name="email"
          label="Correo"
          label-class="text-base"
          validation="required"
        />
        <FormKit
          type="password"
          name="password"
          minlength="8"
          label="Contraseña"
          label-class="text-base"
          validation="required"
        />
        <FormKit
          type="submit"
          label="Iniciar sesión"
          :disabled="disabled"
          input-class="w-full text-base"
        />
      </div>
      <FormKitSummary />
    </FormKit>
  </Card>
</template>

<script>
import Card from './../atoms/card.vue'
import axios from './../../common/axios.js'
import OverlayNotification from './../molecules/overlay-notification.vue'
import sleep from './../../common/sleep.js'

export default {
  name: 'Login',
  components: {
    Card,
    OverlayNotification
  },
  data () {
    return {
      notification: null,
      timeoutId: null
    }
  },
  mounted () {
  },
  methods: {
    closeNotification () {
      this.notification = null
      window.clearTimeout(this.timeoutId)
    },
    async submitHandler (form) {
      this.closeNotification()
      try {
        const res = await axios.post(
          '/auth',
          { email: form.email, password: form.password },
          {
            baseURL: import.meta.env.VITE_AUTH_SERVER_HOST
          }
        )
        this.notification = {
          title: 'Inicio de sesión exitoso',
          description: 'En uno momento te redirigiremos.',
          type: 'success'
        }
        await sleep(1000)
        localStorage.setItem('token', res.data.token)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 401) {
          this.notification = {
            title: 'Error',
            description: 'Usuario o contraseña erronea.',
            type: 'error'
          }
        } else {
          this.notification = {
            title: 'Error',
            description: 'Algo sucedio. Intenta de nuevo mas tarde.',
            type: 'error'
          }
        }
        this.timeoutId = window.setTimeout(() => {
          this.notification = null
        }, 5000)
      }
    }
  }
}
</script>

<style scoped>

</style>
