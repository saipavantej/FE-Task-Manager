import platformCheck from '@utils/platformCheck';
import {getScaledDimension} from '@utils/scaleDimension';
import {TextStyle} from 'react-native';

const FontSize = {
  FONT_SIZE_10: getScaledDimension(10, 'font'),
  FONT_SIZE_12: getScaledDimension(12, 'font'),
  FONT_SIZE_14: getScaledDimension(14, 'font'),
  FONT_SIZE_16: getScaledDimension(16, 'font'),
  FONT_SIZE_18: getScaledDimension(18, 'font'),
  FONT_SIZE_24: getScaledDimension(24, 'font'),
  FONT_SIZE_26: getScaledDimension(26, 'font'),
  FONT_SIZE_28: getScaledDimension(28, 'font'),
};

const FontWeight = {
  FONT_WEIGHT_400: '400',
  FONT_WEIGHT_500: '500',
  FONT_WEIGHT_600: '600',
  FONT_WEIGHT_700: '700',
};

const FontFamily = {
  SF_Pro_Display_Regular: 'SF-Pro-Display-Regular',
  SF_Pro_Display_Medium: 'SF-Pro-Display-Mediumr',
  SF_Pro_Display_SemiBold: 'SF-Pro-Display-SemiBold',
  SF_Pro_Display_Bold: 'SF-Pro-Display-Bold',
};

const Space = {
  SPACE_4: 4,
  SPACE_8: 8,
  SPACE_12: 12,
  SPACE_16: 16,
  SPACE_20: 20,
  SPACE_24: 24,
  SPACE_28: 28,
  SPACE_32: 32,
};

const BorderWidth = {
  BORDER_WIDTH_1: 1,
  BORDER_WIDTH_2: 2,
  BORDER_WIDTH_3: 3,
  BORDER_WIDTH_4: 4,
};

const Radius = {
  RADIUS_4: 4,
  RADIUS_8: 8,
  RADIUS_16: 16,
  RADIUS_999: 999,
  RADIUS_28: 28,
};

const CUSTOM_FONT = {
  Regular: platformCheck.isAndroid
    ? ({fontFamily: 'SF_Pro_Display_Regular', fontWeight: '400'} as TextStyle)
    : ({fontFamily: 'SF_Pro_Display_Regular', fontWeight: '400'} as TextStyle),
  Medium: platformCheck.isAndroid
    ? ({fontFamily: 'SF_Pro_Display_Medium', fontWeight: '500'} as TextStyle)
    : ({fontFamily: 'SF_Pro_Display_Medium', fontWeight: '500'} as TextStyle),
  SemiBold: platformCheck.isAndroid
    ? ({fontFamily: 'SF_Pro_Display_SemiBold', fontWeight: '600'} as TextStyle)
    : ({fontFamily: 'SF_Pro_Display_SemiBold', fontWeight: '600'} as TextStyle),
  Bold: platformCheck.isAndroid
    ? ({fontFamily: 'SF_Pro_Display_Bold', fontWeight: '700'} as TextStyle)
    : ({fontFamily: 'SF_Pro_Display_Bold', fontWeight: '700'} as TextStyle),
};

export {
  BorderWidth,
  CUSTOM_FONT,
  FontFamily,
  FontSize,
  FontWeight,
  Radius,
  Space,
};
