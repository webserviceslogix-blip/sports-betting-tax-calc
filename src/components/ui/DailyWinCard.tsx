import Link from 'next/link';
import type { DailyWin } from '@/lib/daily-wins';
import SportIcon from './SportIcon';

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

interface DailyWinCardProps {
  win: DailyWin;
  rank: number;
}

export default function DailyWinCard({ win, rank }: DailyWinCardProps) {
  const netProfit = win.payout - win.wager;
  const rankLabels = ['', '\u{1F947}', '\u{1F948}', '\u{1F949}'];
  const rankEmoji = rankLabels[rank] || `#${rank}`;

  const stateNames: Record<string, string> = {
    NY: 'New York', NJ: 'New Jersey', PA: 'Pennsylvania', CA: 'California',
    NV: 'Nevada', IL: 'Illinois', OH: 'Ohio', MI: 'Michigan', FL: 'Florida',
    TX: 'Texas', CO: 'Colorado', AZ: 'Arizona', MA: 'Massachusetts',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{rankEmoji}</span>
          <div className="flex items-center gap-2">
            <SportIcon sport={win.sport} size={18} />
            <span className="text-white font-semibold text-sm">
              {win.sport}
            </span>
            <span className="text-gray-400 text-xs ml-2">
              {win.betType === 'parlay' && win.legs ? `${win.legs}-Leg Parlay` :
               win.betType === 'sgp' && win.legs ? `${win.legs}-Leg SGP` :
               win.betType === 'futures' ? 'Futures' :
               win.betType === 'prop' ? 'Prop Bet' : 'Straight Bet'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-green-400 font-bold text-lg">
            {formatMoney(win.payout)}
          </div>
          <div className="text-gray-400 text-xs">
            from {formatMoney(win.wager)} wager
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-sm text-gray-700">{win.description}</p>
        {win.sourceUrl && (
          <a
            href={win.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-primary mt-1 inline-block"
          >
            Source: {win.source === 'reddit' ? 'Reddit' : win.source === 'twitter' ? 'X/Twitter' : win.source === 'foxsports' ? 'FOX Sports' : win.source}
          </a>
        )}
      </div>

      {/* Tax Breakdown */}
      <div className="px-5 py-4 bg-gray-50">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Tax Breakdown {win.stateCode ? `(${stateNames[win.stateCode] || win.stateCode})` : ''}
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="text-gray-600">Net Profit</div>
          <div className="text-right font-mono">{formatMoney(netProfit)}</div>

          <div className="text-gray-600">Federal Tax (24%)</div>
          <div className="text-right font-mono text-red-600">-{formatMoney(win.federalTax)}</div>

          <div className="text-gray-600">
            State Tax{win.stateCode && win.stateTax === 0 ? ' (no tax)' : ''}
          </div>
          <div className="text-right font-mono text-red-600">
            {win.stateTax > 0 ? `-${formatMoney(win.stateTax)}` : '$0'}
          </div>

          <div className="col-span-2 border-t border-gray-200 my-1" />

          <div className="text-gray-900 font-semibold">Take-Home</div>
          <div className="text-right font-mono font-semibold text-green-700">
            {formatMoney(win.netTakeHome)}
          </div>
        </div>
      </div>

      {/* Phantom Income Note */}
      {win.phantomIncomeNote && (
        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-700">
            <span className="font-semibold">OBBBA Note:</span> {win.phantomIncomeNote}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <Link
          href={`/calculator?winnings=${netProfit}${win.stateCode ? `&state=${win.stateCode}` : ''}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Calculate YOUR tax on a {formatMoney(netProfit)} win &rarr;
        </Link>
        {win.stateCode && (
          <Link
            href={`/states/${stateNames[win.stateCode]?.toLowerCase().replace(/\s+/g, '-') || win.stateCode.toLowerCase()}`}
            className="text-xs text-gray-400 hover:text-primary"
          >
            {stateNames[win.stateCode] || win.stateCode} tax info
          </Link>
        )}
      </div>
    </div>
  );
}
