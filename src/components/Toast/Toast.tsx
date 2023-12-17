import {Color} from '@constants/colors';
import {scaleHeight} from '@utils/scaleDimension';
import React, {useState, useRef, useImperativeHandle, useEffect} from 'react';
import {StyleSheet, View, Text, Animated, TextStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {}

type tostType = 'defauilt' | 'error' | 'success';
const Toast: React.FC<Props> = React.forwardRef((_props, ref) => {
  const insets = useSafeAreaInsets();

  const [isShow, setShow] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');
  const [type, setType] = useState<tostType>('defauilt');
  const opacityValue = useRef<Animated.Value>(new Animated.Value(1)).current;
  let animation: Animated.CompositeAnimation | null = null;
  let timer: NodeJS.Timeout | null = null;
  let isShowing: boolean = false;

  useEffect(() => {
    return () => {
      animation && animation.stop();
      timer && clearTimeout(timer);
    };
  }, [animation, timer]);

  useImperativeHandle(ref, () => ({
    show: (text: string, duration: number, tostType: tostType) => {
      show(text, duration, tostType);
    },
  }));

  const show = (text: string, duration: number, tostType: tostType) => {
    setType(tostType);
    setShow(true);
    setToastText(text);

    animation = Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
    animation.start(() => {
      isShowing = true;
      close(duration);
    });
  };

  const close = (duration: number) => {
    if (!isShowing && !isShow) {
      return;
    }
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      animation = Animated.timing(opacityValue, {
        toValue: 0.0,
        duration: 500,
        useNativeDriver: true,
      });
      animation.start(() => {
        setShow(false);
        isShowing = false;
      });
    }, duration);
  };

  const getStyleFromType = (): TextStyle => {
    switch (type) {
      case 'error':
        return {borderColor: Color.ERROR_DARK};
      case 'success':
        return {borderColor: Color.BRAND_PRIMARY_DARK};
      default:
        return {borderColor: Color.NEUTRAL_LINE};
    }
  };

  return (
    <>
      {isShow && (
        <View
          style={[styles.container, {bottom: insets.bottom + scaleHeight(20)}]}
          pointerEvents="none">
          <Animated.View
            style={[
              styles.content,
              {opacity: opacityValue},
              getStyleFromType(),
            ]}>
            <Text style={styles.text}>{toastText}</Text>
          </Animated.View>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    backgroundColor: Color.NEUTRAL_LINE,
    borderRadius: 12,
    padding: 8,
    bottom: 50,
    maxWidth: '80%',
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    color: Color.NEUTRAL_PRIMARY,
    textAlign: 'center',
  },
});

export default Toast;
