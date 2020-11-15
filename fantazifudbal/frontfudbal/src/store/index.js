import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fudbaleri : [],
    timovi : []
  },
  mutations: {
    setFudbaleri: function(state, fudbaleri){
        state.fudbaleri = fudbaleri;
    },
    setTimovi: function(state, timovi){
      state.timovi = timovi;
    },
    addTim: function(state, tim){
      state.timovi.push(tim);
    },
    addFudbaler : function(state, fudbaler){
      state.fudbaleri.push(fudbaler);
    },
    removeFudbaler: function (state, id) {
      for (let m = 0; m < state.fudbaleri.length; m++) {
        if (state.fudbaleri[m].idFudbaleri === id) {
          state.fudbaleri.splice(m, 1);
          break;
        }
      }
    },
    removeTim: function (state, id) {
        for (let m = 0; m < state.timovi.length; m++) {

          if (state.timovi[m].idTimovi === id) {
            state.timovi.splice(m, 1);
            break;
          }
        }
    },
    updateFudbaler: function (state, payload) {
      for (let m = 0; m < state.fudbaleri.length; m++) {
        if (state.fudbaleri[m].idTimovi === parseInt(payload.idTimovi)) {
          state.fudbaleri[m].ime = payload.msg.ime;
          state.fudbaleri[m].prezime  = payload.msg.prezime;
          state.fudbaleri[m].osvojeni_poeni = payload.msg.osvojeni_poeni;
          state.fudbaleri[m].minuti_odigrani  = payload.msg.minuti_odigrani;
          break;
        }
      }
    },
    updateTim: function (state, payload) {
      for (let m = 0; m < state.timovi.length; m++) {
        if (state.timovi[m].idTimovi === parseInt(payload.idTimovi)) {
          state.timovi[m].ime_tima = payload.msg.ime_tima;
          state.timovi[m].osvojeni_poeni = payload.msg.osvojeni_poeni;
          break;
        }
      }
    }


  },
  actions: {
    loadFudbaleri: function({ commit }) {
      fetch('http://localhost:81/api/fudbaleri', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('setFudbaleri', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    loadTimovi: function({ commit }) {
      fetch('http://localhost:81/api/timovi', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('setTimovi', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    deleteFudbaler: function({ commit }, id) {

      fetch(`http://localhost:81/api/fudbaleri/del/${id}`, { method: 'post' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('removeFudbaler', jsonData.idFudbaleri)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    deleteTim: function({ commit }, id) {

      fetch(`http://localhost:81/api/timovi/del/${id}`, { method: 'post' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('removeTim', jsonData.idTimovi)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    newTim : function({ commit }, tim) {
      fetch('http://localhost:81/api/timovi', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: tim
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('addTim', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    newFudbaler : function({ commit }, fudbaler) {
      fetch('http://localhost:81/api/fudbaleri', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: fudbaler
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('addFudbaler', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    changeTim: function({ commit }, payload) {

      fetch(`http://localhost:81/api/timovi/${payload.idTimovi}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.msg
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('updateTim', {id: payload.idTimovi, msg:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    changeFudbaler: function({ commit }, payload) {

      fetch(`http://localhost:81/api/fudbaleri/${payload.idFudbaleri}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.msg
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {

        commit('updateFudbaler', {id: payload.idFudbaleri, msg:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    }
  },
  modules: {
  }
})
