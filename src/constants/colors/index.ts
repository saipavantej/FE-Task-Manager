export const Color = {
  BRAND_PRIMARY_DARK: 'rgb(9, 108, 104)',
  BRAND_PRIMARY_DEFAULT: 'rgb(36, 161, 156)',
  BRAND_PRIMARY_BACKGROUND: 'rgb(242, 249, 249)',
  BRAND_PRIMARY_FOCUSED: 'rgb(158, 210, 208)',
  BRAND_PRIMARY_PRESSED: 'rgb(6, 79, 76)',
  BRAND_PRIMARY_LINE: 'rgb(147, 216, 213)',
  NEUTRAL_PRIMARY: 'rgb(27, 28, 31)',
  NEUTRAL_SECONDARY: 'rgb(118, 126, 140)',
  NEUTRAL_LINE: 'rgb(224, 229, 237)',
  NEUTRAL_GHOST: 'rgb(169, 176, 197)',
  NEUTRAL_BACKGROUND: 'rgb(246, 247, 249)',
  NEUTRAL_WHITE: 'rgb(255, 255, 255)',
  SUCCESS_DARK: 'rgb(17, 122, 122)',
  SUCCESS_DEFAULT: 'rgb(23, 161, 161)',
  SUCCESS_BACKGROUND: 'rgb(227, 243, 243)',
  SUCCESS_FOCUSED: 'rgb(184, 215, 215)',
  SUCCESS_PRESSED: 'rgb(15, 102, 102)',
  SUCCESS_LINE: 'rgb(139, 208, 208)',
  ERROR_DARK: 'rgb(204, 58, 85)',
  ERROR_DEFAULT: 'rgb(255, 72, 106)',
  ERROR_BACKGROUND: 'rgb(255, 233, 237)',
  ERROR_FOCUSED: 'rgb(240, 196, 204)',
  ERROR_PRESSED: 'rgb(178, 50, 74)',
  ERROR_LINE: 'rgb(255, 163, 180)',
  WARNING_DARK: 'rgb(224, 116, 15)',
  WARNING_DEFAULT: 'rgb(253, 131, 17)',
  WARNING_BACKGROUND: 'rgb(254, 240, 226)',
  WARNING_FOCUSED: 'rgb(246, 213, 183)',
  WARNING_PRESSED: 'rgb(204, 106, 14)',
  WARNING_LINE: 'rgb(254, 193, 136)',
  WHITE: '#FFFFFF',
  BLACK: '#1B1C1F',
  TODO_TASK: '#F5D155',
  IN_PROGRESS_TASK: '#F09643',
  COMPLETED_TASK: '#E86C62',
};

export type ColorOptions = keyof typeof Color;

export const getColor = (key: ColorOptions): string => {
  if (key in Color) {
    return Color[key];
  } else {
    return key;
  }
};
