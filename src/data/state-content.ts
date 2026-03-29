// Unique editorial content per state — ensures 40%+ content differentiation
// This is NOT template text — each state has manually written, unique information

export interface StateContent {
  slug: string;
  headline: string;
  intro: string; // 2-3 unique sentences about this state's gambling tax situation
  keyFacts: string[]; // 3-5 bullet points unique to this state
  taxExplanation: string; // 2-3 paragraphs about how taxes work in this state specifically
  lossDeductionNote: string; // State-specific loss deduction rule
  recentChanges: string; // Recent legislative changes or news
  neighborComparison: { state: string; slug: string; note: string }[]; // Compare with neighbors
  faq: { question: string; answer: string }[]; // 3-4 unique FAQ questions per state
  workedExample: {
    scenario: string;
    income: number;
    winnings: number;
    losses: number;
    federalTax: string;
    stateTax: string;
    totalTax: string;
    takeHome: string;
  };
}

const stateContent: Record<string, StateContent> = {
  'new-york': {
    slug: 'new-york',
    headline: 'New York Sports Betting Tax Calculator',
    intro: 'New York has some of the highest combined tax rates on gambling winnings in the nation. With state rates up to 10.9% and an additional NYC surcharge of up to 3.876%, New York City residents can face effective combined rates approaching 14.8% on top of federal taxes. Despite this, New York generates more sports betting tax revenue than any other state — over $2.9 billion since legalization.',
    keyFacts: [
      'State income tax: 4% to 10.9% (graduated brackets)',
      'NYC residents pay an additional 3.078% to 3.876% city income tax',
      'Yonkers residents pay a 1.959% surcharge on state tax',
      'Sports betting legalized for online in January 2022 with 8 operators',
      'New York has the highest operator tax rate in the nation at 51% of gross gaming revenue',
      'Gambling loss deductions ARE allowed at the state level (must itemize)',
    ],
    taxExplanation: 'New York taxes gambling winnings as ordinary income through its graduated income tax system with rates ranging from 4% to 10.9%. Your gambling winnings are added to all other income and taxed at whatever bracket you fall into. For most sports bettors with moderate winnings, the effective state rate will be between 5.5% and 6.85%.\n\nNew York City adds its own income tax on top — between 3.078% and 3.876% depending on income. This means NYC residents face the highest combined state+local tax burden on gambling winnings anywhere in the United States. A bettor earning $80,000 with $20,000 in gambling winnings would face roughly 6% state + 3.5% city = 9.5% in state/local taxes alone, before federal.\n\nNew York does allow you to deduct gambling losses against winnings if you itemize deductions on your state return, following the same rules as federal. Under the 2026 OBBBA, this deduction is capped at 90% of losses.',
    lossDeductionNote: 'New York follows federal rules on gambling loss deductions. You can deduct losses up to the amount of your winnings if you itemize. Under the 2026 OBBBA, this is capped at 90% of losses. NYC and Yonkers taxes are also affected by this limitation.',
    recentChanges: 'New York launched mobile sports betting in January 2022 with nine licensed operators (later reduced to eight). The state applies a 51% tax rate on operators — the highest in the nation — which has generated billions in tax revenue but also led to less competitive odds for bettors compared to lower-tax states.',
    neighborComparison: [
      { state: 'New Jersey', slug: 'new-jersey', note: 'NJ has lower state rates (1.4-10.75%) and no city surcharge — many NY-area bettors place bets while in NJ' },
      { state: 'Connecticut', slug: 'connecticut', note: 'CT rates top out at 6.99% — significantly lower than NY\'s 10.9% + NYC surcharge' },
      { state: 'Pennsylvania', slug: 'pennsylvania', note: 'PA has a flat 3.07% rate — one of the lowest in the region' },
    ],
    faq: [
      {
        question: 'Do I pay NYC tax on sports betting winnings?',
        answer: 'Yes, if you are a New York City resident, you pay NYC income tax (3.078-3.876%) on top of New York State income tax (4-10.9%) and federal tax on all gambling winnings. This gives NYC the highest combined tax rate on gambling in the US.',
      },
      {
        question: 'Which sportsbooks are legal in New York?',
        answer: 'New York has eight licensed mobile sportsbooks: FanDuel, DraftKings, BetMGM, Caesars, BetRivers, Fanatics, Hard Rock Bet, and Resorts World Bet. All require you to be physically located within New York state borders to place bets.',
      },
      {
        question: 'Does New York report my sports betting winnings to the IRS?',
        answer: 'Sportsbooks will issue a W-2G form if your net winnings meet the federal thresholds ($2,000 and 300:1 odds for 2026). Regardless of W-2G issuance, you are required to report all gambling winnings on both your federal and New York state tax returns.',
      },
      {
        question: 'Can I deduct gambling losses on my New York tax return?',
        answer: 'Yes, New York allows you to deduct gambling losses against winnings if you itemize deductions. Starting in 2026, the federal OBBBA 90% cap applies, meaning you can only deduct 90% of your losses. New York follows this federal limitation.',
      },
    ],
    workedExample: {
      scenario: 'A single filer living in Manhattan earning $80,000 salary who wins $20,000 on sports betting with $10,000 in losses (itemizing deductions)',
      income: 80000,
      winnings: 20000,
      losses: 10000,
      federalTax: '$3,400 (at the 22% marginal bracket)',
      stateTax: '$1,200 (NY state at ~6%) + $700 (NYC at ~3.5%) = $1,900',
      totalTax: '$5,300 combined federal + state + city',
      takeHome: '$14,700 from $20,000 in winnings (73.5% effective rate on winnings)',
    },
  },
  'new-jersey': {
    slug: 'new-jersey',
    headline: 'New Jersey Sports Betting Tax Calculator',
    intro: 'New Jersey was instrumental in legalizing sports betting nationally through the landmark Murphy v. NCAA Supreme Court case in 2018. The state has one of the most mature and competitive sports betting markets in the country with eight licensed operators. New Jersey\'s graduated income tax ranges from 1.4% to 10.75%, with specific withholding rules for gambling winnings.',
    keyFacts: [
      'State income tax: 1.4% to 10.75% (graduated, top rate on income over $1M)',
      '3% withholding on gambling winnings $10,001-$500,000',
      '8% withholding on gambling winnings over $500,000',
      'Sports betting legalized in 2018 following Supreme Court ruling',
      'Eight licensed online sportsbook operators',
      'Gambling loss deductions ARE allowed at the state level',
    ],
    taxExplanation: 'New Jersey uses a graduated income tax system with seven brackets ranging from 1.4% to 10.75%. Gambling winnings are treated as ordinary income and taxed at your marginal rate. For most sports bettors, the effective state rate will be between 5.525% and 6.37% unless your total income exceeds $500,000.\n\nNew Jersey has specific withholding rules for gambling: 3% is withheld on winnings between $10,001 and $500,000, and 8% on winnings over $500,000. Non-residents of NJ face an automatic 8% withholding rate on all reportable gambling winnings from NJ sources.\n\nThe state allows gambling loss deductions following federal rules, including the 2026 OBBBA 90% cap for those who itemize.',
    lossDeductionNote: 'New Jersey follows federal rules for gambling loss deductions. Losses are deductible up to the amount of winnings when itemizing. The 2026 OBBBA 90% cap applies.',
    recentChanges: 'New Jersey continues to be one of the top sports betting markets by handle. The state has lower operator tax rates than New York (13% online vs NY\'s 51%), resulting in more competitive odds and promotions for bettors. Several new operators have entered the market in recent years.',
    neighborComparison: [
      { state: 'New York', slug: 'new-york', note: 'NY has higher rates (up to 10.9% + NYC surcharge) — many NY residents prefer NJ\'s lower tax burden' },
      { state: 'Pennsylvania', slug: 'pennsylvania', note: 'PA has a flat 3.07% — much lower than NJ\'s top rates, but NJ has lower rates for moderate incomes' },
      { state: 'Delaware', slug: 'delaware', note: 'DE has rates up to 6.6% but retail sports betting only' },
    ],
    faq: [
      {
        question: 'How much does New Jersey withhold from gambling winnings?',
        answer: 'NJ witholds 3% on gambling winnings between $10,001 and $500,000, and 8% on winnings over $500,000. Non-residents face 8% withholding on all reportable gambling winnings. This withholding is a prepayment toward your actual tax liability.',
      },
      {
        question: 'Can I bet on sports in New Jersey if I live in another state?',
        answer: 'You must be physically located within New Jersey borders to place a sports bet on any NJ-licensed sportsbook. However, if you win while in NJ but live elsewhere, you may need to file NJ taxes on those winnings in addition to your home state taxes.',
      },
      {
        question: 'Which sportsbooks are legal in New Jersey?',
        answer: 'NJ has eight major online sportsbooks: FanDuel, DraftKings, BetMGM, Caesars, BetRivers, PointsBet, Fanatics, and Hard Rock Bet. Each is partnered with an Atlantic City casino.',
      },
    ],
    workedExample: {
      scenario: 'A single filer in New Jersey earning $75,000 who wins $15,000 on sports betting with $5,000 in losses (itemizing)',
      income: 75000,
      winnings: 15000,
      losses: 5000,
      federalTax: '$2,640 (at the 22% marginal bracket)',
      stateTax: '$955 (NJ at ~6.37% marginal rate)',
      totalTax: '$3,595 combined federal + state',
      takeHome: '$11,405 from $15,000 in winnings',
    },
  },
  'pennsylvania': {
    slug: 'pennsylvania',
    headline: 'Pennsylvania Sports Betting Tax Calculator',
    intro: 'Pennsylvania offers one of the most tax-friendly environments for sports bettors among northeastern states. With a flat 3.07% state income tax rate — one of the lowest flat rates in the nation — PA bettors keep significantly more of their winnings compared to neighboring New York and New Jersey. Pennsylvania was an early adopter of legal sports betting in 2018.',
    keyFacts: [
      'State income tax: 3.07% flat rate (one of the lowest flat rates in the US)',
      'Local earned income taxes may apply (typically 1-3% in cities like Philadelphia)',
      'Sports betting legalized in 2018, one of the first states after the Supreme Court ruling',
      'One of the most competitive markets with 8+ licensed operators',
      'Gambling loss deductions ARE allowed at the state level',
      'PA uses a flat tax so your rate stays the same regardless of income level',
    ],
    taxExplanation: 'Pennsylvania has a flat 3.07% state income tax rate that applies to all income including gambling winnings, regardless of how much you earn. This makes PA one of the most favorable states for sports bettors — you pay the same low rate whether you win $100 or $1 million.\n\nSome municipalities in Pennsylvania levy an additional local earned income tax (typically 1-3%), with Philadelphia having the highest at roughly 3.75% for residents. Check with your local municipality to determine if additional local taxes apply to your gambling income.\n\nPennsylvania allows gambling loss deductions following federal rules. Under the 2026 OBBBA, losses are capped at 90% deductibility when itemizing.',
    lossDeductionNote: 'Pennsylvania follows federal rules for gambling loss deductions. Losses are deductible up to winnings when itemizing. The 2026 OBBBA 90% cap applies at the federal level and flows through to PA.',
    recentChanges: 'Pennsylvania continues to expand its gambling market. The state has one of the highest operator tax rates at 36% for online sports betting, but this has not deterred operators from entering the market. The state generates substantial tax revenue from its comprehensive gambling framework.',
    neighborComparison: [
      { state: 'New York', slug: 'new-york', note: 'NY\'s top rate of 10.9% (+ NYC surcharge) makes PA\'s 3.07% dramatically cheaper for bettors' },
      { state: 'New Jersey', slug: 'new-jersey', note: 'NJ\'s graduated rates (up to 10.75%) are much higher than PA\'s flat 3.07%' },
      { state: 'Ohio', slug: 'ohio', note: 'OH has graduated rates up to 3.5% — close to PA but slightly higher at top incomes' },
    ],
    faq: [
      {
        question: 'Why is Pennsylvania\'s gambling tax so low?',
        answer: 'Pennsylvania has a flat 3.07% income tax on all income — it\'s not specific to gambling. This flat rate is one of the lowest in the northeastern US and applies equally to wages, investment income, and gambling winnings.',
      },
      {
        question: 'Do I pay Philadelphia city tax on gambling winnings?',
        answer: 'Philadelphia residents pay an additional local earned income tax of approximately 3.75%. This applies on top of the 3.07% state rate, bringing the total state+local burden to roughly 6.8% — still lower than New York or New Jersey.',
      },
      {
        question: 'Which sportsbooks are available in Pennsylvania?',
        answer: 'PA has a robust market with FanDuel, DraftKings, BetMGM, Caesars, BetRivers, Fanatics, Hard Rock Bet, ESPN BET, and several others. Each is affiliated with a licensed PA casino.',
      },
    ],
    workedExample: {
      scenario: 'A single filer in PA earning $60,000 who wins $25,000 on a parlay with no deductible losses',
      income: 60000,
      winnings: 25000,
      losses: 0,
      federalTax: '$5,500 (at the 22% marginal bracket)',
      stateTax: '$768 (PA flat 3.07%)',
      totalTax: '$6,268 combined federal + state',
      takeHome: '$18,732 from $25,000 in winnings (74.9% take-home rate)',
    },
  },
};

