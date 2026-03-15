import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <main>
      <section style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <h1>Studio Echelle</h1>
        <p>{t('getInTouch')}</p>
      </section>
    </main>
  );
}
