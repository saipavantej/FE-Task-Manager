import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import RootNavigation from '@navigation/RootNavigation';
import NetInfo from '@components/netInfo/NetInfo';
import {Provider} from 'react-redux';
import store from './src/store';
import Toast from '@components/Toast/Toast';
import {toastRef} from '@components/Toast/action';

type Props = {};

const App = (_props: Props) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <RootNavigation />
          <Toast {...{ref: toastRef}} />
        </BottomSheetModalProvider>
        <NetInfo />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
