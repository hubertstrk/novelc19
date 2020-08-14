<template>
  <div class="statistics-card" :class="centered ? 'has-text-centered' : ''">
    <h1 class="heading">{{text}}</h1>
    <h1 class="title is-6">{{ value | format }}</h1>
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
}
</style>
