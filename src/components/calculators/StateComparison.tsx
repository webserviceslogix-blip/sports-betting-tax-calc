'use client';

import { useState, useMemo } from 'react';
import { calculateTax, getAllStates, type FilingStatus, type TaxYear } from '@/lib/tax-calculator';
import { formatCurrency, formatPercent } from '@/lib/format';

export default function StateComparison() {
  const states = getAllStates();
  const [state1, setState1] = useState('NY');
  const [state2, setState2] = useState('FL');
  const [state3, setState3] = useState('PA');
  const [winnings, setWinnings] = useState(25000);
  const [annualIncome, setAnnualIncome] = useState(60000);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [taxYear, setTaxYear] = useState<TaxYear>(2026);

  const selectedCodes = [state1, state2, state3].filter(Boolean);

  const results = useMemo(() => {
    return selectedCodes.map((code) => {
      const result = calculateTax({
        annualIncome,
        filingStatus,
        stateCode: code,
        gamblingWinnings: winnings,
        gamblingLosses: 0,
        deductionType: 'standard',
        taxYear,
      });
      const stateData = states.find((s) => s.code === code);
      return { code, name: stateData?.name ?? code, result, stateData };
    });
  }, [selectedCodes, annualIncome, filingStatus, winnings, taxYear, states]);

  // Find best and worst
  const sorted = [...results].sort(
    (a, b) => a.result.totalTaxOnGambling - b.result.totalTaxOnGambling
  );
  const bestCode = sorted[0]?.code;
  const worstCode = sorted[sorted.length - 1]?.code;
  const savings =
    sorted.length >= 2
      ? sorted[sorted.length - 1].result.totalTaxOnGambling -
        sorted[0].result.totalTaxOnGambling
      : 0;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gambling Winnings
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={winnings}
              onChange={(e) => setWinnings(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
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
            <option value={2026}>2026 (OBBBA)</option>
            <option value={2025}>2025</option>
          </select>
        </div>
      </div>

      {/* State Selectors */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { val: state1, set: setState1, label: 'State 1' },
          { val: state2, set: setState2, label: 'State 2' },
          { val: state3, set: setState3, label: 'State 3' },
        ].map(({ val, set, label }) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
              value={val}
              onChange={(e) => set(e.target.value)}
              className="w-full py-2.5 px-3 border border-gray-300 rounded-lg text-gray-900"
            >
              <option value="">-- None --</option>
              {states.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} {s.noIncomeTax ? '(No Tax)' : ''}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Savings Highlight */}
      {savings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <p className="text-sm text-green-600 mb-1">Potential savings by choosing the right state</p>
          <p className="text-3xl font-bold text-green-700">{formatCurrency(savings)}</p>
          <p className="text-sm text-green-600 mt-1">
            {sorted[0]?.name} saves you {formatCurrency(savings)} compared to{' '}
            {sorted[sorted.length - 1]?.name} on {formatCurrency(winnings)} in winnings
          </p>
        </div>
      )}

      {/* Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Metric</th>
                {results.map((r) => (
                  <th
                    key={r.code}
                    className={`px-4 py-3 text-center font-semibold ${
                      r.code === bestCode
                        ? 'text-green-700 bg-green-50'
                        : r.code === worstCode && results.length > 1
                        ? 'text-red-700 bg-red-50'
                        : 'text-gray-700'
                    }`}
                  >
                    {r.name}
                    {r.code === bestCode && (
                      <span className="block text-xs font-normal text-green-600">
                        Best
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 text-gray-600">State Tax Rate</td>
                {results.map((r) => (
                  <td key={r.code} className="px-4 py-3 text-center font-mono">
                    {r.stateData?.noIncomeTax
                      ? '0%'
                      : formatPercent(r.result.stateTaxRate)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600">Federal Tax on Winnings</td>
                {results.map((r) => (
                  <td key={r.code} className="px-4 py-3 text-center font-mono">
                    {formatCurrency(r.result.federalTaxOnGambling)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600">State Tax on Winnings</td>
                {results.map((r) => (
                  <td
                    key={r.code}
                    className={`px-4 py-3 text-center font-mono ${
                      r.result.stateTax === 0 ? 'text-green-600' : ''
                    }`}
                  >
                    {formatCurrency(r.result.stateTax)}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td className="px-4 py-3 text-gray-900">Total Tax</td>
                {results.map((r) => (
                  <td
                    key={r.code}
                    className={`px-4 py-3 text-center font-mono ${
                      r.code === bestCode ? 'text-green-700' : ''
                    }`}
                  >
                    {formatCurrency(r.result.totalTaxOnGambling)}
                  </td>
                ))}
              </tr>
              <tr className="font-semibold">
                <td className="px-4 py-3 text-gray-900">Net Take-Home</td>
                {results.map((r) => (
                  <td
                    key={r.code}
                    className={`px-4 py-3 text-center font-mono ${
                      r.code === bestCode ? 'text-green-700' : ''
                    }`}
                  >
                    {formatCurrency(r.result.netTakeHome)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600">Effective Rate</td>
                {results.map((r) => (
                  <td key={r.code} className="px-4 py-3 text-center font-mono">
                    {formatPercent(r.result.effectiveRate)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600">Loss Deduction Allowed</td>
                {results.map((r) => (
                  <td key={r.code} className="px-4 py-3 text-center">
                    {r.stateData?.noIncomeTax ? (
                      <span className="text-gray-400">N/A</span>
                    ) : r.stateData?.lossDeductionAllowed ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-600 font-medium">No</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600">Sports Betting Legal</td>
                {results.map((r) => (
                  <td key={r.code} className="px-4 py-3 text-center">
                    {r.stateData?.sportsBettingLegal ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
