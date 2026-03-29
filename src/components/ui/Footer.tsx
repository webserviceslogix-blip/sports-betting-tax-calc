import Link from 'next/link';

const footerLinks = {
  tools: [
    { name: 'Tax Calculator', href: '/calculator' },
    { name: 'Parlay Tax Calculator', href: '/tools/parlay-tax' },
    { name: 'Phantom Income Calculator', href: '/tools/phantom-income' },
    { name: 'W-2G Checker', href: '/tools/w2g-checker' },
    { name: 'State Comparison', href: '/tools/state-comparison' },
  ],
  guides: [
    { name: 'Sports Betting Taxes 101', href: '/guides/sports-betting-taxes-101' },
    { name: 'OBBBA Loss Deduction 2026', href: '/guides/obbba-gambling-loss-deduction' },
    { name: 'Phantom Income Explained', href: '/guides/phantom-income-explained' },
    { name: 'W-2G Changes 2026', href: '/guides/w2g-threshold-changes-2026' },
  ],
  popularStates: [
    { name: 'New York', href: '/states/new-york' },
    { name: 'New Jersey', href: '/states/new-jersey' },
    { name: 'Pennsylvania', href: '/states/pennsylvania' },
    { name: 'Illinois', href: '/states/illinois' },
    { name: 'Michigan', href: '/states/michigan' },
    { name: 'Ohio', href: '/states/ohio' },
    { name: 'Florida', href: '/states/florida' },
    { name: 'Colorado', href: '/states/colorado' },
  ],
  legal: [
    { name: 'About', href: '/about' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
    { name: 'Responsible Gambling', href: '/responsible-gambling' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tax Guides
            </h3>
            <ul className="space-y-2">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular States */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Popular States
            </h3>
            <ul className="space-y-2">
              {footerLinks.popularStates.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Tax Disclaimer:</strong> This calculator provides estimates only and is for informational and educational purposes. It is not tax, legal, or financial advice. Tax laws are complex and subject to change. Always consult a qualified tax professional (CPA, EA, or tax attorney) for advice specific to your situation. No professional-client relationship is created by using this tool.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Responsible Gambling:</strong> If you or someone you know has a gambling problem, call the National Problem Gambling Helpline at <a href="tel:1-800-522-4700" className="text-primary-light hover:underline">1-800-522-4700</a> (available 24/7). You can also text 800-522-4700 or chat at <a href="https://www.ncpgambling.org/help-treatment/chat/" target="_blank" rel="noopener noreferrer" className="text-primary-light hover:underline">ncpgambling.org</a>. Must be 21+ to gamble. Please gamble responsibly.
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center">
            &copy; {new Date().getFullYear()} BetTaxCalc. All rights reserved. Not affiliated with any state lottery commission, sportsbook, or the IRS.
          </p>
        </div>
      </div>
    </footer>
  );
}
