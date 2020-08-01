import { mapState } from 'vuex'
import Fuse from 'fuse.js'

const searchOptions = {
  threshold: 0,
  keys: [{ name: 'country' }]
}

export default {
  render () {
    var countries = this.filtered.map(x => {
      return {
        totalActive: x.active,
        activePerOneMillion: x.activePerOneMillion,
        totalCases: x.cases,
        casesPerOneMillion: x.casesPerOneMillion,
        continent: x.continent,
        country: x.country,
        countryInfo: x.countryInfo,
        critical: x.critical,
        criticalPerOneMillion: x.criticalPerOneMillion,
        totalDeaths: x.deaths,
        deathsPerOneMillion: x.deathsPerOneMillion,
        oneCasePerPeople: x.oneCasePerPeople,
        oneDeathPerPeople: x.oneDeathPerPeople,
        oneTestPerPeople: x.oneTestPerPeople,
        population: x.population,
        totalRecovered: x.recovered,
        recoveredPerOneMillion: x.recoveredPerOneMillion,
        tests: x.tests,
        testsPerOneMillion: x.testsPerOneMillion,
        todayCases: x.todayCases,
        todayDeaths: x.todayDeaths,
        todayRecovered: x.todayRecovered,
        updated: x.updated
      }
    })
    return this.$scopedSlots.default({
      countries: countries
    })
  },
  computed: {
    ...mapState({
      countries: state => state.countries,
      searchText: state => state.searchText
    }),
    filtered () {
      if (!this.countries) return []
      if (this.searchText === '') return this.countries
      const fuse = new Fuse(this.countries, searchOptions)
      return fuse.search(this.searchText).map(x => x.item)
    }
  }
}
