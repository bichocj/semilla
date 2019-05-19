<template>
  <div class="position-fixed-bottom bg-white border-top ">
    <div class="pt-2 pb-1 pl-4">{{ label }}</div>
    <div class="d-flex justify-content-between px-1 pb-2">
      <div class="col d-flex flex-column">
        <b-form-input 
          id="val"
          ref="val"
          type="number"
          v-model="val" 
          v-on:keyup.enter="beforeOnSubmit"
          required
          ></b-form-input>
      </div>
      <div class="col">
        <b-button
          :block="true"            
          class="rounded"            
          variant="primary"            
          @click="beforeOnSubmit">
          Ok
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BottomInput",
  data: () => ({
    val: null,
  }),
  props: [
    'label',
    'onSubmit'
  ],
  methods: {
    beforeOnSubmit() {
      if(this.val !== null){
        this.onSubmit(this.val)
        this.val = null
        this.$refs.val.$el.focus()
      }
    }
  }
}
</script>
