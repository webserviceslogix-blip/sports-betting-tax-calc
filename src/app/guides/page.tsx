import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Sports Betting Tax Guides 2026 | OBBBA, W-2G, State Taxes',
  description:
    'Comprehensive guides to sports betting taxes in 2026. Learn about the OBBBA 90% loss deduction cap, phantom income, W-2G changes, and state-by-state rules.',
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Sports Betting Tax Guides
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          In-depth guides covering every aspect of sports betting taxes in
          2026, including the new OBBBA rules, W-2G thresholds, phantom
          income, and state-by-state breakdowns.
        </p>
      </div>

      {guides.length > 0 ? (
        <div className="space-y-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary">
                {guide.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {guide.metaDescription}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{guide.readTime} read</span>
                <span>|</span>
                <span>
                  Updated{' '}
                  {new Date(guide.updatedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span>|</span>
                <span>By {guide.author}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Guides coming soon.</p>
      )}

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Need a quick answer? Use our free calculator.
        </p>
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
        >
          Sports Betting Tax Calculator
        </Link>
      </div>
    </div>
  );
}
