<template>
  <div>
    <b-jumbotron header="Izmenite informacije o fudbaleru">
      <b-container fluid>
        <b-form>
          <b-row class="mt-2">
            <b-col sm="2" offset="1">
              <b-input v-model="idFudbaleri" class="mb-2 mr-sm-2 mb-sm-0" placeholder="ID fudbalera"></b-input>
            </b-col>
            <b-col sm="2">
              <b-input v-model="ime" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Ime"></b-input>
            </b-col>
            <b-col sm="2">
              <b-input v-model="prezime" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Prezime"></b-input>
            </b-col>
            <b-col sm="2">
              <b-input v-model="osvojeni_poeni" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Poeni"></b-input>
            </b-col>
            <b-col sm="2">
              <b-input v-model="minuti_odigrani" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Minutaza"></b-input>
            </b-col>
          </b-row>
          <b-row class="mt-2"> </b-row>
          <b-row><b-col sm="12">
            <b-button variant="primary" size="lg" class="mb-2 mr-sm-2 mb-sm-0" @click="change">Save</b-button>
          </b-col></b-row>

        </b-form>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
import router from "@/router";

const  Joi = require('joi');


const fudbaleriSema = Joi.object().keys({
  ime: Joi.string().trim().max(30).required(),
  prezime: Joi.string().trim().max(30).required(),
  osvojeni_poeni: Joi.number().required(),
  minuti_odigrani: Joi.number().required(),
  id: Joi.number().required()
});

import {mapState} from "vuex";
import { mapActions } from 'vuex';
export default  {
  name: "EditFudbaler",

  data() {
    return {
      ime: '',
      prezime: '',
      osvojeni_poeni: '',
      minuti_odigrani: '',
      idFudbaleri: ''
    }
  },
  methods: {
    ...mapActions(['changeFudbaler']),

    change: function() {
      const msg = JSON.stringify({ime: this.ime, prezime: this.prezime, osvojeni_poeni: parseInt(this.osvojeni_poeni), minuti_odigrani: parseInt(this.minuti_odigrani)});
      const { error, value } = fudbaleriSema.validate({ime: this.ime, prezime: this.prezime, osvojeni_poeni: parseInt(this.osvojeni_poeni), minuti_odigrani: parseInt(this.minuti_odigrani), id: this.idFudbaleri});

      if(error){
        alert(error);
      }else {

            this.changeFudbaler({idFudbaleri: parseInt(this.idFudbaleri), msg: msg});
          router.push({path: `/fudbaleri`})
          }


      this.ime = '';
      this.prezime = '';
      this.osvojeni_poeni = '';
      this.minuti_odigrani = '';
      this.idFudbaleri = '';
    }
  }
}

</script>

<style scoped>

</style>