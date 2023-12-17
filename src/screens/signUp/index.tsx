import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {AuthStackParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Spacer} from '@components/spacer/Spacer';
import {Formik} from 'formik';
import AppTextInput from '@components/appTextInput/AppTextInput';
import {Color} from '@constants/colors';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from '@hooks/index';
import {userSignUpAsync} from '../../features/user-slice';
import PageView from '@components/pageView';
import AuthBanner from '@components/authBanner/AuthBanner';
import {scaleFont, scaleHeight} from '@utils/scaleDimension';
import AppButton from '@components/appButton/AppButton';
import {CUSTOM_FONT} from '@constants/fonts';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUp = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.user);
  const name = useRef<any>(null);
  const email = useRef<any>(null);
  const setPassword = useRef<any>(null);
  const confirmPassword = useRef<any>(null);

  const initialValues = {
    name: '',
    email: '',
    setPassword: '',
    confirmPassword: '',
  };

  const signUpValidation = Yup.object().shape({
    name: Yup.string().required('Name cannot be empty'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email Address cannot be empty'),
    setPassword: Yup.string()
      .required('Password cannot be empty')
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,}$/g,
        'Min. 8 characters with at least one capital letter, a number and a special character',
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password cannot be empty')
      .oneOf([Yup.ref('setPassword')], 'Passwords do not match'),
  });

  const signUpHandler = (formData: any): void => {
    const body = {
      user_name: formData.name,
      email_id: formData.email,
      password: formData.confirmPassword,
    };
    dispatch(userSignUpAsync(body));
  };

  useEffect(() => {
    setTimeout(() => {
      name.current?.onfocus();
    }, 100);
  }, []);

  return (
    <PageView backgroundColor="WHITE" type={'withOutHeader'} safeAreaView>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <AuthBanner
          title="Create account"
          subtitle="Create your account and feel the benefits  "
        />
        <Spacer size={scaleHeight(48)} />
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidation}
          onSubmit={values => signUpHandler(values)}
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
                  ref={name}
                  placeholder="Enter your name"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => email.current?.onfocus()}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  errors={errors.name}
                  touched={touched.name}
                  loading={status === 'loading'}
                  label="Name"
                  autoCapitalize={'none'}
                  keyboardType="default"
                  type="default"
                />
                <AppTextInput
                  ref={email}
                  placeholder="name@example.com"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => setPassword.current?.onfocus()}
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
                <AppTextInput
                  ref={setPassword}
                  placeholder="********"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => confirmPassword.current?.onfocus()}
                  onChangeText={handleChange('setPassword')}
                  onBlur={handleBlur('setPassword')}
                  value={values.setPassword}
                  errors={errors.setPassword}
                  touched={touched.setPassword}
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
                  label="confirm Password"
                  autoCapitalize={'none'}
                  keyboardType="default"
                  type="confirmPassword"
                />
                <Spacer direction="vertical" size={scaleHeight(30)} />
                <AppButton
                  name="Sign Up"
                  onPress={() => handleSubmit()}
                  disable={status === 'loading'}
                />
                <Spacer direction="vertical" size={scaleHeight(20)} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.haveaccount}>
                    {'Already have an account? '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signIn}>Sign in here</Text>
                    <View style={styles.underline} />
                  </TouchableOpacity>
                </View>
                <Spacer size={scaleHeight(20)} />
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </PageView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  haveaccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...CUSTOM_FONT.Medium,
    fontSize: scaleFont(14),
    color: Color.NEUTRAL_SECONDARY,
  },
  signIn: {
    ...CUSTOM_FONT.SemiBold,
    fontSize: scaleFont(14),
    color: Color.BRAND_PRIMARY_DEFAULT,
  },
  underline: {
    marginTop: scaleHeight(-2),
    height: scaleHeight(2),
    backgroundColor: Color.BRAND_PRIMARY_DEFAULT,
    opacity: 0.2,
  },
});
