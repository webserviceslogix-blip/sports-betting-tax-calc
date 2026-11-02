import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About BetTaxCalc | Our Team, Mission & Data Sources',
  description: 'BetTaxCalc provides free, accurate sports betting tax calculators for all 50 US states. Meet the team, learn about our methodology, and see our data sources.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About BetTaxCalc</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          BetTaxCalc provides free, accurate sports betting and gambling tax
          calculators for every US state. We built this site because the 2026
          OBBBA tax law changes made gambling taxes significantly more complex,
          and no existing tool properly handled the new 90% loss deduction cap,
          phantom income calculations, or the updated W-2G thresholds.
        </p>

        {/* Team Section — EEAT signal */}
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Our Team</h2>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-2xl font-bold shrink-0">
              BA
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Ben Amadi</h3>
              <p className="text-sm text-primary font-medium">Founder &amp; Developer</p>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Ben is a software engineer who built BetTaxCalc after the 2026
                OBBBA tax changes created a gap in existing tools. No calculator
                properly handled phantom income, the 90% loss deduction cap, or
                the updated W-2G thresholds. BetTaxCalc was built to fill that
                gap with accurate, free, and transparent tools backed by
                official IRS data sources.
              </p>
            </div>
          </div>
        </div>

        {/* Tax Review Credential */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-green-600 text-lg mt-0.5">&#10003;</span>
            <div>
              <h4 className="font-semibold text-green-800">Tax Methodology Review</h4>
              <p className="text-sm text-green-700 mt-1">
                Our calculator methodology, federal bracket data, OBBBA loss cap
                logic, and state tax rates are verified against official IRS
                publications and state revenue department sources. We recommend
                all users consult a qualified CPA or enrolled agent for
                personalized tax advice.
              </p>
              {/* TODO: When you hire a CPA reviewer, add: */}
              {/* <p className="text-sm text-green-700 mt-2 font-medium">
                Tax calculations reviewed by [CPA Name], CPA — [City, State]
              </p> */}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          We believe every sports bettor deserves to understand their tax
          obligations before, during, and after placing bets. Our calculators
          are designed to be the most accurate, comprehensive, and up-to-date
          tools available, covering federal taxes, all 50 states plus DC, and
          the latest 2026 tax law changes.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Offer</h2>
        <ul className="space-y-2 text-gray-600 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">&#10003;</span>
            <span><strong>Sports Betting Tax Calculator</strong> — Federal + state tax estimates for all 50 states + DC</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">&#10003;</span>
            <span><strong>Parlay Tax Calculator</strong> — The only calculator showing after-tax parlay payouts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">&#10003;</span>
            <span><strong>Phantom Income Calculator</strong> — OBBBA 90% cap impact estimator</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">&#10003;</span>
            <span><strong>W-2G Checker</strong> — Updated for the new 2026 $2,000 threshold</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">&#10003;</span>
            <span><strong>State Tax Comparison</strong> — Compare tax burden across states side by side</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">&#10003;</span>
            <span><strong>Daily Wins</strong> — Notable sports betting wins with automatic tax breakdowns, updated regularly</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Data Sources</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          All tax calculations are based on official sources:
        </p>
        <ul className="space-y-1 text-gray-600 text-sm mb-6">
          <li>Federal tax brackets: <a href="https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IRS Revenue Procedure 2025-32</a></li>
          <li>OBBBA provisions: <a href="https://www.congress.gov/bill/119th-congress/house-bill/1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">H.R. 1, 119th Congress, Section 70114</a></li>
          <li>W-2G thresholds: <a href="https://www.irs.gov/instructions/iw2g" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IRS Instructions for Forms W-2G (Rev. January 2026)</a></li>
          <li>State tax rates: Individual state revenue department websites (linked on each <Link href="/states" className="text-primary hover:underline">state page</Link>)</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-4">
          For a detailed explanation of how our calculators work, see our{' '}
          <Link href="/methodology" className="text-primary hover:underline">Methodology page</Link>.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Editorial Standards</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          BetTaxCalc is a tax education and calculator tool. We are not a
          sportsbook, gambling operator, or tipster service. We do not encourage
          gambling — we help people understand and prepare for the tax
          consequences of gambling they&apos;ve already done. All content follows
          these principles:
        </p>
        <ul className="space-y-1 text-gray-600 text-sm mb-6">
          <li>&#8226; All tax claims cite official IRS or state government sources</li>
          <li>&#8226; Calculator results are labeled as estimates, not tax advice</li>
          <li>&#8226; Responsible gambling resources appear on every page</li>
          <li>&#8226; Affiliate relationships are disclosed per FTC guidelines</li>
          <li>&#8226; Content is updated when tax laws or rates change</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Disclaimer</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          BetTaxCalc provides tax estimates for informational and educational
          purposes only. We are not a tax advisory firm, CPA practice, or law
          office. Our calculators produce estimates based on publicly available
          tax rates and rules. They are not a substitute for professional tax
          advice. Always consult a qualified CPA, enrolled agent, or tax
          attorney for advice specific to your situation.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
        <p className="text-gray-600 leading-relaxed">
          For questions, corrections, or partnership inquiries, contact us at{' '}
          <a href="mailto:contact@bettaxcalc.com" className="text-primary hover:underline">contact@bettaxcalc.com</a>.
        </p>
      </div>
    </div>
  );
}
