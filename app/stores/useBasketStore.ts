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

    function findBasketRecord(product: IClientProductConfigurable) {
        return basketRecords.value.find(d => d.clientProduct.id == product.id && d.clientProduct.clientSelectedVariant?.product.id == product.clientSelectedVariant?.product.id);
    }

    function add(product: IClientProductConfigurable) {
        const normalizedProduct = structuredClone(toRaw(product));

        const basketRecord = findBasketRecord(normalizedProduct);

        if (!basketRecord) {
            basketRecords.value.push({clientProduct: normalizedProduct, count: 1});
            return;
        }

        basketRecord.count++;
    }

    function remove(product: IClientProductConfigurable) {
        const arrIndex = basketRecords.value.findIndex(d => d.clientProduct.id == product.id && d.clientProduct.clientSelectedVariant?.product.id === product.clientSelectedVariant?.product.id);
        if (arrIndex === -1) {
            throw new Error(`Product ${product.id} not found`);
        }

        basketRecords.value.splice(arrIndex, 1);
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

    function changeCount(product: IClientProductConfigurable, count: number) {
        if (isNaN(count) || count < 0) {
            return;
        }

        const basketRecord = findBasketRecord(product);
        if (!basketRecord) {
            throw new Error(`Product ${product.id} not found`);
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
        basketRecords: basketRecords as unknown as Readonly<Ref<IBasketRecord[]>>,
    };
});