<template>
  <div>
    <h1 class="title">World</h1>
    <RenderlessWorldStatistics>
      <div slot-scope="{statistics}">
        <Tag text="Updated" :value="statistics.updated" type="danger" />
        <StatsCard text="Cases" :value="statistics.cases"></StatsCard>
        <StatsCard text="Recovered" :value="statistics.recovered"></StatsCard>
        <StatsCard text="Deaths" :value="statistics.deaths"></StatsCard>

        <StatsCard text="Today cases" :value="statistics.todayCases"></StatsCard>
        <StatsCard text="Today recovered" :value="statistics.todayRecovered"></StatsCard>
        <StatsCard text="Today deaths" :value="statistics.todayDeaths"></StatsCard>

        <StatsCard text="Tests per million" :value="statistics.testsPerOneMillion"></StatsCard>
        <StatsCard text="Affected countries" :value="statistics.affectedCountries"></StatsCard>
      </div>
    </RenderlessWorldStatistics>
  </div>
</template>

<script>
import Tag from '@/components/Tag'
import StatsCard from '@/components/StatsCard'
import { isoToDate, isoToTime, preciseSquash } from '@/js/helper'
import RenderlessWorldStatistics from '@/components/RenderlessWorldStatistics'

export default {
  name: 'world',
  components: {
    Tag,
    StatsCard,
    RenderlessWorldStatistics
  },
  methods: {
    formatDate (iso) {
      return `${isoToDate(iso)}, ${isoToTime(iso)}`
    },
    formatNumber (value) {
      return preciseSquash`${value}`
    }
  }
}
</script>
