import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    world: null,
    countries: null,
    timeline: {},
    searchText: '',
    modeSelection: 'total' // total, today
  },
  mutations: {
    storeWorld (state, data) {
      state.world = data
    },
    storeCountries (state, data) {
      state.countries = data
    },
    storeTimeline (state, { country, timeline }) {
      Vue.set(state.timeline, country, timeline)
    },
    setSearch (state, text) {
      state.searchText = text
    },
    setModeSelection (state, modeSelection) {
      state.modeSelection = modeSelection
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
    },
    async loadCountry ({ commit }, country) {
      return axios.get(`https://corona.lmao.ninja/v2/historical/${country}?lastdays=all`)
        .then(data => data.data)
        .then((data) => {
          commit('storeTimeline', { country: data.country, timeline: data.timeline })
        })
    }
  }
})
