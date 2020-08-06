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
      <b-table paginated
        :data="countries"
        :mobile-cards="hasMobileCards"
        per-page="50"
        striped hoverable scrollable
      >
        <template slot-scope="data">
          <b-table-column field="country" label="Country" sortable>
            <router-link :to="{ name: 'country', params: {country: data.row.country} }">
              {{ data.row.country }}
            </router-link>
          </b-table-column>
          <b-table-column :field="`${mode}Cases`" :label="capitalize(`${mode} Cases`)" sortable numeric>
            <NumericDisplay>
              {{ data.row[`${mode}Cases`] }}
            </NumericDisplay>
          </b-table-column>
          <b-table-column :field="`${mode}Deaths`" :label="capitalize(`${mode} Deaths`)" sortable numeric>
            <NumericDisplay>
              {{ data.row[`${mode}Deaths`] }}
            </NumericDisplay>
          </b-table-column>
          <b-table-column field="critical" label="Critical" sortable numeric>
            <NumericDisplay>
              {{ data.row.critical }}
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
import { preciseSquash, capitalize } from '@/js/helper'

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
    ...mapActions(['loadCountries']),
    ...mapMutations(['setSearch', 'setModeSelection']),
    formatNumber (value) {
      return preciseSquash`${value}`
    },
    capitalize (value) {
      return capitalize(value)
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
