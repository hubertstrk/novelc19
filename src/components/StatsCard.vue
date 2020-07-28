<template>
  <div class="has-text-centered">
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
</style>
