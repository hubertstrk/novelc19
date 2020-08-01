<template>
  <div class="countries-component">
    <h1 class="title">Countries</h1>
    <RenderlessCountriesStatistics>
      <div slot-scope="{countries}">
      <b-table
        paginated pagination-simple
        narrowed per-page="50"
        :data="countries"
        :mobile-cards="hasMobileCards"
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
import { mapActions } from 'vuex'
import { preciseSquash } from '@/js/helper'

import NumericDisplay from '@/components/NumericDisplay'
import RenderlessCountriesStatistics from '@/components/RenderlessCountriesStatistics'

export default {
  name: 'countries',
  data () {
    return {
      hasMobileCards: true
    }
  },
  components: {
    NumericDisplay,
    RenderlessCountriesStatistics
  },
  methods: {
    ...mapActions(['loadCountries']),
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
