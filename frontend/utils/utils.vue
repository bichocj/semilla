<script>
export default {  
  methods: {
    getToday() {
      const today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      if (dd < 10) {
        dd = `0${dd}`;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }

      return `${yyyy}-${mm}-${dd}`;
    },
    getTime() {
      const today = new Date();
      let hh = today.getHours();
      let mm = today.getMinutes();
      
      if (hh < 10) {
        hh = `0${hh}`;
      }

      if (mm < 10) {
        mm = `0${mm}`;
      }

      return `${hh}:${mm}`;
    }
  }
}
</script>