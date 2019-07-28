<template>
  <div>
    <p class="text-center">
      Aqui puedes ingresar el <b>peso y costo del kilo de alimento cada galpon</b>
    </p>
    última actualizacion: {{ $dateFns.format(lastUpdateOfFood,'DD/MM/YYYY HH:mm') }} 
    <div v-for="campaing in data.campaings" :key="campaing.name" class="d-flex my-2">
      <div class="mx-3 my-auto">
        <h1>{{ campaing.barn.name }}</h1>
      </div>     

      <b-input-group append="kg">     
        <b-form-input
          v-model="campaing.foodWeightPerDay"        
          placeholder="ingrese peso"
          type="number">
        </b-form-input>
      </b-input-group>
      <div class="mx-2"/>
      <b-input-group prepend="s/.">     
        <b-form-input
          v-model="campaing.foodPrice"        
          placeholder="ingrese costo"
          type="number">
        </b-form-input>
      </b-input-group>
    </div>
    <b-button variant="primary" :block="true" @click="updateValues()">Guardar</b-button>
  </div>
</template>
<script>
const updateFood = require('./graphql/updateFood.gql')
import { format } from 'date-fns'
export default {
  name: "ConsumptionTab",  
  props: [
    "data",
    "lastUpdateOfFood"
  ],
  methods: {
    async updateValues() {      
      const values = []
      if(this.data.campaings){
        this.data.campaings.forEach(({id, foodWeightPerDay, foodPrice})=> {        
          const foodWeightPerDayTmp = parseFloat(foodWeightPerDay)
          const foodPriceTmp = parseFloat(foodPrice)
          values.push({campaingId: id, foodWeightPerDay: foodWeightPerDayTmp, foodPrice: foodPriceTmp})
        })
        const variables = {
          items: values
        }
        await this.$apollo.mutate({mutation: updateFood, variables})
      }
    }
  }
}
</script>

