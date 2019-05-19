<template>
  <div>
    <p>Cantidad de unidades rotas</p>    
    <div class="pt-5 text-center">Historial del día</div>
    <b-table responsive hover :items="items" :fields="fields" class="mb-7"> 
        <template slot="actions" slot-scope="data">                            
            <b-button variant="danger">Eliminar</b-button>
        </template>
    </b-table>
    <BottomInput
      label="Agregar cantidad rotos"
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
        key: "quantity",
        sortable: true,
        label: "peso"
      },
      {
        key: "actions",
        label: ""
      }
    ],
  items: [
      { number: "1", quantity: 210 },
    ]
  }),
  components: {
    BottomInput,
  },
  methods: {
    addItem(val) {      
      this.items.push({
        number: this.items.length,
        quantity: val
      })
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
}
</script>