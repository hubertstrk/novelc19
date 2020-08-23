import { mapState } from 'vuex'

import { SlidingWindow } from '@/js/SlidingWindow'
import { DataList } from '@/js/DataList'

export default {
  props: {
    renderTimeline: {
      type: Boolean,
      required: false,
      default: () => false
    },
    iso3: {
      type: String,
      required: false,
      default: null
    }
  },
  render () {
    if (!this.countries || !this.timelines) return
    const statistics = {}
    const countryStatistics = this.countries[this.iso3]
    Object.assign(statistics, countryStatistics)
    Object.assign(statistics, {
      totalActive: countryStatistics.active,
      totalCases: countryStatistics.cases,
      totalDeaths: countryStatistics.deaths,
      totalRecovered: countryStatistics.recovered
    })

    const timeline = this.timelines[this.iso3]

    const tymap = item => ({ t: item.date, y: item.value })
    const highmap = item => ({ t: item.date, y: item.high })
    const lowmap = item => ({ t: item.date, y: item.low })
    const dvmap = (type) => (x) => ({ date: x, value: timeline[type][x] })

    const timelines = ['cases', 'deaths', 'recovered'].reduce((acc, type) => {
      const dataPoints = Object.keys(timeline[type]).map(dvmap(type))
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
        },
        trend: (mean[mean.length - 1].value - mean[mean.length - 7].value) / 7
      }
      return acc
    }, {})
    statistics.timelines = timelines

    const yesterday = ['cases', 'deaths', 'recovered'].map((x) => {
      const values = Object.values(timeline[x])
      return values[values.length - 2] - values[values.length - 3]
    })
    Object.assign(statistics, {
      yesterdayCases: yesterday[0],
      yesterdayDeaths: yesterday[1],
      yesterdayRecovered: yesterday[2]
    })

    return this.$scopedSlots.default({
      statistics: statistics
    })
  },
  computed: {
    ...mapState({
      countries: state => state.countries,
      timelines: state => state.timelines,
      searchText: state => state.searchText
    })
  }
}
