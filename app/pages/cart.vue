<template>
  <NuxtLayout name="cart">
    <div class="page-cart">
      <h1 class="page-cart__title">Shopping Cart</h1>

      <div class="page-cart__table">
        <div class="page-cart__table-header">
          <div class="page-cart__table-header-item">Item</div>
          <div class="page-cart__table-header-price">Price</div>
          <div class="page-cart__table-header-qty">Qty</div>
          <div class="page-cart__table-header-total">Total</div>
        </div>

        <div
          v-for="data in basketProducts"
          :key="data.productData.id"
          class="page-cart__table-row"
        >
          <div class="page-cart__table-row-item">
            <BasketTableItemProduct :product="data.productData" />
          </div>
          <div class="page-cart__table-row-price">
            {{ formatCurrency(data.productData.regular_price.value, data.productData.regular_price.currency) }}
          </div>
          <div class="page-cart__table-row-qty">
            {{data.count}}
            <button @click="increaseCount(data.productData)">+</button>
            <button @click="decreaseCount(data.productData)">-</button>
          </div>
          <div class="page-cart__table-row-total">
            {{ formatCurrency(data.productData.regular_price.value, data.productData.regular_price.currency, data.count) }}
          </div>
          <div class="page-cart__table-row-trash">
            <UIIcon class="page-cart__table-row-trash-icon" name="trash" @click="remove(data.productData)"/>
          </div>
        </div>
      </div>

      <div class="page-cart__controls">
        <strong class="page-cart__controls-subtotal">
          Subtotal: {{ formatCurrency(subtotal, 'USD') }}
        </strong>
        <button class="page-cart__controls-submit" @click="onClickSubmit">Checkout</button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import BasketTableItemProduct from '@/components/BasketTableItemProduct.vue';
import { useBasketStore } from '@/stores/useBasketStore';
import { formatCurrency } from '@/utils/formatCurrency';
import UIIcon from '@/components/UIIcon.vue';

definePageMeta({
  middleware: ['empty-cart'],
});

const router = useRouter();
const basketStore = useBasketStore();
const { subtotal, basketProducts, isCleared, isEmpty } = storeToRefs(basketStore);
const { increaseCount, decreaseCount, remove, clear } = basketStore;

function onClickSubmit() {
  if (isEmpty.value || isCleared.value) {
    return;
  }

  alert('Поздравляем с покупкой!!!');
  clear();
}

watch(
    isCleared,
    (isCleared) => {
      if (isCleared) {
        setTimeout(() => router.push({ path: '/' }), 300);
      }
    },
);
</script>

<style lang="scss" scoped>
</style>
