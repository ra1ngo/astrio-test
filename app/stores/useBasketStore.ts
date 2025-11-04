import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { IPurchasedProductData } from '../types/purchasedProductData';
import type { MaybeRef, Ref } from 'vue';

export const useBasketStore = defineStore('useBasketStore', () => {
    const basketProducts = ref(new Array<IPurchasedProductData>());

    const count = computed(() => {
        let countTotal = 0;

        for (const data of basketProducts.value) {
            countTotal += data.count;
        }

        return countTotal;
    });

    const subtotal = computed(() => {
       let priceTotal = 0;

        for (const data of basketProducts.value) {
            priceTotal += data.productData.regular_price.value * data.count;
        }

        return priceTotal;
    });

    function findBasketProduct(product: IClientProductConfigurable) {
        return basketProducts.value.find(d => d.productData.id == product.id && d.productData.selectedVariant?.product.id === product.selectedVariant?.product.id);
    }

    function add(product: MaybeRef<IClientProductConfigurable>) {
        const productNormalized = unref(product);
        const basketData = findBasketProduct(productNormalized);

        if (!basketData) {
            basketProducts.value.push({
                productData: productNormalized,
                count: 1,
            });

            return;
        }

        basketData.count++;
    }

    function remove(product: IClientProductConfigurable) {
        basketProducts.value = basketProducts.value.filter(d => d.productData.id == product.id && d.productData.selectedVariant?.product.id === product.selectedVariant?.product.id);
    }

    function increaseCount(product: IClientProductConfigurable) {
        const basketData = findBasketProduct(product);

        if (!basketData) {
            throw new Error(`Product ${product.id} not found`);
        }

        basketData.count++;
    }

    function decreaseCount(product: IClientProductConfigurable) {
        const basketData = findBasketProduct(product);

        if (!basketData) {
            throw new Error(`Product ${product.id} not found`);
        }

        if (basketData.count > 0) {
            basketData.count--;
        }
    }

    function clear() {
        basketProducts.value = [];
    }

    const isCleared = computed(() => basketProducts.value.length == 0);
    const isEmpty = computed(() => !isCleared.value && count.value == 0);

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
        basketProducts: basketProducts as unknown as Readonly<Ref<IPurchasedProductData[]>>, // pinia-plugin-persistedstate не дружит с утилем readonly из vue3
    };
}, { persist: true },
);