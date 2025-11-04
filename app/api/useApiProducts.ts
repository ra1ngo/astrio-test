import type { IApiProductConfigurable } from '@/types/apiProductConfigurable';
import productsJson from '@/assets/data/products.json';

/**
 * Здесь компануем запросы по Rest-принципу, кэшируем ответы и т.п.
 * Для упрощения json передается как есть. С приведением к типу
 */
export function useApiProducts() {
    function getProducts(){
        return productsJson as Array<IApiProductConfigurable>;
    }

    return {
        getProducts,
    };
}