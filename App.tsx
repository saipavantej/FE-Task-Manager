import {StyleSheet, Text, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import React, {useEffect} from 'react';

type Props = {};

const App = (_props: Props) => {
  useEffect(() => {
    setTimeout(async () => {
      await BootSplash.hide({fade: true});
    }, 7000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
