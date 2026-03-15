import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-hero">{t('getInTouch')}</h1>
        <p className="text-label text-[var(--color-mid)] mt-6">
          Studio Echelle
        </p>
      </div>
    </section>
  );
}
