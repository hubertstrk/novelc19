<template>
  <div class="world-component">
    <h1 class="title">World</h1>
    <RenderlessWorldStatistics>
      <div slot-scope="{statistics}">
        <Tag success :value1="formatDate(statistics.updated)" :value2="formatTime(statistics.updated)" />
        <div class="statistics-group">
          <StatisticsCard text="Affected countries" :value="statistics.affectedCountries" centered />
          <StatisticsCard text="Tests per million" :value="statistics.testsPerOneMillion" centered />
          <StatisticsCard text="Deaths per million" :value="statistics.deathsPerOneMillion" centered />
        </div>
        <div class="statistics-group">
          <StatisticsCard text="Total Cases" :value="statistics.cases" centered />
          <StatisticsCard text="Total Recovered" :value="statistics.recovered" centered />
          <StatisticsCard text="Total Deaths" :value="statistics.deaths" centered />
        </div>
        <div class="statistics-group">
          <StatisticsCard text="Today Cases" :value="statistics.todayCases" centered />
          <StatisticsCard text="Today Recovered" :value="statistics.todayRecovered" centered />
          <StatisticsCard text="Today Deaths" :value="statistics.todayDeaths" centered />
        </div>
      </div>
    </RenderlessWorldStatistics>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isoToDate, isoToTime } from '@/js/helper'

import Tag from '@/components/Tag'
import StatisticsCard from '@/components/StatisticsCard'
import RenderlessWorldStatistics from '@/components/RenderlessWorldStatistics'

export default {
  name: 'world',
  components: {
    Tag,
    StatisticsCard,
    RenderlessWorldStatistics
  },
  methods: {
    ...mapActions(['loadWorld']),
    formatDate (value) {
      return `${isoToDate(value)}`
    },
    formatTime (value) {
      return `${isoToTime(value)}`
    }
  },
  created () {
    this.loadWorld()
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
