<template>
  <div>
    <p class="text-center">Peso de paquete de huevo pesado</p>    
    <div class="pt-0 text-center">Historial del día</div>
    <b-table responsive striped hover :items="items" :fields="fields" class="mb-7"> 
        <template slot="actions" slot-scope="data">                            
            <b-button variant="danger">Borrar</b-button>
        </template>
    </b-table>

    <div class="budget bg-white border-top ">
      <div class="pt-2 pb-1 pl-4">Agregar Peso</div>
      <div class="d-flex justify-content-between px-1 pb-2">
        <div class="col d-flex flex-column">
          <b-form-input 
            id="weigth"
            ref="weigth"
            requiredtype="number"
            v-model="weigth" 
            v-on:keyup.enter="addItem"
            ></b-form-input>
        </div>
        <div class="col">
          <b-button
            :block="true"            
            class="rounded"            
            variant="primary"            
            @click="addItem">
            Ok
          </b-button>
        </div>
      </div>
    </div>

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
  methods: {
    addItem() {
      if(this.weigth !== null){
        this.items.push({
          number: this.items.length,
          weigth: this.weigth
        })
        this.weigth = null
        this.$refs.weigth.$el.focus()
        window.scrollTo(0,document.body.scrollHeight);
      }
    }
  }
}
</script>
<style>
.budget {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
}
.service-type-title {
  height: 38px;
}
.opacity {
  opacity: 0.3;
}
.mb-7 {
  margin-bottom: 200px;
}
</style>

