import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AuthStackParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {assets} from '@constants/images';
import {scaleFont, scaleHeight, scaleImage} from '@utils/scaleDimension';
import {Spacer} from '@components/spacer/Spacer';
import PageView from '@components/pageView';
import {CUSTOM_FONT} from '@constants/fonts';
import {Color} from '@constants/colors';
import AppButton from '@components/appButton/AppButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

const Welcome = ({navigation}: Props) => {
  return (
    <PageView backgroundColor="WHITE" type={'withOutHeader'} safeAreaView>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.titleText}>{'Welcome to '}</Text>
          <Text style={styles.appText}>Taskle</Text>
        </View>
        <Spacer size={scaleHeight(68)} />
        <Image source={assets.images.welcome} style={styles.banner} />
        <Spacer direction="vertical" size={scaleHeight(26)} />
        <AppButton
          name="Sign In"
          onPress={() => navigation.navigate('Login')}
        />
        <Spacer direction="vertical" size={scaleHeight(26)} />
        <AppButton
          name="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
        <Spacer size={scaleHeight(20)} />
      </ScrollView>
    </PageView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  banner: {
    height: scaleImage(395),
    width: scaleImage(375),
  },
  titleText: {
    ...CUSTOM_FONT.SemiBold,
    fontSize: scaleFont(26),
    color: Color.BLACK,
  },
  appText: {
    ...CUSTOM_FONT.SemiBold,
    fontSize: scaleFont(26),
    color: Color.BRAND_PRIMARY_DEFAULT,
  },
});
