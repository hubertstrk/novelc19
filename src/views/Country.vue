<template>
  <div>
    <RenderlessCountryStatistics :country="this.$route.params.country">
      <div slot-scope="{timelines}" class="chart">
        <GenericTimelineChart :timelines="timelines.casesForChart" />
        <GenericTimelineChart :timelines="timelines.deathsForChart" />
        <GenericTimelineChart :timelines="timelines.recoveredForChart" />
      </div>
    </RenderlessCountryStatistics>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import GenericTimelineChart from '@/chart/GenericTimelineChart'
import RenderlessCountryStatistics from '@/components/RenderlessCountryStatistics'

export default {
  name: 'country',
  components: {
    GenericTimelineChart,
    RenderlessCountryStatistics
  },
  methods: {
    ...mapActions([
      'loadCountry'
    ])
  },
  async mounted () {
    await this.loadCountry(this.$route.params.country)
  },
  beforeRouteUpdate (to, from, next) {
    this.loadCountry(to.country)
  }
}
</script>

<style lang="scss" scoped>
.chart {
  display: flex;
}
</style>
