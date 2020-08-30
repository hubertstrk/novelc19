import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { keyBy } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    world: {},
    countries: {}, // object
    timelines: {}, // object
    searchText: '',
    modeSelection: 'total' // total, today, yesterday
  },
  mutations: {
    storeWorld (state, data) {
      state.world = data
    },
    setSearch (state, text) {
      state.searchText = text
    },
    setModeSelection (state, modeSelection) {
      state.modeSelection = modeSelection
    },
    storeCountryStatistics (state, { iso3, statistics }) {
      Vue.set(state.countries, iso3, statistics)
    },
    storeCountryTimeline (state, { iso3, timeline }) {
      Vue.set(state.timelines, iso3, timeline)
    },
    storeAllCountryStatistics (state, statistics) {
      state.countries = statistics
    },
    storeAllCountryTimelines (state, timelines) {
      state.timelines = timelines
    }
  },
  actions: {
    async loadWorldStatistics ({ commit }) {
      return axios.get('https://corona.lmao.ninja/v2/all')
        .then(data => data.data)
        .then((data) => {
          commit('storeWorld', data)
        })
    },
    async loadStatisticsByCountry ({ commit }, iso3) {
      // statistics
      const stats = axios.get(`https://corona.lmao.ninja/v2/countries/${iso3}`)
        .then(data => data.data)
        .then((data) => {
          commit('storeCountryStatistics', { iso3, statistics: data })
        })
      // timeline
      const timeline = axios.get(`https://corona.lmao.ninja/v2/historical/${iso3}?lastdays=all`)
        .then(data => data.data)
        .then((data) => {
          commit('storeCountryTimeline', { iso3, timeline: data.timeline })
        })

      return Promise.all([stats, timeline])
    },
    async loadAllCountryStatistics ({ state, commit }) {
      // statistics
      await axios.get('https://corona.lmao.ninja/v2/countries?sort=cases')
        .then(data => data.data)
        .then((data) => {
          const lookup = keyBy(data, 'countryInfo.iso3')
          commit('storeAllCountryStatistics', lookup)
        })
      // timeline
      return axios.get(`https://corona.lmao.ninja/v2/historical/${Object.keys(state.countries)}?lastdays=all`)
        .then(data => data.data)
        .then((data) => {
          const timelinesWithHistoricalData = data.filter(x => !x.hasOwnProperty('message'))
          const timelinesWithIso3 = timelinesWithHistoricalData.map((timelineWithHistoricalData) => {
            const country = Object.values(state.countries).find(country => country.country === timelineWithHistoricalData.country)
            return {
              ...timelineWithHistoricalData.timeline,
              iso3: country.countryInfo.iso3
            }
          })
          const timelimesLookup = keyBy(timelinesWithIso3, 'iso3')
          commit('storeAllCountryTimelines', timelimesLookup)
        })
    }
  }
})
