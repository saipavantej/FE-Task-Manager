const commonImages = {
  welcome: require('../../assets/images/welcome.png'),
};

const commonIcons = {
  tasks: require('../../assets/icons/task.png'),
  settings: require('../../assets/icons/setting.png'),
  eye: require('../../assets/icons/eye.png'),
  eyeError: require('../../assets/icons/eyeError.png'),
  eyeOff: require('../../assets/icons/eyeOff.png'),
  eyeOffError: require('../../assets/icons/eyeOffError.png'),
  leftArrow: require('../../assets/icons/arrowLeft.png'),
};

const assets = {
  images: {
    ...commonImages,
  },
  icons: {
    ...commonIcons,
  },
};

export {assets, commonIcons, commonImages};
