<template>
  <div class="basket-icon" :style="cssVariables" >
    <UChip color="error" :text="count" size="3xl" @click="onClick">
      <UIcon class="basket-icon__icon" name="i-material-symbols-shopping-basket" :size="32" />
    </UChip>
  </div>
</template>

<script lang="ts" setup>
const { count } = defineProps<{ count: number; }>();
const emits = defineEmits<{ click: [] }>();

const isDisabled = computed(() => count <= 0);
const cssVariables = computed(() => ({
  '--basket-icon-cursor': isDisabled.value ? 'not-allowed' : 'pointer',
  '--basket-icon-color': isDisabled.value ? '#808080' : '#000000',
}));

function onClick() {
  if (isDisabled.value) {
    return;
  }

  emits('click');
}
</script>

<style lang="scss" scoped>
.basket-icon {
  cursor: var(--basket-icon-cursor);
}

.basket-icon__icon {
  color: var(--basket-icon-color);
}
</style>
