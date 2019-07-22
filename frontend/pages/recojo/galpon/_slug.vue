 <template>
  <div>        
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
      <DateTimePicker :onChangeDateTime="updateDateTime" :onChangeDate="updateDate" />
      <h2 v-if="loading || data === null">
        <LoadingAnimation />
      </h2>
      <div v-else >    
        <div v-if="data" >
          <b-tabs content-class="mt-3">
              <b-tab title="Huevos" active>
                  <Eggs
                    label="agregar recojo"
                    onSubmit=""
                  :datetime="datetime"
                    :sectionId="sectionId"
                    :items="data.section.collects"
                  />
              </b-tab>
              <b-tab title="Gallinas muertas">
                  <Chicken
                    label="agregar gallinas"
                    onSubmit=""
                  :datetime="datetime"
                    :sectionId="sectionId"
                    :items="data.section.deads"
                  />
              </b-tab>
          </b-tabs>   
        </div>
        <h2 v-else>
            No se encontró esta section...
          </h2>
      </div>                               
    </section>      
  </div>
</template>
<script>
import DateTimePicker from './components/DateTimePicker'
import Eggs from './components/Eggs'
import Chicken from './components/Chicken'
const sectionQuery = require('./graphql/section.gql')
export default {
  name: "GalponPage",
  components: {
    DateTimePicker,    
    Eggs,
    Chicken
  },
  data: () => ({
    loading: 0,
    data: null,
    sectionId: null,
    shed: "",
    sectionName: "",    
    datetime: new Date()
  }),
  mounted() {
    const val = this.$route.params.slug.split("-");
    this.shed = val[0];
    this.sectionName = val[1];    
    this.sectionId = val[2];    
    this.datetime = new Date()
    this.loadData()
  },
  methods: {
    loadData() {
      const datetime = this.datetime.getTime().toString()  
      const variables = {
        "id": this.sectionId,
        datetime
      }      
      this.loading = true      
      this.$apollo.query({query: sectionQuery, variables}).then(data => {         
        this.loading = false
        this.data = data.data
      })
    },
    updateDateTime(val) {            
      this.datetime = val    
    },
    updateDate(val) {            
      this.datetime = val
      this.loadData()
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
