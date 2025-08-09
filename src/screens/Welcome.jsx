import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { navigate } from "../navigation/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import appLogo from "../../assets/app-logo.png";

export default function Welcome() {
  useEffect(() => {
    const checkFirstVisit = async () => {
      const visited = await AsyncStorage.getItem("visited");
      if (visited) {
        navigate("Signup");
      }
    };
    checkFirstVisit();
  }, []);

  const handleNext = async () => {
    await AsyncStorage.setItem("visited", "true");
    navigate("Login");
  };

  return (
    <LinearGradient
      colors={["#ff6f61", "#de1b74", "#7f00ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center px-6"
    >
      {/* Logo with Glow */}
      <View className="mb-8 items-center">
        <View className="w-40 h-40 bg-white/10 rounded-full justify-center items-center shadow-2xl">
          <Image
            source={appLogo}
            className="w-28 h-28 rounded-[6rem]"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* App Name */}
      <Text className="text-white text-4xl font-extrabold tracking-wide mb-3 text-center">
        Moxora
      </Text>

      {/* Tagline */}
      <Text className="text-white/80 text-lg text-center leading-6 mb-12">
        Your social world, reimagined.  
        Connect • Share • Grow
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        onPress={handleNext}
        className="bg-white px-12 py-4 rounded-full shadow-lg active:opacity-80"
      >
        <Text className="text-pink-600 text-lg font-bold tracking-wide">
          Get Started
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
