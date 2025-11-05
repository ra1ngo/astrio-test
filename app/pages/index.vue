<template>
  <div>
    <Teleport to="#app-header-control">
      <BasketIcon :count="count" @click="onBasketClick" />
    </Teleport>

    <UPage>
      <template #left>
        <UPageAside>
          <FiltersBrand
              v-model:selected-brands="selectedBrands"
              :brands="brands"
          />
        </UPageAside>
      </template>

      <template #default>
        <UPageHeader title="Catalog"/>
        <UPageBody>
          <ProductList :products="filteredProducts" @on-click-product="add" />
        </UPageBody>
      </template>
    </UPage>
  </div>
</template>

<script lang="ts" setup>
import { useClientProductsFilter } from '@/composables/useClientProductsFilter';
import { useClientProducts } from '@/composables/useClientProducts';
import { useBasketStore } from '@/stores/useBasketStore';
import { useApiProducts } from '@/api/useApiProducts';
import BasketIcon from '@/components/BasketIcon.vue';
import { useApiBrands } from '@/api/useApiBrands';

const router = useRouter();

const basketStore = useBasketStore();
const { count } = storeToRefs(basketStore);
const { add } = basketStore;

const { getBrands } = useApiBrands();
const { getProducts } = useApiProducts();
const brands = getBrands();
const products = getProducts();
const { clientProducts } = useClientProducts(brands, products);
const { filteredProducts, selectedBrands } = useClientProductsFilter(clientProducts);

function onBasketClick() {
  router.push({ path: '/cart' });
}
</script>

<style lang="scss" scoped>
</style>
