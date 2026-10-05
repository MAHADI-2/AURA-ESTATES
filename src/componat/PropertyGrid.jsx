import { useState } from 'react';
import { Bed, Bath, Square, Eye, Calendar, Building, CheckCircle2 } from 'lucide-react';
import { formatUsd, formatUsdPerSqft } from '../utils/format';

const PropertyGrid = ({ properties, lang = 'en', onSelectProperty, onBookProperty }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all' ? properties : properties.filter((p) => p.category === activeCategory);

  const t = {
    en: {
      tag: 'Exclusive Portfolio',
      sectionTitle: 'Featured Architectural Residences',
      sectionSubtitle:
        'Hand-selected residences adhering to seismic resilience, high ceilings, and panoramic urban lake vistas.',
      all: 'All Properties',
      penthouse: 'Penthouses',
      duplex: 'Duplex Villas',
      apartment: 'Luxury Apartments',
      commercial: 'Commercial Towers',
      beds: 'Beds',
      baths: 'Baths',
      sqft: 'sq.ft',
      quickView: 'View Details & Plan',
      bookTour: 'Request Private Tour',
      rajukVerified: 'RAJUK & Structural Vetted',
      noResults: 'No properties matched your criteria. Try adjusting filters above.',
    },
    bn: {
      tag: 'এক্সক্লুসিভ পোর্টফোলিও',
      sectionTitle: 'বাছাইকৃত অভিজাত আবাসন ও কমার্শিয়াল স্পেস',
      sectionSubtitle:
        'ভূমিকম্প সহনশীল আধুনিক আর্কিটেকচার, সুউচ্চ সিলিং এবং মনোমুগ্ধকর লেকভিউ সংবলিত প্রিমিয়াম প্রপার্টি।',
      all: 'সকল প্রপার্টি',
      penthouse: 'পেন্টহাউস',
      duplex: 'ডুপ্লেক্স ভিলা',
      apartment: 'লাক্সারি ফ্ল্যাট',
      commercial: 'বাণিজ্যিক ভবন',
      beds: 'বেডরুম',
      baths: 'বাথরুম',
      sqft: 'বর্গফুট',
      quickView: 'বিস্তারিত ও ফ্লোরপ্ল্যান',
      bookTour: 'প্রাইভেট ভিজিট বুকিং',
      rajukVerified: 'রাজউক অনুমোদিত ও নিরাপদ',
      noResults: 'আপনার পছন্দের সাথে মিলে এমন কোনো প্রপার্টি পাওয়া যায়নি। ফিল্টার পরিবর্তন করে দেখুন।',
    },
  }[lang];

  const bn = lang === 'bn';
  const categories = ['all', 'penthouse', 'duplex', 'apartment', 'commercial'];

  return (
    <section id="properties" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Header + filter tabs */}
        <div className="flex flex-col gap-5 border-b border-line pb-8 sm:pb-10 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-bronze">{t.tag}</p>
            <h2 className="break-words font-serif-luxury text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-5xl">
              {t.sectionTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted sm:text-sm">{t.sectionSubtitle}</p>
          </div>

          {/* Scrolls sideways on phones so the pills never stack into a tall block */}
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex w-max items-center gap-1 rounded-xl border border-line bg-canvas p-1 md:w-auto md:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 cursor-pointer rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-gold font-semibold text-ink shadow-sm'
                      : 'text-muted hover:text-bronze'
                  }`}
                >
                  {t[cat]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted">{t.noResults}</div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {filtered.map((prop) => (
              <div
                key={prop._id}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas">
                  <img
                    src={prop.image}
                    alt={bn ? prop.titleBn : prop.titleEn}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />

                  <div className="absolute left-3 top-3 flex max-w-[72%] items-start gap-1.5 rounded-md border border-emerald-200 bg-white/95 px-2.5 py-1 text-[10px] font-medium leading-tight text-emerald-700 shadow-sm backdrop-blur-sm sm:left-4 sm:top-4 sm:text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>{t.rajukVerified}</span>
                  </div>

                  <div className="chip-gold absolute bottom-3 right-3 max-w-[62%] rounded-lg px-3 py-1.5 text-right">
                    <div className="break-words font-serif-luxury text-[15px] font-bold leading-tight text-ink tabular-nums sm:text-base">
                      {formatUsd(prop.priceUsd)}
                    </div>
                    <div className="font-mono text-[10px] leading-tight text-ink/75">
                      {formatUsdPerSqft(prop.priceUsd, prop.areaSqft)}
                    </div>
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-2 flex min-w-0 items-center gap-2 text-[11px] text-muted sm:text-xs">
                    <span className="shrink-0 font-medium text-bronze">{bn ? prop.locationBn : prop.locationEn}</span>
                    <span aria-hidden="true">·</span>
                    <span className="min-w-0 truncate">{prop.developer}</span>
                  </div>

                  {/* line-clamp + min-h keeps every title block the same height across cards */}
                  <h3 className="line-clamp-2 min-h-[3.5rem] break-words font-serif-luxury text-lg font-bold leading-snug text-ink transition-colors group-hover:text-bronze sm:text-xl">
                    {bn ? prop.titleBn : prop.titleEn}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-[2.9rem] text-[13px] leading-relaxed text-muted sm:text-sm">
                    {bn ? prop.descriptionBn : prop.descriptionEn}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line pt-4 text-[11px] text-ink-soft tabular-nums sm:text-xs">
                    {prop.category !== 'commercial' ? (
                      <>
                        <div className="flex items-center gap-1.5">
                          <Bed className="h-3.5 w-3.5 text-gold" />
                          <span>{prop.bedrooms} {t.beds}</span>
                        </div>
                        <span aria-hidden="true" className="text-muted/40">·</span>
                        <div className="flex items-center gap-1.5">
                          <Bath className="h-3.5 w-3.5 text-gold" />
                          <span>{prop.bathrooms} {t.baths}</span>
                        </div>
                        <span aria-hidden="true" className="text-muted/40">·</span>
                      </>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-gold" />
                        <span>Grade-A Commercial</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Square className="h-3.5 w-3.5 text-gold" />
                      <span>{prop.areaSqft.toLocaleString()} {t.sqft}</span>
                    </div>
                  </div>

                  {/* mt-auto pins the CTA row to the bottom of every card, so the two
                      buttons sit on the exact same baseline in every card of the grid.
                      Slim bars: py-2 + leading-tight keeps them ~30px tall on one line. */}
                  <div className="mt-auto grid grid-cols-1 items-stretch gap-2 pt-5 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => onSelectProperty(prop)}
                      className="inline-flex w-full min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2 text-center text-[11px] font-medium leading-tight text-ink-soft transition-colors duration-200 hover:border-gold hover:bg-gold-soft hover:text-ink sm:text-xs"
                    >
                      <Eye className="h-3.5 w-3.5 shrink-0 text-gold" />
                      <span className="min-w-0 break-words text-balance">{t.quickView}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onBookProperty(prop)}
                      className="btn-gold inline-flex w-full min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-center text-[11px] font-semibold leading-tight transition-transform duration-200 active:scale-[0.98] sm:text-xs"
                    >
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span className="min-w-0 break-words text-balance">{t.bookTour}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyGrid;