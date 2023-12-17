import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Spacer} from '@components/spacer/Spacer';
import {scaleFont, scaleHeight} from '@utils/scaleDimension';
import {CUSTOM_FONT} from '@constants/fonts';
import {Color} from '@constants/colors';

type Props = {
  title: string;
  subtitle: string;
};

const AuthBanner = (props: Props) => {
  const {title, subtitle} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Spacer direction="vertical" size={scaleHeight(8)} />
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default AuthBanner;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...CUSTOM_FONT.SemiBold,
    color: Color.BLACK,
    fontSize: scaleFont(24),
  },
  subtitle: {
    ...CUSTOM_FONT.Regular,
    color: Color.NEUTRAL_SECONDARY,
    fontSize: scaleFont(14),
  },
});
