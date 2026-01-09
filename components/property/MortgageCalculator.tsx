'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export function MortgageCalculator({ propertyPrice }: MortgageCalculatorProps) {
  const [residency, setResidency] = React.useState<'national' | 'resident' | 'non-resident'>(
    'resident'
  );
  const [price, setPrice] = React.useState(propertyPrice);
  const [downPaymentAED, setDownPaymentAED] = React.useState(Math.round(propertyPrice * 0.25));
  const [downPaymentPct, setDownPaymentPct] = React.useState(25);
  const [loanTerm, setLoanTerm] = React.useState(25);
  const [interestRate, setInterestRate] = React.useState(4.5);

  // Update down payment when price changes
  React.useEffect(() => {
    setPrice(propertyPrice);
    setDownPaymentAED(Math.round(propertyPrice * (downPaymentPct / 100)));
  }, [propertyPrice]);

  // Calculate mortgage
  const principal = price - downPaymentAED;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment =
    principal > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0;
  const totalInterest = monthlyPayment * numPayments - principal;
  const totalLoan = principal + totalInterest;

  const principalPct = totalLoan > 0 ? (principal / totalLoan) * 100 : 0;
  const interestPct = totalLoan > 0 ? (totalInterest / totalLoan) * 100 : 0;

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    setDownPaymentAED(Math.round(newPrice * (downPaymentPct / 100)));
  };

  const handleDownPaymentAEDChange = (aed: number) => {
    setDownPaymentAED(aed);
    setDownPaymentPct(Math.round((aed / price) * 100));
  };

  const handleDownPaymentPctChange = (pct: number) => {
    setDownPaymentPct(pct);
    setDownPaymentAED(Math.round((price * pct) / 100));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-bold">Mortgage Calculator</h3>

      {/* Residency Status */}
      <div className="space-y-2">
        <Label>UAE Residency Status</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={residency === 'national' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setResidency('national')}
          >
            National
          </Button>
          <Button
            variant={residency === 'resident' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setResidency('resident')}
          >
            Resident
          </Button>
          <Button
            variant={residency === 'non-resident' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setResidency('non-resident')}
          >
            Non-resident
          </Button>
        </div>
      </div>

      {/* Property Price */}
      <div className="space-y-2">
        <Label>Property Price (AED)</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
        />
      </div>

      {/* Down Payment */}
      <div className="space-y-2">
        <Label>Down Payment</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            value={downPaymentAED}
            onChange={(e) => handleDownPaymentAEDChange(Number(e.target.value))}
            suffix="AED"
          />
          <Input
            type="number"
            value={downPaymentPct}
            onChange={(e) => handleDownPaymentPctChange(Number(e.target.value))}
            suffix="%"
            min={0}
            max={100}
          />
        </div>
      </div>

      {/* Loan Term & Interest Rate */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Loan Term</Label>
          <Input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            suffix="Years"
            min={1}
            max={30}
          />
        </div>
        <div className="space-y-2">
          <Label>Interest Rate</Label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            suffix="%"
            step="0.1"
            min={0}
            max={20}
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg p-4 space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Monthly Payment</p>
          <p className="text-3xl font-bold">
            AED {formatPrice(Math.round(monthlyPayment))}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              Principal
            </span>
            <span className="font-semibold">AED {formatPrice(Math.round(principal))}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-300"></div>
              Interest
            </span>
            <span className="font-semibold">AED {formatPrice(Math.round(totalInterest))}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold pt-2 border-t">
            <span>Total Loan Amount</span>
            <span>AED {formatPrice(Math.round(totalLoan))}</span>
          </div>
        </div>

        {/* Visual Chart */}
        {totalLoan > 0 && (
          <div className="w-full h-8 flex rounded-full overflow-hidden">
            <div
              className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
              style={{ width: `${principalPct}%` }}
            >
              {principalPct > 10 && `${principalPct.toFixed(0)}%`}
            </div>
            <div
              className="bg-blue-300 flex items-center justify-center text-white text-xs font-semibold"
              style={{ width: `${interestPct}%` }}
            >
              {interestPct > 10 && `${interestPct.toFixed(0)}%`}
            </div>
          </div>
        )}

        <div className="flex justify-between text-xs text-gray-600">
          <span>Principal</span>
          <span>Interest</span>
        </div>
      </div>
    </div>
  );
}
