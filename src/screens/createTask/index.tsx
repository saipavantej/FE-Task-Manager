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
import {scaleFont, scaleHeight, scaleWidth} from '@utils/scaleDimension';
import {Color} from '@constants/colors';
import {CUSTOM_FONT} from '@constants/fonts';
import {formatDate, formatTime} from '@utils/index';
import {Keyboard} from 'react-native';
import {createTaskAsync} from '../../features/tasksSlice';
import Modal from 'react-native-modal';

type Props = NativeStackScreenProps<TasksScreensParamList, 'CreateTask'>;

const CreateTask = ({navigation}: Props) => {
  const [open, setOpen] = useState(false);
  const [statusPicker, setStatusPicker] = useState(false);
  const dispatch = useAppDispatch();
  const title = useRef<any>(null);
  const description = useRef<any>(null);
  const data = useAppSelector(state => state.user);

  const updateTask = async (values: any) => {
    await dispatch(
      createTaskAsync({
        user_id: data.data.user_id,
        task_title: values.title,
        task_Description: values.description,
        task_due_date: values.dateAndTime,
        task_status: values.status,
      }),
    );
    navigation.navigate('TasksList');
  };

  const initialValues = {
    title: '',
    description: '',
    status: '',
    dateAndTime: '',
  };
  const createTaskValidation = Yup.object().shape({
    title: Yup.string().required('Title cannot be empty'),
    description: Yup.string().required('Description cannot be empty'),
    status: Yup.string().oneOf(
      ['To Do', 'In Progress', 'Done'],
      'Invalid Task Status',
    ),
    dateAndTime: Yup.string().required('Date and Time cannot be empty'),
  });
  return (
    <PageView
      backgroundColor="WHITE"
      safeAreaView
      type={'withOutMargin'}
      showHeader
      headerText="Create Tasks">
      <Spacer size={40} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={true}
        bounces={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
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
            setFieldValue,
          }) => {
            return (
              <View style={{paddingHorizontal: scaleWidth(24)}}>
                <AppTextInput
                  ref={title}
                  placeholder="Task name"
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onSubmitEditing={() => description.current?.onfocus()}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  errors={errors.title}
                  touched={touched.title}
                  loading={false}
                  label="Title"
                  autoCapitalize={'none'}
                  keyboardType="default"
                  type="default"
                />

                <AppTextInput
                  ref={description}
                  multiline={true}
                  multilineStyle={{height: 150}}
                  placeholder="Task Description ..."
                  placeholderTextColor={Color.NEUTRAL_GHOST}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  errors={errors.description}
                  touched={touched.description}
                  loading={false}
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
                      Status
                    </Text>
                    <Spacer size={scaleHeight(12)} />
                    <TouchableOpacity
                      style={{
                        backgroundColor: Color.NEUTRAL_BACKGROUND,
                        paddingVertical: 14,
                        paddingHorizontal: 15,
                        borderWidth: 1,
                        borderColor:
                          values.status !== '' && !errors.status
                            ? Color.BRAND_PRIMARY_DEFAULT
                            : errors.status && touched.status
                            ? Color.ERROR_DEFAULT
                            : Color.NEUTRAL_LINE,
                        borderRadius: 4,
                      }}
                      onPress={() => setStatusPicker(true)}>
                      {values.status !== '' ? (
                        <Text style={{color: Color.BLACK}}>
                          {values.status}
                        </Text>
                      ) : (
                        <Text style={{color: Color.NEUTRAL_GHOST}}>
                          Task Status
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  {errors.status && touched.status && (
                    <>
                      <Spacer size={scaleHeight(12)} />
                      <Text
                        style={{
                          fontSize: scaleFont(12),
                          lineHeight: scaleHeight(18),
                          color: Color.ERROR_DEFAULT,
                        }}>
                        {errors.status}
                      </Text>
                    </>
                  )}
                </View>

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
                        borderColor:
                          values.dateAndTime !== '' && !errors.dateAndTime
                            ? Color.BRAND_PRIMARY_DEFAULT
                            : errors.dateAndTime && touched.dateAndTime
                            ? Color.ERROR_DEFAULT
                            : Color.NEUTRAL_LINE,
                        borderRadius: 4,
                      }}
                      onPress={() => setOpen(true)}>
                      {values.dateAndTime !== '' ? (
                        <Text style={{color: Color.BLACK}}>
                          {`${formatDate(values.dateAndTime)} ${formatTime(
                            values.dateAndTime,
                          )}`}
                        </Text>
                      ) : (
                        <Text style={{color: Color.NEUTRAL_GHOST}}>
                          Select Date and Time
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  {errors.dateAndTime && touched.dateAndTime && (
                    <>
                      <Spacer size={scaleHeight(12)} />
                      <Text
                        style={{
                          fontSize: scaleFont(12),
                          lineHeight: scaleHeight(18),
                          color: Color.ERROR_DEFAULT,
                        }}>
                        {errors.dateAndTime}
                      </Text>
                    </>
                  )}
                </View>

                <Spacer size={scaleHeight(40)} />
                <AppButton
                  name="Create Task"
                  width={250}
                  onPress={() => handleSubmit()}
                  disable={false}
                />
                <Spacer size={scaleHeight(100)} />
                <DatePicker
                  title=" "
                  modal
                  open={open}
                  date={new Date()}
                  onConfirm={date => {
                    setOpen(false);
                    Keyboard.dismiss();
                    console.log(date);
                    setFieldValue('dateAndTime', date);
                  }}
                  onCancel={() => {
                    Keyboard.dismiss();
                    setOpen(false);
                  }}
                />
                <Modal
                  animationIn={'slideInUp'}
                  animationOut={'slideOutDown'}
                  onBackdropPress={() => setStatusPicker(false)}
                  isVisible={statusPicker}>
                  <View style={styles.statusPickerContainer}>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 5,
                        marginVertical: 5,
                        backgroundColor: Color.TODO_TASK,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        setStatusPicker(false);
                        setFieldValue('status', 'To Do');
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 20,
                          ...CUSTOM_FONT.SemiBold,
                          color: Color.WHITE,
                        }}>
                        To Do
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 5,
                        marginVertical: 5,
                        backgroundColor: Color.IN_PROGRESS_TASK,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        setStatusPicker(false);
                        setFieldValue('status', 'In Progress');
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 20,
                          ...CUSTOM_FONT.SemiBold,
                          color: Color.WHITE,
                        }}>
                        In Progress
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 5,
                        marginVertical: 5,
                        backgroundColor: Color.COMPLETED_TASK,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        setStatusPicker(false);
                        setFieldValue('status', 'Done');
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 20,
                          ...CUSTOM_FONT.SemiBold,
                          color: Color.WHITE,
                        }}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </PageView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  statusPickerContainer: {
    minWidth: 323,
    borderRadius: 10,
    backgroundColor: Color.WHITE,
    padding: 20,
  },
});
