import { mapState } from 'vuex'
import Fuse from 'fuse.js'

const searchOptions = {
  threshold: 0,
  keys: [{ name: 'country' }]
}

export default {
  render () {
    var countries = this.filtered.map(country => {
      return {
        ...country,
        totalActive: country.active,
        totalCases: country.cases,
        totalDeaths: country.deaths,
        totalRecovered: country.recovered
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
