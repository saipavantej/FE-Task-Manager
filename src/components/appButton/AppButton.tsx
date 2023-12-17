import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {CUSTOM_FONT} from '@constants/fonts';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/scaleDimension';
import {Color} from '@constants/colors';

type Props = {
  name: string;
  disable?: boolean;
  onPress: Function;
};

const AppButton = (props: Props) => {
  const {name, onPress, disable = false} = props;
  return (
    <TouchableOpacity
      style={styles.button}
      disabled={disable}
      onPress={() => onPress && onPress()}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: scaleHeight(18),
    paddingHorizontal: scaleWidth(18),
    minWidth: scaleWidth(327),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: Color.BRAND_PRIMARY_DEFAULT,
  },
  text: {
    ...CUSTOM_FONT.Medium,
    fontSize: scaleFont(18),
    color: Color.WHITE,
    textAlign: 'center',
  },
});
