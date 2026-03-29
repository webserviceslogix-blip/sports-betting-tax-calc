import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About BetTaxCalc | Our Mission & Data Sources',
  description: 'BetTaxCalc provides free, accurate sports betting tax calculators for all 50 US states. Updated for 2026 OBBBA rules. Learn about our mission and methodology.',
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
            <span><strong>Daily Wins</strong> — Notable sports betting wins with automatic tax breakdowns</span>
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
          <li>State tax rates: Individual state revenue department websites</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-4">
          For a detailed explanation of how our calculators work, see our{' '}
          <Link href="/methodology" className="text-primary hover:underline">Methodology page</Link>.
        </p>

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
          <span className="text-primary">contact@bettaxcalc.com</span>.
        </p>
      </div>
    </div>
  );
}
