<template>
  <ApolloQuery
      :query="require('../graphql/campaings.gql')"
      :variables="{withResumeOfToday:true}"
    >      
    <template slot-scope="{ result: { loading, error, data } }">              
      <h2 v-if="loading || data === null">
        <LoadingAnimation />
      </h2>
      <section class="mt-3" v-else>        
        <section v-if="data">          
          <b-tabs content-class="mt-3">
            <b-tab :title="`Galpon ${campaing.barn.name}`" v-for="campaing in data.campaings" :key="campaing.barn.name">
              <div>
                <ul>
                  <li>Precio de kilo de huevo:  {{formatNumber(campaing.resumeOfToday.amountIn/campaing.resumeOfToday.weightEggsCollected || 0 )}}</li>
                  <li>Peso promedio por huevo:  {{campaing.resumeOfToday.weightEggsCollected/campaing.resumeOfToday.quantityEggsCollected || 0 }} kg</li>
                </ul>
                <ul>
                  <li>Cantidad de huevo recogidos:  {{campaing.resumeOfToday.quantityEggsCollected}}</li>
                  <li>Peso total recogido: {{formatNumber(campaing.resumeOfToday.weightEggsCollected)}} kg</li>
                  <li>Ingreso esperado: s/. {{formatNumber(campaing.resumeOfToday.amountIn)}}</li>
                </ul>
                <ul>
                  <li>Alimento consumido: {{formatNumber(campaing.resumeOfToday.foodConsumed)}} kg</li>
                  <li>Costo de alimento: s/. {{formatNumber(campaing.resumeOfToday.amountOut)}}</li>
                </ul>
                <ul>
                  <li><b>Total: s/. {{formatNumber(campaing.resumeOfToday.amountTotal)}}</b></li>
                </ul>
              </div>
            </b-tab>              
          </b-tabs>
          <hr/>
        </section>
      </section>
    </template>
  </ApolloQuery>
</template>
<script>
// const variablesQuery = require('../graphql/variables.gql')
export default {
  data: () => ({
    price: ""
  }),
  mounted() {
    /*
    this.$apollo.query({query: variablesQuery}).then(({data}) => { 
      this.price = data.variables.price
    })
    */
  },
  methods: {
    formatNumber(value) {
      return parseFloat(Math.round(value * 100) / 100).toFixed(2);
    }
  }
}
</script>
