import { QuotationItem } from '../types';

export interface InvoiceTotals {
  rawSubtotal: number;
  totalDiscount: number;
  taxableAmount: number;
  taxAmount: number;
  shippingFee: number;
  grandTotal: number;
  itemBreakdown: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discountPercent: number;
    discountAmount: number;
    netTotal: number;
  }[];
}

export class InvoiceCalculationEngine {
  public static calculateInvoice(
    items: QuotationItem[],
    taxRatePercent = 8.0,
    shippingFee = 0
  ): InvoiceTotals {
    let rawSubtotal = 0;
    let totalDiscount = 0;

    const itemBreakdown = items.map((item) => {
      const lineSubtotal = item.quantity * item.unitPrice;
      const discountAmount = (lineSubtotal * item.discountPercent) / 100;
      const netTotal = lineSubtotal - discountAmount;

      rawSubtotal += lineSubtotal;
      totalDiscount += discountAmount;

      return {
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discountPercent: item.discountPercent,
        discountAmount,
        netTotal,
      };
    });

    const taxableAmount = rawSubtotal - totalDiscount;
    const taxAmount = (taxableAmount * taxRatePercent) / 100;
    const grandTotal = taxableAmount + taxAmount + shippingFee;

    return {
      rawSubtotal,
      totalDiscount,
      taxableAmount,
      taxAmount,
      shippingFee,
      grandTotal,
      itemBreakdown,
    };
  }
}
