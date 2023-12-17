import {RootStackParamList} from '@constants/routes';
import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }
}
function push(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

function back(count?: number) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}

function popToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}
function replace(routeName: string, params?: object | undefined): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(routeName, {
        params,
      }),
    );
  }
}

function reset(key: string, routeNames: string[], routes: any) {
  navigationRef.reset({key, routeNames, routes});
}

export {navigate, push, back, popToTop, replace, reset};
