import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
} from "react-native";
import Toast from 'react-native-toast-message'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import appLogo from "../../../assets/app-logo.png";
import { navigate } from "~/navigation/NavigationService";
import CustomButton from "~/components/CustomButton";
import validateSignupForm from "./validateSignupForm";
import { useDispatch, useSelector } from "react-redux";
import { signupNewUser } from "~/features/auth/authSlice";
import * as SecureStore from 'expo-secure-store';

export default function SignupScreen() {
    const { error, isLoggedIn } = useSelector((state) => state.auth);
    const [formState, setFormState] = useState({
        displayName: "",
        emailOrMobile: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        emailOrMobile: "",
        username: "",
        password: "",
    });

    useEffect(() => {
        if (error) {
            Toast.show({
                type: 'error', // or 'success'
                text1: 'Error',
                text2: error,
                position: 'top',
                visibilityTime: 3000,
            });
        }
    }, [error]);

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (field, value) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" })); // clear error on change
    };

    // --- Event handler ---
    const handleSignup = () => {
        const { valid, errors } = validateSignupForm(formState);
        setErrors(errors);
        if (!valid) return;
        dispatch(signupNewUser(formState));
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
        <>
            <LinearGradient
                colors={["#1a1a2e", "#16213e", "#0f3460"]}
                className="flex-1"
            >
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    extraScrollHeight={50}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    className="px-6"
                >
                    {/* Logo */}
                    <View className="items-center mb-6">
                        <Image
                            source={appLogo}
                            className="w-28 h-28 rounded-[4rem]"
                            resizeMode="contain"
                        />
                    </View>

                    {/* Title */}
                    <Text className="text-white text-4xl font-bold text-center mb-2">
                        Create Account
                    </Text>
                    <Text className="text-gray-300 text-center mb-8">
                        Join Moxora and start connecting today!
                    </Text>

                    {/* Display Name */}
                    <View className="mb-3">
                        <Text className="text-gray-300 mb-2">Display Name</Text>
                        <TextInput
                            value={formState.displayName}
                            onChangeText={(text) => handleChange("displayName", text)}
                            placeholder="Enter your name"
                            placeholderTextColor="#aaa"
                            className="bg-white/10 text-white px-4 py-3 rounded-xl border border-white/20"
                        />
                    </View>

                    {/* Email or Mobile */}
                    <View className="mb-3">
                        <Text className="text-gray-300 mb-2">Email or Mobile</Text>
                        <TextInput
                            value={formState.emailOrMobile}
                            onChangeText={(text) => handleChange("emailOrMobile", text)}
                            placeholder="Enter your email or phone"
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                            className={`bg-white/10 text-white px-4 py-3 rounded-xl border ${errors.emailOrMobile ? "border-red-500" : "border-white/20"
                                }`}
                        />
                        {errors.emailOrMobile ? (
                            <Text className="text-red-500 mt-1">{errors.emailOrMobile}</Text>
                        ) : null}
                    </View>

                    {/* Username */}
                    <View className="mb-3">
                        <Text className="text-gray-300 mb-2">Username</Text>
                        <TextInput
                            value={formState.username}
                            onChangeText={(text) => handleChange("username", text)}
                            placeholder="Choose a username"
                            placeholderTextColor="#aaa"
                            className={`bg-white/10 text-white px-4 py-3 rounded-xl border ${errors.username ? "border-red-500" : "border-white/20"
                                }`}
                        />
                        {errors.username ? (
                            <Text className="text-red-500 mt-1">{errors.username}</Text>
                        ) : null}
                    </View>

                    {/* Password */}
                    <View className="mb-8">
                        <Text className="text-gray-300 mb-2">Password</Text>
                        <View className="flex-row items-center bg-white/10 rounded-xl border border-white/20">
                            <TextInput
                                value={formState.password}
                                onChangeText={(text) => handleChange("password", text)}
                                placeholder="Enter your password"
                                placeholderTextColor="#aaa"
                                secureTextEntry={!showPassword}
                                className="flex-1 text-white px-4 py-3"
                            />
                            <Pressable
                                onPress={() => setShowPassword((prev) => !prev)}
                                className="px-3"
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off" : "eye"}
                                    size={22}
                                    color="#aaa"
                                />
                            </Pressable>
                        </View>
                        {errors.password ? (
                            <Text className="text-red-500 mt-1">{errors.password}</Text>
                        ) : null}
                    </View>

                    {/* Signup Button */}
                    <CustomButton title="Sign Up" onPress={handleSignup} />

                    {/* Already have an account */}
                    <Pressable onPress={() => navigate("Login")} className="mt-5">
                        <Text className="text-gray-400 text-center">
                            Already have an account?{" "}
                            <Text className="text-pink-400 font-semibold">Login</Text>
                        </Text>
                    </Pressable>
                </KeyboardAwareScrollView>
            </LinearGradient>
        </>
    );
}
