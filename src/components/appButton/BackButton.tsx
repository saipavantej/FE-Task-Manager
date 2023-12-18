import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {assets} from '@constants/images';
import {
  scaleFont,
  scaleHeight,
  scaleImage,
  scaleWidth,
} from '@utils/scaleDimension';
import {Color} from '@constants/colors';
import {Spacer} from '@components/spacer/Spacer';
import {CUSTOM_FONT} from '@constants/fonts';

type Props = {};

const BackButton = (_Props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={{paddingHorizontal: scaleWidth(24)}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.imageWrapper}>
          <Image
            source={assets.icons.leftArrow}
            style={styles.pageHeaderIcons}
          />
        </TouchableOpacity>
        <Spacer direction="horizontal" size={scaleWidth(10)} />
      </View>
      <Spacer size={scaleHeight(50)} />
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  constaile: {
    alignSelf: 'flex-start',
  },
  imageWrapper: {
    padding: 2,
    // backgroundColor: Color.BRAND_PRIMARY_BACKGROUND,
    // borderRadius: 999,
  },
  pageHeaderIcons: {
    width: scaleImage(30),
    height: scaleImage(30),
    resizeMode: 'cover',
    tintColor: Color.BLACK,
  },
  text: {
    ...CUSTOM_FONT.SemiBold,
    fontSize: scaleFont(14),
    color: Color.BRAND_PRIMARY_DEFAULT,
  },
});
