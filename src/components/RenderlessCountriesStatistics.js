import { mapState } from 'vuex'
export default {
  render () {
    return this.$scopedSlots.default({
      countries: this.countries ? this.countries : []
    })
  },
  computed: {
    ...mapState({
      countries: state => state.countries
    })
  }
}
