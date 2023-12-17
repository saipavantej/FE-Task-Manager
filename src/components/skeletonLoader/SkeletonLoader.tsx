import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {LinearGradient} from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const SPEED = 600;
const BACKGROUND_COLOR = '#efefee';
const HIGHLIGHT_COLOR = '#fff';

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  children,
  backgroundColor,
  highlightColor,
}) => {
  const [layout, setLayout] = useState<{width: number; height: number}>();
  const shared = useSharedValue(0);

  useEffect(() => {
    shared.value = withRepeat(withTiming(1, {duration: SPEED}), Infinity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shared.value,
          [0, 1],
          [layout ? -layout.width : 0, layout ? layout.width : 0],
        ),
      },
    ],
  }));

  if (!layout?.width && !layout?.height) {
    return (
      <View onLayout={event => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }

  return (
    <MaskedView
      style={{height: layout.height, width: layout.width}}
      maskElement={<View>{children}</View>}>
      <View
        style={[
          styles.background,
          {backgroundColor: backgroundColor || BACKGROUND_COLOR},
        ]}
      />
      <Animated.View style={[animatedStyles, StyleSheet.absoluteFill]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={StyleSheet.absoluteFill}
              colors={['transparent', 'black', 'transparent']}
            />
          }>
          <View
            style={[
              StyleSheet.absoluteFill,
              {backgroundColor: highlightColor || HIGHLIGHT_COLOR},
            ]}
          />
        </MaskedView>
      </Animated.View>
    </MaskedView>
  );
};

export const Loader: React.FC<LoaderProps> = ({style}) => {
  return <View style={[style ? style : styles.loaderSize, styles.loader]} />;
};

const styles = StyleSheet.create({
  loader: {backgroundColor: '#fff'},
  loaderSize: {width: 100, height: 100},
  background: {
    flexGrow: 1,
    overflow: 'hidden',
  },
});
