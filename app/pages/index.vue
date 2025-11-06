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
          <ProductList :products="clientProducts" @on-click-product="add" @configure-product="configureProduct" />
        </UPageBody>
      </template>
    </UPage>
  </div>
</template>

<script lang="ts" setup>
import { useBasketStore } from '@/stores/useBasketStore';
import { useProducts } from '@/composables/useProducts';
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
const { clientProducts, selectedBrands, configureProduct } = useProducts(brands, products);

function onBasketClick() {
  router.push({ path: '/cart' });
}
</script>

<style lang="scss" scoped>
</style>
