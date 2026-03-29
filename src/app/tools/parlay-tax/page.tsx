import type { Metadata } from 'next';
import ParlayTaxCalc from '@/components/calculators/ParlayTaxCalc';

export const metadata: Metadata = {
  title: 'Parlay Tax Calculator 2026 | After-Tax Parlay Payout Estimator',
  description:
    'The only parlay calculator that shows your after-tax payout. See what the IRS takes from your parlay winnings. Covers federal + state tax for all 50 states.',
};

export default function ParlayTaxPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Parlay Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          See your after-tax parlay payout instantly. Enter your wager and odds
          to calculate exactly how much you keep after federal and state taxes.
          The only parlay calculator that shows after-tax results.
        </p>
      </div>

      <ParlayTaxCalc />

      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Are Parlay Winnings Taxed?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Parlay winnings are taxed exactly like any other gambling income — as
          ordinary income at your federal marginal rate plus your state tax rate.
          Your net profit (total payout minus your original wager) is the taxable
          amount. If your net profit exceeds $2,000 and is at least 300 times
          your wager, the sportsbook must issue a W-2G form.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Do I Pay Taxes on Every Parlay Win?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Yes. All gambling winnings are taxable regardless of whether a W-2G is
          issued. Even small wins from $5 parlays must be reported as income on
          your tax return. The IRS requires you to report total gambling winnings
          for the year, not individual bets.
        </p>
      </div>
    </div>
  );
}
