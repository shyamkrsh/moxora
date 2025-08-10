import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./NavigationService";

import Welcome from "../screens/Welcome";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "~/screens/auth/SignupScreen";
import MainTabs from "./MainTabs";  // Import new Tab navigator

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <>
    
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={Welcome} />
          <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />

          {/* Use MainTabs instead of single Home screen */}
          <Stack.Screen name="MainTabs" options={{ headerShown: false }} component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
