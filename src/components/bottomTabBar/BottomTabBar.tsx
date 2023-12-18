import * as React from 'react';
import {getScaledDimension} from '@utils/scaleDimension';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {CUSTOM_FONT} from '@constants/fonts';
import RippleButton from '@components/rippleButton/RippleButton';
import {assets} from '@constants/images';
import {Color, getColor} from '@constants/colors';

function BottomTabBar(props: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const {navigation, state} = props;

  const visit = state.index;

  const lists = [
    {
      icon: assets.icons.tasks,
      name: 'Tasks',
      root: state.routeNames[0],
      screen: 'TasksList',
      params: {},
    },
    {
      icon: assets.icons.settings,
      name: 'Settings',
      root: state.routeNames[1],
      screen: 'Settings',
      params: {},
    },
  ];

  const clickPageInsideStake = (screen: string, params: {} = {}) => {
    setTimeout(() => {
      navigation.navigate(screen, params);
    }, 500);
  };

  const clickPageNestedStack = (
    root: string,
    screen: string,
    params: {} = {},
  ) => {
    setTimeout(() => {
      navigation.navigate(root, {
        screen: screen,
        params,
      });
    }, 500);
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      <>
        {lists.map((item, index) => (
          <RippleButton
            key={index}
            style={styles.item}
            onPress={() => {
              visit === index
                ? clickPageInsideStake(item.screen, item.params)
                : clickPageNestedStack(item.root, item.screen, item.params);
            }}>
            <>
              <View
                style={{
                  height: getScaledDimension(40, 'height'),
                  width: getScaledDimension(40, 'width'),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image
                  source={item.icon}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'contain',
                    tintColor:
                      visit === index
                        ? getColor('BRAND_PRIMARY_DEFAULT')
                        : getColor('NEUTRAL_GHOST'),
                  }}
                />
              </View>
              <Text
                style={
                  visit === index ? styles.textActive : styles.textInactive
                }>
                {item.name}
              </Text>
            </>
          </RippleButton>
        ))}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: getColor('NEUTRAL_BACKGROUND'),
    shadowColor: getColor('BRAND_PRIMARY_LINE'),
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 80,
    shadowOpacity: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: getScaledDimension(5, 'height'),
  },

  textActive: {
    marginTop: getScaledDimension(5, 'height'),
    fontSize: getScaledDimension(15, 'font'),
    ...CUSTOM_FONT.Medium,
    color: getColor('BRAND_PRIMARY_DEFAULT'),
  },
  textInactive: {
    marginTop: getScaledDimension(5, 'height'),
    fontSize: getScaledDimension(15, 'font'),
    ...CUSTOM_FONT.Medium,
    color: Color.NEUTRAL_GHOST,
  },
});

export default BottomTabBar;
