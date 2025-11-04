<template>
  <NuxtLayout>
    <template #controls>
      <BasketIcon :count="count" @click="onBasketClick" />
    </template>

    <template #aside>
      <FiltersBrand
        v-model:selected-brands="selectedBrands"
        :brands="brands"
      />
    </template>

    <template #main>
      <ProductList :products="filteredProducts" @on-click-product="add" @configure-product="configureProduct" />
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useBasketStore } from '@/stores/useBasketStore';
import { useProducts } from '@/composables/useProducts';
import BasketIcon from '@/components/BasketIcon.vue';
import {useApiProducts} from '@/api/useApiProducts';
import { useApiBrands } from '@/api/useApiBrands';

const router = useRouter();

const basketStore = useBasketStore();
const { count } = storeToRefs(basketStore);
const { add } = basketStore;

const { getBrands } = useApiBrands();
const { getProducts } = useApiProducts();
const brands = getBrands();
const products = getProducts();
const { filteredProducts, selectedBrands, configureProduct } = useProducts(brands, products);

function onBasketClick() {
  router.push({ path: '/cart' });
}
</script>

<style lang="scss" scoped>
</style>
