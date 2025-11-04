import type { IApiProductConfigurableVariant } from './apiProductConfigurable';

export interface ConfigureProductPayload {
    productId: number;
    selectedVariant: IApiProductConfigurableVariant | undefined;
}