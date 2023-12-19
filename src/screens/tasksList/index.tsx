import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {TasksScreensParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {assets} from '@constants/images';
import PageView from '@components/pageView';
import {Color} from '@constants/colors';
import TaskCard from '@components/taskCard/TaskCard';
import {Spacer} from '@components/spacer/Spacer';
import {CUSTOM_FONT} from '@constants/fonts';
import {useAppDispatch, useAppSelector} from '@hooks/index';
import {deleteTaskAsync, fetchTasksAsync} from '../../features/tasksSlice';

type Props = NativeStackScreenProps<TasksScreensParamList, 'TasksList'>;

const emptyState = memo(() => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          ...CUSTOM_FONT.SemiBold,
          fontSize: 18,
          color: Color.BRAND_PRIMARY_DEFAULT,
        }}>
        No Tasks avalible
      </Text>
    </View>
  );
});

const TasksList = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {user_id} = useAppSelector(state => state.user.data);
  const {tasks, page_no, total_pages} = useAppSelector(state => state.task);

  useEffect(() => {
    dispatch(
      fetchTasksAsync({
        userId: user_id,
        page: 1,
        perPage: 10,
      }),
    );
  }, []);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [activeId, setActiveId] = useState<null | number>(null);

  const handlePagination = () => {
    if ((page_no as number) < (total_pages as number)) {
      dispatch(
        fetchTasksAsync({
          userId: user_id,
          page: page_no + 1,
          perPage: 10,
        }),
      );
    }
  };

  const openModal = useCallback((id: number) => {
    setActiveId(id);
    setIsVisibleModal(true);
  }, []);

  const renderTasks = ({item, _index}: any) => {
    return (
      <TaskCard
        id={item.task_id}
        title={item.task_title}
        description={item.task_Description}
        status={item.task_status}
        time={item.task_due_date}
        openMenu={(data: number) => openModal(data)}
      />
    );
  };

  return (
    <PageView statusBar safeAreaView>
      <FlatList
        maxToRenderPerBatch={10}
        contentContainerStyle={{flexGrow: 1}}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={renderTasks}
        ItemSeparatorComponent={() => <Spacer direction="vertical" size={15} />}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd > 0) {
            return handlePagination();
          }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={emptyState}
      />
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 30,
          right: 10,
          zIndex: 999,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateTask');
          }}
          style={{
            backgroundColor: Color.BRAND_PRIMARY_DEFAULT,
            padding: 10,
            borderRadius: 100,
          }}>
          <Image
            source={assets.icons.addTasks}
            style={{
              resizeMode: 'contain',
              height: 40,
              width: 40,
              tintColor: Color.WHITE,
            }}
          />
        </TouchableOpacity>

        <Modal
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          onBackdropPress={() => setIsVisibleModal(false)}
          isVisible={isVisibleModal}>
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                paddingVertical: 5,
                marginVertical: 5,
                backgroundColor: Color.BRAND_PRIMARY_DEFAULT,
                borderRadius: 10,
              }}
              onPress={() => {
                activeId &&
                  navigation.navigate('TaskDetails', {task_id: activeId});
                setIsVisibleModal(false);
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  ...CUSTOM_FONT.SemiBold,
                  color: Color.WHITE,
                }}>
                Update Task
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 5,
                marginVertical: 5,
                backgroundColor: Color.ERROR_DEFAULT,
                borderRadius: 10,
              }}
              onPress={() => {
                activeId && dispatch(deleteTaskAsync(activeId));
                setIsVisibleModal(false);
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  ...CUSTOM_FONT.SemiBold,
                  color: Color.WHITE,
                }}>
                Delete Task
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </PageView>
  );
};

export default TasksList;

const styles = StyleSheet.create({
  container: {
    minWidth: 323,
    borderRadius: 10,
    backgroundColor: Color.WHITE,
    padding: 20,
  },
});
