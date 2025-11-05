import type { IApiProductConfigurableVariant } from './apiProductConfigurable';

//TODO вместо productId оперировать clientProduct
export interface ConfigureProductPayload {
    productId: number;
    selectedVariant: IApiProductConfigurableVariant | undefined;
}