<template>
  <b-taglist attached>
    <b-tag  type="is-black">{{value1}}</b-tag>
    <b-tag type="is-info">{{value2}}</b-tag>
  </b-taglist>
</template>

<script>
export default {
  props: ['value1', 'value2']
}
</script>
