import { mapState } from 'vuex'
import { SlidingWindow } from '@/js/SlidingWindow'
import { DataList } from '@/js/DataList'

export default {
  props: {
    country: null
  },
  render () {
    if (!this.timeline || !this.timeline[this.country]) return
    const raw = this.timeline[this.country]

    const dvmap = (type) => (x) => ({ date: x, value: raw[type][x] })
    const tymap = item => ({ t: item.date, y: item.value })
    const highmap = item => ({ t: item.date, y: item.high })
    const lowmap = item => ({ t: item.date, y: item.low })

    const timelines = ['cases', 'deaths', 'recovered'].reduce((acc, type) => {
      const dataPoints = Object.keys(raw[type]).map(dvmap(type))
      const dataList = new DataList(dataPoints)
      const mean = new SlidingWindow(dataList.relativ(), 7).mean()

      acc[type] = {
        absolute: {
          timeline: dataList.absolute().map(tymap)
        },
        relative: {
          timeline: dataList.relativ().map(tymap),
          mean: mean.map(tymap),
          high: mean.map(highmap),
          low: mean.map(lowmap)
        }
      }
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
    })
  }
}
