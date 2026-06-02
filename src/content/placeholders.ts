export type PlaceholderSection =
  | 'ai'
  | 'motion'
  | 'graphic-illustration'
  | 'graphic-digital'
  | 'graphic-book'
  | 'art-negargari'
  | 'art-golomorgh'
  | 'art-tazhib'
  | 'exhibition-dafineh'
  | 'exhibition-rezaabbasi';

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

// Default palette used for every placeholder (will switch to user's accent later).
const basePalette = { paper: '#F4F4F4', ink: '#1B1B1B', accent: '#3FA9F5', shadow: '#D9D9D9' };

export const placeholderProjects: PlaceholderProject[] = [
  {
    section: 'ai',
    slug: 'sample-01',
    title: 'مجموعهٔ هوش مصنوعی — به‌زودی',
    year: '۱۴۰۴',
    medium: 'هوش مصنوعی',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/ai/sample-01',
    design: { seed: 11, posterVariant: 'stack', palette: basePalette },
  },
  {
    section: 'motion',
    slug: 'sample-01',
    title: 'مجموعهٔ موشن گرافیک — به‌زودی',
    year: '۱۴۰۴',
    medium: 'موشن گرافیک',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/motion/sample-01',
    design: { seed: 25, posterVariant: 'split', palette: basePalette },
  },
  {
    section: 'graphic-illustration',
    slug: 'sample-01',
    title: 'تصویرسازی — به‌زودی',
    year: '۱۴۰۴',
    medium: 'تصویرسازی',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/graphic-illustration/sample-01',
    design: { seed: 39, posterVariant: 'ledger', palette: basePalette },
  },
  {
    section: 'graphic-digital',
    slug: 'sample-01',
    title: 'دیجیتال آرت — به‌زودی',
    year: '۱۴۰۴',
    medium: 'دیجیتال آرت',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/graphic-digital/sample-01',
    design: { seed: 44, posterVariant: 'stack', palette: basePalette },
  },
  {
    section: 'graphic-book',
    slug: 'sample-01',
    title: 'صفحه‌آرایی و جلد کتاب — به‌زودی',
    year: '۱۴۰۴',
    medium: 'صفحه‌آرایی و جلد کتاب',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/graphic-book/sample-01',
    design: { seed: 58, posterVariant: 'split', palette: basePalette },
  },
  {
    section: 'art-negargari',
    slug: 'sample-01',
    title: 'نگارگری — به‌زودی',
    year: '۱۴۰۴',
    medium: 'نگارگری',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/art-negargari/sample-01',
    design: { seed: 63, posterVariant: 'ledger', palette: basePalette },
  },
  {
    section: 'art-golomorgh',
    slug: 'sample-01',
    title: 'گل و مرغ — به‌زودی',
    year: '۱۴۰۴',
    medium: 'گل و مرغ',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/art-golomorgh/sample-01',
    design: { seed: 72, posterVariant: 'stack', palette: basePalette },
  },
  {
    section: 'art-tazhib',
    slug: 'sample-01',
    title: 'تذهیب — به‌زودی',
    year: '۱۴۰۴',
    medium: 'تذهیب',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/art-tazhib/sample-01',
    design: { seed: 89, posterVariant: 'split', palette: basePalette },
  },
  {
    section: 'exhibition-dafineh',
    slug: 'sample-01',
    title: 'موزه دفینهٔ تهران — به‌زودی',
    year: '۱۴۰۴',
    medium: 'نمایشگاه',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/exhibition-dafineh/sample-01',
    design: { seed: 95, posterVariant: 'ledger', palette: basePalette },
  },
  {
    section: 'exhibition-rezaabbasi',
    slug: 'sample-01',
    title: 'موزه رضا عباسی تهران — به‌زودی',
    year: '۱۴۰۴',
    medium: 'نمایشگاه',
    dimensions: '—',
    sortDate: '2025-06-01',
    gitignorePath: 'src/content/exhibition-rezaabbasi/sample-01',
    design: { seed: 103, posterVariant: 'stack', palette: basePalette },
  },
];
