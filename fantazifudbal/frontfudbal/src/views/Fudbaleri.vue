<template>
  <div>
  <div>
    <div id="nav">
      <AddFudbaler :fudbaleri="fudbaleri"/>
    </div>
  </div>
  <b-row>
    <b-col sm="1" offset="5">
      <b-input v-model="idFudbaleri2" class="mb-2 mr-sm-2 mb-sm-0"  placeholder="ID fudbalera"></b-input>
    </b-col>
    <b-button variant="primary" class="mb-2 mr-sm-2 mb-sm-0" @click="openFudbaler">Vise detalja</b-button>
  </b-row>
    <div>
      <b-row> <b-col>
        ----
      </b-col></b-row>
    </div>
  <div>
    <div class="tabela">
      <Header/>
      <b-container>
        <b-row>
          <b-col cm="6" >
            <TabelaFudbalera/>

          </b-col>
        </b-row>
        <b-row>
          <b-col sm="2" offset="4">
            <b-input v-model="idFudbaleri" class="mb-2 mr-sm-2 mb-sm-0" placeholder="ID fudbalera"></b-input>
          </b-col>
          <b-button variant="primary" size="lg" class="mb-2 mr-sm-2 mb-sm-0" @click="deleteFudbal">Delete</b-button>
        </b-row>

      </b-container>
    </div>
  </div>
  </div>

</template>

<script>
import TabelaFudbalera from "@/components/TabelaFudbalera";
import AddFudbaler from "@/components/AddFudbaler";
import { mapActions } from 'vuex';
import router from "@/router";
const  Joi = require('joi');
const idSema = Joi.object().keys({
  id: Joi.number().required()
})
export default {
name: "Fudbaleri",
  components: {
    TabelaFudbalera,
    AddFudbaler
  },
  data() {
    return {
      idFudbaleri: '',
      idFudbaleri2: ''
    }
  },
  methods: {
    ...mapActions(['loadFudbaleri']),
    ...mapActions(['deleteFudbaler']),
    deleteFudbal : function(){
      console.log(this.idFudbaleri);
      const { error, value } = idSema.validate({id: this.idFudbaleri});
      if(error){
        alert(error);
      }else {
      this.deleteFudbaler(parseInt(this.idFudbaleri));
        }
      this.idFudbaleri = '';
    },

    openFudbaler : function(){
      const { error, value } = idSema.validate({id: this.idFudbaleri2});
      if(error){
        alert(error);
      }else {
        router.push({path: `/fudbaleri/${this.idFudbaleri2}`})
      }
    }
  },
  mounted: function() {
  this.loadFudbaleri();
}
}

</script>

<style scoped>

</style>