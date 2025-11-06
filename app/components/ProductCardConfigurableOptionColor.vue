<template>
  <ProductCardConfigurableOption class="product-card-configurable-option-color" :state="state" :style="cssVariables" />
</template>

<script lang="ts" setup>
import type { IApiProductConfigurableOptionValue } from '@/types/apiProductConfigurable';
import ProductCardConfigurableOption from './ProductCardConfigurableOption.vue';
import type { TOptionState } from '@/composables/useConfigureProduct';

const { option, state } = defineProps<{
  option: IApiProductConfigurableOptionValue;
  state: TOptionState;
}>();

const cssVariables = computed(() => ({
  '--product-card-configurable-option-color-value': option.value,
}));
</script>

<style lang="scss" scoped>
.product-card-configurable-option-color {
  background: var(--product-card-configurable-option-color-value);
}
</style>
