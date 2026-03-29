import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'BetTaxCalc terms of service. Important legal information about using our sports betting tax calculators.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 29, 2026</p>

      <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
        <p>By accessing or using BetTaxCalc (&quot;the Site&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Site.</p>

        <h2 className="text-xl font-bold text-gray-900">2. Not Tax Advice</h2>
        <p className="font-semibold text-gray-800">THE INFORMATION AND TOOLS PROVIDED ON THIS SITE ARE FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY. THEY DO NOT CONSTITUTE TAX, LEGAL, OR FINANCIAL ADVICE.</p>
        <p>BetTaxCalc is not a CPA firm, tax advisory service, enrolled agent practice, or law office. The calculators on this Site produce estimates based on publicly available tax rates, brackets, and rules. These estimates may not reflect your actual tax liability due to individual circumstances, deductions, credits, or other factors.</p>
        <p>No professional-client relationship is created by your use of this Site. You should always consult a qualified tax professional (CPA, enrolled agent, or tax attorney) for advice specific to your situation before making tax-related decisions.</p>

        <h2 className="text-xl font-bold text-gray-900">3. Accuracy and Limitation of Liability</h2>
        <p>We strive to maintain accurate and up-to-date information, but we make no warranties or guarantees regarding the accuracy, completeness, or timeliness of any information or calculations on this Site. Tax laws change frequently, and there may be delays between when a law changes and when our calculators are updated.</p>
        <p className="font-semibold text-gray-800">TO THE MAXIMUM EXTENT PERMITTED BY LAW, BETTAXCALC AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR SPECIAL DAMAGES ARISING FROM YOUR USE OF OR RELIANCE ON THE INFORMATION OR TOOLS PROVIDED ON THIS SITE, INCLUDING BUT NOT LIMITED TO INCORRECT TAX CALCULATIONS, PENALTIES, INTEREST, OR ADDITIONAL TAXES OWED.</p>

        <h2 className="text-xl font-bold text-gray-900">4. Gambling Disclaimer</h2>
        <p>BetTaxCalc does not encourage, endorse, or facilitate gambling. This Site provides tax-related information about gambling winnings and losses. You must be 21 years or older to gamble legally in most US states. Gambling may not be legal in your jurisdiction. You are responsible for complying with all applicable laws.</p>

        <h2 className="text-xl font-bold text-gray-900">5. Affiliate Links</h2>
        <p>This Site may contain affiliate links to third-party sportsbooks, casinos, and other services. We may receive compensation if you click on these links and take certain actions (such as signing up or making a deposit). See our <a href="/affiliate-disclosure" className="text-primary hover:underline">Affiliate Disclosure</a> for more details.</p>

        <h2 className="text-xl font-bold text-gray-900">6. Intellectual Property</h2>
        <p>All content on this Site, including text, graphics, calculators, code, and design, is owned by BetTaxCalc and protected by copyright and other intellectual property laws. You may not reproduce, distribute, or modify our content without permission.</p>

        <h2 className="text-xl font-bold text-gray-900">7. User Conduct</h2>
        <p>You agree not to: use the Site for any unlawful purpose; attempt to interfere with or disrupt the Site; attempt to gain unauthorized access to any systems; scrape, crawl, or use automated means to access the Site except through publicly available APIs.</p>

        <h2 className="text-xl font-bold text-gray-900">8. Changes to Terms</h2>
        <p>We may modify these Terms at any time. Changes are effective when posted. Continued use of the Site constitutes acceptance of the modified Terms.</p>

        <h2 className="text-xl font-bold text-gray-900">9. Governing Law</h2>
        <p>These Terms are governed by and construed in accordance with the laws of the United States. Any disputes arising from or relating to the use of this Site shall be resolved in accordance with applicable federal and state law.</p>

        <h2 className="text-xl font-bold text-gray-900">10. Contact</h2>
        <p>For questions about these Terms, contact us at contact@bettaxcalc.com.</p>
      </div>
    </div>
  );
}
