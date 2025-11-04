<template>
  <div class="layout">
    <header class="layout__header">
      <img
          class="layout__header-logo"
          src="/logo.png"
          alt="Logo" >
      <div class="layout__header-controls">
        <slot name="controls" />
      </div>
    </header>

    <aside class="layout__aside">
      <slot name="aside" />
    </aside>

    <main class="layout__main">
      <slot name="main" />
    </main>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.layout {
  position: relative;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 100px auto;
  grid-template-areas:
    "layout-header layout-header"
    "layout-aside layout-main";
}

.layout__header {
  position: fixed;
  grid-area: layout-header;
  display: flex;
  justify-content: space-around;
}

.layout__header-logo {

}

.layout__header-controls {

}

.layout__aside {
  position: fixed;
  grid-area: layout-aside;
  margin: 20px;
}

.layout__main {
  grid-area: layout-main;
  margin: 20px;
}
</style>
