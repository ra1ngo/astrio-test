<template>
  <div class="basket-table-item-product">
    <img
        class="basket-table-item-product__image"
        :src="product.clientImageUrl"
        :alt="`${product.title} Image`" >

    <span class="basket-table-item-product__title">{{title}}</span>
    <div v-if="product.clientSelectedVariant" class="basket-table-item-product__variant">
      <span class="basket-table-item-product__variant-label">{{selectedVariantColorLabel}}</span>
      <span class="basket-table-item-product__variant-label">{{selectedVariantSizeLabel}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';

const { product } = defineProps<{
  product: IClientProductConfigurable
}>();

const title = computed(() => {
  if (product.clientBrand?.title) {
    return `${product.clientBrand.title} / ${product.title}`;
  }

  return product.title;
});

const selectedVariantColorLabel = computed(() => {
  const optionId = product.clientSelectedVariant?.attributes.find(s => s.code === 'color')?.value_index;
  const optionDesc = product.configurable_options?.find(c => c.attribute_code === 'color');
  const optionValue = optionDesc?.values.find(c => c.value_index == optionId);

  if (!optionDesc || !optionValue) return '';
  return `${optionDesc.label}: ${optionValue.label}`;
});

const selectedVariantSizeLabel = computed(() => {
  const optionId = product.clientSelectedVariant?.attributes.find(s => s.code === 'size')?.value_index;
  const optionDesc = product.configurable_options?.find(c => c.attribute_code === 'size');
  const optionValue = optionDesc?.values.find(c => c.value_index == optionId);

  if (!optionDesc || !optionValue) return '';
  return `${optionDesc.label}: ${optionValue.label}`;
});
</script>

<style lang="scss" scoped>
.basket-table-item-product {

}

.basket-table-item-product__image {

}

.basket-table-item-product__title {

}

.basket-table-item-product__variant {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.basket-table-item-product__variant-label {

}
</style>
