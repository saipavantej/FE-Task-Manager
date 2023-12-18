import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {TasksScreensParamList} from '@constants/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {assets} from '@constants/images';
import PageView from '@components/pageView';
import {Color} from '@constants/colors';
import TaskCard from '@components/taskCard/TaskCard';
import {Spacer} from '@components/spacer/Spacer';
import {CUSTOM_FONT} from '@constants/fonts';
import {useAppDispatch, useAppSelector} from '@hooks/index';
import {deleteTask, fetchTasks} from '../../features/tasksSlice';

type Props = NativeStackScreenProps<TasksScreensParamList, 'TasksList'>;

const emptyState = () => {
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
};

const TasksList = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {
    entities: tasks,
    status,
    error,
    pagination,
  } = useAppSelector(state => state.task);

  useEffect(() => {
    dispatch(fetchTasks({page: 1, perPage: 10}));
  }, [dispatch]);

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (taskId: string) => {
    setTimeout(() => {
      navigation.navigate('CreateTask');
    }, 500);
  };

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [activeId, setActiveId] = useState<null | string>(null);

  const handlePagination = () => {
    console.log('testing');
    if ((pagination.page_no as number) < (pagination.total_pages as number)) {
      dispatch(fetchTasks({page: pagination.page_no + 1, perPage: 10}));
    }
  };

  const openModal = (data: string) => {
    setActiveId(data);
    setIsVisibleModal(true);
  };

  const renderTasks = ({item, index}: any) => {
    return (
      <TaskCard
        key={index}
        id={item._id}
        title={item.title}
        description={item.description}
        priority={item.priority}
        time={item.time_line}
        openMenu={(data: string) => openModal(data)}
      />
    );
  };

  return (
    <PageView statusBar safeAreaView>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        initialNumToRender={30}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item._id}
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
            console.log(tasks), navigation.navigate('CreateTask');
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
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
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
                setIsVisibleModal(false);
                handleEditTask(activeId);
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  ...CUSTOM_FONT.SemiBold,
                  color: Color.WHITE,
                }}>
                Edit Task
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
                setIsVisibleModal(false);
                handleDeleteTask(activeId);
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
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
});
