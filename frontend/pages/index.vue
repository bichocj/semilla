<template>
  <div>
    <section class="mt-3">
      <p>Tareas de:</p>
      <section v-if="campaings">
        <b-tabs content-class="mt-3">
              <b-tab title="Recojo" active>
                  <p class="text-center">
                    Aqui puedes ingresar datos de cada galpon.
                    <br>
                    Escoge el <b>Número de Galpon</b> y la <b>Sección</b>
                  </p>
                  <div v-for="campaing in campaings" :key="campaing.name" class="d-flex my-2">
                    <div class="mx-3 my-auto">
                      <h1>{{ campaing.barn.name }}</h1>
                    </div>          
                    <b-button-group size="lg" class="flex-grow-1">
                      <b-button
                        v-for="section in campaing.sections"
                        :key="section.id"
                        :to="`/recojo/galpon/${campaing.barn.name}-${section.name}-${section.id}`">
                        {{ section.name }}
                      </b-button>          
                    </b-button-group>
                  </div>                      
              </b-tab>
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
        </b-tabs>                                  
      </section>
      <h2 v-else>
        Cargando ...
      </h2>
    </section>    
  </div>
</template>

<script>
import gql from "graphql-tag";
const campaings = gql`
  query getCampaings {
    campaings {
      id
      year
      month
      startAt
      endAt
      barn {
        id
        name
      }
      sections {
        id
        name
      }
    }
  }
`;
export default {
  name: "HomePage",
  data: () => ({
    loading: 0,    
  }),
  apollo: {
    $loadingKey: "loading",
    campaings: {
      query: campaings
    }
  }
};
</script>
<style scoped>
.btn-group > .btn:not(:first-child) {
  border-left: 2px solid;
}
.btn-group > .btn:not(:last-child) {
  border-right: 2px solid;
}
</style>