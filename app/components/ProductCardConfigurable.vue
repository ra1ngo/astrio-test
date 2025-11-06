<template>
  <div class="product-card-configurable">
    <ProductCard
      :product="product"
      class="product-card-configurable__base"
      @click="onClickProduct(product)"
    />

    <div class="product-card-configurable__options">
      <div class="product-card-configurable__options-list">
        <ProductCardConfigurableOptionColor
            v-for="option in colorOptions"
            :key="option.value_index"
            :option="option"
            :state="option.state"
            @click="onClickOption(option.value_index)"
        />
      </div>
      <div class="product-card-configurable__options-list">
        <ProductCardConfigurableOptionSize
            v-for="option in sizeOptions"
            :key="option.value_index"
            :option="option"
            :state="option.state"
            @click="onClickOption(option.value_index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductCardConfigurableOptionColor from './ProductCardConfigurableOptionColor.vue';
import type { ConfigureProductPayload } from '@/composables/useProductsMappedConfigured';
import type {IApiProductConfigurableOptionValue, IApiProductConfigurableVariant} from '@/types/apiProductConfigurable';
import ProductCardConfigurableOptionSize from './ProductCardConfigurableOptionSize.vue';
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import {useConfigureProduct} from '../composables/useConfigureProduct';

const { product } = defineProps<{
  product: IClientProductConfigurable;
}>();

const emits = defineEmits<{
  (eventName: 'onClickProduct', product: IClientProductConfigurable): void,
  (eventName: 'configureProduct', payload: ConfigureProductPayload): void,
}>();

//const colorOptions = computed(() => product.configurable_options?.filter(c => c.attribute_code === 'color').at(0)?.values);
//const sizeOptions = computed(() => product.configurable_options?.filter(c => c.attribute_code === 'size').at(0)?.values);

const {
  toggleOption,
  colorOptions,
  sizeOptions,
  availableVariants,
} = useConfigureProduct(product);

function onClickOption(optionId: number) {
  toggleOption(optionId);

  emits('configureProduct', {
    productId: product.id,
    selectedVariant: availableVariants.value?.length == 1 ? availableVariants.value.at(0) : undefined,
  });


  // if (availableVariants.value && availableVariants.value?.length == 1) {
  //   emits('configureProduct', {
  //     productId: product.id,
  //     selectedVariant: availableVariants.value,
  //   });
  // }
}

////////////////////////////
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

//const selectColorOption = (option: IApiProductConfigurableOptionValue) => {
  // if (selectedColorOptionId.value == option.value_index || !checkAvailableOption(selectedColorOptionId.value, 'color')) {
  //   selectedColorOptionId.value = undefined;
  //
  //   return;
  // }
  //
  // selectedColorOptionId.value = option.value_index;
//};
//const selectSizeOption = (option: IApiProductConfigurableOptionValue) => {
  // if (selectedSizeOptionId.value == option.value_index || !checkAvailableOption(selectedSizeOptionId.value, 'size')) {
  //   selectedSizeOptionId.value = undefined;
  //
  //   return;
  // }
  //
  // selectedSizeOptionId.value = option.value_index;
//};

function onClickProduct(product: IClientProductConfigurable) {
  emits('onClickProduct', product);
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
//     (payload) => emits('configureProduct', payload),
//     { deep: true },
// );
</script>

<style lang="scss" scoped>
.product-card-configurable {

}

.product-card-configurable__base {

}

.product-card-configurable__options {
  margin-top: 18px;
  margin-bottom: 4px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-card-configurable__options-list {
  display: flex;
  gap: 10px;
}
</style>
