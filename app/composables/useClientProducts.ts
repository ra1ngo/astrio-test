import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { IApiProductConfigurable } from '@/types/apiProductConfigurable';
import type { IApiBrand } from '@/types/apiBrand';

export function useClientProducts(brands: Array<IApiBrand>, products: Array<IApiProductConfigurable>) {
    const mapProduct = (product: IApiProductConfigurable): IClientProductConfigurable => {
        return {
            ...product,
            clientImageUrl: product.image,
            clientBrand: brands.find(brand => brand.id == product.brand),
        };
    };

    const clientProducts = useState('clientProducts', () => products.map(product => mapProduct(product)));

    return {
        clientProducts,
    };
}