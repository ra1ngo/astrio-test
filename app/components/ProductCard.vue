<template>
  <UCard class="product-card">
    <img
      class="product-card__image"
      :src="product.clientImageUrl"
      :alt="`${product.title} Image`"
    >

    <div class="product-card__description">
      <strong class="product-card__description-title">{{product.title}}</strong>
      <span v-if="product.clientBrand" class="product-card__description-brand">{{ product.clientBrand.title }}</span>
      <span class="product-card__description-currency">{{currencyLabel}}</span>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import { formatCurrency } from '@/utils/formatCurrency';

const { product } = defineProps<{
  product: IClientProductConfigurable;
}>();

const currencyLabel = computed(() => formatCurrency(product.regular_price.value, product.regular_price.currency));
</script>

<style lang="scss" scoped>
.product-card {
  height: min-content;
  cursor: pointer;
}

.product-card__image {
  width: 225px;
  height: 260px;
}

.product-card__description {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
}
</style>
