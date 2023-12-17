import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {AuthStackParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '@hooks/index';
import {userLoginAsync} from '../../features/user-slice';
import AppTextInput from '@components/appTextInput/AppTextInput';
import {Spacer} from '@components/spacer/Spacer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Color} from '@constants/colors';
import PageView from '@components/pageView';
import AppButton from '@components/appButton/AppButton';
import {CUSTOM_FONT} from '@constants/fonts';
import {scaleFont, scaleHeight} from '@utils/scaleDimension';
import AuthBanner from '@components/authBanner/AuthBanner';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.user);
  const email = useRef<any>(null);
  const password = useRef<any>(null);

  const initialValues = {
    email: '',
    password: '',
  };
  const loginValidation = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email Address cannot be empty'),
    password: Yup.string().required('Password cannot be empty'),
  });

  const loginHandler = (formData: any) => {
    const body = {
      email_id: formData.email,
      password: formData.password,
    };
    dispatch(userLoginAsync(body));
  };

  useEffect(() => {
    setTimeout(() => {
      email.current?.onfocus();
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
          title="Welcome Back!"
          subtitle="Your work faster and structured with Taskle"
        />
        <Spacer size={scaleHeight(40)} />
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidation}
          onSubmit={values => loginHandler(values)}
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
                  ref={email}
                  placeholder="name@example.com"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => password.current?.onfocus()}
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
                  ref={password}
                  placeholder="********"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
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
                <Spacer direction="vertical" size={scaleHeight(10)} />
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={styles.forgetPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <Spacer direction="vertical" size={scaleHeight(50)} />
                <AppButton name="Sign In" onPress={() => handleSubmit()} />
                <Spacer direction="vertical" size={scaleHeight(20)} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.noAccountYet}>{'No account yet? '}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.createAccount}>Create one here</Text>
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

export default Login;

const styles = StyleSheet.create({
  noAccountYet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...CUSTOM_FONT.Medium,
    fontSize: scaleFont(14),
    color: Color.NEUTRAL_SECONDARY,
  },
  createAccount: {
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
  forgetPassword: {
    ...CUSTOM_FONT.SemiBold,
    fontSize: scaleFont(14),
    color: Color.BRAND_PRIMARY_DEFAULT,
  },
});
