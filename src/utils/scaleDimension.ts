import {Dimensions} from 'react-native';
const windowDimensions = Dimensions.get('window');
const {width, height} = windowDimensions;

const baseWidth = 375;
const baseHeight = 812;

type Options = {
  height: 'height';
  width: 'width';
  font: 'font';
};

const getScaledDimension = (dimension: number, options: keyof Options) => {
  let ratio = 1;
  switch (options) {
    case 'height':
      ratio = height / baseHeight;
      break;
    case 'width':
    case 'font':
      ratio = width / baseWidth;
      // ratio = 1
      break;
  }
  return ratio * dimension;
};

const scaleHeight = (size: number) => {
  return getScaledDimension(size, 'height');
};

const scaleWidth = (size: number) => {
  return getScaledDimension(size, 'width');
};

const scaleFont = (size: number) => {
  return getScaledDimension(size, 'font');
};

const scaleImage = (size: number) => {
  return getScaledDimension(size, 'height');
};

const deviceHeight = height;

const deviceWidth = width;

export {
  getScaledDimension,
  scaleHeight,
  scaleWidth,
  scaleFont,
  scaleImage,
  deviceHeight,
  deviceWidth,
};
