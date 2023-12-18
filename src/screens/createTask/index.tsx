import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {TasksScreensParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import PageView from '@components/pageView';
import AppButton from '@components/appButton/AppButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppTextInput from '@components/appTextInput/AppTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from '@hooks/index';
import {Spacer} from '@components/spacer/Spacer';
import {scaleFont, scaleHeight} from '@utils/scaleDimension';
import {Color} from '@constants/colors';
import {CUSTOM_FONT} from '@constants/fonts';
import {formatDate, formatTime} from '@utils/index';
import {createTaskApi} from '../../services';

type Props = NativeStackScreenProps<TasksScreensParamList, 'CreateTask'>;

const CreateTask = ({navigation}: Props) => {
  const [open, setOpen] = useState(false);
  const [timeline, setTimeline] = useState<null | string>(null);
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.user);
  const title = useRef<any>(null);
  const description = useRef<any>(null);

  const updateTask = values => {
    dispatch(
      createTaskApi({
        title: values.title,
        description: values.description,
        priority: 'high',
        time_line: timeline,
      }),
    );
  };
  const initialValues = {
    title: '',
    description: '',
  };
  const createTaskValidation = Yup.object().shape({
    title: Yup.string().required('Title cannot be empty'),
    description: Yup.string().required('Description cannot be empty'),
  });
  return (
    <PageView
      backgroundColor="WHITE"
      safeAreaView
      type={'withHeader'}
      showHeader
      headerText="Create Tasks">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <Spacer size={40} />
        <Formik
          initialValues={initialValues}
          validationSchema={createTaskValidation}
          onSubmit={values => updateTask(values)}
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
                  ref={title}
                  placeholder="Enter your name"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => description.current?.onfocus()}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  errors={errors.title}
                  touched={touched.title}
                  loading={status === 'loading'}
                  label="Title"
                  autoCapitalize={'none'}
                  keyboardType="default"
                  type="default"
                />

                <AppTextInput
                  ref={description}
                  multiline={true}
                  multilineStyle={{height: 150}}
                  placeholder="Enter your name"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => description.current?.onfocus()}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  errors={errors.description}
                  touched={touched.description}
                  loading={status === 'loading'}
                  label="Description"
                  autoCapitalize={'none'}
                  keyboardType="default"
                  type="default"
                />
                <View style={{marginBottom: scaleHeight(24)}}>
                  <View>
                    <Text
                      style={{
                        fontSize: scaleFont(16),
                        ...CUSTOM_FONT.Medium,
                        color: Color.BLACK,
                      }}>
                      Date And Time
                    </Text>
                    <Spacer size={scaleHeight(12)} />
                    <TouchableOpacity
                      style={{
                        backgroundColor: Color.NEUTRAL_BACKGROUND,
                        paddingVertical: 14,
                        paddingHorizontal: 15,
                        borderWidth: 1,
                        borderColor: Color.NEUTRAL_LINE,
                        borderRadius: 4,
                      }}
                      onPress={() => setOpen(true)}>
                      {timeline ? (
                        <Text style={{color: Color.BLACK}}>
                          {`${formatDate(timeline)} ${formatTime(timeline)}`}
                        </Text>
                      ) : (
                        <Text style={{color: Color.NEUTRAL_GHOST}}>
                          Select Date and Time
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <AppButton
                  name="Create Task"
                  onPress={() => handleSubmit()}
                  disable={status === 'loading'}
                />
                <Spacer size={scaleHeight(20)} />
              </>
            );
          }}
        </Formik>
        <DatePicker
          modal
          open={open}
          date={new Date()}
          onConfirm={date => {
            setOpen(false);
            setTimeline(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </KeyboardAwareScrollView>
    </PageView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({});
