import type { Metadata } from 'next';
import TaxCalculator from '@/components/calculators/TaxCalculator';

export const metadata: Metadata = {
  title: 'Sports Betting Tax Calculator 2026 | Federal & State Tax Estimator',
  description:
    'Free sports betting tax calculator for 2026. Calculate federal and state taxes on gambling winnings with the new OBBBA 90% loss deduction cap. All 50 states, all filing statuses.',
};

export default function CalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Sports Betting Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Calculate your federal and state taxes on sports betting and gambling
          winnings. Updated for 2026 with the OBBBA 90% loss deduction cap,
          new $2,000 W-2G threshold, and phantom income calculations.
        </p>
      </div>

      {/* Calculator */}
      <TaxCalculator />

      {/* Below-Calculator Content (SEO + AI Citation) */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Sports Betting Taxes Work in 2026
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Sports betting winnings are taxed as ordinary income by the IRS. This
          means your winnings are added to all your other income and taxed at
          your marginal federal rate (10-37%), plus your state&apos;s income tax
          rate. The federal withholding rate is 24% on winnings over $5,000.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Is the OBBBA 90% Loss Deduction Cap?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          The One Big Beautiful Bill Act (OBBBA), signed into law on July 4,
          2025, introduced a 90% cap on gambling loss deductions starting
          January 1, 2026. Previously, you could deduct 100% of your gambling
          losses up to your winnings. Now, you can only deduct 90%, creating
          taxable &quot;phantom income&quot; even if you break even.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Can I Deduct Gambling Losses?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Yes, but only if you itemize deductions (not the standard deduction)
          and only up to the amount of your winnings. Starting in 2026, you can
          only deduct 90% of losses due to the OBBBA cap. Some states (Indiana,
          Massachusetts, North Carolina, Wisconsin) do not allow gambling loss
          deductions at the state level regardless of federal rules.
        </p>
      </div>

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Sports Betting Tax Calculator',
            description:
              'Calculate federal and state taxes on sports betting winnings for 2026, including OBBBA 90% loss deduction cap and phantom income.',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            browserRequirements: 'Requires JavaScript',
          }),
        }}
      />
    </div>
  );
}
