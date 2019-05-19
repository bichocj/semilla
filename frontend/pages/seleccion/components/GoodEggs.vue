<template>
  <div>
    <p class="text-center">Peso de paquete de huevo pesado</p>    
    <div class="pt-0 text-center">Historial del día</div>
    <b-table responsive hover :items="items" :fields="fields" class="mb-7"> 
        <template slot="actions" slot-scope="data">                            
            <b-button variant="danger">Borrar</b-button>
        </template>
    </b-table>
    <BottomInput
      label="Agregar peso paquete"
      :onSubmit="(val) => addItem(val)"
      />
  </div>
</template>
<script>
import BottomInput from '~/components/BottomInput'
export default {
  data: () => ({    
    fields: [
      {
        key: "number",
        sortable: true,
        label: "#"
      },
      {
        key: "weigth",        
        sortable: true,
        label: "peso",
        class: "text-center"
      },
      {
        key: "actions",
        label: "",
        class: "text-right"
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
