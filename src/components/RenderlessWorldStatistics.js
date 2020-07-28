import { mapState, mapActions } from 'vuex'

export default {
  render () {
    if (!this.statistics) return
    return this.$scopedSlots.default({
      statistics: { ...this.statistics, updated: new Date(this.statistics.updated).toISOString() }
    })
  },
  computed: {
    ...mapState({
      statistics: state => state.world
    })
  },
  methods: {
    ...mapActions(['loadWorld'])
  },
  created () {
    this.loadWorld()
  }
}
