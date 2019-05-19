<template>
  <div>
    <p class="text-center">Cantidad de gallinas en mejor vida</p>    
    <div class="text-center">Historial del día</div>
    <b-table responsive hover :items="items" :fields="fields" class="mb-7"> 
        <template slot="actions" slot-scope="data">                            
            <b-button variant="danger">Eliminar</b-button>
        </template>
    </b-table>
    <BottomInput
      label="Agregar cantidad gallinas"
      :onSubmit="(val) => addItem(val)"
      />
  </div>
</template>
<script>
import BottomInput from '~/components/BottomInput'
export default {
  data: () => ({
    weigth: null,
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
  items: [
      { number: 1, time:"07:30", quantity: 210 },
      { number: 2, time:"08:30", quantity: 210 },
    ]
  }),
  components: {
    BottomInput,
  },
  methods: {
    addItem(val) {      
      this.items.push({
        number: this.items.length + 1,
        time: '09:00',
        quantity: val
      })
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
}
</script>