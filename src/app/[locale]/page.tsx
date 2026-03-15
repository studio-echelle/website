import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { Statement } from '@/components/home/Statement';
import { Services } from '@/components/home/Services';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Statement />
      <Services />
    </>
  );
}
