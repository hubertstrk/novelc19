<template>
  <b-taglist attached>
    <b-tag  :type="value1Style">{{value1}}</b-tag>
    <b-tag :type="value2Style">{{value2}}</b-tag>
  </b-taglist>
</template>

<script>
export default {
  props: {
    value1: String,
    value2: String,
    danger: Boolean,
    warning: Boolean,
    success: Boolean,
    light: Boolean
  },
  computed: {
    value1Style () {
      if (this.light) return 'is-light'
      return 'is-black'
    },
    value2Style () {
      if (this.success) return 'is-success'
      if (this.warning) return 'is-warning'
      return 'is-danger'
    }
  }
}
</script>
