<template>
  <trend
    :data="data"
    :gradient="gradient"
    :padding="spark.padding"
    :radius="spark.radius"
    :stroke-width="spark.width"
    :stroke-linecap="spark.butt"
    auto-draw
    smooth
  />
</template>

<script>
export default {
  data () {
    return {
      spark: {
        padding: 3,
        radius: 12,
        width: 3,
        linecap: 'butt'
      }
    }
  },
  props: ['data', 'gradient']
}
</script>

<style lang="scss" module>
</style>
