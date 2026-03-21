import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About — Studio Échelle',
  description:
    'The people and philosophy behind Studio Échelle — a luxury interior design and architecture studio based in Doha, Qatar.',
};

const TEAM = [
  { _id: 't1', name: 'Bashar Hudhud', title: 'Co-Founder & Managing Partner', portraitUrl: 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good,w_600,h_800,c_fill,g_face/bashar-hudhud_jyjddm' },
  { _id: 't2', name: 'Rana Abdul Majeed', title: 'Co-Founder & Creative Director', portraitUrl: 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good,w_600,h_800,c_fill,g_face/rana-abdul-majeed_qpa4rq' },
  { _id: 't3', name: 'Gamze Erdogan', title: 'Interior Architect', portraitUrl: 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good,w_600,h_800,c_fill,g_face/gamze-erdogan_xi1djb' },
  { _id: 't4', name: 'Milica Urosevic', title: 'Interior Architect', portraitUrl: 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good,w_600,h_800,c_fill,g_face/milica-urosevic_sagd07' },
  { _id: 't5', name: 'Loor Skafe', title: 'Interior Designer', portraitUrl: 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good,w_600,h_800,c_fill,g_face/loor-skafe_xjcxhi' },
  { _id: 't6', name: 'Stefan Andrei', title: '3D Artist', portraitUrl: 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good,w_600,h_800,c_fill,g_face/stefan-andrei_ti6shw' },
];

export default function AboutPage() {
  return <AboutClient team={TEAM} />;
}
