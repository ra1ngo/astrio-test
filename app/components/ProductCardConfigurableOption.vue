<template>
  <div class="product-card-configurable-option" :class="cssClasses" @click="onClick">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { TOptionState } from '@/composables/useConfigureProduct';

const { state } = defineProps<{ state: TOptionState }>();
const emits = defineEmits<{ click: [] }>();

const cssClasses = computed(() => [
  state != 'default' && `product-card-configurable-option--state--${state}`,
]);

function onClick() {
  if (state != 'disabled') {
    emits('click');
  }
}
</script>

<style lang="scss" scoped>
$colorSelected: #1DBC60;

.product-card-configurable-option {
  width: 36px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  user-select: none;

  &.product-card-configurable-option--state--disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &.product-card-configurable-option--state--selected {
    border-color: $colorSelected;
    outline: 2px solid $colorSelected;
  }
}
</style>
