<template>  
  <h2 v-if="loading > 0">
    Cargando ...
  </h2>
  <div v-else >    
    <div v-if="section" >
      <div>
          <div class="d-flex justify-content-center title">
              <div>{{shed}}</div>
              <div>-</div>
              <div>{{sectionName}}</div>
          </div>
          <div class="d-flex justify-content-center subtitle">
              <div>Galpon </div>
              <div class="mx-1"> - </div>
              <div> Sección</div>
          </div>
      </div>
      <section class="mt-3">            
          <div class="text-center">Ingresar nuevo recojo en</div>
          <DateTimePicker />
          <b-tabs content-class="mt-3">
              <b-tab title="Huevos" active>
                  <Eggs
                    label="agregar recojo"
                    onSubmit=""
                    :items="section.collects"
                  />
              </b-tab>
              <b-tab title="Gallinas muertas">
                  <Chicken
                    label="agregar gallinas"
                    onSubmit=""
                  />
              </b-tab>
          </b-tabs>                                
      </section>
    </div>
    <h2 v-else>
        No se pudo cargar la Sección ...
      </h2>
  </div>
</template>
<script>
import DateTimePicker from './components/DateTimePicker'
import Eggs from './components/Eggs'
import Chicken from './components/Chicken'
import gql from "graphql-tag";
const query = gql`
  query getSection($id: ID!) {
    section(id: $id) {
      id
      name
      collects {
        id
        quantity
      }      
    }
  }
`;
export default {
  name: "GalponPage",
  components: {
    DateTimePicker,    
    Eggs,
    Chicken
  },
  data: () => ({
    loading: 0,
    shed: "",
    sectionName: "",    
  }),
  apollo: {
    $loadingKey: "loading",
    section: {
      query: query,
      variables() {
        const val = this.$route.params.slug.split("-");
        return {
          "id": val[2]
        }
      }
    }
  },
  mounted() {
    const val = this.$route.params.slug.split("-");
    this.shed = val[0];
    this.sectionName = val[1];    
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
