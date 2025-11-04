import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { ConfigureProductPayload } from '@/types/configureProductPayload';
import type { Ref } from 'vue';

export function useConfigureProducts(products: Ref<IClientProductConfigurable[]>) {
    function configureProduct(payload: ConfigureProductPayload) {
        const product = products.value.find(p => p.id === payload.productId);

        if (!product) {
            throw new Error(`Product ${payload.productId} not found`);
        }

        product.selectedVariant = payload.selectedVariant;
        product.imageUrl = payload.selectedVariant ? payload.selectedVariant.product.image : product.image;
    }

    return {
        configurableProducts: products,
        configureProduct,
    };
}