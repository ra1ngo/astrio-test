import brandsJson from '@/assets/data/brands.json';
import type { IApiBrand } from '@/types/apiBrand';

/**
 * Здесь типа компануем запросы по Rest-принципу, кэшируем ответы и т.п.
 */
export function useApiBrands() {
    function getBrands(){
        return brandsJson as Array<IApiBrand>;
    }

    return {
        getBrands,
    };
}