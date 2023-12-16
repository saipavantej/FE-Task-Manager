import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useNetworkStatus from '@hooks/useNetworkStatus';
import {CUSTOM_FONT} from '@constants/fonts';

type Props = {};

const NetInfo = (_props: Props) => {
  const isConnected = useNetworkStatus();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [isConnected]);

  if (isConnected && isVisible) {
    return (
      <View style={styles.connectedContainer}>
        <Text style={styles.connectedText}>Connected</Text>
      </View>
    );
  } else if (!isConnected && isVisible) {
    return (
      <View style={styles.disconnectedContainer}>
        <Text style={styles.disconnectedText}>No Connection</Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  connectedContainer: {
    backgroundColor: 'green',
    padding: 5,
    alignItems: 'center',
  },
  disconnectedContainer: {
    backgroundColor: 'red',
    padding: 5,
    alignItems: 'center',
  },
  connectedText: {
    color: 'white',
    ...CUSTOM_FONT.Medium,
  },
  disconnectedText: {
    color: 'white',
    ...CUSTOM_FONT.Medium,
  },
});

export default NetInfo;
