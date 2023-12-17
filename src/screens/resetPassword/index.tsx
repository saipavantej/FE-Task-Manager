import React, {useRef} from 'react';
import {AuthStackParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {resetPasswordAsync} from '../../features/user-slice';
import AppTextInput from '@components/appTextInput/AppTextInput';
import {useAppDispatch, useAppSelector} from '@hooks/index';
import * as Yup from 'yup';
import PageView from '@components/pageView';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Color} from '@constants/colors';
import {Spacer} from '@components/spacer/Spacer';
import {Formik} from 'formik';
import AuthBanner from '@components/authBanner/AuthBanner';
import {scaleHeight} from '@utils/scaleDimension';
import AppButton from '@components/appButton/AppButton';
import BackButton from '@components/appButton/BackButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPassword = ({route}: Props) => {
  const {email} = route.params;
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.user);

  const otp = useRef<any>(null);
  const password = useRef<any>(null);
  const confirmPassword = useRef<any>(null);

  const initialValues = {
    otp: '',
    password: '',
    confirmPassword: '',
  };
  const resetPasswordValidation = Yup.object().shape({
    otp: Yup.string().required('Recovery cannot be empty'),
    password: Yup.string()
      .required('Password cannot be empty')
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,}$/g,
        'Min. 8 characters with at least one capital letter, a number and a special character',
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password cannot be empty')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const resetPasswordHandler = (formData: any) => {
    const body = {
      otp: formData.otp,
      email_id: email,
      password: formData.confirmPassword,
    };
    dispatch(resetPasswordAsync(body));
  };

  return (
    <PageView backgroundColor="WHITE" type={'withOutHeader'} safeAreaView>
      <BackButton />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <AuthBanner
          title="Pick a new password"
          subtitle="Enter the recovery code we sent to your email"
        />
        <Spacer size={scaleHeight(50)} />
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordValidation}
          onSubmit={values => resetPasswordHandler(values)}
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
              <>
                <AppTextInput
                  ref={otp}
                  placeholder="Enter the OTP"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => password.current?.onfocus()}
                  onChangeText={handleChange('otp')}
                  onBlur={handleBlur('otp')}
                  value={values.otp}
                  errors={errors.otp}
                  touched={touched.otp}
                  loading={status === 'loading'}
                  label="Recovery Code"
                  autoCapitalize={'none'}
                  keyboardType="number-pad"
                  type="default"
                />
                <AppTextInput
                  ref={password}
                  placeholder="********"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => confirmPassword.current?.onfocus()}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  errors={errors.password}
                  touched={touched.password}
                  loading={status === 'loading'}
                  label="Password"
                  autoCapitalize={'none'}
                  keyboardType="default"
                  type="password"
                />
                <AppTextInput
                  ref={confirmPassword}
                  placeholder="********"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  errors={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  loading={status === 'loading'}
                  label="Confirm Password"
                  autoCapitalize={'none'}
                  keyboardType="default"
                  type="confirmPassword"
                />
                <Spacer size={scaleHeight(30)} />
                <AppButton
                  name="Set Password"
                  onPress={() => handleSubmit()}
                  disable={status === 'loading'}
                />
                <Spacer size={scaleHeight(20)} />
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </PageView>
  );
};

export default ResetPassword;
