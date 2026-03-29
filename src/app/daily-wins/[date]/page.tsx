import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDailyWins, getAllDailyWinsDates, formatWinDate } from '@/lib/daily-wins';
import DailyWinCard from '@/components/ui/DailyWinCard';

// Pre-render all existing daily wins archive pages at build time
export function generateStaticParams() {
  return getAllDailyWinsDates().map((date) => ({
    date,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const displayDate = formatWinDate(date);

  return {
    title: `Biggest Sports Betting Wins — ${displayDate} | Tax Breakdown`,
    description: `The biggest sports betting wins on ${displayDate} with federal and state tax breakdowns. See what the IRS takes from every win.`,
  };
}

export default async function DailyWinsArchivePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const data = getDailyWins(date);
  if (!data) notFound();

  const allDates = getAllDailyWinsDates();
  const currentIndex = allDates.indexOf(date);
  const prevDate = currentIndex < allDates.length - 1 ? allDates[currentIndex + 1] : null;
  const nextDate = currentIndex > 0 ? allDates[currentIndex - 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/daily-wins" className="hover:text-primary">Daily Wins</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{formatWinDate(date)}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Biggest Sports Betting Wins — {formatWinDate(date)}
        </h1>
        <p className="text-sm text-gray-500">
          {data.wins.length} notable wins |{' '}
          Total payouts: ${data.totalPayouts.toLocaleString()} |{' '}
          Total taxes: ${data.totalTaxes.toLocaleString()}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">
            ${data.totalPayouts.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">Total Payouts</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-700">
            ${data.totalTaxes.toLocaleString()}
          </div>
          <div className="text-xs text-red-600 mt-1">Total Taxes</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">
            {data.totalPayouts > 0
              ? ((data.totalTaxes / data.totalPayouts) * 100).toFixed(1)
              : '0.0'}%
          </div>
          <div className="text-xs text-blue-600 mt-1">Avg Tax Rate</div>
        </div>
      </div>

      {/* Win Cards */}
      <div className="space-y-6">
        {data.wins.map((win, index) => (
          <DailyWinCard key={win.id} win={win} rank={index + 1} />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
        {prevDate ? (
          <Link
            href={`/daily-wins/${prevDate}`}
            className="text-sm text-primary hover:underline"
          >
            &larr; {formatWinDate(prevDate)}
          </Link>
        ) : (
          <div />
        )}
        <Link
          href="/daily-wins"
          className="text-sm text-gray-500 hover:text-primary"
        >
          All Daily Wins
        </Link>
        {nextDate ? (
          <Link
            href={`/daily-wins/${nextDate}`}
            className="text-sm text-primary hover:underline"
          >
            {formatWinDate(nextDate)} &rarr;
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
        >
          Calculate Your Tax
        </Link>
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bettaxcalc.com' },
              { '@type': 'ListItem', position: 2, name: 'Daily Wins', item: 'https://bettaxcalc.com/daily-wins' },
              { '@type': 'ListItem', position: 3, name: formatWinDate(date), item: `https://bettaxcalc.com/daily-wins/${date}` },
            ],
          }),
        }}
      />
    </div>
  );
}
