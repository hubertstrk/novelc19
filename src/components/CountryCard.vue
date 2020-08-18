<template>
  <div :class="$style['card-component']">
    <div :class="$style['card-row']">
      <div :class="$style['card-title']">
        <slot name="title" />
      </div>
      <div :class="$style['card-info']">
        <slot name="info" />
      </div>
    </div>
    <div :class="[$style['card-row'], $style['sub-row']]">
      <slot name="statistics" />
    </div>
  </div>
</template>

<script>
import { preciseSquash } from '@/js/helper'

export default {
  methods: {
    formatNumber (value) {
      return preciseSquash`${value}`
    }
  }
}
</script>

<style lang="scss" module>
.card-component {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(230,230,230);
  border-radius: 6px;
  margin: 6px 0;

  .card-row {
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: space-between;

    .card-title {
      display: flex;
      flex: 1;
    }

    .card-info {
      display: flex;
      flex: 2;
    }
  }
}
</style>
