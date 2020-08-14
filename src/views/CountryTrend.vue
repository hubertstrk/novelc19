<template>
<div>
    <div v-for="name in countryNames" :key="name" class="trends">
      <router-link :to="{ name: 'country', params: {country: name} }">
        {{name}}
      </router-link>
      <RenderlessCountryTimeline :country="name">
        <div slot-scope="{timelines}" class="spark-lines">
          <trend
            :data="timelines.cases.relative.mean.map(x => x.y)"
            :gradient="['#3a86ff', '#3a86ff', '#b8f2e6']"
            :padding="spark.padding"
            :radius="spark.radius"
            :stroke-width="spark.width"
            :stroke-linecap="spark.butt"
            auto-draw
            smooth
          />
          <trend
            :data="timelines.deaths.relative.mean.map(x => x.y)"
            :gradient="['#f94144', '#f94144', '#ffbe88']"
            :padding="spark.padding"
            :radius="spark.radius"
            :stroke-width="spark.width"
            :stroke-linecap="spark.linecap"
            auto-draw
            smooth
          />
          <trend
            :data="timelines.recovered.relative.mean.map(x => x.y)"
            :gradient="['#42b983', '#b8f2e6', '#b8f2e6']"
            :padding="spark.padding"
            :radius="spark.radius"
            :stroke-width="spark.width"
            :stroke-linecap="spark.linecap"
            auto-draw
          />
        </div>
      </RenderlessCountryTimeline>
    </div>
  </div>
</template>

<script>
import Trend from 'vuetrend'
import { mapState, mapActions } from 'vuex'
import RenderlessCountryTimeline from '@/components/RenderlessCountryTimeline'

export default {
  name: 'countryTrend',
  data () {
    return {
      spark: {
        padding: 12,
        radius: 12,
        width: 3,
        linecap: 'butt'
      }
    }
  },
  components: {
    Trend,
    RenderlessCountryTimeline
  },
  computed: {
    ...mapState({
      timeline: state => state.timeline
    }),
    countryNames () {
      return Object.keys(this.timeline)
    }
  },
  methods: {
    ...mapActions([
      'loadCountries',
      'loadCountryTimelines'
    ])
  },
  async mounted () {
    const countries = await this.loadCountries()
    await this.loadCountryTimelines(countries.slice(0, 50).join())
  }
}
</script>

<style lang="scss" scoped>
.trends {
  margin-bottom: 2em;
  .spark-lines {
    display: flex;
  }
}
</style>
