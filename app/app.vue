<template>
  <UApp>
    <UHeader title="Astrio Test">
      <template #title>
        <img src="/logo.png" alt="Logo" >
      </template>
      <template #right>
        <div id="app-header-control"/>
      </template>
    </UHeader>

    <UMain class="py-8">
      <UContainer>
        <NuxtPage />
      </UContainer>
    </UMain>
  </UApp>
</template>


<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>
