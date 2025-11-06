import type { IApiProductConfigurableVariant } from '@/types/apiProductConfigurable';
import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { Ref } from 'vue';

// Nuxt, сцук, по дефолту предлагает группировать файлы по типу, а не по связанности
// Знал, но повелся. Теперь интерфейсы лежат как папало
// Сорян, посоны. Я спать хочу
//
// Блжд, я с самим собой разговариваю...
export interface ConfigureProductPayload {
    productId: number;
    selectedVariant: IApiProductConfigurableVariant | undefined;
}

export function useProductsMappedConfigured(products: Ref<IClientProductConfigurable[]>) {
    function configureProduct(payload: ConfigureProductPayload) {
        //const productId = products.value.findIndex(p => p.id === payload.productId);
        const product = products.value.find(p => p.id === payload.productId);
        if (!product) {
            throw new Error(`Product ${payload.productId} not found`);
        }

        console.log('configureProduct', product);
        //const normalizedProduct = structuredClone(toRaw(product));

        product.clientSelectedVariant = payload.selectedVariant;
        product.clientImageUrl = payload.selectedVariant ? payload.selectedVariant.product.image : product.image;

        //products.value.filter(p => p.id != productId);
        //products.value.push(product);
    }

    return {
        productsConfigured: products,
        configureProduct,
    };
}