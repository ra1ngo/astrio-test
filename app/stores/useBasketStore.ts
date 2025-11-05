import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { Ref } from 'vue';

interface IBasketRecord {
    product: IClientProductConfigurable;
    count: number;
}

export const useBasketStore = defineStore('useBasketStore', () => {
    const basketRecords = ref(new Array<IBasketRecord>());

    const count = computed(() => basketRecords.value.reduce((acc, cur) => acc + cur.count, 0));
    const subtotal = computed(() => basketRecords.value.reduce(
        (acc, cur) => acc + cur.product.regular_price.value * cur.count,
        0,
    ));

    function findBasketRecord(product: IClientProductConfigurable) {
        return basketRecords.value.find(r => r.product.id == product.id);
        // return basketRecords.value.find(d => d.product.id == product.id && d.product.selectedVariant?.product.id === product.selectedVariant?.product.id);
    }

    function add(product: IClientProductConfigurable) {
        const basketRecord = findBasketRecord(product);

        if (!basketRecord) {
            basketRecords.value.push({ product, count: 1});
            return;
        }

        basketRecord.count++;
    }

    function remove(product: IClientProductConfigurable) {
        const arrIndex = basketRecords.value.findIndex(d => d.product.id == product.id);
        if (arrIndex === -1) {
            throw new Error(`Product ${product.id} not found`);
        }

        basketRecords.value.splice(arrIndex, 1);
        //basketRecords.value = basketRecords.value.filter(d => d.product.id == product.id && d.product.selectedVariant?.product.id === product.selectedVariant?.product.id);
    }

    function increaseCount(product: IClientProductConfigurable) {
        const basketRecord = findBasketRecord(product);
        if (!basketRecord) {
            throw new Error(`Product ${product.id} not found`);
        }

        basketRecord.count++;
    }

    function decreaseCount(product: IClientProductConfigurable) {
        const basketRecord = findBasketRecord(product);
        if (!basketRecord) {
            throw new Error(`Product ${product.id} not found`);
        }

        if (basketRecord.count > 0) {
            basketRecord.count--;
        }
    }

    function clear() {
        basketRecords.value = [];
    }

    const isCleared = computed(() => basketRecords.value.length == 0);
    const isEmpty = computed(() => count.value == 0);

    return {
        count,
        subtotal,
        add,
        clear,
        remove,
        increaseCount,
        decreaseCount,
        isCleared,
        isEmpty,
        basketRecords: basketRecords as unknown as Readonly<Ref<IBasketRecord[]>>, // pinia-plugin-persistedstate не дружит с утилем readonly из vue3
    };
}, { persist: true },
);