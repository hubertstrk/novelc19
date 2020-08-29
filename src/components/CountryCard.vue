<template>
  <div :class="$style['card-component']">
    <div :class="$style['card-row']">
      <div :class="$style['card-title']">
        <slot />
      </div>
      <div :class="$style['spark-lines']">
        <template v-if="statistics.timelines">
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
        </template>
        <div :class="$style['card-info']" v-else>
          <b-tag type="is-warning is-light">country doesn't provide any timeline data</b-tag>
        </div>
      </div>
    </div>
    <div :class="[$style['card-row'], $style['sub-row']]">
      <StatisticDisplay small text="Cases" :value="statistics[`${mode}Cases`]">
        <TrendIcon v-if="statistics.timelines" :value="statistics.timelines.cases.trend" />
      </StatisticDisplay>
      <StatisticDisplay small text="Deaths" :value="statistics[`${mode}Deaths`]">
        <TrendIcon v-if="statistics.timelines" :value="statistics.timelines.deaths.trend" />
      </StatisticDisplay>
      <StatisticDisplay small text="Population" :value="statistics.population" />
    </div>
  </div>
</template>

<script>
import { preciseSquash } from '@/js/helper'

import TrendLine from '@/components/TrendLine'
import TrendIcon from '@/components/TrendIcon'
import StatisticDisplay from '@/components/StatisticDisplay'

export default {
  props: {
    statistics: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    }
  },
  components: {
    TrendLine,
    TrendIcon,
    StatisticDisplay
  },
  methods: {
    formatNumber (value) {
      return preciseSquash`${value}`
    }
  }
}
</script>

<style lang="scss" module>
.card-component {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(230,230,230);
  border-radius: 6px;
  margin: 3px 0;

  .card-row {
    display: flex;
    align-items: center;
    padding: 6px;
    justify-content: space-between;

    .card-title {
      display: flex;
      flex: 1;
    }

    .spark-lines {
      display: flex;
      flex: 2;
      justify-content: space-between;
    }
  }

  .card-info {
    font-style: italic;
    font-size: 0.8rem;
  }
}
</style>
