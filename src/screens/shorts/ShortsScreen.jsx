import React, { useState, useRef, useCallback } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, Pressable, TextInput } from "react-native";
import { Video } from "expo-av";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"; // <-- add this

const { height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 70;
const adjustedHeight = height - 160;

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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const unreadCount = 3;

  const videoRefs = useRef(new Map());

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const togglePause = (id) => {
    setPausedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
      setPausedIds(new Set()); // reset pauses when scrolling
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  // 🔹 Handle focus/unfocus to play/pause videos
  useFocusEffect(
    useCallback(() => {
      // Screen is focused → auto play current video
      const currentItem = reelsData[currentIndex];
      if (currentItem) {
        const videoRef = videoRefs.current.get(currentItem.id);
        if (videoRef) {
          videoRef.playAsync();
        }
      }

      // Screen unfocus → pause all videos
      return () => {
        videoRefs.current.forEach((video) => {
          if (video) video.pauseAsync();
        });
      };
    }, [currentIndex])
  );

  const renderItem = ({ item, index }) => {
    const isLiked = likedIds.has(item.id);
    const isSaved = savedIds.has(item.id);
    const isPaused = pausedIds.has(item.id);

    return (
      <Pressable
        onPress={() => togglePause(item.id)}
        style={{ height: adjustedHeight }}
        className="relative w-full bg-[#1a1a2e]"
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

        {/* Right action buttons */}
        <View className="absolute right-2 top-1/2 h-60 w-14 justify-between items-center">
          <TouchableOpacity onPress={() => toggleLike(item.id)} className="items-center">
            <Feather name="heart" size={32} color={isLiked ? "#e91e63" : "white"} />
            <Text className="text-white text-xs mt-1">{item.likes + (isLiked ? 1 : 0)}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center mt-5">
            <Feather name="message-circle" size={32} color="white" />
            <Text className="text-white text-xs mt-1">{item.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center mt-5">
            <Feather name="share-2" size={32} color="white" />
            <Text className="text-white text-xs mt-1">Share</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleSave(item.id)} className="items-center mt-5">
            <MaterialCommunityIcons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={32}
              color={isSaved ? "#e91e63" : "white"}
            />
            <Text className="text-white text-xs mt-1">{item.saved + (isSaved ? 1 : 0)}</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom user info */}
        <View className="absolute left-5 right-5" style={{ bottom: TAB_BAR_HEIGHT + 10 }}>
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: item.userImage }}
              className="w-11 h-11 rounded-full border-2 border-pink-600 mr-3"
            />
            <Text className="text-white font-bold text-lg">@{item.user}</Text>
          </View>

          <Text className="text-white font-extrabold text-normal ps-4">{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      {/* Header */}
      <View className="flex-row items-center pb-2 px-4 pt-4 bg-[#1a1a2e]">
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

            <Pressable className="ml-3 bg-pink-600 p-2 rounded-full" hitSlop={10}>
              <MaterialIcons name="keyboard-voice" size={24} color="white" />
            </Pressable>
          </>
        ) : (
          <>
            <Text className="text-white text-2xl font-bold flex-1">Moxora</Text>

            <Pressable className="mr-4 relative" hitSlop={10}>
              <Feather name="bell" size={22} color="#ddd" />
              {unreadCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 items-center justify-center">
                  <Text className="text-white text-xs font-bold">{unreadCount}</Text>
                </View>
              )}
            </Pressable>

            <Pressable onPress={() => setIsSearchActive(true)} hitSlop={10}>
              <Feather name="search" size={22} color="#ddd" />
            </Pressable>
          </>
        )}
      </View>

      {/* Video list */}
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
      />
    </>
  );
}
