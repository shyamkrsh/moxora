import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostCard from '../../components/PostCard';

const Home = () => {
  let baseUrl = `https://moxorabackend.onrender.com`
  const [posts, setPosts] = useState([]);
  const [currUserInfo, setCurrUserInfo] = useState({});
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (!token || !userId) {
        console.error("Error: User not authenticated.");
        return;
      }
      await axios.get(
        `${baseUrl}/api/user/userDetails`,
        {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data: { userId }
        }
      ).then((res) => {
        setCurrUserInfo(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
    })();
  }, []);

  useEffect(() => {
    axios.get(`${baseUrl}/api/post/all`).then((res) => {
      setPosts(res?.data?.data);
    }).catch((err) => {
      console.log(err);
    });
  });

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>𝑴𝒐𝒙𝒐𝒓𝒂</Text>
        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton} onPress={() => router.push("/post/createPost")}>
            <Ionicons name="add-outline" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => router.navigate("../profile")}>
            <Image source={{ uri: currUserInfo?.profilePic || "https://i.ibb.co/7xx3DVQY/prof.jpg" }} style={styles.profileImage} />
          </Pressable>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <PostCard itemInfo={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'serif',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});
