<template>
  <div class="product-card-configurable">
    <ProductCard
      :product="product"
      class="product-card-configurable__base"
      @click="onClickProduct(product)"
    />
    <div class="product-card-configurable__options">
<!--      <div class="product-card-configurable__options-list">-->
<!--        <ProductCardConfigurableOptionColor-->
<!--          v-for="{ option, state } in colorOptions"-->
<!--          :key="option.value_index"-->
<!--          :option="option"-->
<!--          :state="state"-->
<!--          @click="selectColorOption(option)"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="product-card-configurable__options-list">-->
<!--        <ProductCardConfigurableOptionSize-->
<!--            v-for="{ option, state } in sizeOptions"-->
<!--            :key="option.value_index"-->
<!--            :option="option"-->
<!--            :state="state"-->
<!--            @click="selectSizeOption(option)"-->
<!--        />-->
<!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IApiProductConfigurableOptionValue } from '@/types/apiProductConfigurable';
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { ConfigureProductPayload } from '@/types/configureProductPayload';
import ProductCardConfigurableOptionColor from './ProductCardConfigurableOptionColor.vue';
import ProductCardConfigurableOptionSize from './ProductCardConfigurableOptionSize.vue';

const { product } = defineProps<{
  product: IClientProductConfigurable;
}>();

const emit = defineEmits<{
  (eventName: 'onClickProduct', product: IClientProductConfigurable): void,
  (eventName: 'configureProduct', payload: ConfigureProductPayload): void,
}>();

// const selectedColorOptionId = ref<number | undefined>();
// const selectedSizeOptionId = ref<number | undefined>();
// const isOptionsSelected = computed(() => selectedColorOptionId.value && selectedSizeOptionId.value);
//
// const availableVariants = computed(() => {
//   return product.variants?.filter(v => {
//     if (!selectedColorOptionId.value && !selectedSizeOptionId.value) {
//       return true;
//     }
//
//     if (selectedColorOptionId.value && !selectedSizeOptionId.value) {
//       return v.attributes.some(a => a.code === 'color' && a.value_index === selectedColorOptionId.value);
//     }
//
//     if (!selectedColorOptionId.value && selectedSizeOptionId.value) {
//       return v.attributes.some(a => a.code === 'size' && a.value_index === selectedSizeOptionId.value);
//     }
//
//     return v.attributes.some(a => a.code === 'color' && a.value_index === selectedColorOptionId.value)
//         && v.attributes.some(a => a.code === 'size' && a.value_index === selectedSizeOptionId.value);
//   });
// });
//
// function checkAvailableOption(optionId: number | undefined, optionType: 'color' | 'size') {
//   if (!optionId) return false;
//
//   return availableVariants.value?.some(v => v.attributes.some(a => a.code === optionType && a.value_index === optionId));
// }

const selectColorOption = (option: IApiProductConfigurableOptionValue) => {
  // if (selectedColorOptionId.value == option.value_index || !checkAvailableOption(selectedColorOptionId.value, 'color')) {
  //   selectedColorOptionId.value = undefined;
  //
  //   return;
  // }
  //
  // selectedColorOptionId.value = option.value_index;
};
const selectSizeOption = (option: IApiProductConfigurableOptionValue) => {
  // if (selectedSizeOptionId.value == option.value_index || !checkAvailableOption(selectedSizeOptionId.value, 'size')) {
  //   selectedSizeOptionId.value = undefined;
  //
  //   return;
  // }
  //
  // selectedSizeOptionId.value = option.value_index;
};

function onClickProduct(product: IClientProductConfigurable) {
  emit('onClickProduct', product);
}

// const colorOptions = computed(() => product.configurable_options?.filter(c => c.attribute_code === 'color').at(0)?.values.map(v => ({
//   option: v,
//   state: v.value_index == selectedColorOptionId.value ? 'selected' : !checkAvailableOption(v.value_index, 'color') ? 'disabled' : undefined,
// })));
// const sizeOptions = computed(() => product.configurable_options?.filter(c => c.attribute_code === 'size').at(0)?.values.map(v => ({
//   option: v,
//   state: v.value_index == selectedSizeOptionId.value ? 'selected' : !checkAvailableOption(v.value_index, 'size') ? 'disabled' : undefined,
// })));


// const configureProductPayload = computed<ConfigureProductPayload>(() => ({
//   productId: product.id,
//   selectedVariant: isOptionsSelected.value ? availableVariants.value?.at(0) : undefined,
// }));
//
// watch(
//     configureProductPayload,
//     (payload) => emit('configureProduct', payload),
//     { deep: true },
// );
</script>

<style lang="scss" scoped>
.product-card-configurable {

}

.product-card-configurable__base {

}

.product-card-configurable__options {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-card-configurable__options-list {
  display: flex;
  gap: 10px;
}
</style>
