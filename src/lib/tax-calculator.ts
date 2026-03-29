import federalBrackets2026 from '@/data/federal-brackets-2026.json';
import federalBrackets2025 from '@/data/federal-brackets-2025.json';
import statesData from '@/data/states.json';

export type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';
export type TaxYear = 2025 | 2026;

export interface TaxInput {
  annualIncome: number;
  filingStatus: FilingStatus;
  stateCode: string;
  gamblingWinnings: number;
  gamblingLosses: number;
  deductionType: 'standard' | 'itemized';
  taxYear: TaxYear;
}

export interface TaxResult {
  // Income breakdown
  totalIncome: number;
  taxableIncome: number;
  standardDeduction: number;

  // Loss deduction
  deductibleLosses: number;
  nonDeductibleLosses: number;
  phantomIncome: number;
  obbbaApplied: boolean;

  // Federal tax
  federalTax: number;
  federalTaxOnGambling: number;
  federalMarginalRate: number;
  federalEffectiveRate: number;
  federalWithholding: number;

  // State tax
  stateTax: number;
  stateTaxRate: number;
  stateName: string;

  // Totals
  totalTax: number;
  totalTaxOnGambling: number;
  effectiveRate: number;
  netTakeHome: number;

  // W-2G
  w2gTriggered: boolean;
  w2gExplanation: string;

  // Comparison (2025 vs 2026)
  comparisonDifference: number | null;
}

interface Bracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface StateData {
  code: string;
  name: string;
  slug: string;
  taxType: string;
  rates: Bracket[];
  flatRate: number | null;
  noIncomeTax: boolean;
  specialRules: string[];
  lossDeductionAllowed: boolean;
  sportsBettingLegal: boolean;
  onlineLegal: boolean;
  retailLegal: boolean;
  sportsbooks: string[];
  taxAuthorityUrl: string;
  notes: string;
}

function getBrackets(taxYear: TaxYear) {
  return taxYear === 2026 ? federalBrackets2026 : federalBrackets2025;
}

function calculateBracketTax(income: number, brackets: Bracket[]): number {
  let tax = 0;
  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const upper = bracket.max !== null ? Math.min(income, bracket.max) : income;
    tax += (upper - bracket.min) * bracket.rate;
  }
  return tax;
}

function getMarginalRate(income: number, brackets: Bracket[]): number {
  let rate = 0;
  for (const bracket of brackets) {
    if (income > bracket.min) {
      rate = bracket.rate;
    }
  }
  return rate;
}

function getStateData(stateCode: string): StateData | undefined {
  return (statesData as StateData[]).find(s => s.code === stateCode);
}

function calculateStateTax(
  gamblingWinnings: number,
  totalIncome: number,
  state: StateData,
  deductibleLosses: number = 0
): number {
  if (state.noIncomeTax || state.taxType === 'none') {
    return 0;
  }

  // For states that allow loss deductions, reduce the taxable gambling amount.
  // For states that DON'T allow loss deductions (IN, MA, NC, WI), tax the full winnings.
  const effectiveGamblingIncome = state.lossDeductionAllowed
    ? Math.max(0, gamblingWinnings - deductibleLosses)
    : gamblingWinnings;

  if (state.taxType === 'flat' && state.flatRate !== null) {
    return effectiveGamblingIncome * state.flatRate;
  }

  if (state.taxType === 'graduated' && state.rates.length > 0) {
    // For graduated states, calculate tax on total income with and without gambling
    // The difference is the tax attributable to gambling winnings
    const adjustedTotalIncome = state.lossDeductionAllowed
      ? totalIncome - deductibleLosses
      : totalIncome;
    const taxWithGambling = calculateBracketTax(adjustedTotalIncome, state.rates);
    const taxWithoutGambling = calculateBracketTax(adjustedTotalIncome - effectiveGamblingIncome, state.rates);
    return Math.max(0, taxWithGambling - taxWithoutGambling);
  }

  return 0;
}

