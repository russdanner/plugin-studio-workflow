export interface ColorSwatch {
  id: string;
  hex: string;
  label: string;
}

/** Soft backgrounds for the kanban board canvas */
export const BOARD_BACKGROUND_SWATCHES: ColorSwatch[] = [
  { id: 'mist', hex: '#E8EEF4', label: 'Mist' },
  { id: 'cloud', hex: '#F0F4F8', label: 'Cloud' },
  { id: 'paper', hex: '#FAFAF9', label: 'Paper' },
  { id: 'snow', hex: '#F8FAFC', label: 'Snow' },
  { id: 'sky', hex: '#E0F2FE', label: 'Sky' },
  { id: 'ice', hex: '#F0F9FF', label: 'Ice' },
  { id: 'aqua', hex: '#ECFEFF', label: 'Aqua' },
  { id: 'mint', hex: '#D1FAE5', label: 'Mint' },
  { id: 'sage', hex: '#ECFDF5', label: 'Sage' },
  { id: 'fern', hex: '#DCFCE7', label: 'Fern' },
  { id: 'lavender', hex: '#EDE9FE', label: 'Lavender' },
  { id: 'lilac', hex: '#F5F3FF', label: 'Lilac' },
  { id: 'violet', hex: '#F3E8FF', label: 'Violet' },
  { id: 'blush', hex: '#FAE8FF', label: 'Blush' },
  { id: 'peach', hex: '#FFEDD5', label: 'Peach' },
  { id: 'apricot', hex: '#FFF7ED', label: 'Apricot' },
  { id: 'rose', hex: '#FFE4E6', label: 'Rose' },
  { id: 'coral', hex: '#FFF1F2', label: 'Coral' },
  { id: 'sand', hex: '#FEF3C7', label: 'Sand' },
  { id: 'honey', hex: '#FEF9C3', label: 'Honey' },
  { id: 'slate', hex: '#F1F5F9', label: 'Slate' },
  { id: 'stone', hex: '#F5F5F4', label: 'Stone' },
  { id: 'neutral', hex: '#F4F4F5', label: 'Neutral' },
  { id: 'dusk', hex: '#E2E8F0', label: 'Dusk' },
  { id: 'ocean', hex: '#DBEAFE', label: 'Ocean' },
  { id: 'seafoam', hex: '#CCFBF1', label: 'Seafoam' },
  { id: 'orchid', hex: '#DDD6FE', label: 'Orchid' },
  { id: 'linen', hex: '#FAF5FF', label: 'Linen' }
];

/** Accent colors for workflow steps (left rail stripe) */
export const STEP_COLOR_SWATCHES: ColorSwatch[] = [
  { id: 'blue', hex: '#2563EB', label: 'Blue' },
  { id: 'teal', hex: '#0D9488', label: 'Teal' },
  { id: 'green', hex: '#16A34A', label: 'Green' },
  { id: 'lime', hex: '#65A30D', label: 'Lime' },
  { id: 'amber', hex: '#D97706', label: 'Amber' },
  { id: 'orange', hex: '#EA580C', label: 'Orange' },
  { id: 'red', hex: '#DC2626', label: 'Red' },
  { id: 'pink', hex: '#DB2777', label: 'Pink' },
  { id: 'purple', hex: '#9333EA', label: 'Purple' },
  { id: 'indigo', hex: '#4F46E5', label: 'Indigo' },
  { id: 'cyan', hex: '#0891B2', label: 'Cyan' },
  { id: 'graphite', hex: '#475569', label: 'Graphite' }
];

const LEGACY_STEP_HEX: Record<string, string> = {
  black: '#475569',
  blue: '#2563EB',
  green: '#16A34A',
  lime: '#65A30D',
  orange: '#EA580C',
  pink: '#DB2777',
  purple: '#9333EA',
  red: '#DC2626',
  sky: '#0891B2',
  yellow: '#D97706'
};

const swatchById = (swatches: ColorSwatch[]) =>
  swatches.reduce<Record<string, ColorSwatch>>((acc, swatch) => {
    acc[swatch.id] = swatch;
    return acc;
  }, {});

const BOARD_BY_ID = swatchById(BOARD_BACKGROUND_SWATCHES);
const STEP_BY_ID = swatchById(STEP_COLOR_SWATCHES);

function isCssColor(value: string): boolean {
  return value.startsWith('#') || /^rgba?\(/i.test(value) || /^hsla?\(/i.test(value);
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

export function resolveBoardBackgroundColor(value: string | undefined | null): string {
  const fallback = BOARD_BACKGROUND_SWATCHES[0].hex;
  if (!value?.trim()) {
    return fallback;
  }
  const trimmed = value.trim();
  if (isCssColor(trimmed)) {
    return trimmed;
  }
  if (isHttpUrl(trimmed)) {
    return fallback;
  }
  return BOARD_BY_ID[trimmed]?.hex ?? LEGACY_STEP_HEX[trimmed.toLowerCase()] ?? fallback;
}

export function resolveStepColor(value: string | undefined | null): string {
  const fallback = STEP_COLOR_SWATCHES[0].hex;
  if (!value?.trim()) {
    return fallback;
  }
  const trimmed = value.trim();
  if (isCssColor(trimmed)) {
    return trimmed;
  }
  return STEP_BY_ID[trimmed]?.hex ?? LEGACY_STEP_HEX[trimmed.toLowerCase()] ?? fallback;
}

export function normalizeBoardBackgroundId(value: string | undefined | null): string {
  if (!value?.trim() || isHttpUrl(value.trim())) {
    return BOARD_BACKGROUND_SWATCHES[0].id;
  }
  const trimmed = value.trim();
  if (BOARD_BY_ID[trimmed]) {
    return trimmed;
  }
  if (isCssColor(trimmed)) {
    const match = BOARD_BACKGROUND_SWATCHES.find((s) => s.hex.toLowerCase() === trimmed.toLowerCase());
    return match?.id ?? BOARD_BACKGROUND_SWATCHES[0].id;
  }
  return BOARD_BACKGROUND_SWATCHES[0].id;
}

export function normalizeStepColorId(value: string | undefined | null): string {
  if (!value?.trim()) {
    return STEP_COLOR_SWATCHES[0].id;
  }
  const trimmed = value.trim();
  if (STEP_BY_ID[trimmed]) {
    return trimmed;
  }
  if (LEGACY_STEP_HEX[trimmed.toLowerCase()]) {
    const legacy = trimmed.toLowerCase();
    const match = STEP_COLOR_SWATCHES.find((s) => s.id === legacy);
    if (match) {
      return match.id;
    }
    const byHex = STEP_COLOR_SWATCHES.find((s) => s.hex === LEGACY_STEP_HEX[legacy]);
    return byHex?.id ?? STEP_COLOR_SWATCHES[0].id;
  }
  if (isCssColor(trimmed)) {
    const match = STEP_COLOR_SWATCHES.find((s) => s.hex.toLowerCase() === trimmed.toLowerCase());
    return match?.id ?? STEP_COLOR_SWATCHES[0].id;
  }
  return STEP_COLOR_SWATCHES[0].id;
}

/** @deprecated use STEP_COLOR_SWATCHES */
export const STEP_COLOR_OPTIONS = STEP_COLOR_SWATCHES.map((s) => s.id);
