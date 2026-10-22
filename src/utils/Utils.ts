import { COLORS } from '../assets/themes/colors';

export const getColorFromName = (name?: string) => {
  if (!name || !name.trim()) {
    return COLORS.PROFILE_COLORS[0];
  }

  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return COLORS.PROFILE_COLORS[Math.abs(hash) % COLORS.PROFILE_COLORS.length];
};

export const getInitialFromName = (name?: string) => {
  if (!name || !name.trim()) return '?';
  return name.trim().charAt(0).toUpperCase();
};

const FALLBACK_TEXT = '-';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const textOrFallback = (value?: string | number | null) =>
  String(value ?? '').trim() || FALLBACK_TEXT;

export const formatDate = (value?: string | null) => {
  if (!value) return FALLBACK_TEXT;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return FALLBACK_TEXT;
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatMobile = (code?: string | null, mobile?: string | null) => {
  let number = mobile?.trim() ?? '';
  if (!number) return FALLBACK_TEXT;
  // Some records come back in scientific notation, e.g. "8.972109876E9".
  if (/e/i.test(number) && Number.isFinite(Number(number))) {
    number = Number(number).toFixed(0);
  }
  return code?.trim() ? `+${code.trim()} ${number}` : number;
};
