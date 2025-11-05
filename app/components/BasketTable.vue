<template>
  <UTable :data="basketRecords" :columns="columns" class="basket-table">
    <template #product-cell="{ row }">
      <BasketTableCellProduct :product="row.original.clientProduct" />
    </template>

    <template #qty-cell="{ row }">
      <BasketTableCellCount
        :count="row.original.count"
        @increase-count="emits('increaseCount', row.original.clientProduct)"
        @decrease-count="emits('decreaseCount', row.original.clientProduct)"
        @change-count="count => emits('changeCount', row.original.clientProduct, count)"
      />
    </template>

    <template #action-cell="{ row }">
      <UIcon name="i-material-symbols-delete" class="basket-table__trash" :size="24" @click="emits('remove', row.original.clientProduct)" />
    </template>
  </UTable>
</template>

<script lang="ts" setup >
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { IBasketRecord } from '@/stores/useBasketStore';
import { formatCurrency } from '@/utils/formatCurrency';
import type { TableColumn } from '@nuxt/ui';

const { basketRecords } = defineProps<{ basketRecords: IBasketRecord[]; }>();
const emits = defineEmits<{
  (eventName: 'remove' | 'increaseCount' | 'decreaseCount', clientProduct: IClientProductConfigurable): void,
  (eventName: 'changeCount', clientProduct: IClientProductConfigurable, count: number): void,
}>();

const columns: TableColumn<IBasketRecord>[] = [
  {
    id: 'product',
    header: 'Item',
  },
  {
    id: 'price',
    header: 'Price',
    cell: ({ row }) => formatCurrency(
        row.original.clientProduct.regular_price.value,
        row.original.clientProduct.regular_price.currency,
    ),
  },
  {
    id: 'qty',
    header: 'Qty',
  },
  {
    id: 'total',
    header: 'Total',
    cell: ({ row }) => formatCurrency(
        row.original.clientProduct.regular_price.value,
        row.original.clientProduct.regular_price.currency,
        row.original.count,
    ),
  },
  {
    id: 'action',
  },
];
</script>

<style lang="scss">
.basket-table {
  min-width: 600px;
}

.basket-table__trash {
  cursor: pointer;
}
</style>
