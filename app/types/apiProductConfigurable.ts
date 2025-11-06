import type { IApiProduct } from './apiProduct';

// При правильно настроенном конфиге ошибки ts не ломают прод
// Если в деве возникает ошибка, значит добавился новый конфиг продукта
export type TApiProductConfigurableOptionAttributeCode = 'color' | 'size';

export interface IApiProductConfigurableOptionValue {
    label: string,
    value_index: number,
    value: string | number,
}

export interface IApiProductConfigurableOption {
    id?: number,
    position?: number,  // Опять проект без сваггера... что за поле?
    attribute_id: number,
    attribute_code: TApiProductConfigurableOptionAttributeCode,
    label: string,
    values: Array<IApiProductConfigurableOptionValue>,
}

interface IApiProductConfigurableVariantAttribute {
    code: TApiProductConfigurableOptionAttributeCode,
    value_index: number,
}

export interface IApiProductConfigurableVariantProduct {
    id: number,
    sku: string,
    image: string,
}

export interface IApiProductConfigurableVariant {
    attributes: Array<IApiProductConfigurableVariantAttribute>,
    product: IApiProductConfigurableVariantProduct,
}

export interface IApiProductConfigurable extends IApiProduct {
    configurable_options?: Array<IApiProductConfigurableOption>,
    variants?: Array<IApiProductConfigurableVariant>,
}