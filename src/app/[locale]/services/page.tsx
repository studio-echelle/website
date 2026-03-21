import type { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services — Studio Échelle',
  description:
    'Interior design, architectural design, landscape design, fit-out supervision, and project management by Studio Échelle.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
