<template>
  <div>
    <section class="mx-2 mt-5">
      <section v-if="sheds">      
        <div class="d-flex mb-5">
          <label for="date-picker-custom-input" class="my-auto">
            Fecha
          </label>
          <b-input
            id="date-picker-custom-input"            
            v-model="dateAt"
            class="ml-2"
            placeholder="Seleccion una fecha"
            required />                      
        </div>
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
        <div v-for="shed in sheds" :key="shed.name" class="d-flex my-2">
          <div class="mx-3 my-auto">
            <h1>{{ shed.name }}</h1>
          </div>          
          <b-button-group size="lg" class="flex-grow-1">
            <b-button v-for="section in shed.sections" :key="section.id" >
              {{ section.name }}
            </b-button>          
          </b-button-group>
        </div>    
        <div class="text-center fixed-bottom pb-4">
          <b-link href="#foo">-- Ver Graficos --</b-link>
        </div>
      </section>
      <h2 v-else>
        Loading...
      </h2>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'

const bookS_PER_PAGE = 2
const books = gql`
  query getBooks {
    books{
      title
      author
    }
  }
`
export default {
  name: 'HomePage',
  components: {
    datePicker: VuePersianDatetimePicker
  },
  data: () => ({
    loading: 0,
    dateAt: null,
    sheds: [
      { id: 1, name:1, sections: [ { id: 1, name: 'A'}  ] },
      { id: 2, name:2, sections: [ { id: 2, name: 'A'}, { id: 3, name: 'B'}, { id: 4, name: 'C'}  ] },
      { id: 3, name:3, sections: [ { id: 5, name: 'A'}, { id: 6, name: 'B'}, { id: 7, name: 'C'}, { id: 8, name: 'D'}  ] },
    ]
  }),
  apollo: {
    $loadingKey: 'loading',
    books: {
      query: books,      
    },    
  },
  mounted(){
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
<style scoped>
  .btn-group > .btn:not(:first-child){
    border-left: 2px solid;
  }
  .btn-group > .btn:not(:last-child){  
    border-right: 2px solid;
  }
</style>