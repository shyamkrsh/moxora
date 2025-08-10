import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Platform, StatusBar, View } from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../toastConfig";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent={false} />
      <View className="flex-1">
        <View
          className={`w-full ${
            Platform.OS === "android" ? "h-[${StatusBar.currentHeight}px]" : "h-11"
          } bg-[#1a1a2e] z-10`}
          style={{
            height:
              Platform.OS === "android"
                ? StatusBar.currentHeight
                : 44,
          }}
        />
        <AppNavigator />
        <Toast config={toastConfig} />
      </View>
    </Provider>
  );
}
