<template>
  <div class="product-list">
    <template v-for="product in products" :key="product.id">
      <ProductCard
          v-if="product.type === 'simple'"
          :product="product"
          class="product-list__item"
          @click="onClickProduct(product)"
      />
      <ProductCardConfigurable
          v-if="product.type === 'configurable'"
          :product="product"
          class="product-list__item"
          @on-click-product="onClickProduct"
          @configure-product="configureProduct"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { ConfigureProductPayload } from '@/types/configureProductPayload';
import ProductCardConfigurable from '@/components/ProductCardConfigurable.vue';
import ProductCard from '@/components/ProductCard.vue';

const { products } = defineProps<{
  products: Array<IClientProductConfigurable>;
}>();

const emit = defineEmits<{
  (eventName: 'onClickProduct', product: IClientProductConfigurable): void,
  (eventName: 'configureProduct', payload: ConfigureProductPayload): void,
}>();

function onClickProduct(product: IClientProductConfigurable) {
  emit('onClickProduct', product);
}

function configureProduct(payload: ConfigureProductPayload) {
  emit('configureProduct', payload);
}
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.product-list__item {

}
</style>
