import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store.js"
import { Platform, StatusBar } from "react-native";
import { View } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent={false} />
      <View
        style={{
          height: Platform.OS === "android" ? StatusBar.currentHeight : 44,
          backgroundColor: "#1a1a2e",
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      />
      <AppNavigator />
    </Provider>
  );
}
