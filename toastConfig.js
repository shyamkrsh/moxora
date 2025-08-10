// toastConfig.js
import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View, Text } from 'react-native';

const toastTheme = {
  primaryColor: '#0f3460',
  secondaryColor: '#16213e',
  textColor: '#ffffff',
  errorColor: '#ff4d4d',
  successColor: '#4caf50',
};

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: toastTheme.successColor, backgroundColor: toastTheme.secondaryColor }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: toastTheme.textColor,
      }}
      text2Style={{
        fontSize: 14,
        color: toastTheme.textColor,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: toastTheme.errorColor, backgroundColor: toastTheme.secondaryColor }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: toastTheme.textColor,
      }}
      text2Style={{
        fontSize: 14,
        color: toastTheme.textColor,
      }}
    />
  ),
};
