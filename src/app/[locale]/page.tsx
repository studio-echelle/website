import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { Statement } from '@/components/home/Statement';
import { Services } from '@/components/home/Services';
import { ContactCTA } from '@/components/home/ContactCTA';

function Divider() {
  return <div className="section-divider" />;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Divider />
      <Marquee />
      <Divider />
      <Statement />
      <Divider />
      <Services />
      <Divider />
      <ContactCTA />
    </>
  );
}
