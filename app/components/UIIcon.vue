<template>
  <NuxtIcon :name="name" class="ui-icon" :style="cssVariables"/>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  color?: string;
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 48,
  height: 48,
  color: '#000000',
});

const cssVariables = computed(() => ({
  '--ui-icon-width': `${props.width}px`,
  '--ui-icon-height': `${props.height}px`,
  '--ui-icon-color': props.color,
}));
</script>

<style lang="scss">
.nuxt-icon svg {
  margin-bottom: 0;
  width: var(--ui-icon-width);
  height: var(--ui-icon-height);
  color: var(--ui-icon-color);
}
</style>
