import type { Metadata } from 'next';
import PhantomIncomeCalc from '@/components/calculators/PhantomIncomeCalc';

export const metadata: Metadata = {
  title: 'Phantom Income Calculator 2026 | OBBBA 90% Loss Deduction Cap',
  description:
    'Calculate your phantom income under the 2026 OBBBA 90% gambling loss deduction cap. See how much taxable income the new law creates even if you break even.',
};

export default function PhantomIncomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
          New for 2026
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Phantom Income Calculator
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          The 2026 OBBBA limits gambling loss deductions to 90%, creating
          taxable &quot;phantom income&quot; you never actually earned. See how much
          the new law affects you.
        </p>
      </div>

      <PhantomIncomeCalc />

      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Is Phantom Income from Gambling?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Phantom income is taxable income created by the 2026 OBBBA (One Big
          Beautiful Bill Act) 90% gambling loss deduction cap. Under prior law,
          if you won $50,000 and lost $50,000, you owed zero tax. Under the new
          law, you can only deduct $45,000 (90% of losses), leaving $5,000 in
          taxable &quot;phantom income&quot; — income you never actually earned but must
          pay taxes on.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Who Is Affected by the OBBBA 90% Cap?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Every gambler who itemizes deductions is affected — recreational
          bettors, professional gamblers, and even break-even players. The law
          applies to all forms of gambling: sports betting, casino games, poker,
          lottery, and horse racing. Professional gamblers are also affected
          because the OBBBA reclassifies their business expenses as Section
          165(d) losses subject to the same 90% cap.
        </p>
      </div>
    </div>
  );
}
