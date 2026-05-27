export type PlaceholderSection = 'ai' | 'miniature' | 'graphic' | 'other';
export type PosterVariant = 'stack' | 'split' | 'ledger';

export interface PlaceholderDesign {
  seed: number;
  posterVariant: PosterVariant;
  palette: {
    paper: string;
    ink: string;
    accent: string;
    shadow: string;
  };
}

export interface PlaceholderProject {
  section: PlaceholderSection;
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  sortDate: string;
  gitignorePath: string;
  design: PlaceholderDesign;
}

const ai = 'هوش مصنوعی';
const miniature = 'نگارگری و گل و مرغ';
const graphic = 'گرافیک';
const other = 'سایر';

export const placeholderProjects: PlaceholderProject[] = [
  // ─── AI ──────────────────────────────────────────────────────────────
  {
    section: 'ai',
    slug: 'collection-01',
    title: 'مجموعهٔ اول',
    year: '۱۴۰۴',
    medium: ai,
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/ai/collection-01',
    design: {
      seed: 11,
      posterVariant: 'stack',
      palette: { paper: '#F1E7D1', ink: '#1F2632', accent: '#2E5BFF', shadow: '#C8B98F' },
    },
  },
  {
    section: 'ai',
    slug: 'collection-02',
    title: 'مجموعهٔ دوم',
    year: '۱۴۰۴',
    medium: ai,
    dimensions: '—',
    sortDate: '2025-09-01',
    gitignorePath: 'src/content/ai/collection-02',
    design: {
      seed: 25,
      posterVariant: 'split',
      palette: { paper: '#EFE0C0', ink: '#1B1B1B', accent: '#C73E1D', shadow: '#C2A876' },
    },
  },
  // ─── MINIATURE & GOL-O-MORGH ─────────────────────────────────────────
  {
    section: 'miniature',
    slug: 'gol-o-morgh-01',
    title: 'گل و مرغ — مجموعهٔ اول',
    year: '۱۴۰۳',
    medium: miniature,
    dimensions: '—',
    sortDate: '2024-04-01',
    gitignorePath: 'src/content/miniature/gol-o-morgh-01',
    design: {
      seed: 39,
      posterVariant: 'ledger',
      palette: { paper: '#F5E6CA', ink: '#3A2A1F', accent: '#1F3A93', shadow: '#D4B888' },
    },
  },
  {
    section: 'miniature',
    slug: 'negargari-01',
    title: 'نگارگری — مجموعهٔ اول',
    year: '۱۴۰۴',
    medium: miniature,
    dimensions: '—',
    sortDate: '2025-02-01',
    gitignorePath: 'src/content/miniature/negargari-01',
    design: {
      seed: 44,
      posterVariant: 'stack',
      palette: { paper: '#F2E2C4', ink: '#2C1810', accent: '#3F704D', shadow: '#C9AE7E' },
    },
  },
  {
    section: 'miniature',
    slug: 'negargari-02',
    title: 'نگارگری — مجموعهٔ دوم',
    year: '۱۴۰۴',
    medium: miniature,
    dimensions: '—',
    sortDate: '2025-08-01',
    gitignorePath: 'src/content/miniature/negargari-02',
    design: {
      seed: 58,
      posterVariant: 'split',
      palette: { paper: '#F0DDB5', ink: '#3A1F0F', accent: '#D4AF37', shadow: '#C4A777' },
    },
  },
  // ─── GRAPHIC ─────────────────────────────────────────────────────────
  {
    section: 'graphic',
    slug: 'graphic-01',
    title: 'گرافیک — مجموعهٔ اول',
    year: '۱۴۰۳',
    medium: graphic,
    dimensions: '—',
    sortDate: '2024-07-01',
    gitignorePath: 'src/content/graphic/graphic-01',
    design: {
      seed: 63,
      posterVariant: 'ledger',
      palette: { paper: '#ECE5D5', ink: '#1B1B1B', accent: '#40C0CB', shadow: '#BBB29B' },
    },
  },
  {
    section: 'graphic',
    slug: 'graphic-02',
    title: 'گرافیک — مجموعهٔ دوم',
    year: '۱۴۰۴',
    medium: graphic,
    dimensions: '—',
    sortDate: '2025-05-01',
    gitignorePath: 'src/content/graphic/graphic-02',
    design: {
      seed: 72,
      posterVariant: 'stack',
      palette: { paper: '#EFE7D2', ink: '#222222', accent: '#F4A300', shadow: '#C0B597' },
    },
  },
  // ─── OTHER ───────────────────────────────────────────────────────────
  {
    section: 'other',
    slug: 'misc-01',
    title: 'سایر — مجموعهٔ اول',
    year: '۱۴۰۳',
    medium: other,
    dimensions: '—',
    sortDate: '2024-11-01',
    gitignorePath: 'src/content/other/misc-01',
    design: {
      seed: 89,
      posterVariant: 'split',
      palette: { paper: '#EBE3CF', ink: '#1B1B1B', accent: '#960018', shadow: '#BFB494' },
    },
  },
];
