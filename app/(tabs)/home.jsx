import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FollowerIconCard from '../../components/FollowerIconCard';
import Feather from '@expo/vector-icons/Feather';
import PostCard from '../../components/PostCard';
import axios from 'axios'
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();


  useEffect(() => {
    axios.get("http://192.168.152.18:8080/api/post/all").then((res) => {
      setPosts(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])


  return (
    <>
      <View style={styles.header}>
        <View style={styles.profWithLogo}>
          <Text style={styles.logoText}>𝑴𝒐𝒙𝒐𝒓𝒂</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Ionicons name="add-outline" size={24} color="#515452" style={styles.searchIcon} onPress={() => router.push("/post/createPost")} />
          <Ionicons name="search-outline" size={24} color="#515452" style={styles.searchIcon} />
          <Pressable onPress={() => router.navigate("../profile")}>
            <Image source={{ uri: "https://i.ibb.co/VYdnkZnj/profile.jpg" }} style={styles.profileImage} />
          </Pressable>
        </View>
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: '#e8e6e1' }}></View>
      <FlatList
        data={posts} // Post data
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <PostCard itemInfo={item} profileImage={"https://i.ibb.co/VYdnkZnj/profile.jpg"} name={"Rohit Kumar"} />}
        showsVerticalScrollIndicator={false}

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
    padding: 10,
    backgroundColor: 'white'
  },
  profWithLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  logoText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#050412',
  },
  searchIcon: {
    backgroundColor: '#d9dbda',
    padding: 8,
    borderRadius: 100,
  },

});
