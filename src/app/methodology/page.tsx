import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Calculation Methodology | BetTaxCalc',
  description: 'How our sports betting tax calculator works. Transparent methodology covering federal brackets, state rates, OBBBA 90% cap, and W-2G threshold calculations.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Calculation Methodology</h1>

      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Transparency is critical for a YMYL (Your Money Your Life) tool. This
        page explains exactly how our calculators compute tax estimates, what
        data sources we use, and what limitations exist.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Federal Tax Calculation</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Our calculator uses the official 2026 federal income tax brackets published
        by the IRS in Revenue Procedure 2025-32. Gambling winnings are added to all
        other income and taxed as ordinary income at the applicable marginal rate.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        The calculation follows these steps:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6 ml-4">
        <li>Add gambling winnings to annual non-gambling income to get total income</li>
        <li>Subtract the standard deduction (or itemized deductions if applicable)</li>
        <li>If itemizing, subtract deductible gambling losses (subject to the 90% OBBBA cap for 2026)</li>
        <li>Apply the progressive federal tax brackets to the resulting taxable income</li>
        <li>Calculate the tax attributable to gambling winnings as the difference between total tax with and without gambling income</li>
      </ol>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">OBBBA 90% Loss Deduction Cap</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        For tax year 2026 and beyond, gambling loss deductions are computed as:
      </p>
      <div className="bg-gray-50 rounded-lg p-4 mb-4 font-mono text-sm text-gray-800">
        Deductible Losses = min(Total Losses x 0.90, Total Winnings)<br />
        Phantom Income = min(Total Losses, Total Winnings) - Deductible Losses
      </div>
      <p className="text-gray-600 leading-relaxed mb-6">
        This is based on IRC Section 165(d) as amended by OBBBA Section 70114.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">State Tax Calculation</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        For states with a flat income tax, we multiply gambling winnings by the
        flat rate. For states with graduated brackets, we calculate the
        incremental tax attributable to gambling winnings by computing total tax
        with and without gambling income and taking the difference. We maintain
        tax rate data for all 50 states plus DC, sourced from each state&apos;s
        revenue department.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">W-2G Threshold Check</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        For sports betting in 2026, a W-2G is triggered when both conditions are met:
        (1) net winnings (payout minus wager) are at least $2,000, and (2) the
        total payout is at least 300 times the wager amount. These thresholds are
        from IRS Instructions for Forms W-2G (Rev. January 2026).
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitations</h2>
      <ul className="space-y-2 text-gray-600 mb-6">
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">&#9888;</span>
          <span>Results are <strong>estimates only</strong>, not exact tax liability calculations</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">&#9888;</span>
          <span>We use simplified state calculations for graduated-bracket states — actual state tax may vary based on other deductions and credits</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">&#9888;</span>
          <span>Local/municipal taxes (e.g., NYC, Philadelphia) are noted but not always calculated in the estimate</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">&#9888;</span>
          <span>Multi-state scenarios (betting in one state while residing in another) require professional guidance</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">&#9888;</span>
          <span>Professional gambler (Schedule C) calculations require specialized treatment beyond this calculator</span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Update Schedule</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Federal brackets are updated annually when the IRS publishes inflation
        adjustments (typically October-November for the following tax year).
        State rates are updated as legislatures enact changes. The W-2G
        threshold will adjust annually for inflation starting 2027.
      </p>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mt-10">
        <p className="text-xs text-gray-500">
          <strong>Last reviewed:</strong> March 29, 2026. If you believe any
          calculation is incorrect, please contact us at contact@bettaxcalc.com
          with the specific scenario and expected result.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
        >
          Use the Calculator
        </Link>
      </div>
    </div>
  );
}
