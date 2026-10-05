import { MapPin, Shield, Trees, Landmark } from 'lucide-react';

const Neighborhood = ({ lang = 'en' }) => {
  const bn = lang === 'bn';

  const t = {
    en: {
      tag: 'PRIME URBAN ENCLAVES',
      title: 'Distinguished Locations in Dhaka',
      subtitle:
        'Strategic investment corridors offering unmatched diplomatic security, green canopy coverage, and rapid accessibility to international airports.',
    },
    bn: {
      tag: 'আভিজাত্যের প্রধান অঞ্চলসমূহ',
      title: 'ঢাকার শীর্ষ আবাসিক ও বাণিজ্যিক লোকেশন',
      subtitle:
        'সর্বোচ্চ নিরাপত্তা, সবুজ পরিবেশ এবং আন্তর্জাতিক যোগাযোগের সুবিধাযুক্ত ঢাকার সবচেয়ে আকাঙ্ক্ষিত এলাকাগুলো।',
    },
  }[lang];

  const locations = [
    {
      icon: Shield,
      title: bn ? 'গুলশান কূটনৈতিক এলাকা' : 'Gulshan Diplomatic Zone',
      desc: bn
        ? 'ঢাকার আভিজাত্যের কেন্দ্রবিন্দু। দূতাবাস, আন্তর্জাতিক ক্লাব এবং দৃষ্টিনন্দন লেক সংলগ্ন জীবনধারা।'
        : 'The apex of Dhaka luxury. Home to embassies, premier social clubs, and lakeside dining.',
      stat: '5 Mins',
      statLabel: bn ? 'ঢাকা ক্লাব ও গুলশান ক্লাব' : 'Gulshan Club Access',
    },
    {
      icon: Trees,
      title: bn ? 'বনানী লেকভিউ ও ক্লাব এলাকা' : 'Banani Lakefront & Club District',
      desc: bn
        ? 'আধুনিক লাইফস্টাইল, নান্দনিক স্থাপত্য, প্রিমিয়াম ক্যাফে ও হাঁটার সুন্দর পরিবেশ।'
        : 'Bustling lifestyle avenue with contemporary architecture, private cafes, and pedestrian greenery.',
      stat: '2.5 km',
      statLabel: bn ? 'লেকসাইড হাঁটার পথ' : 'Continuous Lakeside Promenade',
    },
    {
      icon: Landmark,
      title: bn ? 'বারিধারা ডিপ্লোম্যাটিক জোন' : 'Baridhara High Commission Enclave',
      desc: bn
        ? 'সর্বোচ্চ স্তরের নিরাপত্তা বেষ্টনী, কোলাহলমুক্ত শান্ত রাস্তা এবং কঠোরভাবে নিয়ন্ত্রিত পরিকল্পিত আবাসন।'
        : 'Uncompromising multi-tier perimeter security, tranquil tree-lined avenues, and strictly regulated building heights.',
      stat: '24/7',
      statLabel: bn ? 'কূটনৈতিক প্রহরা' : 'Diplomatic Perimeter Guard',
    },
    {
      icon: MapPin,
      title: bn ? 'পূর্বাচল স্মার্ট সিটি (সেক্টর ৪)' : 'Purbachal Smart Sector 4',
      desc: bn
        ? '৩০০ ফিট এক্সপ্রেসওয়ের পাশে ভবিষ্যতের আধুনিক মেগাসিটি। খোলামেলা ডুপ্লেক্স ভিলা ও পরিবেশবান্ধব প্রকল্প।'
        : 'The future capital city zone along 300-feet expressway. Expansive villa plots and eco-conscious developments.',
      stat: '15 Mins',
      statLabel: bn ? 'শাহজালাল বিমানবন্দর' : 'Express to International Airport',
    },
  ];

  return (
    <section id="locations" className="bg-canvas py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-bronze">{t.tag}</p>
            <h2 className="break-words font-serif-luxury text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-5xl">
              {t.title}
            </h2>
          </div>
          <p className="max-w-md text-[13px] leading-relaxed text-muted sm:text-sm">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {locations.map(({ icon: Icon, title, desc, stat, statLabel }) => (
            <div
              key={title}
              className="flex flex-col justify-between rounded-xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift"
            >
              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gold/12 text-bronze">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 break-words font-serif-luxury text-base font-bold leading-snug text-ink sm:text-lg">{title}</h3>
                <p className="text-[13px] leading-relaxed text-muted sm:text-xs">{desc}</p>
              </div>
              <div className="mt-8 border-t border-line pt-4">
                <div className="break-words font-serif-luxury text-lg font-bold text-bronze tabular-nums sm:text-xl">{stat}</div>
                <div className="mt-0.5 text-[11px] text-muted">{statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Neighborhood;