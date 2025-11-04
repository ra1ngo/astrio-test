import type { TCurrency } from './currency';

type TApiProductType = 'simple' | 'configurable';

interface IApiProductRegularPrice {
    currency: TCurrency,
    value: number,
}

/**
 * @param sku - stock keeping unit (единица складского учёта). Типа товарный артикуль
 *
 * @deprecated use IApiProductConfigurable instead this
 */
export interface IApiProduct {
    id: number,
    type: TApiProductType,
    sku: string,
    title: string,
    regular_price: IApiProductRegularPrice,
    image: string,
    brand: number,
}