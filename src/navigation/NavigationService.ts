import { CommonActions, createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

// Navigate to any screen
export function navigate(name: string, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// Go back
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

// Reset navigation stack
export function reset(routeName: string) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
  }
}
// Replace current screen

export function replace(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name, params)
    );
  }
}
