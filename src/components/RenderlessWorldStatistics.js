import { mapState } from 'vuex'

export default {
  render () {
    if (!this.statistics.updated) return
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
