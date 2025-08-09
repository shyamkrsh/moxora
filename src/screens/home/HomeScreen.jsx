import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import loggedUseImg from '../../../assets/amitabh.jpg'
import { Feather, MaterialIcons } from "@expo/vector-icons";


import stories from "~/constants/stories";
import posts from "~/constants/posts";

export default function HomeScreen() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const unreadCount = 3;
  return (
    <>

      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        className="flex-1  px-4"
      >
        {/* Header: Search + User profile */}
        <View className="flex-row items-center mb-4 px-4 pt-4">
          {isSearchActive ? (
            <>
              <Pressable
                onPress={() => {
                  setIsSearchActive(false);
                  setSearchText("");
                }}
                className="mr-3"
                hitSlop={10}
              >
                <Feather name="arrow-left" size={28} color="white" />
              </Pressable>

              <TextInput
                autoFocus
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search"
                placeholderTextColor="#aaa"
                className="flex-1 bg-white/10 text-white rounded-full px-4 py-3"
              />

              <Pressable
                className="ml-3 bg-pink-600 p-2 rounded-full"
                hitSlop={10}
                onPress={() => {
                  /* Voice search handler */
                }}
              >
                <MaterialIcons name="keyboard-voice" size={24} color="white" />
              </Pressable>
            </>
          ) : (
            <>
              <Text className="text-white text-2xl font-bold flex-1">Moxora</Text>

              {/* Notification icon with badge */}
              <Pressable className="mr-4 relative" hitSlop={10} onPress={() => { /* handle notifications */ }}>
                <Feather name="bell" size={22} color="#ddd" />
                {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 items-center justify-center">
                    <Text className="text-white text-xs font-bold">{unreadCount}</Text>
                  </View>
                )}
              </Pressable>

              {/* Search icon */}
              <Pressable
                onPress={() => setIsSearchActive(true)}
                hitSlop={10}
              >
                <Feather name="search" size={22} color="#ddd" />
              </Pressable>
            </>
          )}
        </View>













        {/* Stories Section */}
        <View className="mb-6">
          <Text className="text-white text-lg font-semibold mb-3">Stories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stories.map((story) => (
              <View
                key={story.id}
                className="mr-4 items-center"
                style={{ width: 70 }}
              >
                <View className="w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden mb-2">
                  <Image
                    source={story?.image}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <Text className="text-white text-xs text-center" numberOfLines={1}>
                  {story.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Posts Feed */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          className="flex-1"
          renderItem={({ item }) => (
            <View className="bg-white/10 rounded-xl p-4 mb-4">
              <View className="flex-row items-center mb-3">
                <Image
                  source={{ uri: item.userImage }}
                  className="w-10 h-10 rounded-full mr-3"
                  resizeMode="cover"
                />
                <Text className="text-white font-semibold">{item.user}</Text>
              </View>
              <Text className="text-white">{item.content}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-gray-400 text-center mt-10">
              No posts to show
            </Text>
          }
        />
      </LinearGradient>
    </>
  );
}
