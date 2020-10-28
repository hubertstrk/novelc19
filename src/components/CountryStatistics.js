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
    },
    coarse: {
      type: Boolean,
      default: () => false
    }
  },
  render () {
    const statistics = {}
    if (this.stats) {
      Object.assign(statistics, this.stats)
      Object.assign(statistics, {
        totalActive: this.stats.active,
        totalCases: this.stats.cases,
        totalDeaths: this.stats.deaths,
        totalRecovered: this.stats.recovered
      })
    }

    if (this.timelines) {
      const tymap = item => ({ t: item.date, y: item.value })
      const highmap = item => ({ t: item.date, y: item.high })
      const lowmap = item => ({ t: item.date, y: item.low })
      const dvmap = (type) => (x) => ({ date: x, value: this.timelines[type][x] })

      const timelines = ['cases', 'deaths', 'recovered'].reduce((acc, type) => {
        const dataPoints = Object.keys(this.timelines[type]).map(dvmap(type))
        const dataList = new DataList(dataPoints)
        const mean = this.coarse ? new SlidingWindow(dataList.relativ(), 28).mean() : new SlidingWindow(dataList.relativ(), 7).mean()

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
        const values = Object.values(this.timelines[x])
        return values[values.length - 2] - values[values.length - 3]
      })

      Object.assign(statistics, {
        yesterdayCases: yesterday[0],
        yesterdayDeaths: yesterday[1],
        yesterdayRecovered: yesterday[2]
      })
    }

    return this.$scopedSlots.default({
      statistics: statistics
    })
  },
  computed: {
    ...mapState({
      stats: function (state) {
        return state.countries[this.iso3]
      },
      timelines: function (state) {
        return state.timelines[this.iso3]
      },
      searchText: state => state.searchText
    })
  }
}
