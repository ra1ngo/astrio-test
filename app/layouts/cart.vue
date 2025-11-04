<template>
  <div class="layout-cart">
    <header class="layout-cart__header">
      <img
          class="layout-cart__header-logo"
          src="/logo.png"
          alt="Logo" >
    </header>

    <main class="layout-cart__main">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
</script>


<style lang="scss" scoped>
.layout-cart {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.layout-cart__header {
  display: flex;
  justify-content: center;
}
</style>
