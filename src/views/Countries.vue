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
      <b-radio-button v-model="mode" type="is-primary"
        native-value="yesterday">
        <span>Yesterday</span>
      </b-radio-button>
    </b-field>

    <section>
      <b-input placeholder="Country..."
        type="search"
        icon="magnify"
        v-model="search">
      </b-input>
    </section>
    <div>
      <template v-for="(iso3, index) in Object.keys(countries)">
        <CountryStatistics :iso3="iso3" :key="index">
          <div slot-scope="{statistics}">

            <CountryCard :statistics="statistics" :mode="mode">
              <router-link :to="{ name: 'country', params: {country: statistics.countryInfo.iso3} }">
                <h4 class="subtitle is-5">{{statistics.country}}</h4>
              </router-link>
            </CountryCard>

          </div>
        </CountryStatistics>
      </template>
    </div>
     <b-loading :is-full-page="false" :active.sync="isLoading" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { preciseSquash, capitalize } from '@/js/helper'

import CountryCard from '@/components/CountryCard'
import CountryStatistics from '@/components/CountryStatistics'

export default {
  name: 'countries',
  components: {
    CountryCard,
    CountryStatistics
  },
  data () {
    return {
      isLoading: false
    }
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
  async mounted () {
    await this.loadAllCountryStatistics()
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
