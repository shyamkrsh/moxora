import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather, MaterialIcons } from "@expo/vector-icons";

export default function AddPostScreen() {
  const [postType, setPostType] = useState(null); // 'reel', 'fullVideo', 'textImage'
  const [title, setTitle] = useState("");
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null); // "image" or "video"
  const [loading, setLoading] = useState(false);

  const pickMedia = async (type) => {
    setLoading(true);

    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Permission to access media is required!");
      setLoading(false);
      return;
    }

    let mediaTypes = ImagePicker.MediaTypeOptions.All;
    if (type === "reel" || type === "fullVideo") {
      mediaTypes = ImagePicker.MediaTypeOptions.Videos;
    } else if (type === "textImage") {
      mediaTypes = ImagePicker.MediaTypeOptions.Images;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes,
        allowsEditing: true,
        quality: 1,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        setMediaUri(result.assets[0].uri);
        setPostType(type);
        setMediaType(type === "textImage" ? "image" : "video");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick media. Please try again.");
      console.log("Error picking media:", error);
    }
    setLoading(false);
  };

  const submitPost = () => {
    if (!postType || !title) {
      Alert.alert("Incomplete", "Please select a post type and add a title.");
      return;
    }
    Alert.alert(
      "Success",
      `Your ${postType === "textImage" ? "text & image" : postType} post was submitted!`
    );
    // Reset after submit
    setPostType(null);
    setMediaUri(null);
    setMediaType(null);
    setTitle("");
  };

  return (
    <ScrollView className="flex-1 bg-[#1a1a2e] p-6">
      <Text className="text-white text-3xl font-extrabold mb-8">Create New Post</Text>

      {/* Post Type Buttons */}
      <View className="flex-row justify-between mb-8">
        {[
          {
            key: "reel",
            label: "Upload Reel",
            icon: <Feather name="video" size={32} />,
          },
          {
            key: "fullVideo",
            label: "Upload Video",
            icon: <MaterialIcons name="movie" size={32} />,
          },
          {
            key: "textImage",
            label: "Text + Image",
            icon: <Feather name="image" size={32} />,
          },
        ].map(({ key, label, icon }) => (
          <TouchableOpacity
            key={key}
            onPress={() => pickMedia(key)}
            disabled={loading}
            className={`flex-1 mx-1 p-4 rounded-lg items-center border-2 ${
              postType === key
                ? "border-pink-500 bg-pink-600"
                : "border-gray-600 bg-transparent"
            }`}
            activeOpacity={0.8}
          >
            {React.cloneElement(icon, {
              color: postType === key ? "white" : "gray",
            })}
            <Text
              className={`mt-2 font-semibold ${
                postType === key ? "text-white" : "text-gray-400"
              } text-center`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Media Preview */}
      {mediaUri && (
        <View className="mb-8 rounded-lg overflow-hidden border-2 border-pink-600 bg-black">
          {mediaType === "image" ? (
            <Image
              source={{ uri: mediaUri }}
              className="w-full h-64 rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <View className="h-64 flex justify-center items-center">
              <Text className="text-white italic text-lg">
                Video selected (Preview not available)
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Title/Description Input */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Write a title or description..."
        placeholderTextColor="#aaa"
        className="bg-white/10 text-white rounded-lg p-4 text-lg mb-8"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        editable={!loading}
      />

      {/* Submit Button */}
      <TouchableOpacity
        disabled={!postType || !title || loading}
        onPress={submitPost}
        className={`rounded-lg py-4 items-center ${
          postType && title && !loading ? "bg-pink-600" : "bg-pink-600/50"
        }`}
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-lg">
          {loading ? "Processing..." : "Post"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
