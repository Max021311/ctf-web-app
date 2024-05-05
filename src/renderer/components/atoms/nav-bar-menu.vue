<template>
  <div class="flex justify-between w-full">
    <div class="flex gap-2">
      <RouterLink to='/' class='hover:opacity-50 bg-primary-800 px-2 py-1 rounded-md'>Registrar venta</RouterLink>
      <RouterLink to='/sales' class='hover:opacity-50 bg-primary-800 px-2 py-1 rounded-md'>Ventas</RouterLink>
      <RouterLink to='/employees' class='hover:opacity-50 bg-primary-800 px-2 py-1 rounded-md'>Empleados</RouterLink>
      <RouterLink to='/purchase_of_materials' class='hover:opacity-50 bg-primary-800 px-2 py-1 rounded-md'>Alta de materiales</RouterLink>
    </div>
    <div class="flex gap-2">
      <button
        class='hover:opacity-50 px-2 py-1 rounded-md'
        @click="logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar-menu',
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
