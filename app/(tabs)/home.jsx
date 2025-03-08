import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FollowerIconCard from '../../components/FollowerIconCard';
import Feather from '@expo/vector-icons/Feather';
import PostCard from '../../components/PostCard';
import axios from 'axios'
import { useRouter } from 'expo-router';


const Home = () => {

  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:8080/api/post/all").then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])


  return (
    <>
      <View style={styles.header}>
        <View style={styles.profWithLogo}>
          <Text style={styles.logoText}>Moxora</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Ionicons name="add-outline" size={24} color="#515452" style={styles.searchIcon} />
          <Ionicons name="search-outline" size={24} color="#515452" style={styles.searchIcon} />
          <Pressable onPress={() => router.navigate("../profile")}>
            <Image source={{ uri: "https://i.ibb.co/VYdnkZnj/profile.jpg" }} style={styles.profileImage} />
          </Pressable>
        </View>
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: '#e8e6e1' }}></View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} // Post data
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <PostCard profileImage={"https://i.ibb.co/VYdnkZnj/profile.jpg"} name={"Rohit Kumar"} />}
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
    padding: 15,
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
    fontSize: 23,
    fontWeight: '500',
    color: '#6e736f',
  },
  searchIcon: {
    backgroundColor: '#d9dbda',
    padding: 8,
    borderRadius: 100,
  },
  followersContainer: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    // backgroundColor: '#e3e3e3',
    backgroundColor: 'transparent'
  },
  mystory: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mystoryImage: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