export function calculateTax(input: TaxInput): TaxResult {
  const brackets = getBrackets(input.taxYear);
  const filingBrackets = brackets.brackets[input.filingStatus] as Bracket[];
  const standardDeduction = brackets.standardDeduction[input.filingStatus];
  const state = getStateData(input.stateCode);

  // Step 1: Calculate total income
  const totalIncome = input.annualIncome + input.gamblingWinnings;

  // Step 2: Calculate deductible losses (OBBBA 90% cap for 2026+)
  let deductibleLosses = 0;
  let phantomIncome = 0;
  let obbbaApplied = false;

  if (input.deductionType === 'itemized' && input.gamblingLosses > 0) {
    if (input.taxYear >= 2026) {
      // OBBBA: Can only deduct 90% of losses, capped at winnings
      const cappedLosses = input.gamblingLosses * brackets.obbbaLossCapRate;
      deductibleLosses = Math.min(cappedLosses, input.gamblingWinnings);
      phantomIncome = Math.min(input.gamblingLosses, input.gamblingWinnings) - deductibleLosses;
      obbbaApplied = phantomIncome > 0;
    } else {
      // Pre-OBBBA: 100% deductible up to winnings
      deductibleLosses = Math.min(input.gamblingLosses, input.gamblingWinnings);
    }
  }

  const nonDeductibleLosses = input.gamblingLosses - deductibleLosses;

  // Step 3: Calculate taxable income
  // Note: When itemizing, we only account for gambling loss deductions here.
  // Other itemized deductions (mortgage interest, state taxes, charitable) are not modeled.
  // This is a simplification — actual tax may be lower if user has significant other deductions.
  const deduction = input.deductionType === 'standard' ? standardDeduction : 0;
  const taxableIncome = Math.max(0, totalIncome - deduction - deductibleLosses);

  // Step 4: Federal tax calculation
  const federalTax = calculateBracketTax(taxableIncome, filingBrackets);
  const federalMarginalRate = getMarginalRate(taxableIncome, filingBrackets);
  const federalEffectiveRate = taxableIncome > 0 ? federalTax / taxableIncome : 0;

  // Tax attributable to gambling winnings specifically
  const incomeWithoutGambling = Math.max(0, input.annualIncome - deduction);
  const taxWithoutGambling = calculateBracketTax(incomeWithoutGambling, filingBrackets);
  const federalTaxOnGambling = federalTax - taxWithoutGambling;

  // Federal withholding (24% on winnings over $5,000)
  const federalWithholding = input.gamblingWinnings > brackets.withholdingThreshold
    ? input.gamblingWinnings * brackets.withholdingRate
    : 0;

  // Step 5: State tax (pass deductible losses so states that allow them reduce the tax base)
  const stateTax = state ? calculateStateTax(input.gamblingWinnings, totalIncome, state, deductibleLosses) : 0;
  const stateTaxRate = state
    ? (state.noIncomeTax ? 0 : (state.flatRate ?? (input.gamblingWinnings > 0 ? stateTax / input.gamblingWinnings : 0)))
    : 0;

  // Step 6: Totals
  const totalTax = federalTax + stateTax;
  const totalTaxOnGambling = federalTaxOnGambling + stateTax;
  const effectiveRate = input.gamblingWinnings > 0 ? totalTaxOnGambling / input.gamblingWinnings : 0;
  const netTakeHome = input.gamblingWinnings - totalTaxOnGambling;

  // Step 7: W-2G check (simplified — main calculator doesn't have individual wager amount)
  // Note: For sports betting, W-2G requires BOTH: net win >= threshold AND payout >= 300x wager.
  // Since we only know total winnings here, we check the dollar threshold only.
  // For precise W-2G checking with the 300:1 rule, use the dedicated W-2G Checker tool.
  const w2gThreshold = input.taxYear >= 2026 ? 2000 : 600;
  const w2gTriggered = input.gamblingWinnings >= w2gThreshold;
  const w2gExplanation = w2gTriggered
    ? `Your total winnings of $${input.gamblingWinnings.toLocaleString()} exceed the ${input.taxYear >= 2026 ? '$2,000' : '$600'} W-2G threshold for ${input.taxYear}. Individual wins that also meet the 300:1 odds requirement may trigger a W-2G form. Use our W-2G Checker for precise results.`
    : `Your total winnings of $${input.gamblingWinnings.toLocaleString()} are below the ${input.taxYear >= 2026 ? '$2,000' : '$600'} W-2G threshold. No W-2G form is likely required for individual bets, but you must still report all winnings.`;

  return {
    totalIncome,
    taxableIncome,
    standardDeduction,
    deductibleLosses,
    nonDeductibleLosses,
    phantomIncome,
    obbbaApplied,
    federalTax,
    federalTaxOnGambling,
    federalMarginalRate,
    federalEffectiveRate,
    federalWithholding,
    stateTax,
    stateTaxRate,
    stateName: state?.name ?? 'Unknown',
    totalTax,
    totalTaxOnGambling,
    effectiveRate,
    netTakeHome,
    w2gTriggered,
    w2gExplanation,
    comparisonDifference: null,
  };
}

