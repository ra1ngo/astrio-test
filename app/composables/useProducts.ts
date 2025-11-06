import { useProductsMappedConfiguredFiltered } from './useProductsMappedConfiguredFiltered';
import type { IApiProductConfigurable } from '@/types/apiProductConfigurable';
import { useProductsMappedConfigured } from './useProductsMappedConfigured';
import { useProductsMapped } from './useProductsMapped';
import type { IApiBrand } from '@/types/apiBrand';

export function useProducts(brands: Array<IApiBrand>, products: Array<IApiProductConfigurable>) {
    const { productsMapped } = useProductsMapped(brands, products);
    const { productsConfigured, configureProduct } = useProductsMappedConfigured(productsMapped);
    const { productsFiltered, selectedBrands} = useProductsMappedConfiguredFiltered(productsConfigured);

    return {
        clientProducts: productsFiltered,
        configureProduct,
        selectedBrands,
    };
}