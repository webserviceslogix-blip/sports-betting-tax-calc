import Link from "next/link";
import type { Metadata } from "next";
import EmailCapture from "@/components/ui/EmailCapture";

export const metadata: Metadata = {
  title: "Sports Betting Tax Calculator 2026 | Free Federal & State Tax Estimator",
  description:
    "Calculate your sports betting taxes for free. Updated for 2026 OBBBA rules with the 90% loss deduction cap. Covers all 50 states, phantom income, and W-2G thresholds.",
};

const features = [
  {
    title: "2026 OBBBA Rules",
    description:
      'Updated for the One Big Beautiful Bill Act. Calculate "phantom income" from the new 90% loss deduction cap.',
    icon: "!",
    href: "/tools/phantom-income",
  },
  {
    title: "All 50 States + DC",
    description:
      "State-specific tax rates, brackets, and special rules. Know exactly what you owe in your state.",
    icon: "#",
    href: "/states",
  },
  {
    title: "Parlay Tax Calculator",
    description:
      "See your after-tax parlay payout instantly. The only calculator that shows what the IRS takes from your parlay.",
    icon: "$",
    href: "/tools/parlay-tax",
  },
  {
    title: "W-2G Checker",
    description:
      "Will your win trigger a W-2G? Check the new $2,000 threshold and 300:1 rule for 2026.",
    icon: "?",
    href: "/tools/w2g-checker",
  },
  {
    title: "Daily Big Wins",
    description:
      "See today's biggest sports betting wins with automatic tax breakdowns. Updated daily.",
    icon: "W",
    href: "/daily-wins",
  },
  {
    title: "2025 vs 2026 Comparison",
    description:
      "Toggle between pre-OBBBA and post-OBBBA rules to see exactly how much more you owe in 2026.",
    icon: "<>",
    href: "/calculator",
  },
];

