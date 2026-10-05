import { useState } from 'react';
import { Calendar, Phone, Mail, User, Clock, CheckCircle2, Building2, Send, AlertCircle } from 'lucide-react';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const emptyForm = {
  propertyId: 'general',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  preferredDate: '',
  preferredTime: '10:00 AM - 12:00 PM',
  message: '',
};

const inputClass =
  'w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-xs text-ink transition-colors placeholder:text-muted/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20';
const labelClass = 'mb-1 flex items-center gap-1.5 text-xs font-medium text-ink-soft';

// Home.jsx gives this component a `key`, so it restarts with fresh props when a new property / loan note is chosen.
const InquirySection = ({ properties, selectedProperty, prefilledNote = '', lang = 'en' }) => {
  const [formData, setFormData] = useState({
    ...emptyForm,
    propertyId: selectedProperty?._id || 'general',
    message: prefilledNote,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const bn = lang === 'bn';

  const t = {
    en: {
      tag: 'DISCREET CONSULTATION',
      title: 'Schedule a Private Walkthrough',
      subtitle:
        'Our senior private client advisors accompany each property viewing with certified structural engineers and legal deeds advisors.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Asif Mahmud',
      phoneLabel: 'Direct Phone / WhatsApp',
      phonePlaceholder: '+880 17XX-XXXXXX',
      emailLabel: 'Email Address',
      emailPlaceholder: 'asif@example.com',
      propertyLabel: 'Selected Property',
      generalInquiry: 'General Portfolio Consultation',
      dateLabel: 'Preferred Viewing Date',
      timeLabel: 'Preferred Viewing Time',
      messageLabel: 'Special Requests / Notes',
      messagePlaceholder: 'Any specific questions regarding handover date or financing structure...',
      submitBtn: 'Confirm Appointment Request',
      submitting: 'Sending...',
      officeTitle: 'AURA Private Client Lounge',
      officeAddress: 'Road 79, Gulshan-2 Diplomatic Zone, Dhaka 1212',
      officeHours: 'Saturday – Thursday: 9:30 AM – 7:30 PM',
      directPhone: '+880 2 9884501 / +880 1819 000111',
      directEmail: 'concierge@aura-estates.com',
      successTitle: 'Appointment Request Sent',
      successNote: 'A senior relationship manager will call you within 2 business hours.',
      bookAnother: 'Submit Another Inquiry',
      needNamePhone: 'Please provide both your name and phone number.',
      failed: 'Could not send your request. Please try again.',
    },
    bn: {
      tag: 'ব্যক্তিগত পরামর্শ',
      title: 'প্রাইভেট প্রপার্টি ভিজিট শিডিউল করুন',
      subtitle:
        'আমাদের সিনিয়র রিলেশনশিপ ম্যানেজার এবং স্ট্রাকচারাল ইঞ্জিনিয়ার সরাসরি আপনাকে প্রতিটি প্রপার্টি ঘুরে দেখাবেন।',
      nameLabel: 'আপনার পূর্ণ নাম',
      namePlaceholder: 'যেমন: আসিফ মাহমুদ',
      phoneLabel: 'মোবাইল / হোয়াটসঅ্যাপ নম্বর',
      phonePlaceholder: '+880 17XX-XXXXXX',
      emailLabel: 'ইমেইল অ্যাড্রেস',
      emailPlaceholder: 'asif@example.com',
      propertyLabel: 'পছন্দের প্রপার্টি নির্বাচন',
      generalInquiry: 'সাধারণ পোর্টফোলিও পরামর্শ',
      dateLabel: 'পরিদর্শনের সুবিধাজনক তারিখ',
      timeLabel: 'সুবিধাজনক সময়',
      messageLabel: 'বিশেষ কোনো নির্দেশনা বা প্রশ্ন',
      messagePlaceholder: 'চাবি হস্তান্তর, লোন সুবিধা বা অন্য কোনো বিস্তারিত জানতে লিখুন...',
      submitBtn: 'ভিজিট নিশ্চিত করুন',
      submitting: 'পাঠানো হচ্ছে...',
      officeTitle: 'অরা প্রাইভেট ক্লায়েন্ট লাউঞ্জ',
      officeAddress: 'রোড ৭৯, গুলশান-২ কূটনৈতিক এলাকা, ঢাকা ১২১২',
      officeHours: 'শনিবার – বৃহস্পতিবার: সকাল ৯:৩০ – সন্ধ্যা ৭:৩০',
      directPhone: '+৮৮০ ২ ৯৮৮৪৫০১ / +৮৮০ ১৮১৯ ০০০১১১',
      directEmail: 'concierge@aura-estates.com',
      successTitle: 'আপনার অ্যাপয়েন্টমেন্ট অনুরোধ পাঠানো হয়েছে',
      successNote: 'আমাদের সিনিয়র প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।',
      bookAnother: 'আরেকটি ভিজিট বুক করুন',
      needNamePhone: 'দয়া করে নাম এবং মোবাইল নম্বর প্রদান করুন।',
      failed: 'অনুরোধ পাঠানো যায়নি। আবার চেষ্টা করুন।',
    },
  }[lang];

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const propertyName = () => {
    const p = properties.find((x) => x._id === formData.propertyId);
    return p ? p.titleEn : 'General Inquiry';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.clientName.trim() || !formData.clientPhone.trim()) {
      setErrorMsg(t.needNamePhone);
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New viewing request: ${propertyName()}`,
          from_name: 'AURA Estates Website',
          name: formData.clientName,
          email: formData.clientEmail,
          phone: formData.clientPhone,
          property: propertyName(),
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          message: formData.message,
        }),
      });
      const data = await res.json();

      if (data.success) setSuccess(true);
      else setErrorMsg(data.message || t.failed);
    } catch {
      setErrorMsg(t.failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="inquiry" className="border-t border-line bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-bronze">{t.tag}</p>
              <h2 className="break-words font-serif-luxury text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl">
                {t.title}
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-muted sm:text-sm">{t.subtitle}</p>
            </div>

            <div className="space-y-4 rounded-xl border border-line bg-canvas p-5 shadow-card sm:p-6">
              <h4 className="font-serif-luxury text-base font-bold text-ink">{t.officeTitle}</h4>
              <p className="text-xs leading-relaxed text-muted">{t.officeAddress}</p>
              <div className="space-y-2 border-t border-line pt-4 text-xs text-ink-soft">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{t.officeHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span className="font-mono">{t.directPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>{t.directEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-8 md:p-10 lg:col-span-7">
            {success ? (
              <div className="space-y-4 py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-ink">{t.successTitle}</h3>
                <div className="inline-block w-full max-w-md rounded-xl border border-line bg-canvas p-4 text-left">
                  <div className="text-xs text-ink-soft">
                    <span className="text-muted">Property: </span>
                    {propertyName()}
                  </div>
                  <div className="mt-1 text-xs text-ink-soft">
                    <span className="text-muted">Contact: </span>
                    {formData.clientName} ({formData.clientPhone})
                  </div>
                </div>
                <p className="mx-auto max-w-md text-xs leading-relaxed text-muted">{t.successNote}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setFormData(emptyForm);
                  }}
                  className="mt-4 cursor-pointer rounded-lg border border-line px-6 py-2.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                >
                  {t.bookAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <User className="h-3.5 w-3.5 text-gold" />
                      {t.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={set('clientName')}
                      placeholder={t.namePlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Phone className="h-3.5 w-3.5 text-gold" />
                      {t.phoneLabel} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.clientPhone}
                      onChange={set('clientPhone')}
                      placeholder={t.phonePlaceholder}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <Mail className="h-3.5 w-3.5 text-gold" />
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={set('clientEmail')}
                      placeholder={t.emailPlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Building2 className="h-3.5 w-3.5 text-gold" />
                      {t.propertyLabel}
                    </label>
                    <select value={formData.propertyId} onChange={set('propertyId')} className={inputClass}>
                      <option value="general">{t.generalInquiry}</option>
                      {properties.map((p) => (
                        <option key={p._id} value={p._id}>
                          {bn ? p.titleBn : p.titleEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <Calendar className="h-3.5 w-3.5 text-gold" />
                      {t.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={set('preferredDate')}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Clock className="h-3.5 w-3.5 text-gold" />
                      {t.timeLabel}
                    </label>
                    <select value={formData.preferredTime} onChange={set('preferredTime')} className={inputClass}>
                      <option>10:00 AM - 12:00 PM</option>
                      <option>02:00 PM - 04:00 PM</option>
                      <option>05:00 PM - 07:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t.messageLabel}</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={set('message')}
                    placeholder={t.messagePlaceholder}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3.5 text-center text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? t.submitting : t.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;