<template>
  <div class="info-slider">
    <div>{{ format(values[index].value) }}</div>
    <input type="range" id="points" name="points" min="0" max="10" ref="slider" v-model="index">
  </div>
</template>

<script>
import { preciseSquash } from '@/js/helper'
export default {
  data () {
    return {
      index: 0
    }
  },
  props: {
    values: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    format (value) {
      return preciseSquash`${value}`
    }
  },
  mounted () {
    this.$refs.slider = this.values.length
  }
}
</script>

<style lang="scss" scoped>
.info-slider {
  display: flex;
  flex-direction: column;
  width: 80%;
}
</style>
