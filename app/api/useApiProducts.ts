import type { IApiProductConfigurable } from '@/types/apiProductConfigurable';
import productsJson from '@/assets/data/products.json';

// eslint-disable-next-line
function fixImagePath(data: any) {
    for(const key in data) {
        if(typeof data[key] === 'object') {
            fixImagePath(data[key]);
        } else if (key == 'image') {
            data['image'] = (data['image'] as string).replace('/image/', '/images/');
        }
    }

    return data;
}

/**
 * Здесь типа компануем запросы по Rest-принципу, кэшируем ответы и т.п.
 */
export function useApiProducts() {
    function getProducts(){
        return fixImagePath(productsJson as Array<IApiProductConfigurable>);    // Бэкендеры опять напортачили
    }

    return {
        getProducts,
    };
}