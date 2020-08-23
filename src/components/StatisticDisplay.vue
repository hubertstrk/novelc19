<template>
  <div class="statistics-card" :class="centered ? 'has-text-centered' : ''">
    <div class="card-title">
      <h1 class="heading">{{text}}</h1>
      <slot />
    </div>
    <h1 class="title" :class="[ small ? 'is-7' : 'is-5' ]">{{ value | format }}</h1>
  </div>
</template>

<script>
import { preciseSquash } from '@/js/helper'
export default {
  props: {
    text: {
      type: String,
      default: () => ''
    },
    value: {
      type: Number,
      default: () => 0
    },
    centered: {
      type: Boolean,
      default: () => false
    },
    small: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  filters: {
    format (value) {
      return preciseSquash`${value}`
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .card-title {
    display: flex;
    align-items: baseline;

    > *:not(:last-child) {
      margin-right: 6px;
    }
  }
}
</style>
