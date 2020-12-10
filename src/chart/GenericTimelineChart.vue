<template>
  <canvas ref="chart" class="chart" />
</template>

<script>
import { sparseSquash } from '@/js/helper'

import Chart from 'chart.js'

export default {
  props: {
    timelines: {
      type: Array,
      default: () => []
    },
    ratio: {
      type: Number,
      default: () => 1
    }
  },
  data () {
    return {
      chart: null,
      defaultOptions: {
        legend: {
          display: true
        },
        elements: {
          line: {
            tension: 0
          }
        },
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        aspectRatio: this.getRation(),
        responsive: true,
        scales: {
          xAxes: [{
            type: 'time',
            display: true
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: (value, index, values) => {
                return sparseSquash`${value}`
              }
            },
            display: true,
            scaleLabel: {
              display: false
            }
          }]
        }
      }
    }
  },
  methods: {
    renderChart () {
      var chart = new Chart(this.$refs.chart, {
        type: 'bar',
        data: { datasets: this.timelines },
        options: Object.assign({}, this.defaultOptions)
      })
      this.chart = chart
    },
    updateDataSets (timelines) {
      this.chart.data.datasets = timelines
      this.chart.update(0)
    },
    getRation () {
      const mediaQuery = window.matchMedia('(min-width: 768px)')
      return mediaQuery.matches ? 5 : 1
    }
  },
  mounted () {
    this.renderChart()
  },
  watch: {
    datasets (timelines) {
      this.updateDataSets(timelines)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
