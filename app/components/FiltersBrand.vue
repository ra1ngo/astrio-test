<template>
  <div class="filters-brand">
    <p class="filters-brand__title">All Brands</p>
    <ul class="filters-brand__list">
      <li
          v-for="brand in brands"
          :key="brand.id"
          class="filters-brand__list-item"
          @click="selectBrand(brand.id)"
      >
        {{ brand.title }}
      </li>
    </ul>
  </div>
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
.filters-brand {

}

.filters-brand__title {

}

.filters-brand__list {

}

.filters-brand__list-item {

}
</style>
