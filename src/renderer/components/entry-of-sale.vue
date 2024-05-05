<template>
  <Card>
    <FormKit
      type='group'
      :name='`entry-${id}`'
    >
      <div class='grid grid-cols-5 gap-2 justify-between'>
        <div class='col-span-3'>
          <FormKit
            type='select'
            name='codigo_producto'
            :options='selectProduct'
            v-model='product'
          />
        </div>
        <FormKit
          v-model='cantidad'
          :errors='amountErrors'
          type='number'
          validation='+required'
          name='cantidad'
        />
        <FormKit
            v-model='precio'
            type='number'
            validation='min:0'
            :validation-messages='{
              min: "Debe mayor o igual 0"
            }'
            name='precio'
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
  name: 'entryOfSale.vue',
  props: {
    selectProduct: {
      type: Array,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    id: {
      type: Number
    }
  },
  data () {
    return {
      product: 0,
      precio: 0,
      cantidad: 0
    }
  },
  watch: {
    'product': {
      handler () {
        const product = this.products.find(p => p.codigo === this.product)
        this.precio = product?.precio || 0
      },
      deep: true
    }
  },
  computed: {
    amountErrors () {
      if (this.product > 0 && this.cantidad <= 0) {
        return  ['La cantidada no puede ser menor o igual a cero']
      } else if (this.product === 0 && !!this.cantidad) {
        return ['La cantidad debe ser cero']
      }
    }
  }
})
</script>
