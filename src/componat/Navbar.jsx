import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import logoImg from  '../assets/logo-icon.png';
/**
 * AURA ESTATES — sticky navigation
 * ---------------------------------------------------------------------
 * One theme, applied once. There is no scroll state and no
 * transparent-over-hero variant, so a light-text-on-light-background
 * clash is structurally impossible: every label carries an explicit,
 * permanent dark colour.
 */
const Navbar = ({ lang = 'en', onToggleLang, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    en: {
      brand: 'AURA ESTATES',
      properties: 'Properties',
      neighborhoods: 'Locations',
      calculator: 'EMI Calculator',
      contact: 'Contact',
      bookViewing: 'Book Viewing',
      langBtn: 'বাংলা',
    },
    bn: {
      brand: 'অরা এস্টেটস',
      properties: 'প্রপার্টিসমূহ',
      neighborhoods: 'লোকেশন',
      calculator: 'লোন ক্যালকুলেটর',
      contact: 'যোগাযোগ',
      bookViewing: 'ভিজিট বুকিং',
      langBtn: 'English',
    },
  }[lang];

  const navLinks = [
    { href: '#properties', label: t.properties },
    { href: '#locations', label: t.neighborhoods },
    { href: '#calculator', label: t.calculator },
    { href: '#inquiry', label: t.contact },
  ];

  /* ------------------------------------------------------------------
     Styles are declared once here and reused, so no element can end up
     with two competing colour utilities.
     ------------------------------------------------------------------ */
  const barClass =
    'sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md';

  const logoClass =
    'shrink-0 font-serif-luxury text-base font-bold tracking-[0.1em] text-slate-900 transition-colors duration-200 hover:text-amber-600 sm:text-xl sm:tracking-[0.15em] lg:text-2xl';

  const linkClass =
    'relative py-1 font-medium text-slate-800 transition-colors duration-200 hover:text-amber-600 ' +
    'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-amber-500 ' +
    'after:transition-all after:duration-300 hover:after:w-full';

  const ghostButtonClass =
    'inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border ' +
    'border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 transition-colors duration-200 ' +
    'hover:border-amber-500 hover:text-amber-600';

  const iconButtonClass =
    'shrink-0 cursor-pointer rounded-md p-1.5 text-slate-800 transition-colors duration-200 ' +
    'hover:bg-slate-100 hover:text-amber-600 focus:outline-none sm:p-2';

  const drawerLinkClass =
    'block border-b border-slate-200 py-3 text-sm font-medium text-slate-800 transition-colors ' +
    'duration-200 last:border-0 hover:text-amber-600';

  return (
    <header className={barClass}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:h-20 sm:px-6 lg:px-12">
        {/* Logo */}
        
      <a href="#home" className="flex shrink-0 items-center gap-2 sm:gap-3">
  <img
    src={logoImg}
    alt=""
    className="h-9 w-auto object-contain sm:h-11 lg:h-12 mb-2"
  />
  <span className="font-serif-luxury text-base font-bold tracking-[0.1em] text-slate-900 sm:text-xl sm:tracking-[0.15em] lg:text-2xl">
    {t.brand}
  </span>
</a>

        {/* Desktop links — rendered from one array, so they are always identical */}
        <nav className="hidden items-center gap-6 text-sm md:flex lg:gap-8">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className={linkClass}>
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop actions: language toggle + primary CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button type="button" onClick={onToggleLang} title="Switch Language" className={ghostButtonClass}>
            <Globe className="h-3.5 w-3.5 text-amber-600" />
            <span>{t.langBtn}</span>
          </button>
          <button
            type="button"
            onClick={onOpenBooking}
            className="btn-gold cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold sm:px-5"
          >
            {t.bookViewing}
          </button>
        </div>

        {/* Mobile actions */}
        <div className="flex shrink-0 items-center gap-1.5 md:hidden">
          <button type="button" onClick={onToggleLang} className={ghostButtonClass}>
            <Globe className="h-3.5 w-3.5 text-amber-600" />
            <span>{t.langBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
            className={iconButtonClass}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pb-5 pt-3 shadow-sm md:hidden">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={drawerLinkClass}
            >
              {label}
            </a>
          ))}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn-gold w-full cursor-pointer rounded-lg py-3 text-center text-xs font-semibold"
            >
              {t.bookViewing}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;