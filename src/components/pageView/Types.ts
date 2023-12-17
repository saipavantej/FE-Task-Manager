import {ColorOptions, getColor} from '@constants/colors';
import {scaleWidth} from '@utils/scaleDimension';
import {StyleProp, ViewStyle} from 'react-native';

const withHeader = {
  container: (bgColor: ColorOptions) =>
    ({
      flex: 1,
      backgroundColor: getColor(bgColor),
      paddingHorizontal: scaleWidth(24),
    } as StyleProp<ViewStyle>),
};

const withOutHeader = {
  container: (bgColor: ColorOptions) =>
    ({
      flex: 1,
      paddingHorizontal: scaleWidth(24),
      backgroundColor: getColor(bgColor),
    } as StyleProp<ViewStyle>),
};

const PageViewType = {
  withHeader: {...withHeader},
  withOutHeader: {...withOutHeader},
};

export {PageViewType};
