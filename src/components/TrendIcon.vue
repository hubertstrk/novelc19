<template>
  <div class="trend-info">
    <b-icon
        :icon="icon"
        size="is-small">
    </b-icon>
  </div>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    icon () {
      if (this.value > 10) return 'arrow-top-right'
      if (this.value < -10) return 'arrow-bottom-right'
      else return 'arrow-right'
    }
  }
}
</script>

<style lang="scss" scoped>
.trend-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
