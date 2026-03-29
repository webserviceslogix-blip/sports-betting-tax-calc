'use client';

import Link from 'next/link';
import { useState } from 'react';

interface StateInfo {
  code: string;
  name: string;
  slug: string;
  noIncomeTax: boolean;
  sportsBettingLegal: boolean;
  lossDeductionAllowed: boolean;
  flatRate: number | null;
}

interface USMapGridProps {
  states: StateInfo[];
}

// Grid layout approximating US geography (row, col positions)
const statePositions: Record<string, [number, number]> = {
  AK: [0, 0], HI: [7, 0],
  WA: [1, 1], OR: [2, 1], CA: [3, 1],
  MT: [1, 2], ID: [2, 2], NV: [3, 2], AZ: [4, 2],
  WY: [1, 3], UT: [2, 3], CO: [3, 3], NM: [4, 3],
  ND: [1, 4], SD: [2, 4], NE: [3, 4], KS: [4, 4], OK: [5, 4], TX: [6, 4],
  MN: [1, 5], IA: [2, 5], MO: [3, 5], AR: [4, 5], LA: [5, 5],
  WI: [1, 6], IL: [2, 6], MS: [4, 6],
  MI: [1, 7], IN: [2, 7], KY: [3, 7], TN: [4, 7], AL: [5, 7],
  OH: [2, 8], WV: [3, 8], VA: [4, 8], NC: [5, 8], SC: [6, 8], GA: [6, 7],
  PA: [2, 9], MD: [3, 9], DC: [4, 9], FL: [7, 7],
  NY: [1, 9], NJ: [3, 10], DE: [4, 10],
  VT: [0, 9], NH: [0, 10], MA: [1, 10], CT: [2, 10], RI: [2, 11],
  ME: [0, 11],
};

function getStateColor(state: StateInfo): string {
  if (state.noIncomeTax) return 'bg-green-500 hover:bg-green-600 text-white';
  if (!state.sportsBettingLegal) return 'bg-gray-300 hover:bg-gray-400 text-gray-700';
  if (!state.lossDeductionAllowed) return 'bg-red-400 hover:bg-red-500 text-white';
  return 'bg-blue-500 hover:bg-blue-600 text-white';
}

export default function USMapGrid({ states }: USMapGridProps) {
  const [hoveredState, setHoveredState] = useState<StateInfo | null>(null);

  const stateMap = new Map(states.map(s => [s.code, s]));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Interactive Tax Map</h2>
      <p className="text-sm text-gray-500 mb-4">Click any state for its tax calculator</p>

      {/* Tooltip */}
      {hoveredState && (
        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 mb-3 inline-block">
          <span className="font-semibold">{hoveredState.name}</span>
          {' — '}
          {hoveredState.noIncomeTax ? '0% state tax' :
           hoveredState.flatRate ? `${(hoveredState.flatRate * 100).toFixed(2)}% flat` :
           'Graduated rates'}
          {' | '}
          {hoveredState.sportsBettingLegal ? 'Betting legal' : 'Not legal'}
        </div>
      )}

      {/* Grid Map */}
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(8, 1fr)' }}>
        {Object.entries(statePositions).map(([code, [row, col]]) => {
          const state = stateMap.get(code);
          if (!state) return null;

          return (
            <Link
              key={code}
              href={`/states/${state.slug}`}
              className={`aspect-square flex items-center justify-center rounded text-xs font-bold transition-all cursor-pointer ${getStateColor(state)}`}
              style={{ gridRow: row + 1, gridColumn: col + 1 }}
              onMouseEnter={() => setHoveredState(state)}
              onMouseLeave={() => setHoveredState(null)}
              title={`${state.name} — Click for tax calculator`}
            >
              {code}
            </Link>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <span>No State Tax</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-blue-500" />
          <span>Legal Betting + Tax</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-red-400" />
          <span>No Loss Deduction</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-gray-300" />
          <span>Not Legal Yet</span>
        </div>
      </div>
    </div>
  );
}
