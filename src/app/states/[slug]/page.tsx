import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllStates, getState, type StateData } from '@/lib/tax-calculator';
import { getStateContent } from '@/data/state-content';
import TaxCalculator from '@/components/calculators/TaxCalculator';

// Pre-render all 51 state pages at build time
export function generateStaticParams() {
  return getAllStates().map((state) => ({
    slug: state.slug,
  }));
}

// Dynamic metadata per state
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = getState(slug);
  if (!state) return { title: 'State Not Found' };

  const rateDisplay = state.noIncomeTax
    ? 'No State Income Tax'
    : state.flatRate
    ? `${(state.flatRate * 100).toFixed(2)}% Flat Tax Rate`
    : 'Graduated Tax Rates';

  const legalNote = state.sportsBettingLegal
    ? 'Legal'
    : 'Not Yet Legal';

  return {
    title: `${state.name} Sports Betting Tax Calculator 2026 | ${rateDisplay}`,
    description: `Calculate your ${state.name} sports betting taxes for 2026. ${rateDisplay} on gambling winnings. Sports betting is ${legalNote.toLowerCase()} in ${state.name}. Free calculator with OBBBA 90% loss cap.`,
    openGraph: {
      title: `${state.name} Sports Betting Tax Calculator 2026`,
      description: `Free ${state.name} gambling tax calculator. ${rateDisplay} + federal tax. Updated for 2026 OBBBA rules.`,
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  const content = getStateContent(slug, state);

  const rateDisplay = state.noIncomeTax
    ? '0%'
    : state.flatRate
    ? `${(state.flatRate * 100).toFixed(2)}%`
    : 'Graduated';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/states" className="hover:text-primary">States</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{state.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {content.headline}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
          {content.intro}
        </p>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{rateDisplay}</div>
          <div className="text-xs text-gray-500 mt-1">State Tax Rate</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className={`text-2xl font-bold ${state.sportsBettingLegal ? 'text-green-600' : 'text-red-500'}`}>
            {state.sportsBettingLegal ? 'Legal' : 'No'}
          </div>
          <div className="text-xs text-gray-500 mt-1">Sports Betting</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className={`text-2xl font-bold ${state.lossDeductionAllowed ? 'text-green-600' : 'text-red-500'}`}>
            {state.noIncomeTax ? 'N/A' : state.lossDeductionAllowed ? 'Yes' : 'No'}
          </div>
          <div className="text-xs text-gray-500 mt-1">Loss Deduction</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{state.sportsbooks.length || '0'}</div>
          <div className="text-xs text-gray-500 mt-1">Sportsbooks</div>
        </div>
      </div>

      {/* Calculator (pre-loaded with this state) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Calculate Your {state.name} Sports Betting Tax
        </h2>
        <TaxCalculator defaultState={state.code} />
      </section>

      {/* Key Facts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {state.name} Gambling Tax Key Facts
        </h2>
        <ul className="space-y-2">
          {content.keyFacts.map((fact, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-primary mt-1 shrink-0">&#10003;</span>
              <span className="text-gray-700">{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tax Explanation (unique editorial content) */}
      <section className="mb-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Sports Betting Taxes Work in {state.name}
        </h2>
        {content.taxExplanation.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-gray-600 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Loss Deduction Note */}
      {!state.noIncomeTax && (
        <section className="mb-12 max-w-3xl">
          <div className={`rounded-xl p-5 ${state.lossDeductionAllowed ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'}`}>
            <h3 className={`font-semibold text-lg mb-2 ${state.lossDeductionAllowed ? 'text-blue-800' : 'text-red-800'}`}>
              {state.lossDeductionAllowed
                ? `${state.name} Allows Gambling Loss Deductions`
                : `${state.name} Does NOT Allow Gambling Loss Deductions`}
            </h3>
            <p className={`text-sm leading-relaxed ${state.lossDeductionAllowed ? 'text-blue-700' : 'text-red-700'}`}>
              {content.lossDeductionNote}
            </p>
          </div>
        </section>
      )}

      {/* Worked Example */}
      <section className="mb-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {state.name} Tax Example
        </h2>
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-4 italic">{content.workedExample.scenario}</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Salary Income</span>
              <span className="font-mono">${content.workedExample.income.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gambling Winnings</span>
              <span className="font-mono">${content.workedExample.winnings.toLocaleString()}</span>
            </div>
            {content.workedExample.losses > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Gambling Losses</span>
                <span className="font-mono">-${content.workedExample.losses.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2 mt-2" />
            <div className="flex justify-between">
              <span className="text-gray-600">Federal Tax on Winnings</span>
              <span className="font-mono text-red-600">{content.workedExample.federalTax}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{state.name} State Tax</span>
              <span className="font-mono text-red-600">{content.workedExample.stateTax}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2" />
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900">Total Tax</span>
              <span className="font-mono text-red-600">{content.workedExample.totalTax}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-green-700">Net Take-Home</span>
              <span className="font-mono text-green-700">{content.workedExample.takeHome}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Available Sportsbooks */}
      {state.sportsbooks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Licensed Sportsbooks in {state.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {state.sportsbooks.map((book) => (
              <div
                key={book}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center font-medium text-gray-700"
              >
                {book}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            You must be physically located within {state.name} to place bets on these platforms.
          </p>
        </section>
      )}

      {/* Neighbor Comparison */}
      {content.neighborComparison.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How {state.name} Compares to Neighboring States
          </h2>
          <div className="space-y-3">
            {content.neighborComparison.map((comp) => (
              <div key={comp.slug} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                <Link href={`/states/${comp.slug}`} className="font-medium text-primary hover:underline shrink-0">
                  {comp.state}
                </Link>
                <span className="text-sm text-gray-600">{comp.note}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Changes */}
      {content.recentChanges && (
        <section className="mb-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recent {state.name} Gambling Tax Changes
          </h2>
          <p className="text-gray-600 leading-relaxed">{content.recentChanges}</p>
        </section>
      )}

      {/* State-Specific FAQ */}
      <section className="mb-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {state.name} Sports Betting Tax FAQ
        </h2>
        <div className="space-y-6">
          {content.faq.map((item, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tax Authority Link */}
      <section className="mb-12 max-w-3xl">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-2">{state.name} Tax Authority</h3>
          <p className="text-sm text-gray-600 mb-2">
            For official tax guidance specific to {state.name}, contact the state tax authority:
          </p>
          <a
            href={state.taxAuthorityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm font-medium"
          >
            {state.taxAuthorityUrl} &#8599;
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Calculate Your {state.name} Sports Betting Taxes
        </h2>
        <p className="text-gray-600 mb-6">
          Use our free calculator above to see exactly what you owe in {state.name}.
        </p>
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
        >
          Full Tax Calculator
        </Link>
      </section>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bettaxcalc.com' },
              { '@type': 'ListItem', position: 2, name: 'States', item: 'https://bettaxcalc.com/states' },
              { '@type': 'ListItem', position: 3, name: state.name, item: `https://bettaxcalc.com/states/${slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
