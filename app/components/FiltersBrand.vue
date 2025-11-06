<template>
  <UCard class="filters-brand">
    <template #header>
      <span class="filters-brand__title">All Brands</span>
    </template>

    <template #default>
      <div class="filters-brand__list">
        <UCheckbox
            v-for="brand in brands"
            :key="brand.id"
            :label="brand.title"
            :model-value="selectedBrands.includes(brand.id)"
            class="filters-brand__list-item"
            size="lg"
            @click="selectBrand(brand.id)"
        />
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { IApiBrand } from '@/types/apiBrand';

const { brands } = defineProps<{
  brands: Array<IApiBrand>;
}>();

const selectedBrands = defineModel<Array<number>>('selectedBrands', { default: [] });

function selectBrand(brandId: number) {
  const index = selectedBrands.value.indexOf(brandId);
  if (index > -1) {
    selectedBrands.value.splice(index, 1);
  } else {
    selectedBrands.value.push(brandId);
  }
}
</script>

<style lang="scss" scoped>
.filters-brand__title {
  font-weight: 600;
  font-size: 16px;
}

.filters-brand__list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}
</style>
