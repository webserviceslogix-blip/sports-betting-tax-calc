import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | BetTaxCalc',
  description: 'BetTaxCalc affiliate disclosure. Learn how we earn revenue through affiliate partnerships and how this affects our content.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Affiliate Disclosure</h1>

      <div className="prose prose-gray max-w-none text-gray-600">
        <p className="text-lg leading-relaxed mb-6">
          BetTaxCalc is committed to transparency about how we earn revenue and
          how it may affect the content you see on this site.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How We Earn Revenue</h2>
        <p className="leading-relaxed mb-4">
          BetTaxCalc may earn revenue through the following methods:
        </p>
        <ul className="space-y-2 mb-6">
          <li><strong>Affiliate partnerships:</strong> We may receive compensation when you click on links to sportsbooks, casinos, or other gambling operators and sign up or make a deposit. These are clearly identified with disclosure labels.</li>
          <li><strong>Display advertising:</strong> We may display advertisements on our pages through ad networks.</li>
          <li><strong>Sponsored content:</strong> Any sponsored or paid content will be clearly labeled as such.</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How This Affects Our Content</h2>
        <p className="leading-relaxed mb-4">
          Our tax calculators, guides, and educational content are created
          independently of any affiliate relationships. Affiliate partnerships
          do not influence:
        </p>
        <ul className="space-y-2 mb-6">
          <li>The accuracy of our tax calculations</li>
          <li>Our editorial recommendations or tax guidance</li>
          <li>The tax rates, brackets, or rules displayed</li>
          <li>Which states or tools we cover</li>
        </ul>
        <p className="leading-relaxed mb-6">
          When we recommend or link to a sportsbook, it is because we believe
          it offers value to our users. We may receive compensation for these
          referrals, but this does not affect the tax calculations or
          educational content on our site.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">FTC Compliance</h2>
        <p className="leading-relaxed mb-4">
          In accordance with the Federal Trade Commission&apos;s guidelines on
          endorsements and testimonials (16 CFR Part 255), we disclose all
          material connections between BetTaxCalc and any entity whose products
          or services we recommend, review, or link to.
        </p>
        <p className="leading-relaxed mb-4">
          Affiliate links on this site are identified with disclosure language
          such as &quot;affiliate link,&quot; &quot;ad,&quot; or &quot;sponsored.&quot; If you have any
          questions about our affiliate relationships, please contact us at
          contact@bettaxcalc.com.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Responsible Gambling Notice</h2>
        <p className="leading-relaxed mb-4">
          BetTaxCalc is a tax information tool. We do not encourage gambling.
          If you choose to gamble, please do so responsibly. If you or someone
          you know has a gambling problem, call the National Problem Gambling
          Helpline at 1-800-522-4700 (available 24/7).
        </p>
        <p className="leading-relaxed">
          Must be 21+ to gamble in most US states. Gambling is not legal in all
          jurisdictions. Please check your local laws before placing any bets.
        </p>
      </div>
    </div>
  );
}
