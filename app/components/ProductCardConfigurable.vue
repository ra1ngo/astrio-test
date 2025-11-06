<template>
  <div class="product-card-configurable">
    <ProductCard
      :product="product"
      class="product-card-configurable__base"
      @click="onClickProduct(product)"
    />

    <div class="product-card-configurable__options">
      <div class="product-card-configurable__options-list">
        <ProductCardConfigurableOptionColor
            v-for="option in colorOptions"
            :key="option.value_index"
            :option="option"
            :state="option.state"
            @click="onClickOption(option.value_index)"
        />
      </div>
      <div class="product-card-configurable__options-list">
        <ProductCardConfigurableOptionSize
            v-for="option in sizeOptions"
            :key="option.value_index"
            :option="option"
            :state="option.state"
            @click="onClickOption(option.value_index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductCardConfigurableOptionColor from './ProductCardConfigurableOptionColor.vue';
import type { ConfigureProductPayload } from '@/composables/useProductsMappedConfigured';
import ProductCardConfigurableOptionSize from './ProductCardConfigurableOptionSize.vue';
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import {useConfigureProduct} from '../composables/useConfigureProduct';

const { product } = defineProps<{
  product: IClientProductConfigurable;
}>();

const emits = defineEmits<{
  (eventName: 'onClickProduct', product: IClientProductConfigurable): void,
  (eventName: 'configureProduct', payload: ConfigureProductPayload): void,
}>();

const {
  toggleOption,
  colorOptions,
  sizeOptions,
  availableVariants,
} = useConfigureProduct(product);

function onClickOption(optionId: number) {
  toggleOption(optionId);

  emits('configureProduct', {
    productId: product.id,
    selectedVariant: availableVariants.value?.length == 1 ? availableVariants.value.at(0) : undefined,
  });
}

function onClickProduct(product: IClientProductConfigurable) {
  emits('onClickProduct', product);
}
</script>

<style lang="scss" scoped>
.product-card-configurable__options {
  margin-top: 18px;
  margin-bottom: 4px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-card-configurable__options-list {
  display: flex;
  gap: 10px;
}
</style>
