<template>
  <div class="w-screen text-white h-screen">
    <atoms-top-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import AtomsTopBar from './components/atoms/TopBar.vue'

export default {
  components: { AtomsTopBar },
  name: 'App',
}
</script>
