import type { IApiProductConfigurable } from '@/types/apiProductConfigurable';
import { useConfigureProducts } from './useConfigureProducts';
import { useClientProducts } from './useClientProducts';
import { useFilterProducts } from './useFilterProducts';
import type { IApiBrand } from '@/types/apiBrand';

export function useProducts(brands: Array<IApiBrand>, products: Array<IApiProductConfigurable>) {
    const { clientProducts } = useClientProducts(brands, products);
    const { configurableProducts, configureProduct } = useConfigureProducts(clientProducts);
    const { filteredProducts, selectedBrands } = useFilterProducts(configurableProducts);

    return {
        filteredProducts,
        configureProduct,
        selectedBrands,
    };
}