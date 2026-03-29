import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuide, getAllGuideSlugs } from '@/lib/guides';

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: 'Guide Not Found' };

  return {
    title: guide.title,
    description: guide.metaDescription,
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: 'article',
      publishedTime: guide.publishedDate,
      modifiedTime: guide.updatedDate,
      authors: [guide.author],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-primary">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{guide.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {guide.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span>By {guide.author}</span>
          <span>|</span>
          <span>Reviewed by {guide.reviewedBy}</span>
          <span>|</span>
          <span>Updated {new Date(guide.updatedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>|</span>
          <span>{guide.readTime} read</span>
        </div>
      </header>

      {/* Intro */}
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        {guide.intro}
      </p>

      {/* Table of Contents */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-10">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
          In This Guide
        </h2>
        <ul className="space-y-2">
          {guide.sections.map((section, i) => (
            <li key={i}>
              <a
                href={`#section-${i}`}
                className="text-sm text-primary hover:underline"
              >
                {section.heading}
              </a>
            </li>
          ))}
          {guide.faq.length > 0 && (
            <li>
              <a href="#faq" className="text-sm text-primary hover:underline">
                Frequently Asked Questions
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Sections */}
      {guide.sections.map((section, i) => (
        <section key={i} id={`section-${i}`} className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {section.heading}
          </h2>
          {/* 40-60 word answer block — AI citation target */}
          <p className="text-gray-700 leading-relaxed mb-4 font-medium">
            {section.answerBlock}
          </p>
          {/* Full body content */}
          {section.body.split('\n\n').map((paragraph, j) => (
            <p key={j} className="text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {/* Related Tools CTA */}
      {guide.relatedTools.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
          <h3 className="font-semibold text-gray-900 mb-3">
            Related Calculators
          </h3>
          <div className="flex flex-wrap gap-3">
            {guide.relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center px-4 py-2 bg-white border border-primary/30 rounded-lg text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {guide.faq.length > 0 && (
        <section id="faq" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {guide.faq.map((item, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Guides */}
      {guide.relatedGuides.length > 0 && (
        <section className="mb-10 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Related Guides
          </h2>
          <div className="space-y-2">
            {guide.relatedGuides.map((related) => (
              <Link
                key={related.slug}
                href={`/guides/${related.slug}`}
                className="block text-primary hover:underline"
              >
                {related.title} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mt-10">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong>Disclaimer:</strong> This guide is for informational and
          educational purposes only. It is not tax, legal, or financial advice.
          Tax laws are complex and subject to change. Always consult a qualified
          tax professional for advice specific to your situation. Sources are
          cited where available and were accurate as of the date published.
        </p>
      </div>

      {/* FAQPage Schema */}
      {guide.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: guide.faq.map((item) => ({
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
      )}

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: guide.title,
            description: guide.metaDescription,
            author: { '@type': 'Person', name: guide.author },
            datePublished: guide.publishedDate,
            dateModified: guide.updatedDate,
            publisher: {
              '@type': 'Organization',
              name: 'BetTaxCalc',
            },
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
              { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://bettaxcalc.com/guides' },
              { '@type': 'ListItem', position: 3, name: guide.title, item: `https://bettaxcalc.com/guides/${slug}` },
            ],
          }),
        }}
      />
    </article>
  );
}
