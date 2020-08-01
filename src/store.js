import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    world: null,
    countries: null,
    searchText: ''
  },
  mutations: {
    storeWorld (state, data) {
      state.world = data
    },
    storeCountries (state, data) {
      state.countries = data
    },
    setSearch (state, text) {
      state.searchText = text
    }
  },
  actions: {
    async loadWorld ({ commit }) {
      return axios.get('https://corona.lmao.ninja/v2/all')
        .then(data => data.data)
        .then((data) => {
          commit('storeWorld', data)
        })
    },
    async loadCountries ({ commit }) {
      return axios.get('https://corona.lmao.ninja/v2/countries?sort=cases')
        .then(data => data.data)
        .then((data) => {
          commit('storeCountries', data)
        })
    }
  }
})
