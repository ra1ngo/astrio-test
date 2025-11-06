<template>
  <UPage class="page-cart">
    <UPageHeader title="Shopping Cart" />
    <UPageBody>
      <UPageCard class="page-cart__body-card">
        <BasketTable
          :basket-records="basketRecords"
          @increase-count="increaseCount"
          @decrease-count="decreaseCount"
          @change-count="changeCount"
          @remove="remove"
        />

        <USeparator />

        <div class="page-cart__controls">
          <strong class="page-cart__controls-subtotal">
            Subtotal: {{ formatCurrency(subtotal, 'USD') }}
          </strong>
          <UButton class="page-cart__controls-submit" trailing-icon="i-material-symbols-add-card" size="xl" @click="onClickSubmit">Checkout</UButton>
        </div>
      </UPageCard>
    </UPageBody>
  </UPage>
</template>

<script lang="ts" setup>
import { useBasketStore } from '@/stores/useBasketStore';
import { formatCurrency } from '@/utils/formatCurrency';

definePageMeta({
  middleware: ['empty-cart'],
});

const router = useRouter();
const basketStore = useBasketStore();
const { subtotal, basketRecords, isCleared, isEmpty } = storeToRefs(basketStore);
const { increaseCount, decreaseCount, changeCount, remove, clear } = basketStore;

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
.page-cart__body-card {
  min-width: fit-content;
}

.page-cart__controls {
  margin-left: auto;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.page-cart__controls-subtotal {
  font-size: 20px;
  font-weight: bold;
}
</style>
