import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import {scaleWidth} from '@utils/scaleDimension';
import {Color} from '@constants/colors';
import {assets} from '@constants/images';
import {CUSTOM_FONT} from '@constants/fonts';
import {Spacer} from '@components/spacer/Spacer';
import {formatDate, formatTime} from '@utils/index';

type Props = {
  id: number;
  status: 'To Do' | 'In Progress' | 'Done';
  title: string;
  description: string;
  time: string;
  openMenu: Function;
};

const TaskCard = (props: Props) => {
  const {id, title, description, time, openMenu, status} = props;
  const getColorByPriority = (): ViewStyle => {
    switch (status) {
      case 'In Progress':
        return {
          backgroundColor: Color.IN_PROGRESS_TASK,
        };
      case 'Done':
        return {
          backgroundColor: Color.COMPLETED_TASK,
        };
      default:
        return {
          backgroundColor: Color.TODO_TASK,
        };
    }
  };

  const handleButtonClick = useCallback(
    (data: number) => {
      openMenu(data);
    },
    [openMenu],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.priority, getColorByPriority()]}>
        <Image
          source={assets.icons.flag}
          style={{resizeMode: 'contain', height: 20, width: 20}}
        />
        <TouchableOpacity
          style={{padding: 5}}
          onPress={() => handleButtonClick(id)}>
          <Image
            source={assets.icons.menu}
            style={{resizeMode: 'contain', height: 24, width: 24}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.taskTitle}>
        <Text style={styles.titleText} numberOfLines={2}>
          {title}
        </Text>
      </View>
      <View style={styles.timeLine}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={assets.icons.alarm}
            style={{resizeMode: 'contain', height: 20, width: 20}}
          />
          <Spacer direction="horizontal" size={5} />
          <Text style={styles.timeText}>{formatTime(time)}</Text>
        </View>
        <View>
          <Text style={styles.timeText}>{formatDate(time)}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(TaskCard);

const styles = StyleSheet.create({
  container: {
    minWidth: scaleWidth(327),
    minHeight: scaleWidth(138),
    borderRadius: 18,
    backgroundColor: Color.WHITE,
    shadowColor: Color.SUCCESS_BACKGROUND,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  priority: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  timeLine: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    ...CUSTOM_FONT.Medium,
    color: Color.BLACK,
    fontSize: 16,
  },
  timeText: {
    ...CUSTOM_FONT.Medium,
    color: Color.NEUTRAL_SECONDARY,
    fontSize: 14,
  },
});
