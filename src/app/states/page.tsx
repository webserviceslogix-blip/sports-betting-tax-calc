import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllStates } from '@/lib/tax-calculator';
import USMapGrid from '@/components/ui/USMapGrid';

export const metadata: Metadata = {
  title: 'Sports Betting Tax by State 2026 | All 50 States + DC',
  description:
    'Complete guide to sports betting taxes in all 50 states plus DC. See state tax rates, legal status, loss deduction rules, and use our free calculator for each state. Updated for 2026.',
};

export default function StatesHubPage() {
  const states = getAllStates();

  const noTaxStates = states.filter((s) => s.noIncomeTax);
  const legalOnlineStates = states.filter((s) => s.sportsBettingLegal && s.onlineLegal);
  const legalRetailOnly = states.filter((s) => s.sportsBettingLegal && !s.onlineLegal && s.retailLegal);
  const noLossDeduction = states.filter((s) => !s.noIncomeTax && !s.lossDeductionAllowed && s.sportsBettingLegal);
  const notLegalStates = states.filter((s) => !s.sportsBettingLegal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Sports Betting Tax by State
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          Every state taxes gambling winnings differently. Nine states have no
          income tax at all. Some states don&apos;t allow loss deductions. Use
          our state-specific calculators to see exactly what you owe. All data
          updated for 2026 OBBBA rules.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-green-700">{noTaxStates.length}</div>
          <div className="text-sm text-green-600 mt-1">No State Tax States</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-700">{legalOnlineStates.length}</div>
          <div className="text-sm text-blue-600 mt-1">Online Betting States</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-amber-700">{legalRetailOnly.length}</div>
          <div className="text-sm text-amber-600 mt-1">Retail Only States</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-red-700">{noLossDeduction.length}</div>
          <div className="text-sm text-red-600 mt-1">No Loss Deduction</div>
        </div>
      </div>

      {/* Interactive Map */}
      <USMapGrid states={states.map(s => ({
        code: s.code,
        name: s.name,
        slug: s.slug,
        noIncomeTax: s.noIncomeTax,
        sportsBettingLegal: s.sportsBettingLegal,
        lossDeductionAllowed: s.lossDeductionAllowed,
        flatRate: s.flatRate,
      }))} />

      {/* Complete State Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All States + DC</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">State</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Tax Rate</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Sports Betting</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Online</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Loss Deduction</th>
                <th className="px-4 py-3 font-semibold text-gray-700" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {states.map((state) => {
                const rateStr = state.noIncomeTax
                  ? '0% (no tax)'
                  : state.flatRate
                  ? `${(state.flatRate * 100).toFixed(2)}%`
                  : 'Graduated';

                return (
                  <tr key={state.code} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        href={`/states/${state.slug}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {state.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-900">
                      {rateStr}
                    </td>
                    <td className="px-4 py-3">
                      {state.sportsBettingLegal ? (
                        <span className="inline-flex items-center gap-1 text-green-700">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Legal
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <span className="w-2 h-2 rounded-full bg-gray-300" />
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {state.onlineLegal ? (
                        <span className="text-green-700">Yes</span>
                      ) : state.sportsBettingLegal ? (
                        <span className="text-amber-600">Retail only</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {state.noIncomeTax ? (
                        <span className="text-gray-400">N/A</span>
                      ) : state.lossDeductionAllowed ? (
                        <span className="text-green-700">Yes</span>
                      ) : (
                        <span className="text-red-600 font-medium">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/states/${state.slug}`}
                        className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        Calculator
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* No-Tax States Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          States With No Gambling Tax (No Income Tax)
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl leading-relaxed">
          These nine states have no state income tax, meaning gambling winnings
          are only subject to federal taxes. You still owe federal tax (10-37%
          marginal rate), and the IRS still withholds 24% on winnings over
          $5,000, but there is no additional state tax.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {noTaxStates.map((state) => (
            <Link
              key={state.code}
              href={`/states/${state.slug}`}
              className="bg-green-50 border border-green-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow group"
            >
              <div className="font-bold text-green-700 group-hover:text-green-800">
                {state.code}
              </div>
              <div className="text-xs text-green-600 mt-0.5">{state.name}</div>
              <div className="text-xs font-semibold text-green-500 mt-1">0% State Tax</div>
            </Link>
          ))}
        </div>
      </section>

      {/* States That Don't Allow Loss Deductions */}
      {noLossDeduction.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            States That Don&apos;t Allow Gambling Loss Deductions
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl leading-relaxed">
            These states tax your full gambling winnings at the state level
            without allowing you to deduct losses, even if you itemize on your
            federal return. This can significantly increase your tax burden
            compared to states that follow federal loss deduction rules.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {noLossDeduction.map((state) => (
              <Link
                key={state.code}
                href={`/states/${state.slug}`}
                className="bg-red-50 border border-red-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
              >
                <div className="font-bold text-red-700">{state.name}</div>
                <div className="text-xs text-red-500 mt-1">No Loss Deduction</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Not Yet Legal */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          States Where Sports Betting Is Not Yet Legal
        </h2>
        <p className="text-gray-600 mb-6 max-w-3xl leading-relaxed">
          These states have not yet legalized sports betting. Residents who
          gamble in other states, at tribal casinos, or through offshore sites
          are still required to report and pay taxes on their winnings.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {notLegalStates.map((state) => (
            <Link
              key={state.code}
              href={`/states/${state.slug}`}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
            >
              <div className="font-medium text-gray-600">{state.name}</div>
              <div className="text-xs text-gray-400 mt-1">Not Legal</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How State Taxes on Sports Betting Work in 2026
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Sports betting winnings are taxed at both the federal and state level.
          Federal tax applies uniformly across all states at your marginal rate
          (10-37%). State tax varies dramatically — from 0% in states like
          Florida and Nevada, to over 10% in New York and California.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          The 2026 OBBBA (One Big Beautiful Bill Act) added a new wrinkle:
          gambling loss deductions are now capped at 90% of losses at the
          federal level. Some states follow this federal cap, while others have
          their own rules. Indiana, Massachusetts, North Carolina, and Wisconsin
          don&apos;t allow gambling loss deductions at all at the state level.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Use our state-specific calculators above to see exactly what you owe
          in your state, including the 2026 OBBBA phantom income impact.
        </p>
      </section>
    </div>
  );
}
