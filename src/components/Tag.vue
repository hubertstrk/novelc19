<template>
  <div class="control">
    <b-taglist attached>
      <b-tag  type="is-black">{{text}}</b-tag>
      <b-tag type="is-info">{{ value | format }}</b-tag>
    </b-taglist>
  </div>
</template>

<script>
import { isoToDate, isoToTime } from '@/js/helper'
export default {
  props: ['text', 'value'],
  filters: {
    format (value) {
      return `${isoToDate(value)}, ${isoToTime(value)}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
