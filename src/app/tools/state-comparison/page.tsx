import type { Metadata } from 'next';
import StateComparison from '@/components/calculators/StateComparison';

export const metadata: Metadata = {
  title: 'State Tax Comparison Tool | Compare Sports Betting Taxes Across States',
  description:
    'Compare sports betting tax rates across US states side by side. See how much you save on gambling taxes in different states. Free comparison tool covering all 50 states.',
};

export default function StateComparisonPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          State Tax Comparison Tool
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Compare sports betting tax rates across up to three states side by
          side. See how much you save or lose depending on which state you bet
          in. Updated for 2026 federal and state tax rates.
        </p>
      </div>

      <StateComparison />

      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why Does Your State Matter for Sports Betting Taxes?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          State taxes on gambling winnings vary dramatically. Nine states have
          no income tax at all (Alaska, Florida, Nevada, New Hampshire, South
          Dakota, Tennessee, Texas, Washington, Wyoming), while New York City
          residents can face combined state and city rates exceeding 14%.
          Additionally, four states (Indiana, Massachusetts, North Carolina,
          Wisconsin) do not allow gambling loss deductions at the state level,
          which can significantly increase your effective tax rate.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Can I Bet in a Different State to Save on Taxes?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          You must be physically located within a state to place a legal sports
          bet there. You typically owe state income tax based on your state of
          residence, not where you placed the bet. However, some states may
          require you to file a non-resident return if you win while physically
          in that state. Consult a tax professional for multi-state situations.
        </p>
      </div>
    </div>
  );
}
