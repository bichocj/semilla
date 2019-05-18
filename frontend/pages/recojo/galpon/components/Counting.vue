<template>
  <div>
    <div class="d-flex">
      <b-form-group
          id="date-picker-custom-input"
          label-cols-sm="4"
          label-cols-lg="3"                        
          label="Fecha"
          label-for="date-picker-custom-input">
          <b-form-input id="date-picker-custom-input" v-model="dateAt" required></b-form-input>
      </b-form-group>
      <div class="mx-3"></div>
      <b-form-group
        id="time-picker-custom-input"
        label-cols-sm="4"
        label-cols-lg="3"                        
        label="Hora"
        label-for="time-picker-custom-input">
        <b-form-input id="time-picker-custom-input" v-model="timeAt" required></b-form-input>
    </b-form-group>        
    </div>
    <date-picker
      v-model="dateAt"
      :color="'#ed6f6f'"
      :jump-minute="15"      
      locale="es"
      format="YYYY-MM-DD"
      element="date-picker-custom-input"
      class="w-100"          
    />
    <date-picker
      v-model="timeAt"
      :color="'#ed6f6f'"
      :jump-minute="10"
      locale="es"
      format="hh:mm"
      element="time-picker-custom-input"
      class="w-100"
      type="time-a"  
    />                            
    <b-form-group
        id="quantity"
        label-cols-sm="4"
        label-cols-lg="3"                        
        label="Cantidad"
        label-for="input-horizontal"
        >
        <b-form-input id="quantity" v-model="quantity" type="number" required></b-form-input>
    </b-form-group>   
    <b-button variant="primary" :block="true">Guardar</b-button>
    
    <div class="pt-5 text-center">Historial del día</div>
    <b-table responsive striped hover :items="items" :fields="fields">
        <template slot="actions" slot-scope="data">                            
            <b-button variant="danger">Eliminar</b-button>
        </template>
    </b-table>
  </div>
</template>
<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import utils from '~/utils/utils';

export default {
  name: "Counting",
  components: {
    datePicker: VuePersianDatetimePicker
  },
  mixins: [utils],
  data: () => ({ 
    dateAt: null,
    timeAt: null,
    quantity: null,
  }),
  props: [
    'items',
    'fields'
  ],
  mounted() {
    this.dateAt = this.getToday();
    this.timeAt = this.getTime();
  }
}
</script>