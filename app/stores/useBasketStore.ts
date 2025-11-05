import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { Ref } from 'vue';

export interface IBasketRecord {
    clientProduct: IClientProductConfigurable;
    count: number;
}

export const useBasketStore = defineStore('useBasketStore', () => {
    const basketRecords = ref(new Array<IBasketRecord>());

    const count = computed(() => basketRecords.value.reduce((acc, cur) => acc + cur.count, 0));
    const subtotal = computed(() => basketRecords.value.reduce(
        (acc, cur) => acc + cur.clientProduct.regular_price.value * cur.count,
        0,
    ));

    function findBasketRecord(clientProduct: IClientProductConfigurable) {
        return basketRecords.value.find(r => r.clientProduct.id == clientProduct.id);
        // return basketRecords.value.find(d => d.clientProduct.id == clientProduct.id && d.clientProduct.selectedVariant?.clientProduct.id === clientProduct.selectedVariant?.clientProduct.id);
    }

    function add(clientProduct: IClientProductConfigurable) {
        const basketRecord = findBasketRecord(clientProduct);

        if (!basketRecord) {
            basketRecords.value.push({ clientProduct, count: 1});
            return;
        }

        basketRecord.count++;
    }

    function remove(clientProduct: IClientProductConfigurable) {
        const arrIndex = basketRecords.value.findIndex(d => d.clientProduct.id == clientProduct.id);
        if (arrIndex === -1) {
            throw new Error(`Product ${clientProduct.id} not found`);
        }

        basketRecords.value.splice(arrIndex, 1);
        //basketRecords.value = basketRecords.value.filter(d => d.clientProduct.id == clientProduct.id && d.clientProduct.selectedVariant?.clientProduct.id === clientProduct.selectedVariant?.clientProduct.id);
    }

    function increaseCount(clientProduct: IClientProductConfigurable) {
        const basketRecord = findBasketRecord(clientProduct);
        if (!basketRecord) {
            throw new Error(`Product ${clientProduct.id} not found`);
        }

        basketRecord.count++;
    }

    function decreaseCount(clientProduct: IClientProductConfigurable) {
        const basketRecord = findBasketRecord(clientProduct);
        if (!basketRecord) {
            throw new Error(`Product ${clientProduct.id} not found`);
        }

        if (basketRecord.count > 0) {
            basketRecord.count--;
        }
    }

    function changeCount(clientProduct: IClientProductConfigurable, count: number) {
        if (isNaN(count) || count < 0) {
            return;
        }

        const basketRecord = findBasketRecord(clientProduct);
        if (!basketRecord) {
            throw new Error(`Product ${clientProduct.id} not found`);
        }

        basketRecord.count = count;
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
        changeCount,
        isCleared,
        isEmpty,
        basketRecords: basketRecords as unknown as Readonly<Ref<IBasketRecord[]>>, // pinia-plugin-persistedstate не дружит с утилем readonly из vue3
    };
}, { persist: true },
);