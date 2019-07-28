 <template>
    <ApolloQuery
      :query="require('./graphql/campaings.gql')"
      :variables="{withSection:true}"
    >      
      <template slot-scope="{ result: { loading, error, data } }">              
        <h2 v-if="loading || data === null">
          <LoadingAnimation />
        </h2>
        <section class="mt-3" v-else>
          <p>Tareas de:</p>
          <section v-if="data">
            <b-tabs content-class="mt-3">
                  <b-tab title="Recojo" active>
                    <PickupTab :data="data" />             
                  </b-tab>
                  <b-tab title="Peso">
                    <WeightTab :data="data" :lastUpdateOfAverageWeightPerEgg="lastUpdateOfAverageWeightPerEgg" />
                  </b-tab>
                  <b-tab title="Consumo">
                    <ConsumptionTab :data="data" :lastUpdateOfFood="lastUpdateOfFood" />
                  </b-tab>
                  <b-tab title="Precio">
                    <PriceTab :price="price" :lastUpdateOfPrice="lastUpdateOfPrice" />
                  </b-tab>
                  <!--
                  <b-tab title="Selección">
                      <p class="text-center">
                        Aqui puedes ingresar datos de selección de huevos.
                      </p>
                      <b-button variant="secondary" :block="true" to="/seleccion/huevos">
                        Ingresar datos
                      </b-button>
                  </b-tab>
                  <div class="text-center fixed-bottom pb-4">
                    <b-link href="/graficos">-- Ver Graficos --</b-link>
                  </div>
                  -->
            </b-tabs>                                  
          </section>
          <h2 v-else>
            No se encontró ninguna campaña vigente
          </h2>
        </section>    
      </template>
    </ApolloQuery>
</template>
<script>
import PickupTab from "./components/pickupTab"
import PriceTab from "./components/priceTab"
import WeightTab from "./components/weightTab"
import ConsumptionTab from "./components/consumptionTab"
const variablesQuery = require('./graphql/variables.gql')
export default {
  data: () => ({
    lastUpdateOfAverageWeightPerEgg: null,
    lastUpdateOfFood: null,
    lastUpdateOfPrice: null,
    price: null
  }),
  components: {
    PickupTab,
    WeightTab,
    PriceTab,
    ConsumptionTab
  },
  mounted() {
    this.$apollo.query({query: variablesQuery}).then(({data}) => { 
      const { variables: {lastUpdateOfAverageWeightPerEgg, lastUpdateOfPrice, lastUpdateOfFood, price }} = data
      this.lastUpdateOfAverageWeightPerEgg = new Date(parseInt(lastUpdateOfAverageWeightPerEgg))
      this.lastUpdateOfPrice = new Date(parseInt(lastUpdateOfPrice))
      this.lastUpdateOfFood = new Date(parseInt(lastUpdateOfFood))
      this.price = price
    })
  }
}
</script>