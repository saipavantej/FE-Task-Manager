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
  rightArrow: require('../../assets/icons/arrowRight.png'),
  addTasks: require('../../assets/icons/addTasks.png'),
  menu: require('../../assets/icons/menu.png'),
  alarm: require('../../assets/icons/alarm.png'),
  flag: require('../../assets/icons/flag.png'),
  profile: require('../../assets/icons/profile.png'),
  logout: require('../../assets/icons/logout.png'),
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
