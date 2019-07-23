<template>
  <div>
    <p class="text-center">
      Aqui puedes ingresar el <b>peso promedio de un huevo cada galpon</b>, considere ingresar 4 decimales.
    </p>
    última actualizacion: ##/##/##
    <div v-for="campaing in data.campaings" :key="campaing.name" class="d-flex my-2">
      <div class="mx-3 my-auto">
        <h1>{{ campaing.barn.name }}</h1>
      </div>          
      <b-form-input
        v-model="campaing.averageWeight"        
        placeholder="ingrese peso"
        type="number">
      </b-form-input>      
    </div>
    <b-button variant="primary" :block="true" @click="updateValues()">Guardar</b-button>
  </div>
</template>
<script>
const updateAverageWeights = require('./graphql/updateAverageWeights.gql')
export default {
  name: "WeightTab",  
  props: [
    "data"
  ],
  methods: {
    async updateValues() {      
      const values = []
      if(this.data.campaings){
        this.data.campaings.forEach(({id, averageWeight})=> {        
          const parsed = parseFloat(averageWeight)
          values.push({id, averageWeight: parsed})
        })
        const variables = {
          items: values
        }
        console.log(variables)
        await this.$apollo.mutate({mutation: updateAverageWeights, variables})
        // await this.$apollo.mutate({mutation: updateAverageWeights, variables})
      }
    }
  }
}
</script>