const popularStates = [
  { name: "New York", slug: "new-york", rate: "4-10.9%" },
  { name: "New Jersey", slug: "new-jersey", rate: "1.4-10.75%" },
  { name: "Pennsylvania", slug: "pennsylvania", rate: "3.07%" },
  { name: "Illinois", slug: "illinois", rate: "4.95%" },
  { name: "Michigan", slug: "michigan", rate: "4.25%" },
  { name: "Ohio", slug: "ohio", rate: "0-3.5%" },
  { name: "Colorado", slug: "colorado", rate: "4.4%" },
  { name: "Florida", slug: "florida", rate: "0% (no tax)" },
  { name: "Nevada", slug: "nevada", rate: "0% (no tax)" },
  { name: "Massachusetts", slug: "massachusetts", rate: "5%" },
  { name: "Virginia", slug: "virginia", rate: "2-5.75%" },
  { name: "Arizona", slug: "arizona", rate: "2.5%" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Updated for 2026 OBBBA Tax Rules
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Sports Betting
              <br />
              Tax Calculator
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
              Calculate your federal and state taxes on sports betting winnings.
              Updated for the 2026 OBBBA 90% loss deduction cap, new $2,000 W-2G
              threshold, and phantom income rules. Free. All 50 states.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Calculate Your Taxes
              </Link>
              <Link
                href="/tools/parlay-tax"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white/15 text-white rounded-xl hover:bg-white/25 transition-colors border border-white/30"
              >
                Parlay Tax Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OBBBA Alert Banner */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <span className="text-amber-600 text-xl mt-0.5">&#9888;</span>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                2026 Tax Law Change: OBBBA 90% Loss Deduction Cap Now in Effect
              </p>
              <p className="text-sm text-amber-700 mt-1">
                Starting January 1, 2026, you can only deduct 90% of gambling
                losses (down from 100%). Even break-even gamblers may owe
                taxes on &quot;phantom income.&quot;{" "}
                <Link
                  href="/guides/obbba-gambling-loss-deduction"
                  className="font-medium underline"
                >
                  Learn more
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Sports Betting Taxes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The most comprehensive sports betting tax calculator online.
              Updated for 2026 with features no other calculator has.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all group block"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-sm">
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular States */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Sports Betting Tax by State
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Click your state for a detailed tax breakdown and calculator
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularStates.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-primary/40 transition-all text-center group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-primary text-sm">
                  {state.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">{state.rate}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/states"
              className="text-primary font-medium hover:underline"
            >
              View all 50 states + DC &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Tax Guides Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            2026 Tax Guides
          </h2>
          <p className="text-gray-600 text-center mb-10">
            In-depth guides to navigate the new gambling tax rules
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link
              href="/guides/obbba-gambling-loss-deduction"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all group block"
            >
              <div className="text-xs font-medium text-amber-600 bg-amber-50 rounded-full px-3 py-1 inline-block mb-3">
                New for 2026
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                OBBBA Gambling Loss Deduction: The 90% Cap Explained
              </h3>
              <p className="text-sm text-gray-600">
                How the One Big Beautiful Bill Act creates &quot;phantom income&quot;
                for gamblers and what you can do about it.
              </p>
            </Link>
            <Link
              href="/guides/sports-betting-taxes-101"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all group block"
            >
              <div className="text-xs font-medium text-blue-600 bg-blue-50 rounded-full px-3 py-1 inline-block mb-3">
                Complete Guide
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                Sports Betting Taxes 101: Everything You Need to Know
              </h3>
              <p className="text-sm text-gray-600">
                Federal rates, state taxes, W-2G forms, loss deductions, and how
                to report DraftKings and FanDuel winnings.
              </p>
            </Link>
          </div>
          <div className="text-center mt-6">
            <Link
              href="/guides"
              className="text-primary font-medium hover:underline"
            >
              View all guides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How Much Will the IRS Take From Your Winnings?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Don&apos;t get surprised at tax time. Calculate your exact federal and
            state tax liability in seconds. Free, no signup required.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
          >
            Calculate My Taxes Now
          </Link>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmailCapture variant="banner" />
        </div>
      </section>

      {/* FAQ Schema / Quick Answers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How much tax do you pay on sports betting winnings in 2026?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sports betting winnings are taxed as ordinary income at your federal
                marginal rate (10-37%) plus your state&apos;s income tax rate (0-10.9%).
                The IRS withholds 24% on winnings over $5,000. Under the 2026 OBBBA
                rules, you can only deduct 90% of losses, creating taxable
                &quot;phantom income&quot; even if you break even.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is phantom income from gambling?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Phantom income is taxable income created by the 2026 OBBBA 90%
                loss deduction cap. If you win $100,000 and lose $100,000, you
                can only deduct $90,000 of losses — leaving $10,000 in
                &quot;phantom&quot; taxable income even though you broke even.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the W-2G threshold for sports betting in 2026?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                For 2026, a W-2G is required when sports betting winnings are at
                least $2,000 AND at least 300 times the wager amount (both
                conditions must be met). This increased from $600 under prior
                rules. Starting 2027, the threshold adjusts annually for
                inflation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do I have to report small sports betting wins?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes. All gambling winnings are taxable regardless of the amount.
                Even a $5 parlay that pays $50 is taxable income. While the
                sportsbook may not issue a W-2G for small amounts, you are
                legally required to report all winnings on your tax return as
                &quot;other income&quot; on Schedule 1.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I report DraftKings or FanDuel winnings on my taxes?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Report total gambling winnings on Schedule 1 (Form 1040), Line
                8b as &quot;other income.&quot; Both DraftKings and FanDuel provide
                year-end statements in your account settings. If you itemize
                deductions, you can deduct losses on Schedule A (up to 90% under
                2026 OBBBA rules).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is the OBBBA 90% loss deduction cap?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The One Big Beautiful Bill Act (signed July 4, 2025) caps
                gambling loss deductions at 90% starting January 1, 2026.
                Previously you could deduct 100% of losses up to your winnings.
                Now 10% of your losses are non-deductible, creating taxable
                &quot;phantom income&quot; even if you break even.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Which states have no tax on gambling winnings?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nine states have no state income tax on gambling winnings:
                Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee,
                Texas, Washington, and Wyoming. In these states, you only owe
                federal tax on your winnings. Use our{" "}
                <Link href="/tools/state-comparison" className="text-primary hover:underline">
                  state comparison tool
                </Link>{" "}
                to see the difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much tax do you pay on sports betting winnings in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: 'Sports betting winnings are taxed as ordinary income at your federal marginal rate (10-37%) plus your state income tax rate (0-10.9%). The IRS withholds 24% on winnings over $5,000. Under the 2026 OBBBA rules, you can only deduct 90% of losses, creating taxable "phantom income" even if you break even.',
                },
              },
              {
                "@type": "Question",
                name: "What is phantom income from gambling?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Phantom income is taxable income created by the 2026 OBBBA 90% loss deduction cap. If you win $100,000 and lose $100,000, you can only deduct $90,000 of losses, leaving $10,000 in taxable income even though you broke even.",
                },
              },
              {
                "@type": "Question",
                name: "What is the W-2G threshold for sports betting in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "For 2026, a W-2G is required when sports betting winnings are at least $2,000 AND at least 300 times the wager amount. This increased from $600 under prior rules.",
                },
              },
              {
                "@type": "Question",
                name: "Do I have to report small sports betting wins?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. All gambling winnings are taxable regardless of the amount. Even a $5 parlay that pays $50 is taxable income. You are legally required to report all winnings on your tax return as other income on Schedule 1.",
                },
              },
              {
                "@type": "Question",
                name: "How do I report DraftKings or FanDuel winnings on my taxes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Report total gambling winnings on Schedule 1 (Form 1040), Line 8b as other income. Both DraftKings and FanDuel provide year-end statements. If you itemize, you can deduct losses on Schedule A (up to 90% under 2026 OBBBA rules).",
                },
              },
              {
                "@type": "Question",
                name: "What is the OBBBA 90% loss deduction cap?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The One Big Beautiful Bill Act (signed July 4, 2025) caps gambling loss deductions at 90% starting January 1, 2026. Previously you could deduct 100% of losses. Now 10% is non-deductible, creating phantom income even if you break even.",
                },
              },
              {
                "@type": "Question",
                name: "Which states have no tax on gambling winnings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nine states have no state income tax on gambling winnings: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. In these states, you only owe federal tax.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
