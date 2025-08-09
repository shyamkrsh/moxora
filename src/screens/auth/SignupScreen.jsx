import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import appLogo from "../../../assets/app-logo.png";
import { navigate } from "~/navigation/NavigationService";

const CustomButton = ({ title, onPress }) => (
    <Pressable
        onPress={onPress}
        className="bg-pink-500 py-4 rounded-full shadow-lg active:opacity-80"
    >
        <Text className="text-white text-lg font-semibold text-center">{title}</Text>
    </Pressable>
);

export default function SignupScreen() {
    const [displayName, setDisplayName] = useState("");
    const [emailOrMobile, setEmailOrMobile] = useState("");
    const [password, setPassword] = useState("");

    const [emailOrMobileError, setEmailOrMobileError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPhone = (phone) =>
        /^\d{10,15}$/.test(phone);

    // Validate emailOrMobile live on typing
    const handleEmailOrMobileChange = (text) => {
        setEmailOrMobile(text);

        if (!text) {
            setEmailOrMobileError("Email or mobile is required");
        } else if (!(isValidEmail(text) || isValidPhone(text))) {
            setEmailOrMobileError("Enter a valid email or mobile number");
        } else {
            setEmailOrMobileError("");
        }
    };

    // Validate password live on typing
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

    // Final validation on submit
    const handleSignup = () => {
        let valid = true;

        if (!emailOrMobile) {
            setEmailOrMobileError("Email or mobile is required");
            valid = false;
        } else if (!(isValidEmail(emailOrMobile) || isValidPhone(emailOrMobile))) {
            setEmailOrMobileError("Enter a valid email or mobile number");
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

        console.log({ displayName, emailOrMobile, password });
        // Add signup logic here
    };

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
                    className="px-6 "
                >
                    {/* Logo */}
                    <View className="items-center">
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
                            value={displayName}
                            onChangeText={setDisplayName}
                            placeholder="Enter your name"
                            placeholderTextColor="#aaa"
                            className="bg-white/10 text-white px-4 py-3 rounded-xl border border-white/20"
                        />
                    </View>

                    {/* Email or Mobile */}
                    <View className="mb-3">
                        <Text className="text-gray-300 mb-2">Email or Mobile</Text>
                        <TextInput
                            value={emailOrMobile}
                            onChangeText={handleEmailOrMobileChange}
                            placeholder="Enter your email or phone"
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                            className={`bg-white/10 text-white px-4 py-3 rounded-xl border ${emailOrMobileError ? "border-red-500" : "border-white/20"
                                }`}
                        />
                        {emailOrMobileError ? (
                            <Text className="text-red-500 mt-1">{emailOrMobileError}</Text>
                        ) : null}
                    </View>

                    {/* Password */}
                    <View className="mb-12">
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

                    {/* Signup Button */}
                    <CustomButton title="Sign Up" onPress={handleSignup} />

                    {/* Already have an account */}
                    <Pressable onPress={() => console.log("Navigate to Login")} className="mt-5">
                        <Text className="text-gray-400 text-center">
                            Already have an account?{" "}
                            <Text className="text-pink-400 font-semibold" onPress={() => navigate("Login")}>Login</Text>
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