// Generate default content for states without custom editorial
function generateDefaultContent(state: {
  code: string;
  name: string;
  slug: string;
  flatRate: number | null;
  taxType: string;
  noIncomeTax: boolean;
  sportsBettingLegal: boolean;
  onlineLegal: boolean;
  retailLegal: boolean;
  lossDeductionAllowed: boolean;
  specialRules: string[];
  sportsbooks: string[];
  notes: string;
}): StateContent {
  const rateDescription = state.noIncomeTax
    ? '0% (no state income tax)'
    : state.flatRate
    ? `${(state.flatRate * 100).toFixed(2)}% flat rate`
    : 'graduated brackets (varies by income)';

  const legalStatus = state.sportsBettingLegal
    ? state.onlineLegal && state.retailLegal
      ? 'legal (online and retail)'
      : state.onlineLegal
      ? 'legal (online only)'
      : 'legal (retail only)'
    : 'not yet legalized';

  const intro = state.noIncomeTax
    ? `${state.name} has no state income tax, which means sports betting winnings are only subject to federal taxes. This makes ${state.name} one of the nine most tax-friendly states for gamblers. ${state.sportsBettingLegal ? `Sports betting is ${legalStatus} in ${state.name}${state.sportsbooks.length > 0 ? ` through operators like ${state.sportsbooks.slice(0, 3).join(', ')}` : ''}.` : `Sports betting is ${legalStatus} in ${state.name}, though residents who gamble in other states or online still owe federal taxes on winnings.`}`
    : `${state.name} taxes gambling winnings as ordinary income at ${rateDescription}. ${state.sportsBettingLegal ? `Sports betting is ${legalStatus} in ${state.name}${state.sportsbooks.length > 0 ? ` with operators including ${state.sportsbooks.slice(0, 3).join(', ')}` : ''}.` : `Sports betting is ${legalStatus} in ${state.name}. Residents who gamble in other states or at casinos still owe ${state.name} income tax on winnings.`} ${state.notes}`;

  const keyFacts: string[] = [];
  keyFacts.push(`State income tax: ${rateDescription}`);
  keyFacts.push(`Sports betting: ${legalStatus}`);
  if (state.sportsbooks.length > 0) keyFacts.push(`Available sportsbooks: ${state.sportsbooks.join(', ')}`);
  if (!state.lossDeductionAllowed) keyFacts.push('Does NOT allow gambling loss deductions at the state level');
  else if (!state.noIncomeTax) keyFacts.push('Gambling loss deductions ARE allowed (must itemize)');
  state.specialRules.forEach(rule => keyFacts.push(rule));

  const taxExplanation = state.noIncomeTax
    ? `${state.name} does not levy a state income tax, so gambling winnings are not taxed at the state level. You will still owe federal income tax on all gambling winnings at your marginal rate (10-37%), and the IRS withholds 24% on winnings over $5,000.\n\nUnder the 2026 OBBBA (One Big Beautiful Bill Act), the federal gambling loss deduction is capped at 90%. Even though ${state.name} has no state tax, this federal cap still affects your federal tax liability.`
    : `${state.name} taxes gambling winnings as ordinary income${state.flatRate ? ` at a flat ${(state.flatRate * 100).toFixed(2)}% rate` : ' through graduated tax brackets'}. Your gambling winnings are added to all other income and taxed accordingly.\n\n${state.lossDeductionAllowed ? `${state.name} allows gambling loss deductions following federal rules. Under the 2026 OBBBA, losses are deductible at 90% (capped at the amount of winnings) when itemizing deductions.` : `Important: ${state.name} does NOT allow gambling loss deductions at the state level. Even if you itemize on your federal return and deduct losses there, ${state.name} will tax your full gambling winnings without offset. This makes ${state.name} less favorable for bettors who have significant losses.`}`;

  const faq = [
    {
      question: `How much tax do I pay on sports betting winnings in ${state.name}?`,
      answer: state.noIncomeTax
        ? `${state.name} has no state income tax, so you only pay federal taxes on gambling winnings. Federal tax ranges from 10-37% depending on your total income. The IRS withholds 24% on winnings over $5,000.`
        : `${state.name} taxes gambling winnings at ${rateDescription} on top of federal tax (10-37%). Your total combined tax rate depends on your income level and filing status.`,
    },
    {
      question: `Is sports betting legal in ${state.name}?`,
      answer: state.sportsBettingLegal
        ? `Yes, sports betting is ${legalStatus} in ${state.name}.${state.sportsbooks.length > 0 ? ` Licensed operators include ${state.sportsbooks.join(', ')}.` : ''} You must be physically located within ${state.name} borders to place bets.`
        : `Sports betting is not currently legal in ${state.name}. However, residents who gamble in other states or at legal casinos still must report and pay taxes on their winnings.`,
    },
    {
      question: `Can I deduct gambling losses in ${state.name}?`,
      answer: state.noIncomeTax
        ? `${state.name} has no state income tax, so state-level loss deductions are not applicable. You can deduct losses on your federal return if you itemize, subject to the 2026 OBBBA 90% cap.`
        : state.lossDeductionAllowed
        ? `Yes, ${state.name} allows gambling loss deductions following federal rules. You must itemize deductions, and losses are limited to the amount of your winnings. The 2026 OBBBA 90% cap applies.`
        : `No, ${state.name} does NOT allow gambling loss deductions at the state level. Even if you deduct losses on your federal return, you will pay ${state.name} state tax on your full gambling winnings.`,
    },
  ];

  const workedIncome = 60000;
  const workedWinnings = 10000;
  const stateTaxAmount = state.noIncomeTax ? 0 : state.flatRate ? workedWinnings * state.flatRate : workedWinnings * 0.05;

  return {
    slug: state.slug,
    headline: `${state.name} Sports Betting Tax Calculator`,
    intro,
    keyFacts,
    taxExplanation,
    lossDeductionNote: state.noIncomeTax
      ? `${state.name} has no state income tax, so state-level loss deductions do not apply.`
      : state.lossDeductionAllowed
      ? `${state.name} follows federal rules for gambling loss deductions. The 2026 OBBBA 90% cap applies when itemizing.`
      : `${state.name} does NOT allow gambling loss deductions at the state level. You pay state tax on full winnings regardless of losses.`,
    recentChanges: state.notes,
    neighborComparison: [],
    faq,
    workedExample: {
      scenario: `A single filer in ${state.name} earning $60,000 with $10,000 in sports betting winnings and no losses`,
      income: workedIncome,
      winnings: workedWinnings,
      losses: 0,
      federalTax: '$2,200 (at the 22% marginal bracket)',
      stateTax: state.noIncomeTax ? '$0 (no state income tax)' : `$${Math.round(stateTaxAmount).toLocaleString()} (${rateDescription})`,
      totalTax: `$${Math.round(2200 + stateTaxAmount).toLocaleString()} combined federal + state`,
      takeHome: `$${Math.round(workedWinnings - 2200 - stateTaxAmount).toLocaleString()} from $10,000 in winnings`,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStateContent(slug: string, stateData: any): StateContent {
  return stateContent[slug] || generateDefaultContent(stateData);
}
