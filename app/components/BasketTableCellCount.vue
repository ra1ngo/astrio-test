<template>
  <div class="basket-table-cell-count">
    <UButton icon="i-material-symbols-remove" size="xs" color="info" class="basket-table-cell-count__button" @click="emits('decreaseCount')" />
    <UInput :value="count" size="sm" class="basket-table-cell-count__input" @change="onChange" />
    <UButton icon="i-material-symbols-add" size="xs" color="info" class="basket-table-cell-count__button" @click="emits('increaseCount')" />
  </div>
</template>

<script lang="ts" setup>
const { count } = defineProps<{ count: number }>();
const emits = defineEmits<{
  (eventName: 'increaseCount' | 'decreaseCount'): void,
  (eventName: 'changeCount', count: number): void,
}>();

//TODO валидация/нормализация вводимого в инпуте числа

function onChange(e: Event) {
  emits('changeCount', parseInt((e.target as HTMLInputElement).value));
}
</script>

<style lang="scss" scoped>
.basket-table-cell-count {
  display: flex;
  gap: 8px;
}

.basket-table-cell-count__input {
  width: 40px;
}
</style>
