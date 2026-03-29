import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Responsible Gambling Resources | BetTaxCalc',
  description: 'Responsible gambling resources and helpline information. If you or someone you know has a gambling problem, help is available 24/7.',
};

export default function ResponsibleGamblingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Responsible Gambling</h1>

      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-red-800 mb-3">Need Help Now?</h2>
        <p className="text-red-700 mb-4">
          If you or someone you know has a gambling problem, help is available 24/7:
        </p>
        <ul className="space-y-3 text-red-700">
          <li className="flex items-center gap-3">
            <span className="font-bold">Call:</span>
            <a href="tel:1-800-522-4700" className="text-red-800 font-semibold text-lg hover:underline">
              1-800-522-4700
            </a>
            <span className="text-sm">(National Problem Gambling Helpline)</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="font-bold">Text:</span>
            <span className="text-red-800 font-semibold">800-522-4700</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="font-bold">Chat:</span>
            <a href="https://www.ncpgambling.org/help-treatment/chat/" target="_blank" rel="noopener noreferrer" className="text-red-800 font-semibold hover:underline">
              ncpgambling.org/chat
            </a>
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        BetTaxCalc is a tax information tool. While we provide calculators
        related to sports betting taxes, we do not encourage or promote
        gambling. We believe in responsible gambling practices and want every
        user to be informed about both the financial and tax implications of
        gambling.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Warning Signs of Problem Gambling</h2>
      <ul className="space-y-3 text-gray-600 mb-6">
        <li className="flex items-start gap-2"><span className="text-amber-500">&#9888;</span> Betting more money than you can afford to lose</li>
        <li className="flex items-start gap-2"><span className="text-amber-500">&#9888;</span> Chasing losses by placing bigger or riskier bets</li>
        <li className="flex items-start gap-2"><span className="text-amber-500">&#9888;</span> Borrowing money or selling possessions to gamble</li>
        <li className="flex items-start gap-2"><span className="text-amber-500">&#9888;</span> Lying to family or friends about gambling activity</li>
        <li className="flex items-start gap-2"><span className="text-amber-500">&#9888;</span> Feeling anxious, irritable, or depressed about gambling</li>
        <li className="flex items-start gap-2"><span className="text-amber-500">&#9888;</span> Neglecting work, school, or relationships due to gambling</li>
        <li className="flex items-start gap-2"><span className="text-amber-500">&#9888;</span> Unable to stop or reduce gambling despite wanting to</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Resources</h2>
      <div className="space-y-4">
        <a href="https://www.ncpgambling.org/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-primary">National Council on Problem Gambling (NCPG)</h3>
          <p className="text-sm text-gray-600 mt-1">The leading national advocate for programs and services to assist problem gamblers and their families.</p>
        </a>
        <a href="https://www.gamblers-anonymous.org/" target="_blank" rel="noopener noreferrer" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-primary">Gamblers Anonymous</h3>
          <p className="text-sm text-gray-600 mt-1">A fellowship of men and women who share their experience to help others recover from gambling problems.</p>
        </a>
        <a href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener noreferrer" className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-primary">SAMHSA National Helpline</h3>
          <p className="text-sm text-gray-600 mt-1">Free, confidential, 24/7, 365-day treatment referral and information service: 1-800-662-4357.</p>
        </a>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Must be 21+ to gamble legally in most US states. Please gamble responsibly.
        BetTaxCalc is not affiliated with any sportsbook or gambling operator.
      </p>
    </div>
  );
}
