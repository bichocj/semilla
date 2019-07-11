 <template>
  <ApolloQuery
    :query="require('./graphql/section.gql')"
    :variables="getVariables()"
  >
    <template slot-scope="{ result: { loading, error, data } }">      
      <h2 v-if="loading || data === null">
        <LoadingAnimation />
      </h2>
      <div v-else >    
        <div v-if="data" >
          <div class="text-center">Ingresar nuevo recojo en</div>
          <div>
              <div class="d-flex justify-content-center subtitle">
                  <div>Galpon </div>
                  <div class="mx-1"> - </div>
                  <div> Sección</div>
              </div>
              <div class="d-flex justify-content-center title">
                  <div>{{shed}}</div>
                  <div>-</div>
                  <div>{{sectionName}}</div>
              </div>
          </div>
          <section class="mt-3">                          
              <DateTimePicker :onChangeDate="updateDate" :onChangeTime="updateTime" />
              <b-tabs content-class="mt-3">
                  <b-tab title="Huevos" active>
                      <Eggs
                        label="agregar recojo"
                        onSubmit=""
                        :sectionId="sectionId"
                        :items="data.section.collects"
                      />
                  </b-tab>
                  <b-tab title="Gallinas muertas">
                      <Chicken
                        label="agregar gallinas"
                        onSubmit=""
                        :sectionId="sectionId"
                        :items="data.section.deads"
                      />
                  </b-tab>
              </b-tabs>                                
          </section>
        </div>
        <h2 v-else>
            No se encontró esta section...
          </h2>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import DateTimePicker from './components/DateTimePicker'
import Eggs from './components/Eggs'
import Chicken from './components/Chicken'
import gql from "graphql-tag";
export default {
  name: "GalponPage",
  components: {
    DateTimePicker,    
    Eggs,
    Chicken
  },
  data: () => ({
    loading: 0,
    sectionId: null,
    shed: "",
    sectionName: "",    
  }),
  mounted() {
    const val = this.$route.params.slug.split("-");
    this.shed = val[0];
    this.sectionName = val[1];    
    this.sectionId = val[2];    
  },
  methods: {
    getVariables() {            
      const val = this.$route.params.slug.split("-");
      return {
        "id": val[2]
      }
    },
    updateDate(val) {      
      console.log('updateDate', val)
    },
    updateTime(val) {
      console.log('updateTime', val)
    }
  }
};
</script>
<style>
.title {
  font-size: 40px;
}
.subtitle {
  font-size: 20px;
}
</style>
