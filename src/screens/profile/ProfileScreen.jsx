import React from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import loggedUserImg from '../../../assets/salman.jpg'

const user = {
  name: "John Doe",
  username: "@johndoe",
  bio: "Tech enthusiast. Love coding & coffee ☕️",
  profileImage:loggedUserImg, // replace with your logged-in user image
  posts: 128,
  followers: 2540,
  following: 300,
};

export default function ProfileScreen() {
  return (
    <ScrollView
      className="flex-1 bg-[#1a1a2e] p-4"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View className="items-center mt-16 mb-6">
        <Image
          source={user.profileImage }
          className="w-28 h-28 rounded-full border-4 border-pink-500"
        />
        <Text className="text-white text-3xl font-bold mt-4">{user.name}</Text>
        <Text className="text-pink-400 text-sm mt-1">{user.username}</Text>
        <Text className="text-gray-300 text-center mt-3 px-6">{user.bio}</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around bg-[#16213e] rounded-xl py-4 mb-6">
        <View className="items-center">
          <Text className="text-white text-xl font-semibold">{user.posts}</Text>
          <Text className="text-gray-400 text-sm">Posts</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-xl font-semibold">{user.followers}</Text>
          <Text className="text-gray-400 text-sm">Followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-white text-xl font-semibold">{user.following}</Text>
          <Text className="text-gray-400 text-sm">Following</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-around mb-6">
        <Pressable className="bg-pink-600 rounded-full px-10 py-3">
          <Text className="text-white font-semibold text-lg">Edit Profile</Text>
        </Pressable>
        <Pressable className="border border-pink-600 rounded-full px-10 py-3">
          <Text className="text-pink-600 font-semibold text-lg">Settings</Text>
        </Pressable>
      </View>

      {/* User Posts Placeholder */}
      <View>
        <Text className="text-white text-xl font-semibold mb-4">Your Posts</Text>
        <View className="bg-[#0f3460] rounded-xl p-6 items-center">
          <Text className="text-gray-400 italic">You haven’t posted anything yet.</Text>
        </View>
      </View>
    </ScrollView>
  );
}
