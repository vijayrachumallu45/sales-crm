import { Quotation } from '../types';

export interface FormattedInvoiceHTML {
  title: string;
  headerInfo: string;
  tableRowsHTML: string;
  totalsHTML: string;
}

export class QuotationDocumentGenerator {
  public static generateHTML(quote: Quotation): FormattedInvoiceHTML {
    const tableRows = quote.items
      .map(
        (item) =>
          `<tr><td>${item.description}</td><td>${item.quantity}</td><td>$${item.unitPrice}</td><td>$${item.total}</td></tr>`
      )
      .join('');

    return {
      title: `Invoice Document ${quote.quoteNumber}`,
      headerInfo: `Billed to ${quote.companyName} (Attn: ${quote.customerName})`,
      tableRowsHTML: tableRows,
      totalsHTML: `Subtotal: $${quote.subtotal} | Tax: $${quote.taxAmount} | Total: $${quote.totalAmount}`,
    };
  }
}
