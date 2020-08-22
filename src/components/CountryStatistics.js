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
    country: {
      type: String,
      required: false,
      default: null
    }
  },
  render () {
    const countryStatistics = this.countries[this.country]

    const raw = this.timelines[this.country]

    const tymap = item => ({ t: item.date, y: item.value })
    const highmap = item => ({ t: item.date, y: item.high })
    const lowmap = item => ({ t: item.date, y: item.low })
    const dvmap = (type) => (x) => ({ date: x, value: raw[type][x] })

    const timelines = ['cases', 'deaths', 'recovered'].reduce((acc, type) => {
      const dataPoints = Object.keys(raw[type]).map(dvmap(type))
      const dataList = new DataList(dataPoints)
      const mean = new SlidingWindow(dataList.relativ(), 7).mean()

      acc[type] = {
        absolute: {
          raw: dataList.absolute().map(tymap)
        },
        relative: {
          raw: dataList.relativ().map(tymap),
          mean: mean.map(tymap),
          high: mean.map(highmap),
          low: mean.map(lowmap)
        },
        trend: (mean[mean.length - 1].value - mean[mean.length - 7].value) / 7
      }
      return acc
    }, {})

    const statistics = {
      ...countryStatistics,
      timelines: timelines,
      totalActive: countryStatistics.active,
      totalCases: countryStatistics.cases,
      totalDeaths: countryStatistics.deaths,
      totalRecovered: countryStatistics.recovered
    }

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
