<template>
  <div>
    
    
    <b-form-group
      id="date-picker-custom-input"
      label-cols-sm="4"
      label-cols-lg="3"                        
      label="Ingresar huevo seleccionado en fecha"
      label-for="date-picker-custom-input">
      <b-form-input id="date-picker-custom-input" v-model="dateAt" required></b-form-input>
    </b-form-group>
    <date-picker
      v-model="dateAt"
      :color="'#ed6f6f'"
      :jump-minute="15"      
      locale="es"
      format="YYYY-MM-DD"
      element="date-picker-custom-input"
      class="w-100"          
    />

    <b-tabs content-class="mt-3">
      <b-tab title="A" active>
        <GoodEggs/>        
      </b-tab>
      <b-tab title="Blancos">
        <GoodEggs/>        
      </b-tab>
      <b-tab title="Sobrante">
        <ExtraEggs/>
      </b-tab>
      <b-tab title="Quiñados">
        <BrokenEggs/>
      </b-tab>
      <b-tab title="Baja">
        <BrokenEggs/>
      </b-tab>
    </b-tabs>   
  </div>
</template>
<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import utils from '~/utils/utils';
import GoodEggs from './components/GoodEggs';
import BrokenEggs from './components/BrokenEggs';
import ExtraEggs from './components/ExtraEggs';
export default {
  components: {
    datePicker: VuePersianDatetimePicker,
    GoodEggs,
    BrokenEggs,
    ExtraEggs
  },
  mixins: [utils],
  data: () => ({ 
    dateAt: null
  }),
  mounted() {
    this.dateAt = this.getToday();
  }
}
</script>