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
  // ai placeholder removed — real videos live in ai/collection/
  // motion placeholder removed — real videos live in motion/collection/
  // graphic-illustration placeholder removed — real images live in collection/
  // graphic-digital and graphic-book placeholders removed — real content lives in their /collection/ folders
  // art-negargari, art-golomorgh, art-tazhib placeholders removed — real content lives in their /collection/ folders now.
  // exhibition placeholders removed — real images live in their /collection/ folders
];
