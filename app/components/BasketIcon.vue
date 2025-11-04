<template>
  <div class="basket-icon" :style="cssVariables" @click="onClick">
    <UIIcon class="basket-icon__icon" name="basket" :color="iconColor" :width="48" :height="48" />
    <span v-show="count > 0" class="basket-icon__count">{{countText}}</span>
  </div>
</template>

<script lang="ts" setup>
import UIIcon from './UIIcon.vue';

const { count } = defineProps<{ count: number; }>();

const emit = defineEmits<{
  (eventName: 'click'): void,
}>();

const isDisabled = computed(() => count <= 0);
const iconColor = computed(() => isDisabled.value ? '#808080' : '#000000');
const cssVariables = computed(() => ({
  '--basket-icon-cursor': isDisabled.value ? 'not-allowed' : 'pointer',
}));
const countText = computed(() => count < 100 ? count : '!!!');  // TODO допилить переполнение

function onClick() {
  if (isDisabled.value) {
    return;
  }

  emit('click');
}
</script>

<style lang="scss" scoped>
.basket-icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px; // Контейнер иконки больше, чем сама иконка. Чтобы юзеру было проще попасть по иконке

  cursor: var(--basket-icon-cursor);
}

.basket-icon__count {
  position: absolute;
  top: 20px;
  right: 15px;
  width: 25px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: red;
  color: white;
  border-radius: 50%;
}
</style>
