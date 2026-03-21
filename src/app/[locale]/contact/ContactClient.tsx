'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { loadGsap, getGsap } from '@/lib/gsap';

const PROJECT_TYPE_KEYS = ['residential', 'commercial', 'hospitality', 'landscape', 'other'] as const;
const BUDGET_KEYS = ['under500k', '500k1m', '1m3m', '3mPlus', 'preferNot'] as const;

export function ContactClient() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted && successRef.current) {
      const el = successRef.current;
      loadGsap().then(() => {
        const gsap = getGsap();
        if (gsap) gsap.from(el, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out' });
      });
    }
  }, [submitted]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      projectType: (form.elements.namedItem('projectType') as HTMLSelectElement).value,
      location: (form.elements.namedItem('location') as HTMLInputElement).value,
      budget: (form.elements.namedItem('budget') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to send enquiry');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-white/[0.12] py-4 text-[var(--color-bg)] placeholder:text-[var(--color-mid)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300';
  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  };

  return (
    <div className="bg-[var(--color-dark)] min-h-screen pb-20 lg:pb-32" style={{ paddingTop: '160px' }}>
      <div className="container">
        {/* Page heading */}
        <h1
          className="text-[var(--color-bg)] mb-16 lg:mb-20"
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 300,
            fontSize: 'clamp(48px, 6vw, 72px)',
            lineHeight: 1.1,
          }}
        >
          Get in Touch
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            {!submitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
                <div>
                  <label className="text-[var(--color-mid)] block mb-3" style={labelStyle}>{t('fullName')} *</label>
                  <input name="name" type="text" required className={inputClass} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }} />
                </div>
                <div>
                  <label className="text-[var(--color-mid)] block mb-3" style={labelStyle}>{t('company')}</label>
                  <input name="company" type="text" className={inputClass} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="text-[var(--color-mid)] block mb-3" style={labelStyle}>{t('email')} *</label>
                    <input name="email" type="email" required className={inputClass} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }} />
                  </div>
                  <div>
                    <label className="text-[var(--color-mid)] block mb-3" style={labelStyle}>{t('phone')}</label>
                    <input name="phone" type="tel" className={inputClass} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="text-[var(--color-mid)] block mb-3" style={labelStyle}>{t('projectType')} *</label>
                    <select name="projectType" required className={`${inputClass} bg-[var(--color-dark)]`} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }}>
                      <option value="">{t('select')}</option>
                      {PROJECT_TYPE_KEYS.map((k) => (
                        <option key={k} value={t(`projectTypes.${k}`)}>{t(`projectTypes.${k}`)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[var(--color-mid)] block mb-3" style={labelStyle}>{t('budgetRange')}</label>
                    <select name="budget" className={`${inputClass} bg-[var(--color-dark)]`} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }}>
                      <option value="">{t('select')}</option>
                      {BUDGET_KEYS.map((k) => (
                        <option key={k} value={t(`budgetRanges.${k}`)}>{t(`budgetRanges.${k}`)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[var(--color-mid)] block mb-3" style={labelStyle}>{t('projectLocation')}</label>
                  <input name="location" type="text" className={inputClass} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }} />
                </div>
                <div>
                  <label className="text-[var(--color-mid)] block mb-3" style={labelStyle}>{t('message')} *</label>
                  <textarea name="message" required rows={5} className={`${inputClass} resize-none`} style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }} />
                </div>

                {error && (
                  <p className="text-red-400 text-sm" style={{ fontFamily: 'var(--font-body), sans-serif' }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-10 py-4 transition-colors duration-300 disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  {sending ? t('sending') : t('sendEnquiry')}
                </button>
              </form>
            ) : (
              <div ref={successRef} className="flex items-center min-h-[400px]">
                <p className="text-[var(--color-bg)]" style={{ fontFamily: 'var(--font-display), serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 300, lineHeight: 1.4 }}>
                  {t('thankYou')}
                </p>
              </div>
            )}
          </div>

          <div className="lg:pt-4">
            <p className="text-[var(--color-bg)] mb-12" style={{ fontFamily: 'var(--font-display), serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '0.02em' }}>
              Studio Échelle
            </p>
            <div className="space-y-5">
              <a href="mailto:hello@studioechelle.com" className="block text-[var(--color-bg)]/80 hover:text-[var(--color-accent-hover)] transition-colors duration-300" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }}>hello@studioechelle.com</a>
              <a href="tel:+97451218333" className="block text-[var(--color-bg)]/80 hover:text-[var(--color-accent-hover)] transition-colors duration-300" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }}>+974 5121 8333</a>
              <p className="text-[var(--color-mid)]" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }}>The Pearl, Doha, Qatar</p>
              <a href="https://instagram.com/studioechelle" target="_blank" rel="noopener noreferrer" className="block text-[var(--color-bg)]/80 hover:text-[var(--color-accent-hover)] transition-colors duration-300" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px' }}>@studioechelle</a>
            </div>
            <div className="border-t border-white/[0.08] my-10" />
            <p className="text-[var(--color-mid)]" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', lineHeight: 1.6 }}>
              {t('officeHours')}
            </p>
            <div className="border-t border-white/[0.08] mt-10 pt-10">
              <p
                className="text-[var(--color-mid)]"
                style={{
                  fontFamily: 'var(--font-display), serif',
                  fontSize: '20px',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;We design with love, for form, for material, and for the people who live with our work.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
