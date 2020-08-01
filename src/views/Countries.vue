<template>
  <div class="countries-component">
    <h1 class="title">Countries</h1>

    <section>
      <b-input placeholder="Search..."
        type="search"
        icon="magnify"
        v-model="search">
      </b-input>
    </section>

    <RenderlessCountriesStatistics>
      <div slot-scope="{countries}">
      <b-table paginated
        :data="countries"
        :mobile-cards="hasMobileCards"
        narrowed per-page="50"
      >
        <template slot-scope="data">
          <b-table-column field="country" label="Country" sortable>
            <router-link :to="{ name: 'country', params: {code: data.row.country} }">
              {{ data.row.country }}
            </router-link>
          </b-table-column>
          <b-table-column field="cases" label="Total Cases" sortable>
            <NumericDisplay>
              {{ data.row.cases }}
            </NumericDisplay>
          </b-table-column>
          <b-table-column field="deaths" label="Total Deaths" sortable>
            <NumericDisplay>
              {{ data.row.deaths }}
            </NumericDisplay>
          </b-table-column>
          <b-table-column field="todayCases" label="Today Cases" sortable>
            <NumericDisplay>
              {{ data.row.todayCases }}
            </NumericDisplay>
          </b-table-column>
          <b-table-column field="todayDeaths" label="Today Deaths" sortable>
            <NumericDisplay>
              {{ data.row.todayDeaths }}
            </NumericDisplay>
          </b-table-column>
          <b-table-column field="testsPerOneMillion" label="Test per million" sortable>
            <NumericDisplay>
              {{ data.row.testsPerOneMillion }}
            </NumericDisplay>
          </b-table-column>
          <b-table-column field="population" label="Population" sortable>
            <NumericDisplay>
              {{ data.row.population }}
            </NumericDisplay>
          </b-table-column>
        </template>
      </b-table>
    </div>
    </RenderlessCountriesStatistics>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { preciseSquash } from '@/js/helper'

import NumericDisplay from '@/components/NumericDisplay'
import RenderlessCountriesStatistics from '@/components/RenderlessCountriesStatistics'

export default {
  name: 'countries',
  data () {
    return {
      hasMobileCards: false
    }
  },
  components: {
    NumericDisplay,
    RenderlessCountriesStatistics
  },
  computed: {
    ...mapState({
      searchText: state => state.search
    }),
    search: {
      get () { return this.searchText },
      set (value) { this.setSearch(value) }
    }
  },
  methods: {
    ...mapActions(['loadCountries']),
    ...mapMutations(['setSearch']),
    formatNumber (value) {
      return preciseSquash`${value}`
    }
  },
  created () {
    this.loadCountries()
  }
}
</script>

<style lang="scss" scoped>
.countries-component {
  display: flex;
  flex-direction: column;
}
</style>
