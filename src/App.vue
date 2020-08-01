<template>
  <div id="app">
    <Menu></Menu>
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  components: {
    Menu
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.view {
  display: flex;
  padding: 10px;
}
</style>
