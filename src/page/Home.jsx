import { useState } from 'react';
import Navbar from '../componat/Navbar';
import Hero from '../componat/Hero';
import StatsBar from '../componat/StatsBar';
import Neighborhood from '../componat/Neighborhood';
import PropertyGrid from '../componat/PropertyGrid';
import PropertyModal from '../componat/PropertyModal';
import MortgageCalculator from '../componat/MortgageCalculator';
import InquirySection from '../componat/InquirySection';
import Footer from '../componat/Footer';
import { properties } from '../data/properties';
import { MAX_BUDGET_USD } from '../utils/format';

const Home = () => {
  const [lang, setLang] = useState('en');
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',
    maxBudget: MAX_BUDGET_USD, // USD — matches the hero slider band
  });
  const [selectedProperty, setSelectedProperty] = useState(null); // details modal
  const [bookingProperty, setBookingProperty] = useState(null); // property chosen in booking form
  const [financeNote, setFinanceNote] = useState('');

  // Hero search filters (client side, no backend)
  const filteredProperties = properties.filter(
    (p) =>
      (filters.category === 'all' || p.category === filters.category) &&
      (filters.location === 'all' || p.locationEn.toLowerCase().includes(filters.location)) &&
      p.priceUsd <= filters.maxBudget
  );

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleOpenBooking = (property) => {
    setBookingProperty(property || null);
    scrollTo('inquiry');
  };

  const handleApplyWithLoan = (details) => setFinanceNote(`[Mortgage Plan Inquiry] ${details}`);

  return (
    <div className="min-h-screen overflow-x-clip bg-canvas font-sans-body text-ink selection:bg-gold/25 selection:text-ink">
      <Navbar
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'bn' ? 'en' : 'bn'))}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main>
        <Hero lang={lang} onSearch={setFilters} />
        <StatsBar lang={lang} />
        <Neighborhood lang={lang} />

        <PropertyGrid
          properties={filteredProperties}
          lang={lang}
          onSelectProperty={setSelectedProperty}
          onBookProperty={handleOpenBooking}
        />

        <MortgageCalculator lang={lang} onApplyWithLoan={handleApplyWithLoan} />

        <InquirySection
          key={`${bookingProperty?._id || 'general'}-${financeNote}`}
          properties={properties}
          selectedProperty={bookingProperty}
          prefilledNote={financeNote}
          lang={lang}
        />
      </main>

      <PropertyModal
        key={selectedProperty?._id}
        property={selectedProperty}
        lang={lang}
        onClose={() => setSelectedProperty(null)}
        onBookTour={handleOpenBooking}
      />

      <Footer lang={lang} />
    </div>
  );
};

export default Home;