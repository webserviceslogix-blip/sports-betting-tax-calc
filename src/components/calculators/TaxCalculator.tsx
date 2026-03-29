'use client';

import { useState, useMemo } from 'react';
import { calculateTax, calculateComparison, getAllStates, type FilingStatus, type TaxYear, type TaxResult } from '@/lib/tax-calculator';
import { formatCurrency, formatPercent } from '@/lib/format';

interface TaxCalculatorProps {
  defaultState?: string;
}

export default function TaxCalculator({ defaultState }: TaxCalculatorProps) {
  const states = getAllStates();
  const [annualIncome, setAnnualIncome] = useState(50000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateCode, setStateCode] = useState(defaultState || 'NY');
  const [gamblingWinnings, setGamblingWinnings] = useState(10000);
  const [gamblingLosses, setGamblingLosses] = useState(5000);
  const [deductionType, setDeductionType] = useState<'standard' | 'itemized'>('standard');
  const [taxYear, setTaxYear] = useState<TaxYear>(2026);
  const [showComparison, setShowComparison] = useState(false);

  const result = useMemo(() => {
    return calculateTax({
      annualIncome,
      filingStatus,
      stateCode,
      gamblingWinnings,
      gamblingLosses,
      deductionType,
      taxYear,
    });
  }, [annualIncome, filingStatus, stateCode, gamblingWinnings, gamblingLosses, deductionType, taxYear]);

  const comparison = useMemo(() => {
    if (!showComparison) return null;
    return calculateComparison({
      annualIncome,
      filingStatus,
      stateCode,
      gamblingWinnings,
      gamblingLosses,
      deductionType,
    });
  }, [showComparison, annualIncome, filingStatus, stateCode, gamblingWinnings, gamblingLosses, deductionType]);

  const selectedState = states.find(s => s.code === stateCode);

  return (
    <div className="grid lg:grid-cols-5 gap-8" role="form" aria-label="Sports Betting Tax Calculator">
      {/* Input Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Tax Year Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setTaxYear(2025)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${taxYear === 2025 ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              2025 (Old Rules)
            </button>
            <button
              onClick={() => setTaxYear(2026)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${taxYear === 2026 ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              2026 (OBBBA)
            </button>
          </div>
          {taxYear === 2026 && (
            <p className="mt-1.5 text-xs text-amber-600">
              2026 rules: 90% loss deduction cap applies (OBBBA)
            </p>
          )}
        </div>

        {/* Annual Income */}
        <div>
          <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
            Annual Income (Before Gambling)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              id="income"
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Your salary, wages, and other non-gambling income
          </p>
        </div>

        {/* Filing Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
            className="w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
          >
            <option value="single">Single</option>
            <option value="mfj">Married Filing Jointly</option>
            <option value="mfs">Married Filing Separately</option>
            <option value="hoh">Head of Household</option>
          </select>
        </div>

        {/* State */}
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
          {selectedState?.noIncomeTax && (
            <p className="mt-1 text-xs text-green-600">
              {selectedState.name} has no state income tax on gambling winnings
            </p>
          )}
        </div>

        {/* Gambling Winnings */}
        <div>
          <label htmlFor="winnings" className="block text-sm font-medium text-gray-700 mb-1">
            Total Gambling Winnings
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              id="winnings"
              type="number"
              value={gamblingWinnings}
              onChange={(e) => setGamblingWinnings(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
            />
          </div>
        </div>

        {/* Gambling Losses */}
        <div>
          <label htmlFor="losses" className="block text-sm font-medium text-gray-700 mb-1">
            Total Gambling Losses
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              id="losses"
              type="number"
              value={gamblingLosses}
              onChange={(e) => setGamblingLosses(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Losses can only be deducted if you itemize deductions
          </p>
        </div>

        {/* Deduction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deduction Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={deductionType === 'standard'}
                onChange={() => setDeductionType('standard')}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">
                Standard ({formatCurrency(result.standardDeduction)})
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={deductionType === 'itemized'}
                onChange={() => setDeductionType('itemized')}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Itemized</span>
            </label>
          </div>
          {deductionType === 'standard' && gamblingLosses > 0 && (
            <p className="mt-1.5 text-xs text-amber-600">
              You cannot deduct gambling losses with the standard deduction.
              Switch to itemized to deduct losses.
            </p>
          )}
        </div>

        {/* Compare Toggle */}
        <label className="flex items-center gap-2 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={showComparison}
            onChange={(e) => setShowComparison(e.target.checked)}
            className="rounded text-primary focus:ring-primary"
          />
          <span className="text-sm font-medium text-gray-700">
            Compare 2025 vs 2026 rules
          </span>
        </label>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-3 space-y-6" aria-live="polite" aria-atomic="true">
        {/* Net Take-Home Card */}
        <div className="bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-6 text-white">
          <div className="text-sm font-medium text-blue-200 mb-1">
            Your Take-Home from {formatCurrency(gamblingWinnings)} in Winnings
          </div>
          <div className="text-4xl md:text-5xl font-bold mb-3">
            {formatCurrency(result.netTakeHome)}
          </div>
          <div className="flex items-center gap-4 text-sm text-blue-200">
            <span>Total Tax: {formatCurrency(result.totalTaxOnGambling)}</span>
            <span>|</span>
            <span>Effective Rate: {formatPercent(result.effectiveRate)}</span>
          </div>
        </div>

        {/* Tax Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Tax Breakdown</h3>
          </div>
          <div className="px-6 py-4 space-y-3">
            <ResultRow label="Total Income (salary + winnings)" value={formatCurrency(result.totalIncome)} />
            {deductionType === 'standard' && (
              <ResultRow label="Standard Deduction" value={`-${formatCurrency(result.standardDeduction)}`} />
            )}
            {deductionType === 'itemized' && result.deductibleLosses > 0 && (
              <ResultRow label={`Deductible Losses (${taxYear >= 2026 ? '90%' : '100%'})`} value={`-${formatCurrency(result.deductibleLosses)}`} />
            )}
            <ResultRow label="Taxable Income" value={formatCurrency(result.taxableIncome)} highlight />
            <div className="border-t border-gray-100 pt-3 mt-3" />
            <ResultRow label={`Federal Tax (${formatPercent(result.federalMarginalRate)} marginal)`} value={formatCurrency(result.federalTaxOnGambling)} />
            <ResultRow label={`${result.stateName} State Tax`} value={formatCurrency(result.stateTax)} />
            <div className="border-t border-gray-100 pt-3 mt-3" />
            <ResultRow label="Total Tax on Gambling Winnings" value={formatCurrency(result.totalTaxOnGambling)} highlight />
            <ResultRow label="Net Take-Home" value={formatCurrency(result.netTakeHome)} className="text-green-700 font-semibold" />
          </div>
        </div>

        {/* Phantom Income Warning */}
        {result.obbbaApplied && result.phantomIncome > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-amber-600 text-lg">&#9888;</span>
              <div>
                <h4 className="font-semibold text-amber-800">
                  OBBBA Phantom Income: {formatCurrency(result.phantomIncome)}
                </h4>
                <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                  Under 2026 rules, you can only deduct 90% of your{' '}
                  {formatCurrency(gamblingLosses)} in losses ({formatCurrency(result.deductibleLosses)}).
                  The remaining {formatCurrency(result.phantomIncome)} is &quot;phantom
                  income&quot; — taxable even though you didn&apos;t actually earn it.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* W-2G Alert */}
        <div className={`rounded-xl p-5 ${result.w2gTriggered ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
          <h4 className={`font-semibold text-sm ${result.w2gTriggered ? 'text-blue-800' : 'text-gray-700'}`}>
            W-2G Form: {result.w2gTriggered ? 'Likely Required' : 'Not Required'}
          </h4>
          <p className={`text-sm mt-1 ${result.w2gTriggered ? 'text-blue-700' : 'text-gray-600'}`}>
            {result.w2gExplanation}
          </p>
        </div>

        {/* Federal Withholding Note */}
        {result.federalWithholding > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-sm text-gray-700">Federal Withholding</h4>
            <p className="text-sm text-gray-600 mt-1">
              {formatCurrency(result.federalWithholding)} (24%) would be withheld at the time of payout.
              {result.federalWithholding > result.federalTaxOnGambling
                ? ` You may be due a refund of ${formatCurrency(result.federalWithholding - result.federalTaxOnGambling)}.`
                : result.federalWithholding < result.federalTaxOnGambling
                ? ` You would owe an additional ${formatCurrency(result.federalTaxOnGambling - result.federalWithholding)} when filing.`
                : ''}
            </p>
          </div>
        )}

        {/* 2025 vs 2026 Comparison */}
        {showComparison && comparison && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900">2025 vs 2026 Comparison</h3>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div />
                <div className="font-medium text-gray-500 text-center">2025</div>
                <div className="font-medium text-gray-500 text-center">2026 (OBBBA)</div>

                <div className="text-gray-700">Deductible Losses</div>
                <div className="text-center">{formatCurrency(comparison.result2025.deductibleLosses)}</div>
                <div className="text-center">{formatCurrency(comparison.result2026.deductibleLosses)}</div>

                <div className="text-gray-700">Phantom Income</div>
                <div className="text-center text-green-600">{formatCurrency(0)}</div>
                <div className="text-center text-amber-600">{formatCurrency(comparison.phantomIncome)}</div>

                <div className="text-gray-700">Tax on Winnings</div>
                <div className="text-center">{formatCurrency(comparison.result2025.totalTaxOnGambling)}</div>
                <div className="text-center">{formatCurrency(comparison.result2026.totalTaxOnGambling)}</div>

                <div className="text-gray-700 font-medium">Net Take-Home</div>
                <div className="text-center font-medium">{formatCurrency(comparison.result2025.netTakeHome)}</div>
                <div className="text-center font-medium">{formatCurrency(comparison.result2026.netTakeHome)}</div>
              </div>

              {comparison.additionalTax > 0 && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">
                    The 2026 OBBBA rules cost you an additional {formatCurrency(comparison.additionalTax)} in taxes compared to 2025 rules.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  highlight,
  className,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex justify-between items-center ${highlight ? 'font-semibold text-gray-900' : 'text-gray-600'} ${className || ''}`}>
      <span className="text-sm">{label}</span>
      <span className="text-sm font-mono">{value}</span>
    </div>
  );
}
