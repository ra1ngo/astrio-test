<template>
  <figure class="product-card">
    <img
        class="product-card__image"
        :src="product.clientImageUrl"
        :alt="`${product.title} Image`" >

    <figcaption class="product-card__description">
      <strong class="product-card__description-title">{{product.title}}</strong>
      <span v-if="product.clientBrand" class="product-card__description-brand">{{ product.clientBrand.title }}</span>
      <span class="product-card__description-currency">{{currencyLabel}}</span>
    </figcaption>
  </figure>
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
  display: inline-block;
  background: aqua;
  border: 2px solid black;
  padding: 2px;
}

.product-card__image {
  border: 2px solid black;
  width: 225px;
  height: 300px;
}

.product-card__description {
  display: flex;
  flex-direction: column;
}

.product-card__description-title {

}

.product-card__description-brand {

}
</style>
