import fs from 'fs';
import path from 'path';

export interface DailyWin {
  id: string;
  sport: string;
  betType: string; // 'parlay' | 'straight' | 'sgp' | 'futures' | 'prop'
  wager: number;
  payout: number;
  odds: string; // American odds display e.g. "+16400"
  legs?: number; // for parlays
  description: string; // e.g. "12-leg NBA parlay"
  source: string; // 'reddit' | 'twitter' | 'foxsports' | 'manual'
  sourceUrl?: string;
  stateCode?: string; // if known
  federalTax: number;
  stateTax: number;
  totalTax: number;
  netTakeHome: number;
  phantomIncomeNote?: string;
}

export interface DailyWinsData {
  date: string; // YYYY-MM-DD
  wins: DailyWin[];
  generatedAt: string; // ISO timestamp
  totalPayouts: number;
  totalTaxes: number;
}

const DAILY_WINS_DIR = path.join(process.cwd(), 'src', 'content', 'daily-wins');

/**
 * Get daily wins for a specific date
 */
export function getDailyWins(date: string): DailyWinsData | null {
  const filePath = path.join(DAILY_WINS_DIR, `${date}.json`);
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as DailyWinsData;
  } catch {
    return null;
  }
}

/**
 * Get all available daily wins dates (sorted newest first)
 */
export function getAllDailyWinsDates(): string[] {
  try {
    if (!fs.existsSync(DAILY_WINS_DIR)) return [];
    const files = fs.readdirSync(DAILY_WINS_DIR);
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''))
      .sort((a, b) => b.localeCompare(a)); // newest first
  } catch {
    return [];
  }
}

/**
 * Get the most recent daily wins entry
 */
export function getLatestDailyWins(): DailyWinsData | null {
  const dates = getAllDailyWinsDates();
  if (dates.length === 0) return null;
  return getDailyWins(dates[0]);
}

/**
 * Format a date string for display
 */
export function formatWinDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get sport emoji
 */
export function getSportEmoji(sport: string): string {
  const map: Record<string, string> = {
    NFL: '\u{1F3C8}',
    NBA: '\u{1F3C0}',
    MLB: '\u26BE',
    NHL: '\u{1F3D2}',
    UFC: '\u{1F94A}',
    MMA: '\u{1F94A}',
    Soccer: '\u26BD',
    Tennis: '\u{1F3BE}',
    Golf: '\u26F3',
    NASCAR: '\u{1F3CE}',
    'College Football': '\u{1F3C8}',
    'College Basketball': '\u{1F3C0}',
    'March Madness': '\u{1F3C0}',
  };
  return map[sport] || '\u{1F3C6}';
}
