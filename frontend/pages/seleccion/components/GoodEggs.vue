<template>
  <div>
    <p class="text-center">Peso de paquete de huevo pesado</p>    
    <div class="pt-0 text-center">Historial del día</div>
    <b-table responsive striped hover :items="items" :fields="fields">
        <template slot="actions" slot-scope="data">                            
            <b-button variant="danger">Eliminar</b-button>
        </template>
    </b-table>
    <b-form-group
      id="weigth"
      label-cols-sm="4"
      label-cols-lg="3"                        
      label="Peso"
      label-for="weigth">
      <b-form-input id="weigth" ref="weigth" v-model="weigth" required type="number"></b-form-input>
    </b-form-group>
    <b-button variant="primary" :block="true" @click="addItem()" >Agregar</b-button>
  </div>
</template>
<script>
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
  methods: {
    addItem() {
      if(this.weigth !== null){
        this.items.push({
          number: this.items.length,
          weigth: this.weigth
        })
        this.weigth = null
        this.$refs.weigth.$el.focus()
      }
    }
  }
}
</script>