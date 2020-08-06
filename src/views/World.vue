<template>
  <div class="world-component">
    <h1 class="title">World</h1>
    <RenderlessWorldStatistics>
      <div slot-scope="{statistics}">
        <Tag success :value1="formatDate(statistics.updated)" :value2="formatTime(statistics.updated)" />
        <div class="statistics-group">
          <StatisticsCard text="Affected countries" :value="statistics.affectedCountries" />
          <StatisticsCard text="Tests per million" :value="statistics.testsPerOneMillion" />
          <StatisticsCard text="Deaths per million" :value="statistics.deathsPerOneMillion" />
        </div>
        <div class="statistics-group">
          <StatisticsCard text="Total Cases" :value="statistics.cases" />
          <StatisticsCard text="Total Recovered" :value="statistics.recovered" />
          <StatisticsCard text="Total Deaths" :value="statistics.deaths" />
        </div>
        <div class="statistics-group">
          <StatisticsCard text="Today Cases" :value="statistics.todayCases" />
          <StatisticsCard text="Today Recovered" :value="statistics.todayRecovered" />
          <StatisticsCard text="Today Deaths" :value="statistics.todayDeaths" />
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
  justify-content: space-evenly;
}
</style>
