import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import salmanImg from '../../../assets/salman.jpg';
import sarukhImg from '../../../assets/sarukh.jpg';

const savedPosts = [
  {
    id: "1",
    image: salmanImg,
    title: "Beautiful Sunset",
    description: "A breathtaking sunset view from the mountains.",
  },
  {
    id: "2",
    image: sarukhImg,
    title: "City Lights",
    description: "The city shines bright at night.",
  },
  // Add more saved posts here or fetch dynamically
];

export default function SavedScreen() {
  return (
    <ScrollView
      className="flex-1 bg-[#1a1a2e] p-4"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-white text-2xl font-bold mb-6">Saved Posts</Text>

      {savedPosts.length === 0 ? (
        <View className="items-center mt-20">
          <Text className="text-gray-400 italic">No saved posts yet.</Text>
        </View>
      ) : (
        savedPosts.map((post) => (
          <TouchableOpacity
            key={post.id}
            className="mb-4 bg-[#16213e] rounded-xl overflow-hidden"
            activeOpacity={0.8}
            onPress={() => {
              /* Navigate to post details if needed */
            }}
          >
            <Image
              source={post.image }
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text className="text-white text-lg font-semibold mb-1">{post.title}</Text>
              <Text className="text-gray-400">{post.description}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
