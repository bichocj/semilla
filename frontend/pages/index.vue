<template>
  <div>
    <section class="mt-3">
      <p>Tareas de:</p>
      <section v-if="sheds">
        <b-tabs content-class="mt-3">
              <b-tab title="Recojo" active>
                  <p class="text-center">
                    Aqui puedes ingresar datos de cada galpon.
                    <br>
                    Escoge el <b>Número de Galpon</b> y la <b>Sección</b>
                  </p>
                  <div v-for="shed in sheds" :key="shed.name" class="d-flex my-2">
                    <div class="mx-3 my-auto">
                      <h1>{{ shed.name }}</h1>
                    </div>          
                    <b-button-group size="lg" class="flex-grow-1">
                      <b-button
                        v-for="section in shed.sections"
                        :key="section.id"
                        :to="`/recojo/galpon/${shed.name}-${section.name}`">
                        {{ section.name }}
                      </b-button>          
                    </b-button-group>
                  </div>                      
              </b-tab>
              <div class="text-center fixed-bottom pb-4">
                <b-link href="#foo">-- Ver Graficos --</b-link>
              </div>
              <b-tab title="Selección">
                  <p class="text-center">
                    Aqui puedes ingresar datos de selección de huevos.
                  </p>
                  <b-button variant="secondary" :block="true" to="/seleccion/huevos">
                    Ingresar datos
                  </b-button>
              </b-tab>
        </b-tabs>                                  
      </section>
      <h2 v-else>
        Loading...
      </h2>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";

const bookS_PER_PAGE = 2;
const books = gql`
  query getBooks {
    books {
      title
      author
    }
  }
`;
export default {
  name: "HomePage",
  data: () => ({
    loading: 0,
    sheds: [
      { id: 1, name: 1, sections: [{ id: 1, name: "A" }] },
      {
        id: 2,
        name: 2,
        sections: [
          { id: 2, name: "A" },
          { id: 3, name: "B" },
          { id: 4, name: "C" }
        ]
      },
      {
        id: 3,
        name: 3,
        sections: [
          { id: 5, name: "A" },
          { id: 6, name: "B" },
          { id: 7, name: "C" },
          { id: 8, name: "D" }
        ]
      }
    ]
  }),
  apollo: {
    $loadingKey: "loading",
    books: {
      query: books
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