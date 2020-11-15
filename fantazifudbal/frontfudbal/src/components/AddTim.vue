<template>
  <div>
    <b-jumbotron header="Dodajte tim">
      <b-container fluid>
        <b-form>
          <b-row class="mt-2">
            <b-col sm="2" offset="4">
              <b-input v-model="ime_tima" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Ime tima"></b-input>
            </b-col>
            <b-col sm="2">
              <b-input v-model="osvojeni_poeni" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Osvojeni poeni"></b-input>
            </b-col>
          </b-row>
          <b-row class="mt-2"> </b-row>
          <b-row><b-col sm="12">
            <b-button variant="primary" size="lg" class="mb-2 mr-sm-2 mb-sm-0" @click="addNew">Save</b-button>
            <router-link to="/edittim" type="button"variant="primary" class="btn btn-primary btn-lg mb-2 mr-sm-2 mb-sm-0">Edit</router-link>
          </b-col></b-row>
        </b-form>
      </b-container>
    </b-jumbotron>

  </div>
</template>

<script>
import EditTim from "@/views/EditTim";
import {mapActions} from "vuex";
const  Joi = require('joi');
const timoviSema = Joi.object().keys({
  ime_tima : Joi.string().min(3).max(24).required(),
  osvojeni_poeni : Joi.number().required()
})
export default  {
    name: "AddTim",
    props: {
      timovi: Array
    },
    data() {
      return {
        ime_tima: '',
        osvojeni_poeni: ''
      }
    },
  methods: {
    ...mapActions(['newTim']),
      addNew: function() {
        const msg = JSON.stringify({ime_tima: this.ime_tima, osvojeni_poeni: parseInt(this.osvojeni_poeni)});
        const { error, value } = timoviSema.validate({ime_tima: this.ime_tima, osvojeni_poeni: parseInt(this.osvojeni_poeni)});

        if(error){
            alert(error);
        }else{
          this.newTim(msg);
        }


        this.ime_tima = '';
        this.osvojeni_poeni = '';
      }
  }
}

</script>

<style scoped>

</style>