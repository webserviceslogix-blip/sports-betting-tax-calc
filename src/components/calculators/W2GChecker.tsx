'use client';

import { useState, useMemo } from 'react';
import { checkW2G, type TaxYear } from '@/lib/tax-calculator';
import { formatCurrency } from '@/lib/format';

type GamblingType = 'sports' | 'slots' | 'poker' | 'keno' | 'bingo' | 'lottery' | 'other';

export default function W2GChecker() {
  const [winAmount, setWinAmount] = useState(5000);
  const [wagerAmount, setWagerAmount] = useState(10);
  const [gamblingType, setGamblingType] = useState<GamblingType>('sports');
  const [taxYear, setTaxYear] = useState<TaxYear>(2026);

  const result = useMemo(() => {
    return checkW2G(winAmount, wagerAmount, gamblingType, taxYear);
  }, [winAmount, wagerAmount, gamblingType, taxYear]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type of Gambling
          </label>
          <select
            value={gamblingType}
            onChange={(e) => setGamblingType(e.target.value as GamblingType)}
            className="w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
          >
            <option value="sports">Sports Betting</option>
            <option value="slots">Slot Machines</option>
            <option value="poker">Poker Tournament</option>
            <option value="keno">Keno</option>
            <option value="bingo">Bingo</option>
            <option value="lottery">Lottery</option>
            <option value="other">Other Wagering</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Winning Amount (payout)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={winAmount}
              onChange={(e) => setWinAmount(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">The total amount you received (including your original wager)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Original Wager
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={wagerAmount}
              onChange={(e) => setWagerAmount(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Year</label>
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              onClick={() => setTaxYear(2025)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${taxYear === 2025 ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              2025
            </button>
            <button
              onClick={() => setTaxYear(2026)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${taxYear === 2026 ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              2026
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="space-y-4">
        {/* Main Answer */}
        <div className={`rounded-2xl p-8 text-center ${result.triggered ? 'bg-blue-600 text-white' : 'bg-green-50 border-2 border-green-200'}`}>
          <div className={`text-6xl font-bold mb-3 ${result.triggered ? 'text-white' : 'text-green-600'}`}>
            {result.triggered ? 'YES' : 'NO'}
          </div>
          <div className={`text-lg font-medium ${result.triggered ? 'text-blue-100' : 'text-green-700'}`}>
            {result.triggered ? 'A W-2G will likely be issued' : 'No W-2G required for this win'}
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <h3 className="font-semibold text-gray-900">How We Determined This</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Net Winnings (payout - wager)</span>
              <span className="font-mono">{formatCurrency(winAmount - wagerAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">W-2G Threshold ({taxYear})</span>
              <span className="font-mono">{formatCurrency(result.threshold)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Meets amount threshold?</span>
              <span className={`font-medium ${(winAmount - wagerAmount) >= result.threshold ? 'text-blue-600' : 'text-gray-400'}`}>
                {(winAmount - wagerAmount) >= result.threshold ? 'Yes' : 'No'}
              </span>
            </div>
            {result.requiresOddsMultiplier && (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payout / Wager ratio</span>
                  <span className="font-mono">{wagerAmount > 0 ? `${(winAmount / wagerAmount).toFixed(0)}:1` : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Meets 300:1 rule?</span>
                  <span className={`font-medium ${result.oddsMultiplierMet ? 'text-blue-600' : 'text-gray-400'}`}>
                    {result.oddsMultiplierMet ? 'Yes' : 'No'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
        </div>

        {/* Threshold table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h4 className="text-sm font-semibold text-gray-700">{taxYear} W-2G Thresholds</h4>
          </div>
          <div className="text-sm">
            {[
              { type: 'Sports Betting', amt: taxYear >= 2026 ? '$2,000' : '$600', rule: '+ 300:1 odds' },
              { type: 'Slot Machines', amt: taxYear >= 2026 ? '$2,000' : '$1,200', rule: '' },
              { type: 'Poker Tournaments', amt: '$5,000', rule: '' },
              { type: 'Keno', amt: taxYear >= 2026 ? '$2,000' : '$1,500', rule: '' },
              { type: 'Bingo', amt: taxYear >= 2026 ? '$2,000' : '$1,200', rule: '' },
            ].map((row) => (
              <div key={row.type} className="flex justify-between px-4 py-2 border-b border-gray-100 last:border-0">
                <span className="text-gray-600">{row.type}</span>
                <span className="font-mono text-gray-900">{row.amt} {row.rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
