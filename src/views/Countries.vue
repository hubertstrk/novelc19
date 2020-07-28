<template>
  <div>
    <h1 class="title">Countries</h1>
    <RenderlessCountriesStatistics>
      <div slot-scope="{statistics}">
        <div v-for="data in statistics" :key="data.countryInfo._id">
          <div>{{data.country}} {{formatNumber(data.cases)}}, {{formatNumber(data.deaths)}}, {{formatNumber(data.testsPerOneMillion)}}</div>
        </div>
      </div>
    </RenderlessCountriesStatistics>
  </div>
</template>

<script>
import { preciseSquash } from '@/js/helper'
import RenderlessCountriesStatistics from '@/components/RenderlessCountriesStatistics'
export default {
  name: 'countries',
  components: {
    RenderlessCountriesStatistics
  },
  methods: {
    formatNumber (value) {
      return preciseSquash`${value}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
