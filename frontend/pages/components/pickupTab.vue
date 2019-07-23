<template>
  <div>
    <p class="text-center">
      Aqui puedes ingresar datos de cada galpon.
      <br>
      Escoge el <b>Número de Galpon</b> y la <b>Sección</b>
    </p>
    <div v-for="campaing in data.campaings" :key="campaing.name" class="d-flex my-2">
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
  </div>
</template>
<script type="text/javascript">
export default {
  name: "PickupTab",
  props: ["data"]
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