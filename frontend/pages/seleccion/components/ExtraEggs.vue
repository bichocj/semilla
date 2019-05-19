<template>
  <div>
    <p>Peso de huevo sobrante</p>    
    <div class="pt-5 text-center">Historial del día</div>
    <b-table responsive hover :items="items" :fields="fields" class="mb-7"> 
        <template slot="actions" slot-scope="data">                            
            <b-button variant="danger">Eliminar</b-button>
        </template>
    </b-table>
    <BottomInput
      label="Agregar peso restante"
      :onSubmit="(val) => addItem(val)"
      />
  </div>
</template>
<script>
import BottomInput from './hooks/BottomInput'
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
        key: "weigth",
        sortable: true,
        label: "peso"
      },
      {
        key: "actions",
        label: ""
      }
    ],
  items: [
      { number: "1", weigth: 210 },
      { number: "2", weigth: 180 },
      { number: "3", weigth: 230 },
    ]
  }),
  components: {
    BottomInput,
  },
  methods: {
    addItem(val) {      
      this.items.push({
        number: this.items.length,
        weigth: val
      })
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
}
</script>
