<template>
  <div class="countries-component">
    <h1 class="title">Countries</h1>
    <b-field>
      <b-radio-button v-model="mode" type="is-primary"
        native-value="total">
        <span>Total</span>
      </b-radio-button>

      <b-radio-button v-model="mode" type="is-primary"
        native-value="today">
        <span>Today</span>
      </b-radio-button>
    </b-field>

    <section>
      <b-input placeholder="Country..."
        type="search"
        icon="magnify"
        v-model="search">
      </b-input>
    </section>

    <div v-if="Object.keys(timelines).length > 0">
      <template v-for="iso3 in Object.keys(timelines)">
        <CountryStatistics render-timeline :country="iso3" :key="iso3">
          <div slot-scope="{statistics}">

            <CountryCard>
              <template #title>
                <router-link :to="{ name: 'country', params: {country: statistics.countryInfo.iso3} }">
                  <h4 class="subtitle is-5">{{statistics.country}}</h4>
                </router-link>
              </template>

              <div slot="info" class="trend-lines">
                <TrendLine
                  :data="statistics.timelines.deaths.relative.mean.map(x => x.y)"
                  :gradient="['#f94144', '#f94144', '#ffbe88']"
                />
                <TrendLine
                  :data="statistics.timelines.cases.relative.mean.map(x => x.y)"
                  :gradient="['#3a86ff', '#3a86ff', '#b8f2e6']"
                />
                <TrendLine
                  :data="statistics.timelines.recovered.relative.mean.map(x => x.y)"
                  :gradient="['#15b368', '#60e0a3', '#baffde']"
                />
              </div>
              <template #statistics>
                <StatisticDisplay text="Cases" :value="statistics[`${mode}Cases`]">
                  <TrendIcon :value="statistics.timelines.cases.trend" />
                </StatisticDisplay>
                <StatisticDisplay text="Deaths" :value="statistics[`${mode}Deaths`]">
                  <TrendIcon :value="statistics.timelines.deaths.trend" />
                </StatisticDisplay>
                <StatisticDisplay text="Population" :value="statistics.population" />
              </template>
            </CountryCard>

          </div>
        </CountryStatistics>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { preciseSquash, capitalize } from '@/js/helper'

import TrendLine from '@/components/TrendLine'
import TrendIcon from '@/components/TrendIcon'
import CountryCard from '@/components/CountryCard'
import StatisticDisplay from '@/components/StatisticDisplay'
import CountryStatistics from '@/components/CountryStatistics'

export default {
  name: 'countries',
  components: {
    TrendLine,
    TrendIcon,
    CountryCard,
    StatisticDisplay,
    CountryStatistics
  },
  computed: {
    ...mapState({
      searchText: state => state.search,
      modeSelection: state => state.modeSelection,
      countries: state => state.countries,
      timelines: state => state.timelines
    }),
    search: {
      get () { return this.searchText },
      set (value) { this.setSearch(value) }
    },
    mode: {
      get () { return this.modeSelection },
      set (value) { this.setModeSelection(value) }
    }
  },
  methods: {
    ...mapActions([
      'loadAllCountryStatistics'
    ]),
    ...mapMutations([
      'setSearch',
      'setModeSelection'
    ]),
    formatNumber (value) {
      return preciseSquash`${value}`
    },
    capitalize (value) {
      return capitalize(value)
    }
  },
  async created () {
    this.loadAllCountryStatistics()
  }
}
</script>

<style lang="scss" scoped>
.countries-component {
  display: flex;
  flex-direction: column;
  flex: 1;

  .trend-lines {
    display: flex;
    flex: 1;
    justify-content: space-between;
    height: 100%;

    > * {
      margin-right: 4px;
    }
  }
}
</style>
