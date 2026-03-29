import { calculateTax, calculatePhantomIncome, checkW2G, calculateParlayTax } from '../src/lib/tax-calculator';

// Test 1: Break-even NY 2026 (OBBBA)
const t1 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 50000, gamblingLosses: 50000, deductionType: 'itemized', taxYear: 2026 });
console.log('T1 Break-even NY 2026:', { phantom: t1.phantomIncome, deductible: t1.deductibleLosses, obbba: t1.obbbaApplied, netTakeHome: t1.netTakeHome });

// Test 2: Break-even NY 2025
const t2 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 50000, gamblingLosses: 50000, deductionType: 'itemized', taxYear: 2025 });
console.log('T2 Break-even NY 2025:', { phantom: t2.phantomIncome, deductible: t2.deductibleLosses });

// Test 3: Florida (no state tax)
const t3 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'FL', gamblingWinnings: 10000, gamblingLosses: 0, deductionType: 'standard', taxYear: 2026 });
console.log('T3 FL:', { stateTax: t3.stateTax, fedOnGambling: t3.federalTaxOnGambling });

// Test 4: Phantom income calculator
const p1 = calculatePhantomIncome(100000, 100000);
console.log('T4 Phantom 100k/100k:', p1);

// Test 5: W-2G $5000 on $10 (should trigger)
const w1 = checkW2G(5000, 10, 'sports', 2026);
console.log('T5 W2G 5000/10:', { triggered: w1.triggered, oddsMet: w1.oddsMultiplierMet });

// Test 6: W-2G $2500 on $100 (should NOT trigger - 25:1 < 300:1)
const w2 = checkW2G(2500, 100, 'sports', 2026);
console.log('T6 W2G 2500/100:', { triggered: w2.triggered, oddsMet: w2.oddsMultiplierMet });

// Test 7: PA flat tax
const tPA = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'PA', gamblingWinnings: 10000, gamblingLosses: 0, deductionType: 'standard', taxYear: 2026 });
console.log('T7 PA:', { stateTax: tPA.stateTax, expectedAbout: 307 });

// Test 8: Losses > Winnings 2026
const t8 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'PA', gamblingWinnings: 10000, gamblingLosses: 30000, deductionType: 'itemized', taxYear: 2026 });
console.log('T8 Losses>Wins:', { deductible: t8.deductibleLosses, phantom: t8.phantomIncome });

// Test 9: Parlay $10 at +5000
const pt = calculateParlayTax(10, 5000, 'NY', 'single', 50000, 2026);
console.log('T9 Parlay:', { payout: pt.grossPayout, profit: pt.netProfit, w2g: pt.w2gTriggered });

// Test 10: Zero everything
const t10 = calculateTax({ annualIncome: 0, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 0, gamblingLosses: 0, deductionType: 'standard', taxYear: 2026 });
console.log('T10 Zero:', { tax: t10.totalTax, takeHome: t10.netTakeHome });

// Test 11: Standard deduction - losses should NOT be deductible
const t11 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 50000, gamblingLosses: 50000, deductionType: 'standard', taxYear: 2026 });
console.log('T11 Std deduction + losses:', { deductible: t11.deductibleLosses, expectedZero: 0 });
