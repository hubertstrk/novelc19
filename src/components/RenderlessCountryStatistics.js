import { mapState } from 'vuex'

export default {
  props: {
    country: null
  },
  render () {
    if (!this.countries) return
    const country = this.countries.find(x => x.country === this.country)

    const statistics = {
      ...country,
      totalActive: country.active,
      totalCases: country.cases,
      totalDeaths: country.deaths,
      totalRecovered: country.recovered
    }

    return this.$scopedSlots.default({
      country: statistics
    })
  },
  computed: {
    ...mapState({
      countries: state => state.countries
    })
  }
}
