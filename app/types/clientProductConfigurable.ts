import type { IApiProductConfigurable, IApiProductConfigurableVariant } from './apiProductConfigurable';
import type { IApiBrand } from './apiBrand';

/**
 * Префикс 'client' говорит о принадлежности к фронту
 * Например, в IApiProductConfigurable есть родное поле brand. ClientBrand - добавленное фронтом поле
 */
export interface IClientProductConfigurable extends IApiProductConfigurable {
    clientImageUrl: string;
    clientBrand: IApiBrand | undefined,  // указываем ts, что поле обязательное. Но может вернуться undefined из-за маппинга IApiProductConfigurable в IClientProductConfigurable
    clientSelectedVariant?: IApiProductConfigurableVariant;
}