import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact — Studio Échelle',
  description:
    'Get in touch with Studio Échelle for your next interior design, architecture, or landscape project in the GCC and beyond.',
};

export default function ContactPage() {
  return <ContactClient />;
}
