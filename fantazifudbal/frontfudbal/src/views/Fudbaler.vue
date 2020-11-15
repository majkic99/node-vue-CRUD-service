<template>
  <b-container fluid>
    <b-row>
      <b-col sm="2">
        <label for="user">IME:</label>
      </b-col>
      <b-col sm="10">
        <p id="user" style="text-align: left">{{fudbaler.ime }}</p>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col sm="2">
        <label for="msg">PREZIME:</label>
      </b-col>
      <b-col sm="10">
        <p id="msg" style="text-align: left">{{ fudbaler.prezime }}</p>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col sm="2">
        <label for="msg">POENI:</label>
      </b-col>
      <b-col sm="10">
        <p id="msg" style="text-align: left">{{ fudbaler.osvojeni_poeni }}</p>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col sm="2">
        <label for="msg">MINUTAZA:</label>
      </b-col>
      <b-col sm="10">
        <p id="msg" style="text-align: left">{{ fudbaler.minuti_odigrani }}</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "Fudbaler",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['fudbaleri']),

    fudbaler: function () {
      for (let i = 0; i < this.fudbaleri.length; i++)
        if (this.fudbaleri[i].idFudbaleri === parseInt(this.$route.params.id))
          return this.fudbaleri[i];
    }
  },
  methods: {
    ...mapActions(['loadFudbaleri'])


  }
}
</script>

<style scoped>

</style>