// Calculate the difference between 2025 and 2026 rules
export function calculateComparison(input: Omit<TaxInput, 'taxYear'>): {
  result2025: TaxResult;
  result2026: TaxResult;
  additionalTax: number;
  phantomIncome: number;
} {
  const result2025 = calculateTax({ ...input, taxYear: 2025 });
  const result2026 = calculateTax({ ...input, taxYear: 2026 });
  const additionalTax = result2026.totalTaxOnGambling - result2025.totalTaxOnGambling;

  return {
    result2025,
    result2026,
    additionalTax,
    phantomIncome: result2026.phantomIncome,
  };
}

// Parlay tax calculator
export function calculateParlayTax(
  wager: number,
  americanOdds: number,
  stateCode: string,
  filingStatus: FilingStatus = 'single',
  annualIncome: number = 50000,
  taxYear: TaxYear = 2026
): {
  grossPayout: number;
  netProfit: number;
  federalTax: number;
  stateTax: number;
  totalTax: number;
  afterTaxProfit: number;
  effectiveRate: number;
  w2gTriggered: boolean;
} {
  // Convert American odds to decimal payout
  let decimalOdds: number;
  if (americanOdds > 0) {
    decimalOdds = (americanOdds / 100) + 1;
  } else {
    decimalOdds = (100 / Math.abs(americanOdds)) + 1;
  }

  const grossPayout = wager * decimalOdds;
  const netProfit = grossPayout - wager;

  // Use the main calculator for the tax computation
  const result = calculateTax({
    annualIncome,
    filingStatus,
    stateCode,
    gamblingWinnings: netProfit,
    gamblingLosses: 0,
    deductionType: 'standard',
    taxYear,
  });

  // W-2G check with 300:1 rule
  const threshold = taxYear >= 2026 ? 2000 : 600;
  const w2gTriggered = netProfit >= threshold && grossPayout >= wager * 300;

  return {
    grossPayout,
    netProfit,
    federalTax: result.federalTaxOnGambling,
    stateTax: result.stateTax,
    totalTax: result.totalTaxOnGambling,
    afterTaxProfit: netProfit - result.totalTaxOnGambling,
    effectiveRate: result.effectiveRate,
    w2gTriggered,
  };
}

