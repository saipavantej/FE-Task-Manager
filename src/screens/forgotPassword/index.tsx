import React, {useRef} from 'react';
import {AuthStackParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '@hooks/index';
import {forgetPasswordAsync} from '../../features/userSlice';
import * as Yup from 'yup';
import AppTextInput from '@components/appTextInput/AppTextInput';
import {Formik} from 'formik';
import {Spacer} from '@components/spacer/Spacer';
import {scaleHeight, scaleWidth} from '@utils/scaleDimension';
import AuthBanner from '@components/authBanner/AuthBanner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PageView from '@components/pageView';
import {Color} from '@constants/colors';
import AppButton from '@components/appButton/AppButton';
import BackButton from '@components/appButton/BackButton';
import { View } from 'react-native';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgetPassword'>;

const ForgetPassword = (_props: Props) => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.user);
  const email = useRef<any>(null);

  const initialValues = {
    email: '',
  };

  const forgetPasswordValidation = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email Address cannot be empty'),
  });

  const forgetPasswordHandler = (formData: any) => {
    const body = {
      email_id: formData.email,
    };
    dispatch(forgetPasswordAsync(body));
  };

  return (
    <PageView backgroundColor="WHITE" type={'withOutMargin'} safeAreaView>
      <BackButton />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <AuthBanner
          title="Recover your account"
          subtitle="Don't worry, it is simple the recover your account"
        />
        <Spacer size={scaleHeight(50)} />
        <Formik
          initialValues={initialValues}
          validationSchema={forgetPasswordValidation}
          onSubmit={values => forgetPasswordHandler(values)}
          enableReinitialize={true}
          validateOnMount={true}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => {
            return (
              <View style={{paddingHorizontal: scaleWidth(24)}}>
                <AppTextInput
                  ref={email}
                  placeholder="name@example.com"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errors={errors.email}
                  touched={touched.email}
                  loading={status === 'loading'}
                  label="Email Address"
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                  type="default"
                />

                <Spacer direction="vertical" size={scaleHeight(30)} />
                <AppButton
                  name="Get OTP"
                  onPress={() => handleSubmit()}
                  disable={status === 'loading'}
                />
                <Spacer direction="vertical" size={scaleHeight(20)} />
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </PageView>
  );
};

export default ForgetPassword;
