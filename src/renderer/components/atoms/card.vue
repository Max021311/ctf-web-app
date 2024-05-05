<template>
  <div
    :class="[
      'p-2 rounded-md',
      classes ? classes : 'bg-primary-700'
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    classes: String
  },
  name: 'card'
}
</script>

<style scoped>

</style>
