import { mapState, mapActions } from 'vuex'

export default {
  render () {
    return this.$scopedSlots.default({
      statistics: this.statistics
    })
  },
  computed: {
    ...mapState({
      statistics: state => state.countries
    })
  },
  methods: {
    ...mapActions(['loadCountries'])
  },
  created () {
    this.loadCountries()
  }
}
