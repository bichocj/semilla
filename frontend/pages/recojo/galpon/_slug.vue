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
                <Eggs
                  label="agregar recojo"
                  onSubmit=""
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
</template>
<script>
import Eggs from './components/Eggs'
import Chicken from './components/Chicken'
export default {
  name: "GalponPage",
  components: {    
    Eggs,
    Chicken
  },
  data: () => ({
    loading: 0,
    shed: "",
    section: "",    
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
