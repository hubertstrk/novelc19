<template>
  <div class="countries-component">
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" />
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
             <CountryCard :title="country.country" :population="country.population" :deaths="country[`${mode}Deaths`]" :cases="country[`${mode}Cases`]">
               <template #info>
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

import CountryCard from '@/components/CountryCard'
import RenderlessCountriesStatistics from '@/components/RenderlessCountriesStatistics'
import RenderlessCountryTimeline from '@/components/RenderlessCountryTimeline'

export default {
  name: 'countries',
  data () {
    return {
      spark: {
        padding: 3,
        radius: 12,
        width: 6,
        linecap: 'butt'
      },
      isFullPage: true,
      isLoading: false
    }
  },
  components: {
    CountryCard,
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
    this.isLoading = true
    const countries = await this.loadCountries()
    await this.loadCountryTimelines(countries.slice(0, 50))
    this.isLoading = false
  }
}
</script>

<style lang="scss" scoped>
.countries-component {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
