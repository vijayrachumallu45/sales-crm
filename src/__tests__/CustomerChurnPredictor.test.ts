import { describe, it, expect } from 'vitest';
import { CustomerChurnPredictor } from '../services/CustomerChurnPredictor';
import { Customer } from '../types';

describe('CustomerChurnPredictor', () => {
  it('predicts high churn risk for inactive customers with no activity', () => {
    const cust: Customer = {
      id: 'c1',
      name: 'John',
      company: 'Inactive Corp',
      email: 'j@inactive.com',
      phone: '123',
      customerType: 'SMB',
      status: 'Inactive',
      totalDealsValue: 0,
      createdAt: '2026-08-01',
    };

    const res = CustomerChurnPredictor.predict(cust, []);
    expect(res.riskCategory).toBe('High Risk');
    expect(res.churnProbabilityPercent).toBeGreaterThanOrEqual(60);
  });
});
