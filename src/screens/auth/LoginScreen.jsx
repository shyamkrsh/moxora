import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import appLogo from "../../../assets/app-logo.png";
import googleImg from '../../../assets/google.png';
import facebookImg from '../../../assets/facebook.png';
import { navigate } from "~/navigation/NavigationService";
import CustomButton from "~/components/CustomButton";
import SocialButton from "~/components/SocialButton";
import { useDispatch } from "react-redux";
import { loginUser } from "~/features/auth/authSlice";
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [emailOrMobileOrUsername, setEmailOrMobileOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrMobileOrUsernameError, setEmailOrMobileOrUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) =>
    /^\d{10,15}$/.test(phone);

  const handleEmailOrMobileOrUsernameChange = (text) => {
    setEmailOrMobileOrUsername(text);

    if (!text) {
      setEmailOrMobileOrUsernameError("Email, mobile or username is required");
    } else if (!(isValidEmail(text) || isValidPhone(text))) {
      // Since username can be anything, you might want to relax validation here.
      // For now, if it doesn't look like email or phone, assume username (so no error).
      setEmailOrMobileOrUsernameError("");
    } else {
      setEmailOrMobileOrUsernameError("");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);

    if (!text) {
      setPasswordError("Password is required");
    } else if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = () => {
    let valid = true;

    if (!emailOrMobileOrUsername) {
      setEmailOrMobileOrUsernameError("Email, mobile or username is required");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    if (!valid) return;

    dispatch(loginUser({ emailOrMobileOrUsername, password }));
  };

  const handleGoogleLogin = () => {
    console.log("Google login pressed");
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login pressed");
  };


  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          navigate("MainTabs");
        }
      } catch (error) {
        console.error("Failed to load token from SecureStore:", error);
      }
    })();
  }, []);

  return (
    <LinearGradient
      colors={["#1a1a2e", "#16213e", "#0f3460"]}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
          className="px-6"
        >
          {/* Logo */}
          <View className="items-center mb-6">
            <Image
              source={appLogo}
              className="w-28 h-28 mb-1 rounded-[3rem]"
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text className="text-white text-4xl font-bold text-center mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-300 text-center mb-8">
            Sign in to continue to Moxora
          </Text>

          {/* Email or Mobile or Username */}
          <View className="mb-1">
            <Text className="text-gray-300 mb-2">Email, Mobile or Username</Text>
            <TextInput
              value={emailOrMobileOrUsername}
              onChangeText={handleEmailOrMobileOrUsernameChange}
              placeholder="Enter your email, phone or username"
              placeholderTextColor="#aaa"
              keyboardType="default"
              textContentType="username"
              autoComplete="username"
              className={`bg-white/10 text-white px-4 py-3 rounded-xl border ${emailOrMobileOrUsernameError ? "border-red-500" : "border-white/20"
                }`}
            />
            {emailOrMobileOrUsernameError ? (
              <Text className="text-red-500 mt-1">{emailOrMobileOrUsernameError}</Text>
            ) : null}
          </View>

          {/* Password */}
          <View className="mb-4">
            <Text className="text-gray-300 mb-2">Password</Text>
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              secureTextEntry
              className={`bg-white/10 text-white px-4 py-3 rounded-xl border ${passwordError ? "border-red-500" : "border-white/20"
                }`}
            />
            {passwordError ? (
              <Text className="text-red-500 mt-1">{passwordError}</Text>
            ) : null}
          </View>

          {/* Login Button */}
          <CustomButton title="Sign In" onPress={handleLogin} />

          {/* Or separator */}
          <View className="flex-row items-center my-6">
            <View className="flex-1 h-px bg-white/30" />
            <Text className="text-white mx-4">Or</Text>
            <View className="flex-1 h-px bg-white/30" />
          </View>

          {/* Social Login Buttons */}
          <SocialButton
            icon={<Image source={googleImg} className="w-8 h-8" />}
            title="Continue with Google"
            bgColor="bg-red-600"
            onPress={handleGoogleLogin}
          />
          <SocialButton
            icon={<Image source={facebookImg} className="w-8 h-8" />}
            title="Continue with Facebook"
            bgColor="bg-blue-700"
            onPress={handleFacebookLogin}
          />

          {/* Footer - Signup link */}
          <Pressable
            onPress={() => console.log("Navigate to Signup")}
            className="mt-8"
          >
            <Text className="text-gray-400 text-center">
              Don't have an account?{" "}
              <Text className="text-pink-400 font-semibold" onPress={() => navigate("Signup")}>Sign Up</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
