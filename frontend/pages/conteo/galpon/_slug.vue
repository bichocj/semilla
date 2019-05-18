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

    <section class="mt-5">
        
        <b-form-group
            id="date-picker-custom-input"
            label-cols-sm="4"
            label-cols-lg="3"
            description="fecha de recojo de huevos."
            label="Fecha"
            label-for="date-picker-custom-input"
            >
            <b-form-input id="date-picker-custom-input" v-model="dateAt" required></b-form-input>
        </b-form-group>        

        <date-picker
          v-model="dateAt"
          :color="'#ed6f6f'"
          :jump-minute="15"
          :locale-config="localeConfig"
          locale="es"
          format="YYYY-MM-DD"
          element="date-picker-custom-input"
          class="w-100"          
          />            
                   
        <b-form-group
            id="quantity"
            label-cols-sm="4"
            label-cols-lg="3"
            description="cantidad de huevos recogidos."
            label="Cantidad"
            label-for="input-horizontal"
            >
            <b-form-input id="quantity" v-model="quantity" type="number" required></b-form-input>
        </b-form-group>   

        <b-button variant="primary" block="true">Guardar</b-button>

        <br>
        <br>
        ... aqui tabla de conteos anterios de la fecha
     
    </section>
  </div>
</template>
<script>
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
export default {
    name: 'GalponPage',
    components: {
        datePicker: VuePersianDatetimePicker
    },
    data: () => ({
      loading: 0,
      shed: '',
      section: '',
      dateAt: null,
      quantity: 0,
    }),
    mounted() {
        const val = this.$route.params.slug.split('-')
        this.shed = val[0]
        this.section = val[1]
        this.dateAt = this.getToday()
    },
    methods: {
        getToday(){
        const today = new Date();
        //Isolate the day, the month and the year from the date
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        const yyyy = today.getFullYear();

        //combine the date elements as mm/dd/yy
        //start by creating a leading zero for single digit days and months
        if(dd<10) {
            dd = '0' + dd
        }

        if(mm<10) {
            mm = '0' + mm
        }

        return  yyyy + '-' + mm + '-' + dd;
        }
    }
 }
</script>
<style>
.title {
    font-size: 40px;
}
.subtitle {
    font-size: 20px;
}
</style>
