<template>
  <div class="world-component">
    <h1 class="title">World</h1>
    <RenderlessWorldStatistics>
      <div slot-scope="{statistics}">
        <Tag success :value1="formatDate(statistics.updated)" :value2="formatTime(statistics.updated)" />
        <div class="statistics-group">
          <StatisticDisplay text="Affected countries" :value="statistics.affectedCountries" centered />
          <StatisticDisplay text="Tests per million" :value="statistics.testsPerOneMillion" centered />
          <StatisticDisplay text="Deaths per million" :value="statistics.deathsPerOneMillion" centered />
        </div>
        <div class="statistics-group">
          <StatisticDisplay text="Total Cases" :value="statistics.cases" centered />
          <StatisticDisplay text="Total Recovered" :value="statistics.recovered" centered />
          <StatisticDisplay text="Total Deaths" :value="statistics.deaths" centered />
        </div>
        <div class="statistics-group">
          <StatisticDisplay text="Today Cases" :value="statistics.todayCases" centered />
          <StatisticDisplay text="Today Recovered" :value="statistics.todayRecovered" centered />
          <StatisticDisplay text="Today Deaths" :value="statistics.todayDeaths" centered />
        </div>
      </div>
    </RenderlessWorldStatistics>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isoToDate, isoToTime } from '@/js/helper'

import Tag from '@/components/Tag'
import StatisticDisplay from '@/components/StatisticDisplay'
import RenderlessWorldStatistics from '@/components/RenderlessWorldStatistics'

export default {
  name: 'world',
  components: {
    Tag,
    StatisticDisplay,
    RenderlessWorldStatistics
  },
  methods: {
    ...mapActions(['loadWorldStatistics']),
    formatDate (value) {
      return `${isoToDate(value)}`
    },
    formatTime (value) {
      return `${isoToTime(value)}`
    }
  },
  created () {
    this.loadWorldStatistics()
  }
}
</script>
<style lang="scss" scoped>
.world-component {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.statistics-group {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
}
</style>
