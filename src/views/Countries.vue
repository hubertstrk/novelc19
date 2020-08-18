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

    <RenderlessCountriesStatistics>
      <div slot-scope="{countries}">
        <div v-for="(country, index) in countries" :key="index">

          <RenderlessCountryTimeline :country="country.country">
            <div slot-scope="{timelines}">
             <CountryCard>
                <template #title>
                  <router-link :to="{ name: 'country', params: {country: country.country} }">
                    <h4 class="subtitle is-5">{{country.country}}</h4>
                  </router-link>
               </template>
               <div slot="info" class="trend-lines">
                  <TrendLine
                    :data="timelines.deaths.relative.mean.map(x => x.y)"
                   :gradient="['#f94144', '#f94144', '#ffbe88']"
                  />
                  <TrendLine
                    :data="timelines.cases.relative.mean.map(x => x.y)"
                   :gradient="['#3a86ff', '#3a86ff', '#b8f2e6']"
                  />
                  <TrendLine
                    :data="timelines.recovered.relative.mean.map(x => x.y)"
                   :gradient="['#15b368', '#60e0a3', '#baffde']"
                  />
               </div>
               <template #statistics>
                  <StatisticDisplay text="Deaths" :value="country[`${mode}Deaths`]">
                    <TrendIcon :value="timelines.cases.trend" />
                  </StatisticDisplay>
                  <StatisticDisplay text="Cases" :value="country[`${mode}Cases`]">
                    <TrendIcon :value="timelines.deaths.trend" />
                  </StatisticDisplay>
                  <StatisticDisplay text="Population" :value="country.population" />
               </template>
             </CountryCard>
            </div>
          </RenderlessCountryTimeline>

        </div>
      </div>
    </RenderlessCountriesStatistics>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { preciseSquash, capitalize } from '@/js/helper'

import TrendLine from '@/components/TrendLine'
import TrendIcon from '@/components/TrendIcon'
import CountryCard from '@/components/CountryCard'
import StatisticDisplay from '@/components/StatisticDisplay'
import RenderlessCountriesStatistics from '@/components/RenderlessCountriesStatistics'
import RenderlessCountryTimeline from '@/components/RenderlessCountryTimeline'

export default {
  name: 'countries',
  components: {
    TrendLine,
    TrendIcon,
    CountryCard,
    StatisticDisplay,
    RenderlessCountriesStatistics,
    RenderlessCountryTimeline
  },
  computed: {
    ...mapState({
      searchText: state => state.search,
      modeSelection: state => state.modeSelection
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
    ...mapActions(['loadCountries', 'loadCountryTimelines']),
    ...mapMutations(['setSearch', 'setModeSelection']),
    formatNumber (value) {
      return preciseSquash`${value}`
    },
    capitalize (value) {
      return capitalize(value)
    }
  },
  async created () {
    const countries = await this.loadCountries()
    await this.loadCountryTimelines(countries.slice(0, 100))
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
