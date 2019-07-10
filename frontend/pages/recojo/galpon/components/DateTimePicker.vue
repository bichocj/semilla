<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <b-input-group size="xs" prepend="Dia">
        <b-form-input id="date-picker-custom-input" v-model="dateAt" required></b-form-input>
      </b-input-group>
      <div class="mx-1"></div>
      <b-input-group size="xs" prepend="Hora">
        <b-form-input id="time-picker-custom-input" v-model="timeAt" required></b-form-input>
      </b-input-group>
    </div>
    <date-picker
      v-model="dateAt"
      :color="'#ed6f6f'"     
      locale="es"
      format="YYYY-MM-DD"
      element="date-picker-custom-input"
      class="w-100"          
    />
    <date-picker
      v-model="timeAt"
      :color="'#ed6f6f'"
      :jump-minute="10"
      locale="es"
      format="hh:mm"
      element="time-picker-custom-input"
      class="w-100"
      type="time-a"  
    />   
  </div>
</template>
<script>
import VuePersianDatetimePicker from "vue-persian-datetime-picker";
import utils from '~/utils/utils';

export default {  
  components: {
    datePicker: VuePersianDatetimePicker
  },
  mixins: [utils],
  data: () => ({ 
    dateAt: null,
    timeAt: null,    
  }),
  watch: {
    dateAt(val) {
      this.onChangeDate(val);
    },
    timeAt(val) {
      this.onChangeTime(val);
    },
  },
  props: [
    'onChangeDate',
    'onChangeTime'
  ],
  mounted() {
    this.dateAt = this.getToday();
    this.timeAt = this.getTime();
  }
}
</script>