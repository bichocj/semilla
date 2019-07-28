<template>
  <div>
    <p class="text-center">
      Aqui puedes ingresar el <b>peso promedio de un huevo cada galpon</b>, considere ingresar 4 decimales.
    </p>
    última actualizacion: {{ $dateFns.format(lastUpdateOfAverageWeightPerEgg,'DD/MM/YYYY HH:mm') }} 
    <div v-for="campaing in data.campaings" :key="campaing.name" class="d-flex my-2">
      <div class="mx-3 my-auto">
        <h1>{{ campaing.barn.name }}</h1>
      </div>
      <b-input-group append="kg">          
        <b-form-input
          v-model="campaing.averageWeightPerEgg"        
          placeholder="ingrese peso"
          type="number">
        </b-form-input>      
      </b-input-group>
    </div>
    <b-button variant="primary" :block="true" @click="updateValues()">Guardar</b-button>
  </div>
</template>
<script>
const updateAverageWeights = require('./graphql/updateAverageWeights.gql')
import { format } from 'date-fns'
export default {
  name: "WeightTab",  
  props: [
    "data",
    "lastUpdateOfAverageWeightPerEgg"
  ],
  methods: {
    async updateValues() {      
      const values = []
      if(this.data.campaings){
        this.data.campaings.forEach(({id, averageWeightPerEgg})=> {        
          const parsed = parseFloat(averageWeightPerEgg)
          values.push({campaingId: id, averageWeightPerEgg: parsed})
        })
        const variables = {
          items: values
        }
        await this.$apollo.mutate({mutation: updateAverageWeights, variables})
      }
    }
  }
}
</script>