// Phantom income calculator (standalone)
export function calculatePhantomIncome(
  totalWinnings: number,
  totalLosses: number
): {
  priorLaw: { deductible: number; taxable: number; };
  obbba2026: { deductible: number; taxable: number; phantomIncome: number; };
  additionalTaxableIncome: number;
} {
  const priorDeductible = Math.min(totalLosses, totalWinnings);
  const priorTaxable = totalWinnings - priorDeductible;

  const obbbaDeductible = Math.min(totalLosses * 0.90, totalWinnings);
  const obbbaTaxable = totalWinnings - obbbaDeductible;
  const phantomIncome = obbbaTaxable - priorTaxable;

  return {
    priorLaw: {
      deductible: priorDeductible,
      taxable: priorTaxable,
    },
    obbba2026: {
      deductible: obbbaDeductible,
      taxable: obbbaTaxable,
      phantomIncome,
    },
    additionalTaxableIncome: phantomIncome,
  };
}

// W-2G threshold checker
export function checkW2G(
  winningAmount: number,
  wagerAmount: number,
  gamblingType: 'sports' | 'slots' | 'poker' | 'keno' | 'bingo' | 'lottery' | 'other',
  taxYear: TaxYear = 2026
): {
  triggered: boolean;
  threshold: number;
  requiresOddsMultiplier: boolean;
  oddsMultiplierMet: boolean;
  explanation: string;
} {
  const allThresholds: Record<number, Record<string, { amount: number; oddsMultiplier: number | null }>> = {
    2026: {
      sports: { amount: 2000, oddsMultiplier: 300 },
      slots: { amount: 2000, oddsMultiplier: null },
      poker: { amount: 5000, oddsMultiplier: null },
      keno: { amount: 2000, oddsMultiplier: null },
      bingo: { amount: 2000, oddsMultiplier: null },
      lottery: { amount: 600, oddsMultiplier: 300 },
      other: { amount: 2000, oddsMultiplier: 300 },
    },
    2025: {
      sports: { amount: 600, oddsMultiplier: 300 },
      slots: { amount: 1200, oddsMultiplier: null },
      poker: { amount: 5000, oddsMultiplier: null },
      keno: { amount: 1500, oddsMultiplier: null },
      bingo: { amount: 1200, oddsMultiplier: null },
      lottery: { amount: 600, oddsMultiplier: 300 },
      other: { amount: 600, oddsMultiplier: 300 },
    },
  };

  const yearThresholds = allThresholds[taxYear] ?? allThresholds[2026];
  const threshold = yearThresholds[gamblingType] ?? yearThresholds['other'];

  const netWin = winningAmount - wagerAmount;
  const meetsAmount = netWin >= threshold.amount;
  const requiresOdds = threshold.oddsMultiplier !== null;
  const oddsMultiplierMet = requiresOdds
    ? winningAmount >= wagerAmount * threshold.oddsMultiplier!
    : true;

  const triggered = meetsAmount && oddsMultiplierMet;

  let explanation: string;
  if (triggered) {
    explanation = `Yes, a W-2G will likely be issued. Your net winnings of $${netWin.toLocaleString()} meet the $${threshold.amount.toLocaleString()} threshold${requiresOdds ? ` and the payout exceeds 300x your wager` : ''}.`;
  } else if (meetsAmount && !oddsMultiplierMet) {
    explanation = `No W-2G required. While your net winnings of $${netWin.toLocaleString()} exceed $${threshold.amount.toLocaleString()}, the payout does not meet the 300x wager requirement. However, you must still report these winnings on your tax return.`;
  } else {
    explanation = `No W-2G required. Your net winnings of $${netWin.toLocaleString()} are below the $${threshold.amount.toLocaleString()} threshold. However, you must still report all gambling winnings on your tax return.`;
  }

  return {
    triggered,
    threshold: threshold.amount,
    requiresOddsMultiplier: requiresOdds,
    oddsMultiplierMet,
    explanation,
  };
}

// Get all states data
export function getAllStates() {
  return statesData as StateData[];
}

// Get single state data
export function getState(codeOrSlug: string) {
  return (statesData as StateData[]).find(
    s => s.code === codeOrSlug.toUpperCase() || s.slug === codeOrSlug.toLowerCase()
  );
}
