<template>
  <div class="product-card-configurable-option-color" :style="cssVariables" :class="cssClasses"/>
</template>

<script lang="ts" setup>
import type { IApiProductConfigurableOptionValue } from '@/types/apiProductConfigurable';

const { option, state } = defineProps<{
  option: IApiProductConfigurableOptionValue;
  state?: 'disabled' | 'selected';
}>();

const cssVariables = computed(() => ({
  '--product-card-configurable-option-color-value': option.value,
}));

const cssClasses = computed(() => [
  state ? `product-card-configurable-option-color--state--${state}` : undefined,
]);
</script>

<style lang="scss" scoped>
.product-card-configurable-option-color {
  width: 200px;
  height: 150px;
  border: 2px solid black;
  background: var(--product-card-configurable-option-color-value);
  cursor: pointer;

  &.product-card-configurable-option-color--state--disabled {
    //border-color: #808080;
    filter: grayscale(0.5);
    cursor: not-allowed;
  }

  &.product-card-configurable-option-color--state--selected {
    //border-color: #ff9a00;
    border-color: #1DBC60;
  }
}
</style>
