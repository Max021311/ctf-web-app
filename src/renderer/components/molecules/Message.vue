<template>
  <div
    :class="[
      'rounded-r-md p-4 border-l-4',
      classes.container
    ]"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <component
          :is="icon"
          :class="[
            'h-5 w-5',
            classes.icon
          ]"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <h3
          v-if="title"
          :class="[
            'text-sm font-medium mb-2',
            classes.title
          ]"
        >
          {{ title }}
        </h3>
        <div
          :class="[
            'text-sm',
            classes.description
          ]"
        >
          <p> {{ description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CheckCircle from './../icons/check-circle.vue'
import XCircle from './../icons/x-circle.vue'

const colors = {
  success: {
    container: `border-green-400 bg-green-50`,
    icon: `text-green-400`,
    title: `text-green-800`,
    description: `text-green-700`
  },
  error: {
    container: `border-red-400 bg-red-50`,
    icon: `text-red-400`,
    title: `text-red-800`,
    description: `text-red-700`
  }
}

export default defineComponent({
  components: {
    CheckCircle,
    XCircle
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    description: {
      type: String,
      default: 'Notification description'
    },
    type: {
      type: String,
      default: 'success',
      validator (value) {
        return ['success', 'error'].includes(value)
      }
    }
  },
  computed: {
    icon () {
      return this.type === 'success' ? CheckCircle : XCircle
    },
    classes () {
      return colors[this.type]
    }
  }
})
</script>
