<template>
  <h2 v-if="loading > 0">
    Loading...
  </h2>
  <div v-else>    
    <div>
        <div class="d-flex justify-content-center title">
            <div>{{shed}}</div>
            <div>-</div>
            <div>{{section}}</div>
        </div>
        <div class="d-flex justify-content-center subtitle">
            <div>Galpon </div>
            <div class="mx-1"> - </div>
            <div> Sección</div>
        </div>
    </div>

    <section class="mt-3">            
        <Strong>Conteo de</Strong>
        <b-tabs content-class="mt-3">
            <b-tab title="Huevos" active>
                <Counting :items='items' :fields='fields' />
            </b-tab>
            <b-tab title="Gallinas muertas">
                <Counting :items='items' :fields='fields' />
            </b-tab>
        </b-tabs>                                
    </section>
  </div>
</template>
<script>
import Counting from '~/components/Counting'
export default {
  name: "GalponPage",
  components: {
    Counting
  },
  data: () => ({
    loading: 0,
    shed: "",
    section: "",
    fields: [
      {
        key: "time",
        sortable: true,
        label: "Hora"
      },
      {
        key: "quantity",
        sortable: true,
        label: "Cantidad"
      },
      {
        key: "actions",
        label: ""
      }
    ],
    items: [
      { time: "6:00", quantity: 210 },
      { time: "8:30", quantity: 180 },
      { time: "9:00", quantity: 230 },
      { time: "12:00", quantity: 120 }
    ]
  }),
  mounted() {
    const val = this.$route.params.slug.split("-");
    this.shed = val[0];
    this.section = val[1];
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
