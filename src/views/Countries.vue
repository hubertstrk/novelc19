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
    <div class="country-statistics">
      <template v-for="(iso3, index) in Object.keys(countries)">
        <CountryStatistics :iso3="iso3" coarse :key="index">
          <div slot-scope="{statistics}">
            <router-link :to="{ name: 'country', params: {country: statistics.countryInfo.iso3} }">
              <CountryCard :statistics="statistics" :mode="mode">
                <div v-if="statistics.countryInfo.iso3" class="title">{{statistics.country}}</div>
                <b-tag v-else type="is-danger is-light">undefined</b-tag>
              </CountryCard>
            </router-link>
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

.title {
  font-size: 2rem;
}

@media only screen and (max-width: 768px) {
  .title {
    font-size: 1.4rem;
  }
}

</style>
