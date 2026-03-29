'use client';

import { useState, useMemo } from 'react';
import { calculateParlayTax, getAllStates, type FilingStatus, type TaxYear } from '@/lib/tax-calculator';
import { formatCurrency, formatPercent, formatOdds } from '@/lib/format';

export default function ParlayTaxCalc() {
  const states = getAllStates();
  const [wager, setWager] = useState(25);
  const [odds, setOdds] = useState(5000);
  const [stateCode, setStateCode] = useState('NY');
  const [annualIncome, setAnnualIncome] = useState(50000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [taxYear, setTaxYear] = useState<TaxYear>(2026);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const result = useMemo(() => {
    return calculateParlayTax(wager, odds, stateCode, filingStatus, annualIncome, taxYear);
  }, [wager, odds, stateCode, filingStatus, annualIncome, taxYear]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wager Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={wager}
              onChange={(e) => setWager(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parlay Odds (American)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">+</span>
            <input
              type="number"
              value={odds}
              onChange={(e) => setOdds(Number(e.target.value) || 100)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Example: A 10-leg parlay might be +5000 ({formatOdds(odds)} = {odds > 0 ? (odds / 100 + 1).toFixed(1) : (100 / Math.abs(odds) + 1).toFixed(2)}x payout)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <select
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
          >
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name} {state.noIncomeTax ? '(No State Tax)' : ''}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-primary hover:underline"
        >
          {showAdvanced ? 'Hide' : 'Show'} advanced options
        </button>

        {showAdvanced && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                className="w-full py-2.5 px-3 border border-gray-300 rounded-lg text-gray-900"
              >
                <option value="single">Single</option>
                <option value="mfj">Married Filing Jointly</option>
                <option value="mfs">Married Filing Separately</option>
                <option value="hoh">Head of Household</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Year</label>
              <select
                value={taxYear}
                onChange={(e) => setTaxYear(Number(e.target.value) as TaxYear)}
                className="w-full py-2.5 px-3 border border-gray-300 rounded-lg text-gray-900"
              >
                <option value={2026}>2026 (OBBBA Rules)</option>
                <option value={2025}>2025 (Old Rules)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Hero Result */}
        <div className="bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-6 text-white">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-blue-200">Gross Payout</div>
              <div className="text-2xl font-bold">{formatCurrency(result.grossPayout)}</div>
            </div>
            <div>
              <div className="text-sm text-blue-200">Net Profit</div>
              <div className="text-2xl font-bold">{formatCurrency(result.netProfit)}</div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4">
            <div className="text-sm text-blue-200">After-Tax Profit (What You Keep)</div>
            <div className="text-3xl font-bold">{formatCurrency(result.afterTaxProfit)}</div>
            <div className="text-sm text-blue-200 mt-1">
              Effective tax rate: {formatPercent(result.effectiveRate)}
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">Tax Breakdown</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Wager</span>
            <span className="font-mono">{formatCurrency(wager)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Gross Payout ({formatOdds(odds)})</span>
            <span className="font-mono">{formatCurrency(result.grossPayout)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Net Profit (payout - wager)</span>
            <span className="font-mono">{formatCurrency(result.netProfit)}</span>
          </div>
          <div className="border-t border-gray-100 pt-2" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Federal Tax</span>
            <span className="font-mono text-red-600">-{formatCurrency(result.federalTax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">State Tax</span>
            <span className="font-mono text-red-600">-{formatCurrency(result.stateTax)}</span>
          </div>
          <div className="border-t border-gray-100 pt-2" />
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-gray-900">Total Tax</span>
            <span className="font-mono text-red-600">-{formatCurrency(result.totalTax)}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span className="text-green-700">After-Tax Profit</span>
            <span className="font-mono text-green-700">{formatCurrency(result.afterTaxProfit)}</span>
          </div>
        </div>

        {/* W-2G */}
        <div className={`rounded-xl p-4 text-sm ${result.w2gTriggered ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'bg-gray-50 border border-gray-200 text-gray-600'}`}>
          <span className="font-semibold">W-2G: </span>
          {result.w2gTriggered
            ? 'This win would likely trigger a W-2G form (payout exceeds $2,000 and 300x wager).'
            : 'This win would NOT trigger a W-2G form. You must still report it on your tax return.'}
        </div>
      </div>
    </div>
  );
}
