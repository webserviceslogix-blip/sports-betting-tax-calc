export default function OBBBAComparisonChart() {
  const scenarios = [
    { label: 'Break Even ($50K/$50K)', wins: 50000, losses: 50000, old: 0, new: 5000 },
    { label: 'Small Profit ($30K/$20K)', wins: 30000, losses: 20000, old: 10000, new: 12000 },
    { label: 'Heavy Losses ($10K/$40K)', wins: 10000, losses: 40000, old: 0, new: 0 },
    { label: 'Big Winner ($100K/$30K)', wins: 100000, losses: 30000, old: 70000, new: 73000 },
  ];

  const maxTaxable = 73000;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 my-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">OBBBA Impact: 2025 vs 2026 Rules</h3>
      <p className="text-xs text-gray-500 mb-5">Taxable gambling income under old vs new rules</p>

      <div className="space-y-4">
        {scenarios.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span className="font-medium">{s.label}</span>
              <span>
                {s.new > s.old ? (
                  <span className="text-red-600 font-semibold">+${(s.new - s.old).toLocaleString()} more taxable</span>
                ) : (
                  <span className="text-green-600">No change</span>
                )}
              </span>
            </div>
            <div className="flex gap-1">
              {/* 2025 bar */}
              <div className="flex-1">
                <div className="h-6 bg-gray-100 rounded-l overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-l flex items-center px-2"
                    style={{ width: `${Math.max((s.old / maxTaxable) * 100, 2)}%` }}
                  >
                    <span className="text-xs text-white font-medium whitespace-nowrap">
                      {s.old > 0 ? `$${s.old.toLocaleString()}` : '$0'}
                    </span>
                  </div>
                </div>
              </div>
              {/* 2026 bar */}
              <div className="flex-1">
                <div className="h-6 bg-gray-100 rounded-r overflow-hidden">
                  <div
                    className="h-full bg-red-400 rounded-r flex items-center px-2"
                    style={{ width: `${Math.max((s.new / maxTaxable) * 100, 2)}%` }}
                  >
                    <span className="text-xs text-white font-medium whitespace-nowrap">
                      {s.new > 0 ? `$${s.new.toLocaleString()}` : '$0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-blue-400" />
          <span className="text-gray-600">2025 Rules (100% deduction)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-red-400" />
          <span className="text-gray-600">2026 OBBBA (90% deduction)</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3">
        The 90% cap creates &quot;phantom income&quot; — taxable income that doesn&apos;t correspond to actual profit.
      </p>
    </div>
  );
}
