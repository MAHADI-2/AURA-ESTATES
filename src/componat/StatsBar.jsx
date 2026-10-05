import { formatUsdShort } from '../utils/format';

const StatsBar = ({ lang = 'en' }) => {
  const bn = lang === 'bn';

  const stats = [
    {
      value: `${formatUsdShort(1450000000)}+`,
      label: bn ? 'পোর্টফোলিও ভ্যালুয়েশন' : 'Total Asset Portfolio Value',
      sub: bn ? 'ঢাকা ও পূর্বাচল জুড়ে' : 'Across Prime Dhaka Zones',
    },
    {
      value: bn ? '৩২০+' : '320+',
      label: bn ? 'প্রিমিয়াম রেসিডেন্স হ্যান্ডওভার' : 'Luxury Residences Handed Over',
      sub: bn ? 'সম্পূর্ণ রাজউক অনুমোদিত' : 'RAJUK Vetted & Cleared',
    },
    {
      value: '99.4%',
      label: bn ? 'নির্ধারিত সময়ে চাবি হস্তান্তর' : 'On-Time Project Delivery Rate',
      sub: bn ? 'গত ১০ বছরের ট্র্যাক রেকর্ড' : '10-Year Industry Benchmark',
    },
    {
      value: bn ? '১৬+ বছর' : '16+ Years',
      label: bn ? 'নির্ভরযোগ্য ঐতিহ্যের অভিজ্ঞতা' : 'Of Architectural Leadership',
      sub: bn ? 'বিখ্যাত স্থাপত্য দল' : 'Bespoke Engineering Standards',
    },
  ];

  return (
    <div className="w-full border-y border-line bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="flex min-w-0 flex-col border-l-2 border-gold/60 pl-4 sm:pl-6">
              <span className="break-words font-serif-luxury text-lg font-bold leading-tight tracking-tight text-ink tabular-nums sm:text-2xl lg:text-[2rem]">
                {item.value}
              </span>
              <span className="mt-2 text-[11px] font-semibold leading-snug text-ink-soft sm:text-xs">{item.label}</span>
              <span className="mt-1 text-[10px] leading-relaxed text-muted sm:text-[11px]">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;