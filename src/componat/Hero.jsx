import { useState } from 'react';
import {
  Search,
  MapPin,
  Building2,
  SlidersHorizontal,
  ArrowDown,
} from 'lucide-react';
import heroImg from '../assets/lux.jpg';
import {
  MIN_BUDGET_USD,
  MAX_BUDGET_USD,
  BUDGET_STEP_USD,
  formatUsdShort,
} from '../utils/format';

const Hero = ({ lang = 'en', onSearch }) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [maxBudget, setMaxBudget] = useState(MAX_BUDGET_USD); // USD

  const t = {
    en: {
      headline: 'Architectural Precision. Timeless Living.',
      subtitle:
        'Curated luxury penthouses, lakefront duplex villas, and prime commercial landmarks across Gulshan, Banani, Baridhara, and Purbachal. Designed for generational legacy.',
      tabBuy: 'Buy Residential',
      tabRent: 'Rent Luxury',
      tabCommercial: 'Commercial Grade-A',
      locationLabel: 'Location',
      locationPlaceholder: 'All Prime Locations',
      locGulshan: 'Gulshan-1 & 2',
      locBanani: 'Banani Lakefront',
      locBaridhara: 'Baridhara Diplomatic / DOHS',
      locPurbachal: 'Purbachal Smart City',
      locDhanmondi: 'Dhanmondi Lake Area',
      typeLabel: 'Property Type',
      typeAll: 'All Categories',
      typePenthouse: 'Sky Penthouse',
      typeDuplex: 'Duplex Villa',
      typeApartment: 'Luxury Flat',
      typeCommercial: 'Commercial Tower',
      budgetLabel: 'Max Budget',
      searchBtn: 'Find Properties',
      viewCatalog: 'Explore Featured Collection',
    },

   bn: {
      headline: 'স্থাপত্যের আভিজাত্য, চিরন্তন প্রশান্তি।',
      subtitle:
        'গুলশান, বনানী, বারিধারা এবং পূর্বাচলে ঢাকার সবচেয়ে মনোরম পেন্টহাউস, লেকভিউ ডুপ্লেক্স ভিলা এবং আন্তর্জাতিক মানের বাণিজ্যিক স্পেস। আপনার আভিজাত্যের বিশ্বস্ত ঠিকানা।',
      tabBuy: 'ক্রয়যোগ্য প্রপার্টি',
      tabRent: 'বিলাসবহুল ভাড়া',
      tabCommercial: 'বাণিজ্যিক স্পেস',
      locationLabel: 'লোকেশন',
      locationPlaceholder: 'সকল প্রধান লোকেশন',
      locGulshan: 'গুলশান ১ ও ২',
      locBanani: 'বনানী লেকভিউ',
      locBaridhara: 'বারিধারা ডিপ্লোম্যাটিক / ডিওএইচএস',
      locPurbachal: 'পূর্বাচল স্মার্ট সিটি',
      locDhanmondi: 'ধানমন্ডি লেক এলাকা',
      typeLabel: 'প্রপার্টির ধরন',
      typeAll: 'সকল ক্যাটাগরি',
      typePenthouse: 'স্কাই পেন্টহাউস',
      typeDuplex: 'ডুপ্লেক্স ভিলা',
      typeApartment: 'লাক্সারি অ্যাপার্টমেন্ট',
      typeCommercial: 'কমার্শিয়াল স্পেস',
      budgetLabel: 'সর্বোচ্চ বাজেট',
      searchBtn: 'প্রপার্টি খুঁজুন',
      viewCatalog: 'ফিচারড কালেকশন দেখুন',
    },
  }[lang];

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    onSearch?.({
      category: activeTab === 'commercial' ? 'commercial' : selectedType,
      location: selectedLocation,
      maxBudget: maxBudget,
    });

    // Scroll down to properties
    const elem = document.getElementById('properties');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabClass = (name) =>
    `shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap sm:px-4 ${
      activeTab === name
        ? 'bg-gold text-ink shadow-sm'
        : 'text-ink-soft hover:bg-white/70 hover:text-ink'
    }`;

  const selectClass =
    'w-full rounded-lg border border-line bg-white px-3 py-2.5 text-xs text-ink transition-colors focus:border-gold focus:outline-none disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-60';

  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden sm:min-h-[92vh]"
    >
      {/* Background image — object-cover fills every viewport size without distortion */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Luxury Penthouse Architecture"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          decoding="async"
          loading="eager"
          className="h-full w-full object-cover object-center"
        />
        {/* Light-touch scrim. Previously this stacked to ~92% black at the edges
            (from-ink/85 via-ink/70 to-ink/90 + from-ink/50 sides), which flattened the
            photograph into a black box. Now: a flat 30% base + a gentle vertical
            falloff, so the image reads clearly while the centre still holds AA
            contrast for the white type. Swap `ink` for `black` if you prefer it. */}
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/30 to-ink/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <p className="mb-3 break-words text-[10px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-gold-bright drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] sm:mb-4 sm:text-xs sm:tracking-[0.25em]">
          {lang === 'bn'
            ? 'ঢাকা · গুলশান · বনানী · পূর্বাচল'
            : 'Dhaka · Gulshan · Banani · Purbachal'}
        </p>

        <h1 className="mx-auto max-w-4xl text-balance break-words font-serif-luxury text-3xl font-bold leading-[1.2] tracking-tight text-white drop-shadow-[0_2px_22px_rgba(0,0,0,0.65)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          {t.headline}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm font-normal leading-relaxed text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.6)] sm:mt-6 sm:text-base lg:text-lg">
          {t.subtitle}
        </p>

        {/* Integrated Real Estate Search Box */}
        <div className="mx-auto mt-8 w-full max-w-4xl rounded-xl border border-white/50 bg-white/70 p-2.5 shadow-lift backdrop-blur-md backdrop-saturate-150 sm:mt-10 sm:p-3">
          {/* Segmented Control Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto border-b border-white/50 px-1 pb-3 sm:px-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('buy');
                if (selectedType === 'commercial') setSelectedType('all');
              }}
              className={tabClass('buy')}
            >
              {t.tabBuy}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('rent');
                if (selectedType === 'commercial') setSelectedType('all');
              }}
              className={tabClass('rent')}
            >
              {t.tabRent}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('commercial');
                setSelectedType('commercial');
              }}
              className={tabClass('commercial')}
            >
              {t.tabCommercial}
            </button>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 items-center gap-3 p-1 pt-4 sm:p-2 md:grid-cols-4"
          >
            {/* Location selector */}
            <div className="px-2 text-left">
              <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-muted">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                {t.locationLabel}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className={selectClass}
              >
                <option value="all">{t.locationPlaceholder}</option>
                <option value="gulshan">{t.locGulshan}</option>
                <option value="banani">{t.locBanani}</option>
                <option value="baridhara">{t.locBaridhara}</option>
                <option value="purbachal">{t.locPurbachal}</option>
                <option value="dhanmondi">{t.locDhanmondi}</option>
              </select>
            </div>

            {/* Type selector */}
            <div className="px-2 text-left">
              <label className="mb-1 flex items-center gap-1 text-[11px] font-medium text-muted">
                <Building2 className="h-3.5 w-3.5 text-gold" />
                {t.typeLabel}
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                disabled={activeTab === 'commercial'}
                className={selectClass}
              >
                <option value="all">{t.typeAll}</option>
                <option value="penthouse">{t.typePenthouse}</option>
                <option value="duplex">{t.typeDuplex}</option>
                <option value="apartment">{t.typeApartment}</option>
                <option value="commercial">{t.typeCommercial}</option>
              </select>
            </div>

            {/* Budget Range selector */}
            <div className="px-2 text-left">
              <label className="mb-1 flex items-center justify-between text-[11px] font-medium text-muted">
                <span className="flex items-center gap-1">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-gold" />
                  {t.budgetLabel}
                </span>
                <span className="font-mono text-[11px] font-semibold text-bronze tabular-nums">
                  {formatUsdShort(maxBudget)}
                </span>
              </label>
              <input
                type="range"
                min={MIN_BUDGET_USD}
                max={MAX_BUDGET_USD}
                step={BUDGET_STEP_USD}
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="my-2 w-full cursor-pointer"
              />
              <div className="-mb-1 flex justify-between font-mono text-[10px] text-muted">
                <span>{formatUsdShort(MIN_BUDGET_USD)}</span>
                <span>{formatUsdShort(MAX_BUDGET_USD)}</span>
              </div>
            </div>

            {/* Submit button */}
            <div className="px-2 pt-2 md:pt-0">
              <button
                type="submit"
                className="btn-gold flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-center text-xs font-semibold"
              >
                <Search className="w-4 h-4" />
                <span>{t.searchBtn}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Editorial Scroll prompt */}
        <a
          href="#properties"
          className="mt-8 inline-flex flex-col items-center gap-2 px-4 text-center text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:text-gold-bright sm:mt-10 sm:text-xs sm:tracking-[0.2em]"
        >
          <span>{t.viewCatalog}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;