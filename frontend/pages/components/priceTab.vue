<template>
  <div>
    <p class="text-center">
      Aqui puedes ingresar el <b>precio actual del kilo de huevo</b>
    </p>
    última actualizacion: {{ $dateFns.format(lastUpdateOfPrice,'DD/MM/YYYY HH:mm') }}     
    <b-form-input
      v-model="price"        
      placeholder="ingrese peso"
      type="number">
    </b-form-input>    
    <br>      
    <b-button variant="primary" :block="true" @click="updateValues()">Guardar</b-button>
  </div>
</template>
<script>
const updatePrice = require('./graphql/updatePrice.gql')
import { format } from 'date-fns'
export default {
  name: "WeightTab",    
  props: [
    "price",
    "lastUpdateOfPrice"
  ],
  methods: {
    async updateValues() {            
      const variables = {price: parseFloat(this.price)}
      await this.$apollo.mutate({mutation: updatePrice, variables})  
      this.lastUpdateOfPrice = new Date()    
    }
  }
}
</script>

