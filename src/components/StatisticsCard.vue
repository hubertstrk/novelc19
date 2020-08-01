<template>
  <div class="statistics-card has-text-centered">
    <p class="heading">{{text}}</p>
    <p class="title is-5">{{ value | format }}</p>
  </div>
</template>

<script>
import { preciseSquash } from '@/js/helper'
export default {
  props: ['text', 'value'],
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
  margin: 1.5rem 0;
}
</style>
