import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    data: {}
  },
  mutations: {
    getData: function () {
      axios({
        method: 'get',
        url: '../../../static/data.json',
        dataType: 'json'
      }).then(response => {
        console.log(response.data)
        this.data = response.data
      }).catch(error => {
        console.log('error:' + error)
      })
    }
  },
  actions: {
    getDataAction: function (context) {
      context.commit('getData')
    }
  }
})
export default store
