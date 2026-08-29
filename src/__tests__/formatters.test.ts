import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, getStatusBadgeColor } from '../utils/formatters';

describe('formatters utility', () => {
  it('formats currency correctly in USD', () => {
    expect(formatCurrency(1000)).toBe('$1,000');
    expect(formatCurrency(50000, '$')).toBe('$50,000');
  });

  it('formats dates into readable month day year format', () => {
    const formatted = formatDate('2026-08-29');
    expect(formatted).toContain('2026');
  });

  it('returns appropriate badge color CSS classes for statuses', () => {
    expect(getStatusBadgeColor('Won')).toContain('emerald');
    expect(getStatusBadgeColor('Lost')).toContain('rose');
    expect(getStatusBadgeColor('New')).toContain('blue');
  });
});
