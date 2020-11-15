<template>
  <div> <div id="nav">
    <AddTim :timovi="timovi"/>
    </div>
    <b-row>
      <b-col sm="1" offset="5">
        <b-input v-model="idTimovi2" class="mb-2 mr-sm-2 mb-sm-0"  placeholder="ID tima"></b-input>
      </b-col>
      <b-button variant="primary" class="mb-2 mr-sm-2 mb-sm-0" @click="openTeam">Vise detalja</b-button>
    </b-row>
    <div>
      <b-row> <b-col>
        ----
      </b-col></b-row>
    </div>
    <div class="tabela">
      <Header/>
      <b-container>
        <b-row>
          <b-col cm="6" >
            <TabelaTimova />
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2" offset="4">
            <b-input v-model="idTimovi" class="mb-2 mr-sm-2 mb-sm-0" placeholder="ID tima"></b-input>
          </b-col>
          <b-button variant="primary"  class="mb-2 mr-sm-2 mb-sm-0" @click="deleteTeam">Delete</b-button>
       </b-row>
      </b-container>
  </div></div>


</template>



<script>
import AddTim from '@/components/AddTim';
import TabelaTimova from "@/components/TabelaTimova";
import { mapActions } from 'vuex';
import router from "@/router";
const  Joi = require('joi');
const idSema = Joi.object().keys({
  id: Joi.number().required()
})
export default {
  name: 'Timovi',

  components: {
    TabelaTimova,
    AddTim
  },
  data() {
    return {
      idTimovi: '',
      idTimovi2: ''
    }
  },
  methods: {
    ...mapActions(['loadTimovi']),
    ...mapActions(['deleteTim']),
    deleteTeam : function(){
      const { error, value } = idSema.validate({id: this.idTimovi});
      if(error){
        alert(error);
      }else {
        this.deleteTim(parseInt(this.idTimovi));
      }
      this.idTimovi = '';
    },
    openTeam : function(){
      const { error, value } = idSema.validate({id: this.idTimovi2});
      if(error){
        alert(error);
      }else {
      router.push({path: `/timovi/${this.idTimovi2}`})
        }
    }


  },
  mounted: function() {
    this.loadTimovi();

  }
  // mounted: function() {
  //   fetch('http://localhost:81/api/timovi', { method: 'get' }).then((response) => {
  //     if (!response.ok)
  //       throw response;
  //
  //     return response.json()
  //   }).then((jsonData) => {
  //     this.timovi = jsonData
  //   }).catch((error) => {
  //     if (typeof error.text === 'function')
  //       error.text().then((errorMessage) => {
  //         alert(errorMessage);
  //       });
  //     else
  //       alert(error);
  //   });
  // }
}
</script>

<style scoped>

</style>