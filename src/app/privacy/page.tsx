import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BetTaxCalc',
  description: 'BetTaxCalc privacy policy. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 29, 2026</p>

      <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
        <p>BetTaxCalc is designed to work without collecting personal information. Our tax calculators run entirely in your browser. We do not store, transmit, or save the financial information you enter into our calculators. No account or login is required.</p>
        <p>We may collect anonymous usage data through privacy-respecting analytics tools (such as Plausible Analytics or Vercel Analytics) to understand how our site is used. This data does not include any personally identifiable information.</p>

        <h2 className="text-xl font-bold text-gray-900">2. Cookies</h2>
        <p>BetTaxCalc does not use first-party tracking cookies. Third-party services (such as ad networks, if present) may set their own cookies. You can control cookie behavior through your browser settings.</p>

        <h2 className="text-xl font-bold text-gray-900">3. Third-Party Services</h2>
        <p>Our site may contain links to third-party websites, including sportsbook operators and affiliate partners. These third-party sites have their own privacy policies. We are not responsible for the privacy practices of external sites.</p>

        <h2 className="text-xl font-bold text-gray-900">4. Children&apos;s Privacy</h2>
        <p>BetTaxCalc is not intended for use by individuals under the age of 18. We do not knowingly collect information from children under 18.</p>

        <h2 className="text-xl font-bold text-gray-900">5. Data Security</h2>
        <p>Since our calculators run client-side in your browser, your financial data is never transmitted to our servers. We use HTTPS encryption for all pages.</p>

        <h2 className="text-xl font-bold text-gray-900">6. Your Rights</h2>
        <p>If you are a California resident, you have rights under the CCPA. If you are located in the European Economic Area, you have rights under the GDPR. Since we do not collect personal data, these rights are generally not applicable, but you may contact us with any questions.</p>

        <h2 className="text-xl font-bold text-gray-900">7. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>

        <h2 className="text-xl font-bold text-gray-900">8. Contact</h2>
        <p>For privacy questions, contact us at contact@bettaxcalc.com.</p>
      </div>
    </div>
  );
}
