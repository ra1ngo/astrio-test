import type { TCurrency } from '@/types/currency';

export function formatCurrency(value: number, currency: TCurrency, multiply: number = 1) {
    let currencySign = '';

    switch (currency) {
        case 'USD':
            currencySign = '$';
            break;
        default:
            currencySign = '';
            break;
    }

    const valueNormalized = (value * multiply).toFixed(2);

    return `${currencySign}${valueNormalized}`;
}