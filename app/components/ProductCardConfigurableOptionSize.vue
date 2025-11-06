<template>
  <ProductCardConfigurableOption class="product-card-configurable-option-size" :state="state">
    {{option.label}}
  </ProductCardConfigurableOption>
</template>

<script lang="ts" setup>
import type { IApiProductConfigurableOptionValue } from '@/types/apiProductConfigurable';
import ProductCardConfigurableOption from './ProductCardConfigurableOption.vue';
import type { TOptionState } from '@/composables/useConfigureProduct';

const { option, state } = defineProps<{
  option: IApiProductConfigurableOptionValue;
  state: TOptionState;
}>();
</script>

<style lang="scss" scoped>
.product-card-configurable-option-size {
  background: white;
  color: black;
}
</style>
