/**
 * Project data — all 21 projects with Cloudinary image URLs.
 * Used as fallback when Sanity CMS has no content.
 * Narratives marked [DRAFT] need client review.
 */

const CLD = 'https://res.cloudinary.com/darx0pq1z/image/upload/f_auto,q_auto:good';

function hero(slug: string, w = 2400) {
  return `${CLD},w_${w}/se/projects/${slug}/gallery/hero`;
}

function gallery(slug: string, ids: number[], w = 1400) {
  return ids.map((id) => `${CLD},w_${w}/se/projects/${slug}/gallery/${id}`);
}

export interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  category: 'residential' | 'commercial' | 'hospitality';
  location: string;
  year: number;
  areaSqm?: number;
  scope: string;
  heroImageUrl: string;
  narrative: string;
  galleryUrls: string[];
}

export const ALL_PROJECTS: ProjectData[] = [
  // ═══════════════════════════════════════
  // RESIDENTIAL
  // ═══════════════════════════════════════
  {
    _id: 'r-aaa-villa',
    title: 'AAA Villa',
    slug: 'aaa-villa',
    category: 'residential',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design',
    heroImageUrl: hero('aaa-villa'),
    narrative:
      'A grand residential villa where scale meets intimacy. The design language draws on warm material palettes — brushed stone, oiled timber, and handcrafted metal detailing — to create spaces that feel both expansive and deeply personal. Double-height living areas are tempered by layered lighting and soft textiles, while private quarters retreat into quieter, cocooning tones. The result is a home that moves fluidly between entertaining and solitude, with every transition considered.',
    galleryUrls: gallery('aaa-villa', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  },
  {
    _id: 'r-gv003',
    title: 'Private Villa GV003',
    slug: 'gv003',
    category: 'residential',
    location: 'Qetaifan Island, Qatar',
    year: 2025,
    scope: 'Full — Concept + Supervision + Fit-Out',
    // No hero image uploaded — use image 1 as hero
    heroImageUrl: `${CLD},w_2400/se/projects/gv003/gallery/1`,
    narrative:
      'A refined contemporary home where simplicity, light, and natural textures define the living experience. The interior approach balances clean architectural lines with a warm, inviting palette, allowing natural light to animate the spaces throughout the day. Expansive glazing frames garden views, seamlessly connecting indoor and outdoor living. Organic elements — stone finishes, wood details, and lush greenery — add depth and calm to the home\'s modern minimalism.',
    galleryUrls: gallery('gv003', [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
  },
  {
    _id: 'r-althawadi',
    title: 'Al Thawadi Residence',
    slug: 'althawadi',
    category: 'residential',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design',
    heroImageUrl: hero('althawadi'),
    narrative:
      'A family residence reimagined around the rhythms of daily life. Natural stone floors ground the living spaces, while bespoke joinery in warm walnut tones provides both storage and sculptural presence. The palette — cream, sand, and muted olive — reflects the surrounding landscape, creating an interior that feels rooted and calm. Generous glazing draws the garden inward, blurring the threshold between inside and out.',
    galleryUrls: gallery('althawadi', [1, 2, 3, 4, 5, 6]),
  },
  {
    _id: 'r-am-residence',
    title: 'AM Residence',
    slug: 'am-residence',
    category: 'residential',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design',
    heroImageUrl: hero('am-residence'),
    narrative:
      'A contemporary apartment that elevates compact living through material richness and spatial precision. Every surface is considered — fluted panels, integrated lighting channels, and seamless cabinetry create a sense of quiet luxury without excess. The open-plan living area flows into a chef\'s kitchen finished in honed marble and brushed brass, while bedrooms offer retreats of softness and warmth.',
    galleryUrls: gallery('am-residence', [1, 2, 3, 4, 5, 6]),
  },
  {
    _id: 'r-gv007',
    title: 'Private Villa GV007',
    slug: 'gv007',
    category: 'residential',
    location: 'Qetaifan Island, Qatar',
    year: 2025,
    scope: 'Interior Design + Fit-Out Supervision',
    heroImageUrl: hero('gv007'),
    narrative:
      'A villa that marries bold geometry with organic warmth. Curved plaster walls soften the architecture\'s angular framework, creating unexpected moments of intimacy within the open plan. A restrained palette of ivory, charcoal, and terracotta runs through the home, anchored by large-format natural stone and bespoke metal screens. The design treats light as material — skylights, clerestory windows, and recessed coves sculpt the interior throughout the day.',
    galleryUrls: gallery('gv007', [1, 2, 3, 4, 5, 6]),
  },
  {
    _id: 'r-lusail-villa',
    title: 'Lusail Villa',
    slug: 'lusail-villa',
    category: 'residential',
    location: 'Lusail, Qatar',
    year: 2025,
    scope: 'Full — Concept + Supervision + Fit-Out',
    heroImageUrl: hero('lusail-villa'),
    narrative:
      'A flagship residential project in Lusail that sets a new benchmark for contemporary Gulf living. Spanning multiple levels, the design unfolds through a sequence of curated experiences — from a sculptural double-height entrance to intimate family quarters above. Materials are tactile and enduring: travertine, blackened steel, hand-plastered walls, and floor-to-ceiling timber screens. The landscape is integral, with courtyards, water features, and rooftop terraces extending the living space outward.',
    galleryUrls: gallery('lusail-villa', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  },

  // ═══════════════════════════════════════
  // HOSPITALITY
  // ═══════════════════════════════════════
  {
    _id: 'h-chariot-muscat',
    title: 'Chariot Muscat',
    slug: 'chariot-muscat',
    category: 'hospitality',
    location: 'Muscat, Oman',
    year: 2024,
    scope: 'Interior Design',
    heroImageUrl: hero('chariot-muscat'),
    narrative:
      'A hospitality concept in Muscat that channels the spirit of Omani craftsmanship into a modern dining experience. Arched openings, hand-laid zellige tilework, and carved stone detailing pay homage to the region\'s architectural heritage, while the spatial flow — from an intimate lounge to an open courtyard — invites guests on a deliberate journey. Warm ambient lighting and natural linen upholstery complete an atmosphere of refined ease.',
    galleryUrls: gallery('chariot-muscat', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  },
  {
    _id: 'h-pi',
    title: 'Pi',
    slug: 'pi',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2023,
    scope: 'Interior Design + Fit-Out Supervision',
    heroImageUrl: hero('pi'),
    narrative:
      'A contemporary dining destination where geometry and gastronomy converge. The circular motif — echoed in ceiling coffers, pendant clusters, and curved banquette seating — creates a sense of movement and rhythm. Dark walnut panelling contrasts with polished concrete and brass accents, establishing a moody, sophisticated atmosphere. The design balances acoustic intimacy with visual openness, ensuring each table feels considered.',
    galleryUrls: gallery('pi', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  },
  {
    _id: 'h-qallah',
    title: 'Qallah',
    slug: 'qallah',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design',
    heroImageUrl: hero('qallah'),
    narrative:
      'A fortress-inspired dining concept that reinterprets traditional Qatari architecture for a contemporary audience. Thick rammed-earth walls, deep-set windows, and layered arches create dramatic spatial depth, while a warm palette of ochre, umber, and burnished copper reinforces the sense of shelter and gathering. The design moves between communal and private, with elevated alcoves offering intimate dining within the larger hall.',
    galleryUrls: gallery('qallah', [1, 2, 3, 4, 5, 6]),
  },
  {
    _id: 'h-mezami',
    title: 'Mezami',
    slug: 'mezami',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design + Fit-Out Supervision',
    heroImageUrl: hero('mezami'),
    narrative:
      'A Japanese-inspired restaurant that distils the principles of wabi-sabi into a sensory dining experience. Raw timber, hand-finished plaster, and blackened steel create a material language of restrained beauty. The open kitchen anchors the space, framed by a dramatic shou sugi ban feature wall. Seating alternates between a long communal counter, intimate booths, and a private tatami room — each offering a distinct perspective on the culinary theatre.',
    galleryUrls: gallery('mezami', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
  },
  {
    _id: 'h-kyoto',
    title: 'Kyoto',
    slug: 'kyoto',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2023,
    scope: 'Interior Design',
    heroImageUrl: hero('kyoto'),
    narrative:
      'A refined Japanese dining experience that translates Kyoto\'s meditative calm into an urban setting. Sliding shoji-inspired screens, a carefully composed rock garden entry, and layered timber lattice work establish a sequence of threshold moments. The palette is deliberately muted — charcoal, ash, and natural linen — allowing the food to provide all the colour.',
    galleryUrls: gallery('kyoto', [1, 2, 3, 4, 5]),
  },
  {
    _id: 'h-turqiouse',
    title: 'Turquoise',
    slug: 'turqiouse',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2023,
    scope: 'Interior Design',
    heroImageUrl: hero('turqiouse'),
    narrative:
      'A coastal-inspired café where Mediterranean lightness meets Gulf hospitality. The signature turquoise hue appears in hand-glazed tile, custom upholstery, and a striking bar front, set against a backdrop of whitewashed walls and natural rattan. The layout encourages lingering — from sunlit window seats to a shaded outdoor terrace framed by trailing greenery.',
    galleryUrls: gallery('turqiouse', [1, 2, 3]),
  },
  {
    _id: 'h-fold',
    title: 'Fold',
    slug: 'fold',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design',
    heroImageUrl: hero('fold'),
    narrative:
      'A specialty coffee concept built around the idea of the fold — layered surfaces, pleated metal screens, and origami-like ceiling planes that create visual complexity from simple gestures. The material palette is tightly edited: poured concrete, birch plywood, and matte black steel. Every element serves the ritual of coffee, from the precision pour-over bar to the carefully angled display shelving.',
    galleryUrls: gallery('fold', [1, 2, 3, 4, 5, 6]),
  },
  {
    _id: 'h-encase',
    title: 'Encase',
    slug: 'encase',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2023,
    scope: 'Interior Design',
    heroImageUrl: hero('encase'),
    narrative:
      'A compact retail and hospitality concept wrapped in a singular material idea — the enclosure. Perforated metal cladding, deep reveals, and inset display niches create a jewel-box atmosphere where every product is framed and celebrated. The interior is deliberately intimate, drawing visitors into a world of curated detail.',
    galleryUrls: gallery('encase', [1, 2]),
  },
  {
    _id: 'h-zawya',
    title: 'Zawya',
    slug: 'zawya',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design + Fit-Out Supervision',
    heroImageUrl: hero('zawya'),
    narrative:
      'A neighbourhood gathering place that draws on the Arabic concept of the zawya — a corner, a meeting point. The design layers traditional elements (mashrabiya screens, arched doorways, hand-painted tile) with modern comforts (custom banquette seating, integrated sound design, warm ambient lighting). The result is a space that feels both heritage-rich and entirely of its moment.',
    galleryUrls: gallery('zawya', [1, 2, 3, 4, 5, 6, 7]),
  },
  {
    _id: 'h-pi-2',
    title: 'Pi 2',
    slug: 'pi-2',
    category: 'hospitality',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design',
    heroImageUrl: hero('pi-2'),
    narrative:
      'The second chapter of the Pi brand — a fresh interpretation that builds on the original\'s geometric language while introducing a lighter, more playful material palette. Terrazzo surfaces, curved plaster walls, and a signature olive-green accent create a daytime energy distinct from the original\'s evening mood. The open kitchen remains central, now framed by an arched pass that invites guests deeper into the experience.',
    galleryUrls: gallery('pi-2', [1, 2, 3, 4]),
  },

  // ═══════════════════════════════════════
  // COMMERCIAL / RETAIL / LIFESTYLE
  // ═══════════════════════════════════════
  {
    _id: 'c-50-90-studio',
    title: '50-90 Studio',
    slug: '50-90-studio',
    category: 'commercial',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design + Fit-Out Supervision',
    heroImageUrl: hero('50-90-studio'),
    narrative:
      'A creative studio space designed as a canvas for the work it houses. Exposed ceiling services, polished concrete floors, and a neutral grey palette recede to let the studio\'s output take centre stage. Flexible partitioning, integrated pin-up walls, and generous task lighting support a working rhythm that shifts between focused production and collaborative review.',
    galleryUrls: gallery('50-90-studio', [1, 2, 3, 4, 5, 6, 7]),
  },
  {
    _id: 'c-private-welness-retreat',
    title: 'Private Wellness Retreat',
    slug: 'private-welness-retreat',
    category: 'commercial',
    location: 'Doha, Qatar',
    year: 2025,
    scope: 'Full — Concept + Supervision + Fit-Out',
    heroImageUrl: hero('private-welness-retreat'),
    narrative:
      'A sanctuary designed to dissolve the boundary between architecture and wellbeing. Every material — honed limestone, warm cedar, hand-trowelled plaster — is chosen for its tactile and calming qualities. The journey moves from an arrival courtyard through a series of progressively more intimate spaces: hydrotherapy suite, treatment rooms, meditation garden, and a private plunge pool. Natural light is carefully choreographed, filtering through slatted timber screens that shift the atmosphere hour by hour.',
    galleryUrls: gallery('private-welness-retreat', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
  },
  {
    _id: 'c-nkraft-showroom',
    title: 'Nkraft Showroom',
    slug: 'nkraft-showroom',
    category: 'commercial',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design',
    heroImageUrl: hero('nkraft-showroom'),
    narrative:
      'A material showroom that practices what it sells — the space itself becomes the ultimate product demonstration. Raw concrete, exposed aggregate, and unfinished timber are arranged in a gallery-like sequence, allowing each finish to speak on its own terms. Integrated sample stations and a consultation lounge support the commercial function without competing with the materials on display.',
    galleryUrls: gallery('nkraft-showroom', [1, 2, 3, 4]),
  },
  {
    _id: 'c-blue-salon',
    title: 'Blue Salon',
    slug: 'blue-salon',
    category: 'commercial',
    location: 'Doha, Qatar',
    year: 2024,
    scope: 'Interior Design + Fit-Out Supervision',
    heroImageUrl: hero('blue-salon'),
    narrative:
      'A premium beauty destination where colour, light, and reflection converge. The signature blue — a deep, saturated cobalt — anchors the scheme, appearing in custom tile, lacquered cabinetry, and velvet upholstery. Mirrored surfaces and brass detailing amplify the sense of luxury, while individual treatment stations are designed as private retreats within the open salon floor.',
    galleryUrls: gallery('blue-salon', [1, 2, 3, 4, 5, 6, 7, 8]),
  },
  {
    _id: 'c-be-pilates',
    title: 'Be Pilates',
    slug: 'be-pilates',
    category: 'commercial',
    location: 'Doha, Qatar',
    year: 2023,
    scope: 'Interior Design',
    heroImageUrl: hero('be-pilates'),
    narrative:
      'A boutique Pilates studio that elevates the workout environment to match the discipline\'s emphasis on precision and control. Clean lines, full-height mirrors, and a restrained palette of white, blush, and natural oak create a space of focused calm. Equipment is arranged with generous spacing, and soft indirect lighting ensures the atmosphere remains serene from the first stretch to the final cool-down.',
    galleryUrls: gallery('be-pilates', [1, 2, 3, 4, 5, 6, 7]),
  },
];

/** Lookup by slug */
export const PROJECT_MAP = Object.fromEntries(
  ALL_PROJECTS.map((p) => [p.slug, p]),
);
