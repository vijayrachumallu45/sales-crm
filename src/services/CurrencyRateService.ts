export class CurrencyRateService {
  private static rates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.78,
    CAD: 1.36,
    AUD: 1.52,
    JPY: 155.0,
  };

  public static convert(amount: number, fromCurrency: string, toCurrency: string): number {
    const fromRate = this.rates[fromCurrency] || 1.0;
    const toRate = this.rates[toCurrency] || 1.0;
    const inUSD = amount / fromRate;
    return Math.round(inUSD * toRate * 100) / 100;
  }
}
