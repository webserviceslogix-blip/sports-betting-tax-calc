const brackets = [
  { rate: '10%', range: '$0 – $12,400', width: '8%', color: '#10b981' },
  { rate: '12%', range: '$12,400 – $50,400', width: '15%', color: '#34d399' },
  { rate: '22%', range: '$50,400 – $105,700', width: '22%', color: '#fbbf24' },
  { rate: '24%', range: '$105,700 – $201,775', width: '25%', color: '#f59e0b' },
  { rate: '32%', range: '$201,775 – $256,225', width: '10%', color: '#f97316' },
  { rate: '35%', range: '$256,225 – $640,600', width: '14%', color: '#ef4444' },
  { rate: '37%', range: 'Over $640,600', width: '6%', color: '#dc2626' },
];

export default function TaxBracketChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 my-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">2026 Federal Tax Brackets</h3>
      <p className="text-xs text-gray-500 mb-4">Single filer — gambling winnings taxed at your marginal rate</p>

      {/* Visual bar chart */}
      <div className="flex rounded-lg overflow-hidden h-10 mb-4">
        {brackets.map((b) => (
          <div
            key={b.rate}
            style={{ width: b.width, backgroundColor: b.color }}
            className="flex items-center justify-center text-xs font-bold text-white"
            title={`${b.rate}: ${b.range}`}
          >
            {b.rate}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {brackets.map((b) => (
          <div key={b.rate} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: b.color }} />
            <span className="text-gray-600">
              <span className="font-semibold">{b.rate}</span> {b.range}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Source: IRS Rev. Proc. 2025-32. Standard deduction: $16,100 (single).
      </p>
    </div>
  );
}
