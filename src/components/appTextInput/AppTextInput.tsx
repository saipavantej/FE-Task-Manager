import RippleButton from '@components/rippleButton/RippleButton';
import {Spacer} from '@components/spacer/Spacer';
import {Color} from '@constants/colors';
import {CUSTOM_FONT} from '@constants/fonts';
import {assets} from '@constants/images';
import {
  scaleFont,
  scaleHeight,
  scaleImage,
  scaleWidth,
} from '@utils/scaleDimension';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  Image,
  Platform,
  Text,
  TextInput,
  View,
  ViewStyle,
  KeyboardTypeOptions,
  StyleSheet,
} from 'react-native';

type Props = {
  label: string;
  textInputStyle?: ViewStyle;
  placeholder: string;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  placeholderTextColor?: string;
  onChangeText: any;
  onBlur: any;
  onSubmitEditing?: any;
  value: any;
  keyboardType: KeyboardTypeOptions | undefined;
  errors: string | undefined;
  touched: any;
  loading: boolean;
  type?: 'default' | 'password' | 'confirmPassword';
};

const AppTextInput = forwardRef((props: Props, ref) => {
  const {
    label,
    textInputStyle,
    placeholder,
    autoCapitalize = 'none',
    placeholderTextColor,
    onChangeText,
    onBlur,
    value,
    type = 'default',
    onSubmitEditing,
    keyboardType,
    loading,
    errors,
    touched,
  } = props;

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const textInputRef = useRef<TextInput>(null);
  useImperativeHandle(ref, () => ({
    getValue: () => value,
    onfocus: () => textInputRef.current?.focus(),
  }));

  const renderImage = () => {
    if (errors && touched && isPasswordHidden) {
      return assets.icons.eyeOffError;
    } else if (errors && touched && !isPasswordHidden) {
      return assets.icons.eyeError;
    } else if (!(errors && touched) && isPasswordHidden) {
      return assets.icons.eyeOff;
    } else if (!(errors && touched) && !isPasswordHidden) {
      return assets.icons.eye;
    }
  };

  const handlePasswordView = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <View style={{marginBottom: scaleHeight(24)}}>
      <View>
        <Text style={styles.labelStyle}>{label}</Text>
        <Spacer size={scaleHeight(12)} />
      </View>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: Color.NEUTRAL_BACKGROUND,
            borderRadius: 6,
          },
          value !== '' && !errors
            ? styles.validInputStyle
            : errors && touched
            ? styles.errorInputStyle
            : styles.inputStyle,
        ]}>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            paddingLeft: scaleWidth(14),
            paddingRight: type !== 'password' ? scaleWidth(14) : 0,
            paddingVertical: Platform.OS === 'ios' ? scaleHeight(14) : 0,
          }}>
          <TextInput
            ref={textInputRef}
            secureTextEntry={
              (type === 'password' || type === 'confirmPassword') &&
              isPasswordHidden
                ? true
                : false
            }
            style={textInputStyle}
            autoCapitalize={autoCapitalize}
            placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType ? keyboardType : 'default'}
            returnKeyType={onSubmitEditing ? 'next' : 'done'}
            blurOnSubmit={onSubmitEditing ? false : true}
            editable={!loading}
            selectTextOnFocus={false}
          />
        </View>
        {type === 'password' && (
          <RippleButton
            style={{
              paddingLeft: scaleWidth(14),
              paddingVertical: scaleHeight(14),
              paddingRight: scaleWidth(14),
              alignSelf: 'center',
            }}
            onPress={handlePasswordView}>
            <View style={{height: scaleImage(22), width: scaleImage(22)}}>
              <Image
                source={renderImage()}
                style={{height: '100%', width: '100%', resizeMode: 'contain'}}
              />
            </View>
          </RippleButton>
        )}
      </View>

      {props.errors && props.touched && (
        <Text style={styles.errorTextStyle}>{errors}</Text>
      )}
    </View>
  );
});

export default AppTextInput;

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginBottom: scaleHeight(10),
  },
  labelStyle: {
    fontSize: scaleFont(16),
    ...CUSTOM_FONT.Medium,
    color: Color.BLACK,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: Color.NEUTRAL_LINE,
    borderRadius: scaleWidth(4),
  },
  validInputStyle: {
    borderWidth: 1,
    borderColor: Color.BRAND_PRIMARY_DEFAULT,
    borderRadius: scaleWidth(4),
    marginBottom: scaleHeight(8),
  },
  errorInputStyle: {
    borderWidth: 1,
    borderColor: Color.ERROR_DEFAULT,
    borderRadius: scaleWidth(4),
    marginBottom: scaleHeight(8),
  },
  errorTextStyle: {
    fontSize: scaleFont(12),
    lineHeight: scaleHeight(18),
    color: Color.ERROR_DEFAULT,
  },
});
