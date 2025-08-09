import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { Video } from "expo-av";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 70;

const reelsData = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "johndoe",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Amazing Mountain Views",
    likes: 120,
    comments: 24,
    saved: 35,
  },
  {
    id: "2",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    user: "janedoe",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "City Night Lights",
    likes: 210,
    comments: 50,
    saved: 80,
  },
];

export default function ShortsScreen() {
  const [likedIds, setLikedIds] = useState(new Set());
  const [savedIds, setSavedIds] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pausedIds, setPausedIds] = useState(new Set());

  const videoRefs = useRef(new Map());

  const toggleLike = (id) => {
    const newSet = new Set(likedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setLikedIds(newSet);
  };

  const toggleSave = (id) => {
    const newSet = new Set(savedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSavedIds(newSet);
  };

  const togglePause = (id) => {
    const newSet = new Set(pausedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setPausedIds(newSet);
  };

  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      setPausedIds(new Set());
    }
  });

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 });

  const renderItem = ({ item, index }) => {
    const isLiked = likedIds.has(item.id);
    const isSaved = savedIds.has(item.id);
    const isPaused = pausedIds.has(item.id);

    return (
      <Pressable
        onPress={() => togglePause(item.id)}
        className="relative w-full h-screen bg-[#1a1a2e]"
        android_ripple={{ color: "#333" }}
      >
        <Video
          ref={(ref) => {
            if (ref) videoRefs.current.set(item.id, ref);
          }}
          source={{ uri: item.videoUrl }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height }}
          resizeMode="cover"
          shouldPlay={currentIndex === index && !isPaused}
          isLooping
          useNativeControls={false}
          isMuted={false}
        />

        {/* Action buttons vertical right side */}
        <View className="absolute right-2 top-1/3 h-60 w-14 justify-between items-center">
          <TouchableOpacity onPress={() => toggleLike(item.id)} className="items-center">
            <Feather
              name="heart"
              size={32}
              color={isLiked ? "#e91e63" : "white"}
            />
            <Text className="text-white text-xs mt-1">
              {item.likes + (isLiked ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <Feather name="message-circle" size={32} color="white" />
            <Text className="text-white text-xs mt-1">{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <Feather name="share-2" size={32} color="white" />
            <Text className="text-white text-xs mt-1">Share</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleSave(item.id)} className="items-center">
            <MaterialCommunityIcons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={32}
              color={isSaved ? "#e91e63" : "white"}
            />
            <Text className="text-white text-xs mt-1">
              {item.saved + (isSaved ? 1 : 0)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom left user info and title */}
        <View
          className="absolute left-5 right-5"
          style={{ bottom: TAB_BAR_HEIGHT + 10 }}
        >
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: item.userImage }}
              className="w-11 h-11 rounded-full border-2 border-pink-600 mr-3"
            />
            <Text className="text-white font-bold text-lg">@{item.user}</Text>
          </View>

          <Text className="text-white font-extrabold text-xl">{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={reelsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      decelerationRate="fast"
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewConfigRef.current}
      windowSize={2}
      initialNumToRender={1}
      maxToRenderPerBatch={2}
      removeClippedSubviews={true}
      className="flex-1"
    />
  );
}
