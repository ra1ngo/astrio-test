import brandsJson from '@/assets/data/brands.json';
import type { IApiBrand } from '@/types/apiBrand';

/**
 * Здесь компануем запросы по Rest-принципу, кэшируем ответы и т.п.
 * Для упрощения json передается как есть. С приведением к типу
 */
export function useApiBrands() {
    function getBrands(){
        return brandsJson as Array<IApiBrand>;
    }

    return {
        getBrands,
    };
}