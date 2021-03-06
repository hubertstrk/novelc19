<template>
  <div :class="$style['country-component']">
    <CountryStatistics :iso3="this.$route.params.country" render-timeline>
      <div slot-scope="{statistics}">
        <h1 class="title is-1">{{statistics.country}}</h1>

        <div :class="$style['info-group']">
          <Tag success :value1="formatDate(statistics.updated)" :value2="formatTime(statistics.updated)" />
          <Tag danger value1="Population" :value2="formatNumber(statistics.population)" />
        </div>

        <div :class="[$style['info-group'], $style['statistics']]">
          <StatisticDisplay text="Total Cases" :value="statistics.cases" centered />
          <StatisticDisplay text="Total Recovered" :value="statistics.recovered" centered />
          <StatisticDisplay text="Total Deaths" :value="statistics.deaths" centered />
        </div>
        <div :class="[$style['info-group'], $style['statistics']]">
          <StatisticDisplay text="Today Cases" :value="statistics.todayCases" centered />
          <StatisticDisplay text="Today Recovered" :value="statistics.todayRecovered" centered />
          <StatisticDisplay text="Today Deaths" :value="statistics.todayDeaths" centered />
        </div>
        <div :class="[$style['info-group'], $style['statistics']]">
          <StatisticDisplay text="Yesterday Cases" :value="statistics.yesterdayCases" centered />
          <StatisticDisplay text="Yesterday Recovered" :value="statistics.yesterdayRecovered" centered />
          <StatisticDisplay text="Yesterday Deaths" :value="statistics.yesterdayDeaths" centered />
        </div>
        <div :class="[$style['info-group'], $style['statistics']]">
          <StatisticDisplay text="Tests Per Million" :value="statistics.testsPerOneMillion" centered />
          <StatisticDisplay text="Deaths Per Million" :value="statistics.deathsPerOneMillion" centered />
          <StatisticDisplay text="One Test Per People" :value="statistics.oneTestPerPeople" centered />
        </div>

        <GenericTimelineChart :timelines="[
          { label: 'Deaths', data: statistics.timelines.deaths.relative.timeline, borderWidth: 2},
          { label: 'Mean', data: statistics.timelines.deaths.relative.mean, type: 'line', borderColor: 'red', pointRadius: 0, fill: false, borderWidth: 2},
          { hidden: true, label: 'High', pointRadius: 0, fill: '+1', data: statistics.timelines.deaths.relative.high, type: 'line', borderColor: 'rgba(245, 66, 66, 0.2)', backgroundColor: 'rgba(245, 66, 66, 0.2)'},
          { hidden: true, label: 'Low', pointRadius: 0, fill: false, data: statistics.timelines.deaths.relative.low, type: 'line', borderColor: 'rgba(245, 66, 66, 0.2)', backgroundColor: 'rgba(245, 66, 66, 0.2)'}
        ]" />
        <GenericTimelineChart :timelines="[
          { label: 'Cases', data: statistics.timelines.cases.relative.timeline, borderWidth: 2},
          { label: 'Mean', data: statistics.timelines.cases.relative.mean, type: 'line', borderColor: 'blue', pointRadius: 0, fill: false, borderWidth: 2},
          { hidden: true, label: 'High', pointRadius: 0, fill: '+1', data: statistics.timelines.cases.relative.high, type: 'line', borderColor: 'rgba(66, 135, 245, 0.2)', backgroundColor: 'rgba(66, 135, 245, 0.2)'},
          { hidden: true, label: 'Low', pointRadius: 0, fill: false, data: statistics.timelines.cases.relative.low, type: 'line', borderColor: 'rgba(66, 135, 245, 0.2)', backgroundColor: 'rgba(66, 135, 245, 0.2)'}
        ]" />
        <GenericTimelineChart :timelines="[
          { label: 'Recovered', data: statistics.timelines.recovered.relative.timeline, borderWidth: 2},
          { label: 'Mean', data: statistics.timelines.recovered.relative.mean, type: 'line', borderColor: 'green', pointRadius: 0, fill: false, borderWidth: 2},
          { hidden: true, label: 'High', pointRadius: 0, fill: '+1', data: statistics.timelines.recovered.relative.high, type: 'line', borderColor: 'rgba(66, 245, 96, 0.2)', backgroundColor: 'rgba(66, 245, 96, 0.2)'},
          { hidden: true, label: 'Low', pointRadius: 0, fill: false, data: statistics.timelines.recovered.relative.low, type: 'line', borderColor: 'rgba(66, 245, 96, 0.2)', backgroundColor: 'rgba(66, 245, 96, 0.2)'}
        ]" />
      </div>
    </CountryStatistics>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { isoToDate, isoToTime, preciseSquash } from '@/js/helper'

import Tag from '@/components/Tag'
import StatisticDisplay from '@/components/StatisticDisplay'
import GenericTimelineChart from '@/chart/GenericTimelineChart'
import CountryStatistics from '@/components/CountryStatistics'

export default {
  name: 'country',
  components: {
    Tag,
    StatisticDisplay,
    GenericTimelineChart,
    CountryStatistics
  },
  computed: {
    ...mapState({
      countries: state => state.countries,
      timelines: state => state.timelines
    })
  },
  methods: {
    ...mapActions([
      'loadStatisticsByCountry'
    ]),
    formatDate (value) {
      return `${isoToDate(value)}`
    },
    formatTime (value) {
      return `${isoToTime(value)}`
    },
    formatNumber (value) {
      return preciseSquash`${value}`
    }
  },
  async mounted () {
    await this.loadStatisticsByCountry(this.$route.params.country)
  },
  async beforeRouteUpdate (to, from, next) {
    await this.loadStatisticsByCountry(this.$route.params.country)
  }
}
</script>

<style lang="scss" module>
.country-component {

  display: flex;
  flex-direction: column;
  flex: 1;

  .info-group {

    display: flex;
    align-items: baseline;

    > * {
      margin-right: 10px;
    }

    &.statistics {
      justify-content: space-around;
      margin: 2rem 0;
    }

  }
}
</style>
