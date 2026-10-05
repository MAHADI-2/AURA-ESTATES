import { useEffect, useState } from 'react';
import { X, Bed, Bath, Square, Car, ShieldCheck, MapPin, Check, Compass } from 'lucide-react';
import { formatUsd, formatUsdPerSqft } from '../utils/format';

const rooms = [
  { name: 'Master Suite', size: "22' x 18' · En-suite Bath", span: '' },
  { name: 'Grand Living & Double-Height Dining', size: "38' x 24' · Panoramic Balcony Deck", span: 'col-span-2' },
  { name: 'Designer Chef Kitchen', size: "16' x 12' · Island Counter", span: '' },
  { name: 'Guest Suite 01', size: "15' x 14'", span: '' },
  { name: 'Private Study & Library', size: "14' x 11'", span: '' },
];

const PropertyModal = ({ property, lang = 'en', onClose, onBookTour }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Escape closes the dialog — expected behaviour for a modal
  useEffect(() => {
    if (!property) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose]);

  if (!property) return null;

  const bn = lang === 'bn';

  const t = {
    en: {
      overview: 'Overview & Details',
      floorplan: 'Architectural Floor Plan',
      virtualTour: '3D Walkthrough View',
      narrative: 'Property Narrative',
      keySpecs: 'Key Architectural Specifications',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      superBuiltUp: 'Super Built-Up Area',
      parkingSlots: 'Basement Parking',
      approval: 'Structural Verification',
      approvedRajuk: 'Approved by RAJUK & Certified',
      amenities: 'Bespoke Amenities',
      bookVisit: 'Schedule Private Walkthrough',
      close: 'Close',
      tourTitle: 'Interactive Spatial Walkthrough Simulation',
      tourDesc:
        'High-fidelity spatial rendering showcasing natural ambient illumination, double glazed windows, and Italian porcelain finishes.',
      floorplanDesc:
        'Optimized cross-ventilation floor plan with separate servant entry and expansive private terrace.',
      viewerTitle: '360° Spatial Walkthrough',
      viewerDesc: 'Interactive VR and drone inspections available on booking.',
    },
    bn: {
      overview: 'সারসংক্ষেপ ও বিবরণ',
      floorplan: 'আর্কিটেকচারাল ফ্লোরপ্ল্যান',
      virtualTour: 'থ্রি-ডি ভার্চুয়াল ট্যুর',
      narrative: 'প্রপার্টি বর্ণনা',
      keySpecs: 'স্থাপত্যের মূল বিবরণ',
      bedrooms: 'বেডরুম',
      bathrooms: 'বাথরুম',
      superBuiltUp: 'বিল্ট-আপ আয়তন',
      parkingSlots: 'কার পার্কিং স্পেস',
      approval: 'স্ট্রাকচারাল অনুমোদন',
      approvedRajuk: 'রাজউক অনুমোদিত ও সার্টিফাইড',
      amenities: 'বিশেষ সুযোগ-সুবিধাসমূহ',
      bookVisit: 'প্রাইভেট ভিজিট নির্ধারণ করুন',
      close: 'বন্ধ করুন',
      tourTitle: 'ইন্টারেক্টিভ স্পেসিয়াল ওয়াকথ্রু সিমুলেশন',
      tourDesc:
        'প্রাকৃতিক আলো-বাতাস, ডাবল গ্লেজড গ্লাস এবং ইতালীয় পোরসেলিন মার্বেল ফিনিশিং সংবলিত থ্রি-ডি দৃশ্য।',
      floorplanDesc:
        'পর্যাপ্ত ক্রস-ভেন্টিলেশন, সহকারী কর্মীদের জন্য আলাদা এন্ট্রি এবং মনোরম টেরেস সংবলিত মাস্টারপ্ল্যান।',
      viewerTitle: '৩৬০° ইন্টারেক্টিভ ভিউয়ার',
      viewerDesc: 'সরাসরি দেখার জন্য আমাদের প্রতিনিধি আপনাকে গাইড করবেন।',
    },
  }[lang];

  const title = bn ? property.titleBn : property.titleEn;
  const tabs = ['overview', 'floorplan', 'virtualTour'];

  const specs = [
    { icon: Bed, label: t.bedrooms, value: property.bedrooms > 0 ? `${property.bedrooms} Suites` : 'Open Concept' },
    { icon: Bath, label: t.bathrooms, value: `${property.bathrooms} Bathrooms` },
    { icon: Square, label: t.superBuiltUp, value: `${property.areaSqft.toLocaleString()} sq.ft` },
    { icon: Car, label: t.parkingSlots, value: `${property.parkingSpots} Vehicles` },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/45 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative my-5 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-line bg-white p-5 shadow-lift sm:my-8 sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer rounded-lg border border-line bg-white p-2 text-muted transition-colors hover:bg-canvas hover:text-ink sm:right-6 sm:top-6"
          aria-label={t.close}
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Header */}
        <div className="pr-12">
          <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-semibold text-bronze">
            <MapPin className="h-3.5 w-3.5" />
            <span>{bn ? property.locationBn : property.locationEn}</span>
            <span aria-hidden="true">·</span>
            <span className="text-muted">{property.developer}</span>
          </div>
          <h2 className="break-words font-serif-luxury text-xl font-bold leading-snug text-ink sm:text-2xl md:text-3xl">{title}</h2>
          <p className="mt-1 break-words text-xs text-muted">{bn ? property.addressBn : property.addressEn}</p>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="break-words font-serif-luxury text-xl font-bold text-bronze tabular-nums sm:text-2xl">
              {formatUsd(property.priceUsd)}
            </span>
            <span className="font-mono text-sm text-muted">
              {formatUsdPerSqft(property.priceUsd, property.areaSqft)}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto border-b border-line pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 cursor-pointer rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors sm:px-4 ${
                activeTab === tab
                  ? 'bg-gold text-ink shadow-sm'
                  : 'text-muted hover:bg-canvas hover:text-bronze'
              }`}
            >
              {t[tab]}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line bg-canvas">
                <img
                  src={property.image}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{t.narrative}</h4>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {bn ? property.descriptionBn : property.descriptionEn}
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{t.keySpecs}</h4>
                <div className="grid grid-cols-2 gap-3 rounded-xl border border-line bg-canvas p-3 sm:gap-4 sm:p-4 sm:grid-cols-4">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex min-w-0 flex-col">
                      <span className="flex items-center gap-1 text-[11px] text-muted">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-gold" />
                        {label}
                      </span>
                      <span className="mt-1 break-words text-sm font-semibold text-ink tabular-nums sm:text-base">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{t.amenities}</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-3">
                  {(bn ? property.amenitiesBn : property.amenitiesEn).map((am) => (
                    <div
                      key={am}
                      className="flex min-w-0 items-start gap-2 rounded-lg border border-line bg-canvas p-2.5 text-xs leading-snug text-ink-soft"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span className="min-w-0 break-words">{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FLOOR PLAN */}
          {activeTab === 'floorplan' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-gold/25 bg-gold-soft p-4">
                <h4 className="mb-1 font-serif-luxury text-lg font-bold text-ink">{t.floorplan}</h4>
                <p className="text-xs leading-relaxed text-muted">{t.floorplanDesc}</p>
              </div>

              <div className="relative w-full overflow-hidden rounded-xl border border-line bg-canvas p-4 sm:p-6">
                <div className="flex flex-col gap-5 rounded-lg border-2 border-dashed border-gold/45 p-4 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-[10px] text-bronze/85 sm:text-xs">
                    <span>NORTH ELEVATION: 42° 11&apos;</span>
                    <span>TOTAL: {property.areaSqft} SQ.FT</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                    {rooms.map((room) => (
                      <div
                        key={room.name}
                        className={`flex flex-col justify-between gap-3 rounded-lg border border-line bg-white p-2.5 shadow-sm sm:gap-4 sm:p-3 ${room.span}`}
                      >
                        <span className="break-words text-[10px] font-semibold leading-snug text-ink-soft sm:text-[11px]">{room.name}</span>
                        <span className="font-mono text-[10px] leading-snug text-muted">{room.size}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span className="flex items-center gap-1.5 text-emerald-600">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      BNBC Seismic Code Zone-2 Compliant
                    </span>
                    <span className="font-mono">SCALE 1:100</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3D TOUR */}
          {activeTab === 'virtualTour' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-gold/25 bg-gold-soft p-4">
                <h4 className="mb-1 font-serif-luxury text-lg font-bold text-ink">{t.tourTitle}</h4>
                <p className="text-xs leading-relaxed text-muted">{t.tourDesc}</p>
              </div>

              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line">
                <img
                  src={property.gallery?.[1] || property.image}
                  alt="Virtual Walkthrough"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink/25">
                  <div className="max-w-sm rounded-xl border border-line bg-white/95 p-6 text-center shadow-lift backdrop-blur-md">
                    <Compass className="mx-auto h-10 w-10 animate-spin text-gold" style={{ animationDuration: '10s' }} />
                    <h5 className="mt-3 font-serif-luxury text-base font-bold text-ink">{t.viewerTitle}</h5>
                    <p className="mt-1 text-xs text-muted">{t.viewerDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-4 sm:flex-row">
          <div className="text-xs text-muted">
            <span>{t.approval}: </span>
            <span className="font-medium text-emerald-600">{t.approvedRajuk}</span>
          </div>

          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <button
              onClick={onClose}
              className="w-full cursor-pointer rounded-lg border border-line px-5 py-2.5 text-center text-xs font-medium text-ink-soft transition-colors hover:bg-canvas hover:text-ink sm:w-auto sm:whitespace-nowrap"
            >
              {t.close}
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTour(property);
              }}
              className="btn-gold w-full cursor-pointer rounded-lg px-6 py-2.5 text-center text-xs font-semibold sm:w-auto sm:whitespace-nowrap"
            >
              {t.bookVisit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;