<template>
  <b-taglist attached>
    <b-tag  :type="{ 'is-black': !light, 'is-light': light }">{{value1}}</b-tag>
    <b-tag :type="{ 'is-success': success, 'is-warning': warning, 'is-danger': danger }">{{value2}}</b-tag>
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
  }
}
</script>
