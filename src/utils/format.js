/**
 * AURA ESTATES — USD formatting helpers
 * ------------------------------------------------------------------
 * The whole platform is priced and displayed in US dollars: one currency,
 * one source of truth, and no FX conversion anywhere in the UI.
 */

/** Search + valuation slider band, matched to the real luxury portfolio. */
export const MIN_BUDGET_USD = 350000;
export const MAX_BUDGET_USD = 2500000;
export const BUDGET_STEP_USD = 25000;

/** $2,450,000 */
export const formatUsd = (usd) => `$${Math.round(usd).toLocaleString('en-US')}`;

/** Compact form for sliders and chips — $2.5M · $1.15M · $350K */
export const formatUsdShort = (usd) => {
  if (usd >= 1000000000) {
    return `$${Number((usd / 1000000000).toFixed(2)).toLocaleString('en-US')}B`;
  }
  if (usd >= 1000000) {
    const millions = usd / 1000000;
    const rounded = Number(millions.toFixed(millions % 1 === 0 ? 0 : 2));
    return `$${rounded.toLocaleString('en-US')}M`;
  }
  return `$${Math.round(usd / 1000)}K`;
};

/** Unit price — the first number international buyers scan — $360 / sq.ft */
export const formatUsdPerSqft = (usd, areaSqft) =>
  areaSqft > 0 ? `$${Math.round(usd / areaSqft).toLocaleString('en-US')} / sq.ft` : '';