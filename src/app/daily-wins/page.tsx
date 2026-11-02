import type { Metadata } from 'next';
import Link from 'next/link';
import { getLatestDailyWins, getAllDailyWinsDates, formatWinDate } from '@/lib/daily-wins';
import DailyWinCard from '@/components/ui/DailyWinCard';
import EmailCapture from '@/components/ui/EmailCapture';

export const metadata: Metadata = {
  title: "Today's Biggest Sports Betting Wins + Tax Breakdown",
  description:
    "See today's biggest sports betting wins with automatic tax breakdowns. Every parlay hit, every big win — with federal and state tax calculated. Updated daily.",
};

export default function DailyWinsPage() {
  const latest = getLatestDailyWins();
  const allDates = getAllDailyWinsDates();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Updated Daily
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Today&apos;s Biggest Sports Betting Wins &amp; Tax Impact
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          The biggest sports betting wins reported today — with automatic
          federal and state tax breakdowns. See what the IRS takes from every
          win. Updated every day.
        </p>
      </div>

      {/* Static evergreen content for SEO */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8 max-w-4xl">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Why We Track Daily Wins</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Every sports betting win is taxable income. Whether it&apos;s a $5 parlay
          that hits for $500 or a long-shot futures bet paying $50,000, the IRS
          considers it all ordinary income taxed at your federal marginal rate
          (10-37%) plus your state income tax rate. We track the biggest wins
          reported each day and calculate the exact tax impact so you can see
          what winners actually take home.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Under the 2026 OBBBA rules, even bettors who break even may owe taxes
          due to the 90% loss deduction cap creating &quot;phantom income.&quot; Our daily
          breakdowns show the OBBBA impact on each win, helping bettors understand
          the real cost of the new tax law.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Wins are sourced from public reports on Reddit (r/sportsbook,
          r/sportsbetting), sports media, and sportsbook announcements. Tax
          calculations use our{' '}
          <Link href="/calculator" className="text-primary hover:underline">
            Sports Betting Tax Calculator
          </Link>{' '}
          with current 2026 federal brackets and state-specific rates for all 50
          states.
        </p>
      </div>

      {latest ? (
        <>
          {/* Date Banner */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {formatWinDate(latest.date)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {latest.wins.length} notable wins |{' '}
                Total payouts: ${latest.totalPayouts.toLocaleString()} |{' '}
                Total taxes: ${latest.totalTaxes.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-700">
                ${latest.totalPayouts.toLocaleString()}
              </div>
              <div className="text-xs text-green-600 mt-1">Total Payouts</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-700">
                ${latest.totalTaxes.toLocaleString()}
              </div>
              <div className="text-xs text-red-600 mt-1">Total Taxes</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">
                {latest.totalPayouts > 0 ? ((latest.totalTaxes / latest.totalPayouts) * 100).toFixed(1) : '0.0'}%
              </div>
              <div className="text-xs text-blue-600 mt-1">Avg Tax Rate</div>
            </div>
          </div>

          {/* Win Cards */}
          <div className="space-y-6">
            {latest.wins.map((win, index) => (
              <DailyWinCard key={win.id} win={win} rank={index + 1} />
            ))}
          </div>

          {/* OBBBA Callout */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-semibold text-amber-800 mb-2">
              2026 OBBBA Impact on These Wins
            </h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              Under the 2026 OBBBA rules, gamblers can only deduct 90% of
              their losses against winnings. If any of these winners had
              offsetting losses, they would face &quot;phantom income&quot; tax
              on the 10% they can&apos;t deduct.{' '}
              <Link href="/tools/phantom-income" className="font-medium underline">
                Calculate your phantom income
              </Link>
            </p>
          </div>

          {/* Email Capture */}
          <div className="mt-8">
            <EmailCapture variant="banner" />
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Won big today? See exactly what the IRS takes.
            </p>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
            >
              Calculate Your Tax
            </Link>
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="text-center py-16">
          <div className="text-6xl mb-4">{'\u{1F3C6}'}</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Coming Soon
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Daily wins tracking is launching soon. Check back tomorrow for the
            biggest sports betting wins with automatic tax breakdowns.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-6 py-3 mt-6 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
          >
            Use the Tax Calculator
          </Link>
        </div>
      )}

      {/* Archive */}
      {allDates.length > 1 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Past Daily Wins
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allDates.slice(1, 13).map((date) => (
              <Link
                key={date}
                href={`/daily-wins/${date}`}
                className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:border-primary hover:shadow-md transition-all"
              >
                <div className="text-sm font-medium text-gray-900">
                  {formatWinDate(date)}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
