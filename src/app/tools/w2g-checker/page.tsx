import type { Metadata } from 'next';
import W2GChecker from '@/components/calculators/W2GChecker';
import RelatedTools from '@/components/ui/RelatedTools';

export const metadata: Metadata = {
  title: 'W-2G Checker 2026 | Will Your Win Trigger a W-2G Form?',
  description:
    'Check if your gambling win will trigger a W-2G form under the new 2026 thresholds. Updated for the $2,000 sports betting threshold and 300:1 odds rule.',
};

export default function W2GCheckerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          W-2G Checker
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Will your gambling win trigger a W-2G form? Check instantly using the
          updated 2026 thresholds, including the new $2,000 threshold for sports
          betting (up from $600) and the 300:1 odds rule.
        </p>
      </div>

      <W2GChecker />

      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Is a W-2G Form?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Form W-2G is used to report certain gambling winnings to the IRS. When
          your winnings exceed specific thresholds, the payer (casino,
          sportsbook, or lottery) must issue a W-2G and send a copy to both you
          and the IRS. You are required to report all gambling winnings on your
          tax return, even if no W-2G is issued.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Changed for Sports Betting W-2G in 2026?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          The One Big Beautiful Bill Act raised the W-2G reporting threshold for
          the first time since 1977. For sports betting, the threshold increased
          from $600 to $2,000 (net winnings), while maintaining the 300:1 odds
          requirement. Both conditions must be met. Starting in 2027, the
          threshold will adjust annually for inflation.
        </p>
      </div>

      <RelatedTools currentPath="/tools/w2g-checker" />
    </div>
  );
}
