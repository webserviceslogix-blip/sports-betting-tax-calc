'use client';

import { useState, useMemo } from 'react';
import { calculatePhantomIncome } from '@/lib/tax-calculator';
import { formatCurrency } from '@/lib/format';

export default function PhantomIncomeCalc() {
  const [winnings, setWinnings] = useState(50000);
  const [losses, setLosses] = useState(50000);

  const result = useMemo(() => {
    return calculatePhantomIncome(winnings, losses);
  }, [winnings, losses]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Gambling Winnings (2026)
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
            Total Gambling Losses (2026)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={losses}
              onChange={(e) => setLosses(Number(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-900"
              min={0}
            />
          </div>
        </div>

        {/* Quick scenarios */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-3">Try a scenario:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Break Even', w: 50000, l: 50000 },
              { label: 'Slight Loss', w: 30000, l: 35000 },
              { label: 'Big Winner', w: 100000, l: 20000 },
              { label: 'Heavy Losses', w: 10000, l: 80000 },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => { setWinnings(s.w); setLosses(s.l); }}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Phantom Income Alert */}
        {result.additionalTaxableIncome > 0 ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="text-sm font-medium text-red-600 mb-1">
              2026 OBBBA Phantom Income
            </div>
            <div className="text-4xl font-bold text-red-700">
              {formatCurrency(result.additionalTaxableIncome)}
            </div>
            <p className="text-sm text-red-600 mt-2">
              This is income you&apos;ll be taxed on that you never actually earned.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <div className="text-sm font-medium text-green-600 mb-1">
              2026 OBBBA Phantom Income
            </div>
            <div className="text-4xl font-bold text-green-700">{formatCurrency(0)}</div>
            <p className="text-sm text-green-600 mt-2">
              No phantom income in this scenario.
            </p>
          </div>
        )}

        {/* Comparison Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 text-sm">
            <div className="p-4 bg-gray-50 font-medium text-gray-700" />
            <div className="p-4 bg-gray-50 font-medium text-gray-700 text-center">
              2025 Rules (100%)
            </div>
            <div className="p-4 bg-gray-50 font-medium text-gray-700 text-center">
              2026 OBBBA (90%)
            </div>

            <div className="p-4 border-t text-gray-600">Winnings</div>
            <div className="p-4 border-t text-center font-mono">{formatCurrency(winnings)}</div>
            <div className="p-4 border-t text-center font-mono">{formatCurrency(winnings)}</div>

            <div className="p-4 border-t text-gray-600">Losses</div>
            <div className="p-4 border-t text-center font-mono">{formatCurrency(losses)}</div>
            <div className="p-4 border-t text-center font-mono">{formatCurrency(losses)}</div>

            <div className="p-4 border-t text-gray-600">Deductible</div>
            <div className="p-4 border-t text-center font-mono text-green-600">
              {formatCurrency(result.priorLaw.deductible)}
            </div>
            <div className="p-4 border-t text-center font-mono text-amber-600">
              {formatCurrency(result.obbba2026.deductible)}
            </div>

            <div className="p-4 border-t text-gray-600 font-medium">Taxable Income</div>
            <div className="p-4 border-t text-center font-mono font-medium">
              {formatCurrency(result.priorLaw.taxable)}
            </div>
            <div className="p-4 border-t text-center font-mono font-medium text-red-600">
              {formatCurrency(result.obbba2026.taxable)}
            </div>

            <div className="p-4 border-t text-gray-600 font-semibold">Phantom Income</div>
            <div className="p-4 border-t text-center font-mono text-green-600">$0</div>
            <div className="p-4 border-t text-center font-mono font-semibold text-red-600">
              {formatCurrency(result.obbba2026.phantomIncome)}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed">
          Phantom income is calculated as the difference between your taxable
          income under 2026 rules vs 2025 rules. Under the OBBBA, you can only
          deduct 90% of gambling losses (capped at your winnings), creating
          taxable income that doesn&apos;t correspond to actual profit.
        </p>
      </div>
    </div>
  );
}
