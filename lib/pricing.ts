/**
 * LayoverX GST Pricing Calculation Engine & Multi-Currency Converter
 * Compliant with Indian GST Act (18% tax rate) & Razorpay Payment Specifications.
 */

export type SupportedCurrency = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface PricingBreakdown {
  basePriceINR: number;
  gstAmountINR: number;
  grandTotalINR: number;
  amountInPaise: number;
  gstRate: number;
  foreignEstimate?: {
    currency: SupportedCurrency;
    amount: number;
    formatted: string;
  };
}

export const CURRENCY_RATES: Record<SupportedCurrency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
};

export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export function convertCurrency(amountINR: number, currency: SupportedCurrency = 'INR'): { amount: number; formatted: string; symbol: string } {
  const rate = CURRENCY_RATES[currency] || 1;
  const symbol = CURRENCY_SYMBOLS[currency] || '₹';
  const converted = Math.round(amountINR * rate);
  const formatted = `${symbol}${converted.toLocaleString()}`;
  return { amount: converted, formatted, symbol };
}

/**
 * Calculates the complete booking pricing breakdown including 18% GST and multi-currency foreign estimates.
 * 
 * @param basePriceINR The base price in Indian Rupees before tax
 * @param currency Target display currency (INR, USD, EUR, GBP)
 * @returns PricingBreakdown containing base price, rounded 18% GST amount, grand total in INR, and total in paise.
 */
export function getDefaultCurrencyForCountry(country: string): SupportedCurrency {
  switch (country) {
    case 'United States':
      return 'USD';
    case 'United Kingdom':
      return 'GBP';
    case 'Germany':
    case 'France':
    case 'Italy':
    case 'Spain':
    case 'Netherlands':
      return 'EUR';
    default:
      return 'INR';
  }
}

export function calculateBookingTotal(basePriceINR: number, currency: SupportedCurrency = 'INR'): PricingBreakdown {
  const basePrice = Math.max(0, Math.round(basePriceINR));
  const gstAmountINR = Math.round(basePrice * 0.18);
  const grandTotalINR = basePrice + gstAmountINR;
  const amountInPaise = grandTotalINR * 100;

  const foreign = convertCurrency(grandTotalINR, currency);

  return {
    basePriceINR: basePrice,
    gstAmountINR,
    grandTotalINR,
    amountInPaise,
    gstRate: 0.18,
    foreignEstimate: {
      currency,
      amount: foreign.amount,
      formatted: foreign.formatted,
    },
  };
}

