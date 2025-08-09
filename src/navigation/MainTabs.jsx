import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "../screens/home/HomeScreen";
import ShortsScreen from "../screens/shorts/ShortsScreen";
import AddPostScreen from "../screens/addPost/AddPostScreen";
import SavedScreen from "../screens/saved/SavedScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import amitabh from '../../assets/amitabh.jpg'

const Tab = createBottomTabNavigator();

// Example: dummy user image URL, replace with real data from your auth state/store
const loggedInUserProfileImage = amitabh;

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#e91e63",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#1a1a2e" },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Profile") {
            return (
              <Image
                source={loggedInUserProfileImage }
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: focused ? 2 : 0,
                  borderColor: focused ? "#e91e63" : "transparent",
                }}
              />
            );
          }

          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Shorts") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          } else if (route.name === "AddPost") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Saved") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shorts" component={ShortsScreen} />
      <Tab.Screen name="AddPost" component={AddPostScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
