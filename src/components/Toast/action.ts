import * as React from 'react';

export const toastRef = React.createRef<any>();

export const showSuccessToast = (text: string, duration: number = 2000) => {
  toastRef.current?.show(text, duration, 'success');
};
export const showErrorToast = (text: string, duration: number = 2000) => {
  toastRef.current?.show(text, duration, 'error');
};
export const showDefaultToast = (text: string, duration: number = 2000) => {
  toastRef.current?.show(text, duration, 'default');
};
