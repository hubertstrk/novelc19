<template>
  <div class="country-component">
    <RenderlessCountryStatistics :country="this.$route.params.country">
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
.country-component {
  display: flex;
  flex: 1;
}

</style>
