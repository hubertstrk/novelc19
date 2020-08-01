import { mapState } from 'vuex'

export default {
  render () {
    return this.$scopedSlots.default({
      statistics: this.statistics ? { ...this.statistics, updated: new Date(this.statistics.updated).toISOString() } : {}
    })
  },
  computed: {
    ...mapState({
      statistics: state => state.world
    })
  }
}
