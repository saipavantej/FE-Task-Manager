import {Color, ColorOptions} from '@constants/colors';
import {
  useFocusEffect,
  useNavigation,
  useScrollToTop,
} from '@react-navigation/native';
import {
  scaleFont,
  scaleHeight,
  scaleImage,
  scaleWidth,
} from '@utils/scaleDimension';
import React, {ReactNode, useCallback} from 'react';
import {
  Image,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PageViewType} from './Types';
import {CUSTOM_FONT} from '@constants/fonts';
import {assets} from '@constants/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Spacer} from '@components/spacer/Spacer';

type Props = {
  type?: keyof typeof PageViewType | Array<keyof typeof PageViewType>;
  backgroundColor?: ColorOptions;
  statusBar?: boolean;
  safeAreaView?: boolean;
  children?: ReactNode;
  showHeader?: boolean;
  headerText?: string;
};

const PageView = ({
  type = 'withHeader',
  statusBar = true,
  showHeader = false,
  safeAreaView = true,
  backgroundColor = 'WHITE',
  headerText = '',
  children,
}: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const scrollRef = React.useRef(null);
  useScrollToTop(scrollRef);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setHidden(!statusBar);
    }, [statusBar]),
  );

  const getSafeAreaViewStyles = (): StyleProp<ViewStyle> => {
    if (type === 'withHeader') {
      return {
        paddingTop: insets.top + scaleHeight(16),
        paddingBottom: insets.bottom,
      };
    } else {
      return {
        paddingTop: insets.top + scaleHeight(40),
        paddingBottom: insets.bottom,
      };
    }
  };

  return (
    <View
      style={[
        PageViewType[type as keyof typeof PageViewType].container(
          backgroundColor,
        ),
        safeAreaView && getSafeAreaViewStyles(),
      ]}>
      <StatusBar
        animated={true}
        barStyle={false ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
      />
      {showHeader && (
        <View style={styles.pageHeaderContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.imageWrapper}>
            <Image
              source={assets.icons.leftArrow}
              style={styles.pageHeaderIcons}
            />
          </TouchableOpacity>
          <Spacer direction="horizontal" size={scaleWidth(10)} />
          <Text style={styles.pageHeaderText}>{headerText}</Text>
        </View>
      )}
      {children}
    </View>
  );
};
export default PageView;

const styles = StyleSheet.create({
  pageHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageHeaderIcons: {
    width: scaleImage(30),
    height: scaleImage(30),
    resizeMode: 'contain',
    tintColor: Color.NEUTRAL_PRIMARY,
  },
  pageHeaderText: {
    fontSize: scaleFont(18),
    color: Color.NEUTRAL_PRIMARY,
    ...CUSTOM_FONT.SemiBold,
  },
});
