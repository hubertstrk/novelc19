<template>
  <div :class="$style.card">
    <div :class="$style['card-title']">
      <router-link :to="{ name: 'country', params: {country: title} }">
        <h6 class="subtitle is-5">{{title}}</h6>
      </router-link>
      <div :class="$style.info">
        <slot name="info" />
      </div>
    </div>
    <div :class="$style['card-subtitle']">
      <StatisticsCard text="Deaths" :value="deaths" />
      <StatisticsCard text="Cases" :value="cases" />
      <StatisticsCard text="Population" :value="population" />
    </div>
  </div>
</template>

<script>
import { preciseSquash } from '@/js/helper'
import StatisticsCard from '@/components/StatisticsCard'
export default {
  props: ['title', 'population', 'cases', 'deaths'],
  components: {
    StatisticsCard
  },
  methods: {
    formatNumber (value) {
      return preciseSquash`${value}`
    }
  }
}
</script>

<style lang="scss" module>
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(235,235,235);
  border-radius: 6px;
  margin: 6px 0;

  .card-title {
    display: flex;
    align-items: center;
    padding: 5px;

    .title {
      font-size: 1.3em;
    }

    >:first-child {
      display: flex;
      flex: 1;
    }

    .info {
      display: flex;
      flex: 1;
      height: 100%;

      > *:not(:last-child) {
        margin-right: 4px;
      }
    }

  }

  .card-subtitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
  }
}
</style>
