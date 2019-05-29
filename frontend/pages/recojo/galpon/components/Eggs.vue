<template>
  <ApolloMutation       
    :mutation="require('./graphql/createCollect.gql')"
    :variables="getVariables()"
    @done="addToTable"
  >
    <template slot-scope="{ mutate, loading, error }">    
      <p class="text-center">Cantidad de huevos recogidos</p>    
      <div class="text-center">Historial del día</div>
      <b-table responsive hover :items="items" :fields="fields" class="mb-7"> 
          <template slot="actions" slot-scope="data">                            
              <b-button variant="danger">Eliminar</b-button>
          </template>
      </b-table>
      <BottomInput
        label="Agregar cantidad de huevos"
        :onSubmit="(val) => { updateQuantity(val), mutate()}"
        />    
    </template>
  </ApolloMutation>
</template>
<script>
import BottomInput from '~/components/BottomInput'
export default {
  data: () => ({
    quantity: 23,
    fields: [
      {
        key: "number",
        sortable: true,
        label: "#"
      },
      {
        key: "time",
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
  }),
  components: {
    BottomInput,
  },
  props: [
    'items',
    'sectionId',
  ],
  methods: {
    updateQuantity(val){
      this.quantity = parseInt(val)
    },
    getVariables() {      
      return {
        quantity: this.quantity,
        sectionId: this.sectionId,
      }
    },
    addToTable(data) {      
      this.items.push({
        number: this.items.length + 1,
        time: '09:00',
        quantity: this.quantity
      })
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
}
</script>