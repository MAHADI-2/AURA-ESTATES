import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

const Footer = ({ lang = 'en' }) => {
  const t = {
    en: {
      brand: 'AURA ESTATES',
      tagline: 'Dhaka’s premier luxury real estate advisory and bespoke architectural development firm.',
      quickLinks: 'Quick Portals',
      properties: 'Featured Properties',
      locations: 'Prime Enclaves',
      calculator: 'Mortgage Calculator',
      booking: 'Schedule Walkthrough',
      legal: 'Compliance & Legal',
      rajukLicense: 'RAJUK Real Estate Reg No: RE-2024-8841',
      fairHousing: 'BNBC Seismic Compliance & Green Building Standards',
      privacy: 'Privacy & Discretion Policy',
      terms: 'Terms of Representation',
      contactUs: 'Private Client Office',
      address: 'Road 79, Gulshan-2 Diplomatic Area, Dhaka-1212',
      phone: '+880 2 9884501 / +880 1819 000111',
      email: 'concierge@aura-estates.com',
      copyright: '© 2026 AURA Estates Bangladesh. All rights reserved.',
    },
    bn: {
      brand: 'অরা এস্টেটস',
      tagline: 'ঢাকার সবচেয়ে বিশ্বস্ত ও আধুনিক লাক্সারি রিয়েল এস্টেট ডেভেলপমেন্ট ও কনসালটেন্সি প্রতিষ্ঠান।',
      quickLinks: 'দ্রুত লিংক',
      properties: 'ফিচারড প্রপার্টি',
      locations: 'অভিজাত এলাকা',
      calculator: 'লোন ক্যালকুলেটর',
      booking: 'ভিজিট শিডিউল',
      legal: 'অনুমোদন ও আইনি সুরক্ষা',
      rajukLicense: 'রাজউক রিয়েল এস্টেট নিবন্ধন নং: RE-2024-8841',
      fairHousing: 'বিএনবিসি সিসমিক কোড ও গ্রিন বিল্ডিং সার্টিফাইড',
      privacy: 'গোপনীয়তা নীতিমালা',
      terms: 'সেবা শর্তাবলী',
      contactUs: 'প্রধান কার্যালয়',
      address: 'রোড ৭৯, গুলশান-২ ডিপ্লোম্যাটিক এলাকা, ঢাকা-১২১২',
      phone: '+৮৮০ ২ ৯৮৮৪৫০১ / +৮৮০ ১৮১৯ ০০০১১১',
      email: 'concierge@aura-estates.com',
      copyright: '© ২০২৬ অরা এস্টেটস বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।',
    },
  }[lang];

  const quickLinks = [
    { href: '#properties', label: t.properties },
    { href: '#locations', label: t.locations },
    { href: '#calculator', label: t.calculator },
    { href: '#inquiry', label: t.booking },
  ];

  const linkClass = 'transition-colors hover:text-bronze';

  return (
    <footer className="w-full border-t border-line bg-canvas py-14 text-muted sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-line pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-serif-luxury text-xl font-bold tracking-[0.16em] text-ink sm:text-2xl">{t.brand}</span>
            <p className="text-xs leading-relaxed text-muted">{t.tagline}</p>
            <div className="flex items-center gap-1.5 pt-2 text-xs text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.rajukLicense}</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-serif-luxury text-sm font-bold text-ink">{t.quickLinks}</h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-serif-luxury text-sm font-bold text-ink">{t.legal}</h4>
            <ul className="space-y-2.5 text-xs">
              <li>{t.fairHousing}</li>
              <li><a href="#privacy" className={linkClass}>{t.privacy}</a></li>
              <li><a href="#terms" className={linkClass}>{t.terms}</a></li>
              <li className="text-[11px] text-muted/80">
                Member, REHAB (Real Estate &amp; Housing Association of Bangladesh)
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-serif-luxury text-sm font-bold text-ink">{t.contactUs}</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{t.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span className="break-words font-mono">{t.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <span>{t.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted sm:flex-row">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4 text-[11px] text-muted/90">
            <span>Dhaka, Bangladesh</span>
            <span>·</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;