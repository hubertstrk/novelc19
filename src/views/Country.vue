<template>
  <div class="country-component">
    <RenderlessCountryStatistics :country="this.$route.params.country">
      <div slot-scope="{country}">
        <h1 class="title is-1">{{country.country}}</h1>

        <div class="info-group">
          <Tag success :value1="formatDate(country.updated)" :value2="formatTime(country.updated)" />
          <Tag danger value1="Population" :value2="formatNumber(country.population)" />
        </div>

        <div class="info-group statistics">
          <StatisticDisplay text="Total Cases" :value="country.cases" centered />
          <StatisticDisplay text="Total Recovered" :value="country.recovered" centered />
          <StatisticDisplay text="Total Deaths" :value="country.deaths" centered />
        </div>
        <div class="info-group statistics">
          <StatisticDisplay text="Today Cases" :value="country.todayCases" centered />
          <StatisticDisplay text="Today Recovered" :value="country.todayRecovered" centered />
          <StatisticDisplay text="Today Deaths" :value="country.todayDeaths" centered />
        </div>
        <div class="info-group statistics">
          <StatisticDisplay text="Tests Per Million" :value="country.testsPerOneMillion" centered />
          <StatisticDisplay text="Deaths Per Million" :value="country.deathsPerOneMillion" centered />
          <StatisticDisplay text="One Test Per People" :value="country.oneTestPerPeople" centered />
        </div>
      </div>
    </RenderlessCountryStatistics>

    <RenderlessCountryTimeline :country="this.$route.params.country">
      <div slot-scope="{timelines}">
        <GenericTimelineChart :timelines="[
          { label: 'Deaths', data: timelines.deaths.relative.timeline, order: 2 },
          { label: 'Mean', data: timelines.deaths.relative.mean, type: 'line', borderColor: 'red', pointRadius: 0, fill: false, order: 1 }
        ]" />
        <GenericTimelineChart :timelines="[
          { label: 'Cases', data: timelines.cases.relative.timeline, order: 2 },
          { label: 'Mean', data: timelines.cases.relative.mean, type: 'line', borderColor: 'blue', pointRadius: 0, fill: false, order: 1 }
        ]" />
        <GenericTimelineChart :timelines="[
          { label: 'Recovered', data: timelines.recovered.relative.timeline, order: 2 },
          { label: 'Mean', data: timelines.recovered.relative.mean, type: 'line', borderColor: 'green', pointRadius: 0, fill: false, order: 1 }
        ]" />
      </div>
    </RenderlessCountryTimeline>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { isoToDate, isoToTime, preciseSquash } from '@/js/helper'

import Tag from '@/components/Tag'
import StatisticDisplay from '@/components/StatisticDisplay'
import GenericTimelineChart from '@/chart/GenericTimelineChart'
import RenderlessCountryTimeline from '@/components/RenderlessCountryTimeline'
import RenderlessCountryStatistics from '@/components/RenderlessCountryStatistics'

export default {
  name: 'country',
  components: {
    Tag,
    StatisticDisplay,
    GenericTimelineChart,
    RenderlessCountryTimeline,
    RenderlessCountryStatistics
  },
  methods: {
    ...mapActions([
      'loadCountryTimeline',
      'loadCountries'
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
    await this.loadCountryTimeline(this.$route.params.country)
    await this.loadCountries()
  },
  beforeRouteUpdate (to, from, next) {
    this.loadCountryTimeline(to.country)
    this.loadCountries()
  }
}
</script>

<style lang="scss" scoped>
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
