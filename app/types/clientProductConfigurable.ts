import type { IApiProductConfigurable, IApiProductConfigurableVariant } from './apiProductConfigurable';
import type { IApiBrand } from './apiBrand';

export interface IClientProductConfigurable extends IApiProductConfigurable {
    imageUrl: string;
    brandData: IApiBrand | undefined,  // указываем ts, что поле обязательное. Но может вернуться undefined из-за маппинга IApiProductConfigurable в IClientProductConfigurable
    selectedVariant?: IApiProductConfigurableVariant;
}