<template>  
  <div>    
    <p class="text-center">Cantidad de huevos recogidos</p>    
    <div class="text-center">Historial del día</div>
    <b-modal 
      id="modal-confirmation1" 
      ref="modal" 
      title="Confirmación" 
      ok-title="Si, eliminar"
      ok-variant="danger"
      cancel-title="No, cancelar"
      centered 
      @ok="deleteCollection">

      <p class="mt-4 text-center">¿Seguro que deseas eliminar este registro?</p>
      <p class="mb-4 text-center">hora: {{ $dateFns.format(new Date(parseInt(deletingCollection.datetime)),'HH:mm') }}  - cantidad: {{deletingCollection.quantity}}</p>
    </b-modal>
    <b-table
      responsive
      hover
      :items="items"
      :fields="fields"
      class="mb-7">
         <template slot="index" slot-scope="data">
          {{ data.index + 1 }}
        </template>
        <template slot="time" slot-scope="data">            
             {{ $dateFns.format(new Date(parseInt(data.item.datetime)),'HH:mm') }} 
        </template>
        <template slot="show_details" slot-scope="data">
          <b-button size="sm" variant="outline-danger" @click="openModalConfirm(data.item)" ref="btnShow">
            <b-btn-close class="text-danger"/>
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row"></template>
    </b-table>
    <BottomInput
      label="Agregar cantidad de huevos"
      :onSubmit="(val) => { updateQuantity(val), addCollection()}"
      />        
  </div>
</template>
<script>
import BottomInput from "~/components/BottomInput";
import DeleteCollectButton from "./DeleteCollectButton";
import { format } from 'date-fns'
const addCollectionMutation = require('./graphql/createCollect.gql')
const deleteCollectMutation = require('./graphql/deleteCollect.gql')
export default {
  data: () => ({
    quantity: 0,
    fields: [
      {
        key: "index",
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
        label: "Cantidad",
        class: 'text-right'
      },
      {
        key: "show_details",
        sortable: false,
        label: "",
        class: 'text-right'
      },      
    ],
    deletingCollection: {}
  }),
  components: {
    BottomInput,
    DeleteCollectButton
  },
  props: ["items", "sectionId", "datetime"],
  methods: {
    addCollection() {      
      const datetime = this.datetime.getTime().toString()
      const variables = {
        quantity: this.quantity,
        sectionId: this.sectionId,
        datetime
      };

      this.$apollo.mutate({mutation: addCollectionMutation, variables}).then(data => this.addToTable(data))
    },
    deleteCollection(bvModalEvt){
      bvModalEvt.preventDefault()
      const variables = {id: this.deletingCollection.id}
      this.$apollo.mutate({mutation: deleteCollectMutation, variables}).then(data => {
        this.removeFromTable(data)
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      })
    },
    updateQuantity(val) {
      this.quantity = parseInt(val);      
    },    
    addToTable(data) {
      const { data: { createCollect: { id, quantity, datetime } } } = data;      
      this.items.push({
        id,        
        quantity,
        datetime
      });
      window.scrollTo(0, document.body.scrollHeight);
    },
    removeFromTable(data) {
      const { data: { deleteCollect: { id, isSuccess } } } = data;
      const element = this.items.findIndex(item => item.id === id);
      this.items.splice(element, 1);
    },
    openModalConfirm(item) {
      console.log(item)
      this.deletingCollection = item
      this.$root.$emit('bv::show::modal', 'modal-confirmation1', '#btnShow')
    }
  }
};
</script>
<style>
table .flip-list-move {
  transition: transform 1s;
}
</style>
