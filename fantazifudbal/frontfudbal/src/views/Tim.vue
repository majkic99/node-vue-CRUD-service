<template>
  <b-container fluid>
    <b-row>
      <b-col sm="2">
        <label for="user">IME:</label>
      </b-col>
      <b-col sm="10">
        <p id="user" style="text-align: left">{{ tim.ime_tima }}</p>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col sm="2">
        <label for="msg">POENI:</label>
      </b-col>
      <b-col sm="10">
        <p id="msg" style="text-align: left">{{ tim.osvojeni_poeni }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Tim",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['timovi']),

    tim: function () {
      for (let i = 0; i < this.timovi.length; i++)
        if (this.timovi[i].idTimovi === parseInt(this.$route.params.id))
          return this.timovi[i];
    }
  },
  methods: {
    ...mapActions(['loadTimovi']),


  }
}
</script>

<style scoped>

</style>