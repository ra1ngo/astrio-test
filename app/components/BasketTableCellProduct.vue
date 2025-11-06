<template>
  <div class="basket-table-cell-product">
    <img
        class="basket-table-cell-product__image"
        :src="product.clientImageUrl"
        :alt="`${product.title} Image`" >

    <div class="basket-table-cell-product__info">
      <span class="basket-table-cell-product__info-title">{{title}}</span>
      <div v-if="product.clientSelectedVariant" class="basket-table-cell-product__info-variant">
        <span class="basket-table-cell-product__info-variant-label">{{selectedVariantColorLabel}}</span>
        <span class="basket-table-cell-product__info-variant-label">{{selectedVariantSizeLabel}}</span>
      </div>
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

//TODO DRY
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
.basket-table-cell-product {
  display: flex;
  align-items: center;
  margin-left: -20px;
}

.basket-table-cell-product__image {
  width: 100px;
  height: 100px;
}

.basket-table-cell-product__info-title {
  font-size: 16px;
  font-weight: bold;
}

.basket-table-cell-product__info-variant {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
