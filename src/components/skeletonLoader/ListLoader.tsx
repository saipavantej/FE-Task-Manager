import * as React from 'react';
import {View, useWindowDimensions, StyleSheet, FlatList} from 'react-native';
import {Loader, SkeletonLoader} from './SkeletonLoader';
import {Spacer} from '@components/spacer/Spacer';
import {createArrayOfObjects} from '@utils/index';
import {scaleHeight, scaleWidth} from '@utils/scaleDimension';

const ListLoader: React.FC<ListLoaderProps> = ({
  backgroundColor,
  highlightColor,
  count,
  type,
}) => {
  const arrayOfObjects = React.useMemo(
    () => createArrayOfObjects(count),
    [count],
  );
  const renderLoader = () => {
    switch (type) {
      case 'tasks':
        return (
          <SkeletonLoader
            backgroundColor={backgroundColor}
            highlightColor={highlightColor}>
            <View style={styles.container}>
              <Item />
            </View>
          </SkeletonLoader>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item: any) => item.id}
      data={arrayOfObjects}
      renderItem={renderLoader}
      ItemSeparatorComponent={Separator}
    />
  );
};

const Item: React.FC = () => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Loader style={[styles.line]} />
      <Spacer direction="vertical" size={10} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Loader
          style={[styles.line, {width: 35, height: 35, borderRadius: 35}]}
        />
        <Spacer direction="horizontal" size={5} />
        <View>
          <Loader style={[{width: width * 0.6, height: 5}]} />
          <Spacer direction="vertical" size={8} />
          <Loader style={[{width: width * 0.3, height: 5}]} />
          <Spacer direction="vertical" size={8} />
          <Loader style={[{width: width * 0.5, height: 5}]} />
        </View>
      </View>
    </View>
  );
};

const Separator: React.FC = () => {
  return <Spacer direction="vertical" size={10} />;
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 10},
  row: {flexDirection: 'row'},
  image: {
    height: scaleHeight(100),
    width: scaleWidth(100),
    marginRight: scaleWidth(10),
  },
  line: {
    height: scaleHeight(35),
  },
});

export default ListLoader;
