<template>
  <ApolloMutation       
    :mutation="require('./graphql/createCollect.gql')"
    :variables="getVariables()"
    @done="addToTable"
  >
    <template slot-scope="{ mutate, loading, error }">    
      <p class="text-center">Cantidad de huevos recogidos</p>    
      <div class="text-center">Historial del día</div>
      <b-table
        responsive
        hover
        :items="items"
        :fields="fields"
        class="mb-7"> 
          <template slot="actions" slot-scope="data">
              <delete-collect-button 
                :collectionId="data.item.id"
                :onDelete="removeFromTable"
              />
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
import DeleteCollectButton from './DeleteCollectButton'
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
    DeleteCollectButton
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
      const { createCollect : { id }} = data
      this.items.push({
        number: this.items.length + 1,
        time: '09:00',
        quantity: this.quantity,
        id
      })
      window.scrollTo(0,document.body.scrollHeight);
    },
    removeFromTable(data){      
      const { data: { deleteCollect: { id, isSuccess } }  } = data      
      const element = this.items.findIndex(item => item.id === id )      
      this.items.splice(element,1)
    }
  }
}
</script>
<style>
table .flip-list-move {
  transition: transform 1s;
}
</style>
