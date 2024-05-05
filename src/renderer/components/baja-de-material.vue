<template>
  <Card>
    <FormKit
      type='group'
      :name='`entry-remove-${id}`'
    >
      <div class='grid grid-cols-3 gap-2'>
        <div class='col-span-2'>
          <FormKit
            outer-class='col-span-2'
            type='select'
            name='codigo_material'
            :options='selectMaterial'
            v-model='material'
          />
        </div>
        <FormKit
          v-model='cantidad'
          :errors='amountErrors'
          type='number'
          validation='+required'
          name='cantidad'
        />
      </div>
    </FormKit>
  </Card>
</template>

<script>
import { defineComponent } from 'vue'
import Card from './atoms/card.vue'

export default defineComponent({
  components: {
    Card
  },
  name: 'removeMaterial.vue',
  props: {
    selectMaterial: {
      type: Array,
      required: true
    },
    materials: {
      type: Array,
      required: true
    },
    id: {
      type: Number
    }
  },
  data () {
    return {
      material: 0,
      cantidad: 0
    }
  },
  computed: {
    amountErrors () {
      if (this.material > 0 && this.cantidad <= 0) {
        return  ['La cantidad no puede ser menor o igual a cero']
      } else if (this.material === 0 && !!this.cantidad) {
        return ['La cantidad debe ser cero']
      }
      return []
    }
  }
})
</script>
