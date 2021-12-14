export default function currencyFormat(
    value: number,
    locale: string = 'en-US',
    currency: string = 'USD'
): string {
    const STYLE_FORMAT: string = 'currency';
    return value.toLocaleString(locale, { 
        style: STYLE_FORMAT,
        currency: currency,
    });
}