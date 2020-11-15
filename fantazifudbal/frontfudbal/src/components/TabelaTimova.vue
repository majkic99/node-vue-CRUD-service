<template>
  <div>
    <b-table sticky-header="800px" :items="timovi" :fields="fields" head-variant="light"></b-table>

  </div>
</template>

<script>
import router from "@/router";
import { mapState, mapActions } from 'vuex';
export default {
name: "TabelaTimova",
  computed: {
    ...mapState(['timovi'])
  },
  data(){
    return {
      fields: [
        { key: 'idTimovi' },
        { key: 'ime_tima' },
        { key: 'osvojeni_poeni' }
      ]
    }
  }
}
</script>

<style scoped>

</style>