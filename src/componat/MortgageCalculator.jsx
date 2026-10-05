import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  formatUsd,
  formatUsdShort,
  MIN_BUDGET_USD,
  MAX_BUDGET_USD,
  BUDGET_STEP_USD,
} from '../utils/format';

/** Opens on a mid-portfolio valuation so the numbers feel real immediately. */
const DEFAULT_VALUATION_USD = 1150000;

const MortgageCalculator = ({ lang = 'en', onApplyWithLoan }) => {
  const [priceUsd, setPriceUsd] = useState(DEFAULT_VALUATION_USD);
  const [downPercent, setDownPercent] = useState(30);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenureYears, setTenureYears] = useState(15);

  // Calculations — every amount below is in USD
  const downAmount = priceUsd * (downPercent / 100);
  const principal = priceUsd - downAmount;

  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;

  // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const emi =
    monthlyRate > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : principal / months;

  const totalPayable = emi * months;
  const totalInterest = totalPayable - principal;
  const principalShare = Math.round((principal / totalPayable) * 100);
  const interestShare = 100 - principalShare;

  const t = {
    en: {
      tag: 'FINANCIAL STRUCTURING',
      title: 'Mortgage & Home Loan EMI Estimator',
      subtitle:
        'Calculate structured monthly installments backed by our banking consortium partners (Standard Chartered, Eastern Bank, IDLC, DBH).',
      priceLabel: 'Property Valuation (USD)',
      downPaymentLabel: 'Down Payment',
      tenureLabel: 'Tenure Length',
      rateLabel: 'Annual Interest Rate',
      monthlyEmi: 'Estimated Monthly Installment (EMI)',
      perMonth: '/ month',
      totalLoan: 'Total Principal Loan',
      totalInterest: 'Total Projected Interest',
      totalOutlay: 'Total Estimated Outlay',
      years: 'Years',
      principal: 'Principal',
      interest: 'Interest',
      applyPlan: 'Request Financing Assistance',
      bankPartners: 'Approved Mortgage Partners: DBH Finance · Standard Chartered · Eastern Bank · IDLC',
    },
    bn: {
      tag: 'ফাইন্যান্সিয়াল মডেল',
      title: 'হোম লোন ও মাসিক কিস্তি (ইএমআই) ক্যালকুলেটর',
      subtitle:
        'আমাদের পার্টনার ব্যাংক ও আর্থিক প্রতিষ্ঠানের (ইস্টার্ন ব্যাংক, স্ট্যান্ডার্ড চার্টার্ড, ডিবিএইচ, আইডিএলসি) মাধ্যমে সহজ কিস্তির হিসাব করুন।',
      priceLabel: 'প্রপার্টির মোট মূল্য (USD)',
      downPaymentLabel: 'ডাউন পেমেন্ট / প্রাথমিক কিস্তি',
      tenureLabel: 'ঋণের মেয়াদকাল',
      rateLabel: 'বার্ষিক সুদের হার',
      monthlyEmi: 'আনুমানিক মাসিক কিস্তি (EMI)',
      perMonth: '/ প্রতি মাসে',
      totalLoan: 'মোট গৃহঋণ মূলধন',
      totalInterest: 'প্রদেয় মোট সুদের পরিমাণ',
      totalOutlay: 'সুদসহ মোট পরিশোধযোগ্য অর্থ',
      years: 'বছর',
      principal: 'মূলধন',
      interest: 'সুদ',
      applyPlan: 'লোন সুবিধাসহ আবেদন করুন',
      bankPartners: 'অনুমোদিত ব্যাংক পার্টনার: ডিবিএইচ ফাইন্যান্স · স্ট্যান্ডার্ড চার্টার্ড · ইস্টার্ন ব্যাংক · আইডিএলসি',
    },
  }[lang];

  const handleApplyClick = () => {
    const summary = `Property Valuation ${formatUsd(priceUsd)}, Down Payment ${downPercent}%, Tenure ${tenureYears} Years, Monthly EMI ~${formatUsd(emi)}`;
    onApplyWithLoan?.(summary);
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sliderClass = 'w-full cursor-pointer';

  return (
    <section id="calculator" className="border-y border-line bg-canvas py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-bronze">{t.tag}</p>
          <h2 className="break-words font-serif-luxury text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-muted sm:text-sm">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="space-y-6 rounded-xl border border-line bg-white p-5 shadow-card sm:p-8 lg:col-span-7">
            {/* Price */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-ink-soft">{t.priceLabel}</span>
                <span className="font-serif-luxury text-sm font-bold text-bronze tabular-nums sm:text-base">
                  {formatUsd(priceUsd)}
                </span>
              </div>
              <input
                type="range"
                min={MIN_BUDGET_USD}
                max={MAX_BUDGET_USD}
                step={BUDGET_STEP_USD}
                value={priceUsd}
                onChange={(e) => setPriceUsd(Number(e.target.value))}
                className={sliderClass}
              />
              <div className="mt-1 flex justify-between gap-2 font-mono text-[10px] text-muted">
                <span>{formatUsdShort(MIN_BUDGET_USD)}</span>
                <span>{formatUsdShort(MAX_BUDGET_USD)}</span>
              </div>
            </div>

            {/* Down payment */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-ink-soft">{t.downPaymentLabel}</span>
                <span className="font-mono text-xs text-ink tabular-nums">
                  {downPercent}% ({formatUsd(downAmount)})
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={downPercent}
                onChange={(e) => setDownPercent(Number(e.target.value))}
                className={sliderClass}
              />
            </div>

            {/* Tenure + rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-ink-soft">
                  {t.tenureLabel} ({tenureYears} {t.years})
                </label>
                <div className="flex items-center gap-1 rounded-lg border border-line bg-canvas p-1">
                  {[5, 10, 15, 20, 25].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`flex-1 cursor-pointer rounded-md py-1.5 text-xs font-semibold transition-colors ${
                        tenureYears === yr
                          ? 'bg-gold text-ink shadow-sm'
                          : 'text-muted hover:text-bronze'
                      }`}
                    >
                      {yr}Y
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-ink-soft">{t.rateLabel}</span>
                  <span className="font-mono text-xs text-bronze tabular-nums">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="14"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className={`${sliderClass} my-2`}
                />
              </div>
            </div>

            <p className="border-t border-line pt-3 text-[11px] leading-relaxed text-muted">{t.bankPartners}</p>
          </div>

          {/* Results */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-gold/40 bg-gold-soft p-5 shadow-card sm:p-8 lg:col-span-5">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t.monthlyEmi}</span>
                <div className="mt-1 break-words font-serif-luxury text-2xl font-bold text-bronze tabular-nums sm:text-3xl lg:text-4xl">
                  {formatUsd(emi)}
                  <span className="ml-2 font-sans-body text-xs font-normal text-muted">{t.perMonth}</span>
                </div>
              </div>

              <div>
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-line">
                  <div style={{ width: `${principalShare}%` }} className="bg-gold transition-all duration-300" />
                  <div style={{ width: `${interestShare}%` }} className="bg-ink/20 transition-all duration-300" />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                    {t.principal} ({principalShare}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-ink/20" />
                    {t.interest} ({interestShare}%)
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t border-line pt-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted">{t.totalLoan}</span>
                  <span className="font-mono font-semibold text-ink">{formatUsd(principal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">{t.totalInterest}</span>
                  <span className="font-mono font-semibold text-ink-soft">{formatUsd(totalInterest)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-2 text-sm">
                  <span className="font-medium text-ink">{t.totalOutlay}</span>
                  <span className="font-mono font-bold text-bronze">{formatUsd(totalPayable)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleApplyClick}
              className="btn-gold mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-center text-xs font-semibold"
            >
              <span>{t.applyPlan}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;