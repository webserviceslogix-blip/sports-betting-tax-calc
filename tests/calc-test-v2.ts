import { calculateTax, calculatePhantomIncome, checkW2G, calculateParlayTax } from '../src/lib/tax-calculator';

let passed = 0;
let failed = 0;

function test(name: string, actual: number | boolean, expected: number | boolean, tolerance = 0) {
  if (typeof actual === 'number' && typeof expected === 'number') {
    if (Math.abs(actual - expected) <= tolerance) {
      console.log(`  PASS: ${name} = ${actual}`);
      passed++;
    } else {
      console.log(`  FAIL: ${name} = ${actual} (expected ${expected})`);
      failed++;
    }
  } else {
    if (actual === expected) {
      console.log(`  PASS: ${name} = ${actual}`);
      passed++;
    } else {
      console.log(`  FAIL: ${name} = ${actual} (expected ${expected})`);
      failed++;
    }
  }
}

// === CRITICAL FIX TEST: State tax with loss deductions ===
console.log('\n=== STATE TAX LOSS DEDUCTION FIX ===');

// Test A: NY allows loss deductions — state tax should be reduced when itemizing with losses
const tA1 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 10000, gamblingLosses: 8000, deductionType: 'itemized', taxYear: 2026 });
const tA2 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 10000, gamblingLosses: 0, deductionType: 'standard', taxYear: 2026 });
console.log('NY with $8K losses (itemized) state tax:', tA1.stateTax);
console.log('NY with $0 losses (standard) state tax:', tA2.stateTax);
test('NY state tax with losses < without losses', tA1.stateTax < tA2.stateTax, true);

// Test B: IN does NOT allow loss deductions — state tax should be SAME regardless of losses
const tB1 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'IN', gamblingWinnings: 10000, gamblingLosses: 8000, deductionType: 'itemized', taxYear: 2026 });
const tB2 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'IN', gamblingWinnings: 10000, gamblingLosses: 0, deductionType: 'standard', taxYear: 2026 });
test('IN state tax with losses = without losses (no deduction allowed)', tB1.stateTax, tB2.stateTax);

// Test C: PA flat rate with loss deduction
const tC = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'PA', gamblingWinnings: 10000, gamblingLosses: 10000, deductionType: 'itemized', taxYear: 2026 });
// PA allows loss deductions. $10K wins, $10K losses, OBBBA 90% = $9K deductible.
// Effective gambling income = $10K - $9K = $1K. PA 3.07% of $1K = $30.70
test('PA break-even state tax (with OBBBA)', tC.stateTax, 30.7, 1);

// Test D: MA does NOT allow loss deductions
const tD = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'MA', gamblingWinnings: 10000, gamblingLosses: 10000, deductionType: 'itemized', taxYear: 2026 });
// MA 5% flat, no loss deduction. Full $10K taxed = $500
test('MA break-even state tax (no loss deduction)', tD.stateTax, 500);

// === ORIGINAL TESTS (should still pass) ===
console.log('\n=== ORIGINAL TESTS ===');

const t1 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 50000, gamblingLosses: 50000, deductionType: 'itemized', taxYear: 2026 });
test('OBBBA phantom income 50k/50k', t1.phantomIncome, 5000);
test('OBBBA deductible losses', t1.deductibleLosses, 45000);
test('OBBBA applied flag', t1.obbbaApplied, true);

const t2 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 50000, gamblingLosses: 50000, deductionType: 'itemized', taxYear: 2025 });
test('2025 phantom income (should be 0)', t2.phantomIncome, 0);
test('2025 deductible losses (100%)', t2.deductibleLosses, 50000);

const t3 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'FL', gamblingWinnings: 10000, gamblingLosses: 0, deductionType: 'standard', taxYear: 2026 });
test('FL state tax = 0', t3.stateTax, 0);

const p1 = calculatePhantomIncome(100000, 100000);
test('Phantom income 100k/100k', p1.obbba2026.phantomIncome, 10000);
test('Prior law taxable 100k/100k', p1.priorLaw.taxable, 0);

const w1 = checkW2G(5000, 10, 'sports', 2026);
test('W-2G $5000/$10 triggered', w1.triggered, true);

const w2 = checkW2G(2500, 100, 'sports', 2026);
test('W-2G $2500/$100 NOT triggered', w2.triggered, false);

const tPA = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'PA', gamblingWinnings: 10000, gamblingLosses: 0, deductionType: 'standard', taxYear: 2026 });
test('PA flat tax on $10K', tPA.stateTax, 307);

const t8 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'PA', gamblingWinnings: 10000, gamblingLosses: 30000, deductionType: 'itemized', taxYear: 2026 });
test('Losses>Wins deductible capped', t8.deductibleLosses, 10000);
test('Losses>Wins phantom=0', t8.phantomIncome, 0);

const pt = calculateParlayTax(10, 5000, 'NY', 'single', 50000, 2026);
test('Parlay $10 at +5000 payout', pt.grossPayout, 510);
test('Parlay profit', pt.netProfit, 500);

const t10 = calculateTax({ annualIncome: 0, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 0, gamblingLosses: 0, deductionType: 'standard', taxYear: 2026 });
test('Zero everything = $0 tax', t10.totalTax, 0);

const t11 = calculateTax({ annualIncome: 60000, filingStatus: 'single', stateCode: 'NY', gamblingWinnings: 50000, gamblingLosses: 50000, deductionType: 'standard', taxYear: 2026 });
test('Standard deduction = no loss deduction', t11.deductibleLosses, 0);

console.log(`\n=== RESULTS: ${passed} passed, ${failed} failed ===`);
if (failed > 0) process.exit(1);
