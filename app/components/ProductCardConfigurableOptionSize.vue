<template>
  <div class="product-card-configurable-option-size" :class="cssClasses">
    {{option.label}}
  </div>
</template>

<script lang="ts" setup>
import type { IApiProductConfigurableOptionValue } from '@/types/apiProductConfigurable';

const { option, state } = defineProps<{
  option: IApiProductConfigurableOptionValue;
  state?: 'disabled' | 'selected';
}>();

const cssClasses = computed(() => [
  state ? `product-card-configurable-option-size--state--${state}` : undefined,
]);
</script>

<style lang="scss" scoped>
.product-card-configurable-option-size {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 150px;
  border: 2px solid black;
  background: white;
  cursor: pointer;
  color: black;

  &.product-card-configurable-option-size--state--disabled {
    border-color: #808080;
    color: #808080;
    //filter: grayscale(0.5);
    cursor: not-allowed;
  }

  &.product-card-configurable-option-size--state--selected {
    //border-color: #ff9a00;
    border-color: #1DBC60;
  }
}
</style>
