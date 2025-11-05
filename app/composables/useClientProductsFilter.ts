import type { IClientProductConfigurable } from '@/types/clientProductConfigurable';
import type { Ref} from 'vue';

export function useClientProductsFilter(products: Ref<IClientProductConfigurable[]>) {
    const selectedBrands = useState<Array<number>>('selectedBrands', () => []);

    const filteredProducts = computed<IClientProductConfigurable[]>(() => {
        if (selectedBrands.value.length == 0) {
            return products.value;
        }

        return products.value.filter(product =>  selectedBrands.value.includes(product.brand));
    });

    return {
        selectedBrands,
        filteredProducts,
    };
}