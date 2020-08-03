import { mapState } from 'vuex'
// import { SlidingWindow } from '@/js/SlidingWindow'
import { capitalize } from '@/js/helper'

export default {
  props: {
    country: null
  },
  render () {
    if (!this.raw) return {}

    const tymap = (type) => (x) => ({ t: x, y: this.raw[type][x] })

    const timelines = ['cases', 'deaths', 'recovered'].reduce((acc, type) => {
      const timeline = Object.keys(this.raw[type]).map(tymap(type))
      acc[type] = timeline
      acc[`${type}ForChart`] = [{ label: capitalize(type), data: timeline }]
      return acc
    }, {})

    // var mean = new SlidingWindow(timeline, 7).mean()

    return this.$scopedSlots.default({
      timelines: timelines
    })
  },
  computed: {
    ...mapState({
      timeline: state => state.timeline
    }),
    raw () {
      return this.timeline[this.country]
    }
  }
}
