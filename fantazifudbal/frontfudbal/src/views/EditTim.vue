<template>
  <div>
    <b-jumbotron header="Promenite broj poena tima">
      <b-container fluid>
        <b-form>
          <b-row class="mt-2">
            <b-col sm="2" offset="3">
              <b-input v-model="idTimovi" class="mb-2 mr-sm-2 mb-sm-0" placeholder="ID tima"></b-input>
            </b-col>
            <b-col sm="2" >
              <b-input v-model="ime_tima" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Ime tima"></b-input>
            </b-col>
            <b-col sm="2">
              <b-input v-model="osvojeni_poeni" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Osvojeni poeni"></b-input>
            </b-col>
          </b-row>
          <b-row class="mt-2"> </b-row>
          <b-row><b-col sm="12">
            <b-button variant="primary" size="lg" @click="change">Save</b-button>
          </b-col></b-row>
        </b-form>
      </b-container>
    </b-jumbotron>

  </div>
</template>

<script>
import {mapState} from "vuex";
import { mapActions } from 'vuex';
const  Joi = require('joi');
const timoviSema = Joi.object().keys({
  ime_tima : Joi.string().min(3).max(24).required(),
  osvojeni_poeni : Joi.number().required(),
  id: Joi.number().required()
})

export default  {
  name: "EditTim",
  computed: {
    ...mapState(['timovi'])
  },
  data() {
    return {
      ime_tima: '',
      osvojeni_poeni: '',
      idTimovi: ''
    }
  },
  methods: {
    ...mapActions(['changeTim']),

    change: function() {
      const msg = JSON.stringify({ime_tima: this.ime_tima, osvojeni_poeni: parseInt(this.osvojeni_poeni)});
      const { error, value } = timoviSema.validate({ime_tima: this.ime_tima, osvojeni_poeni: parseInt(this.osvojeni_poeni), id: this.idTimovi});

      if(error){
        alert(error);
      }else{

        this.changeTim({idTimovi: parseInt(this.idTimovi), msg: msg});

        }


      this.ime_tima = '';
      this.osvojeni_poeni = '';
      this.idTimovi = '';
    }
  }
}

</script>

<style scoped>

</style>