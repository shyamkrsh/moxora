import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FollowerIconCard from '../../components/FollowerIconCard';
import Feather from '@expo/vector-icons/Feather';
import PostCard from '../../components/PostCard';

const Home = () => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.profWithLogo}>
          <Image source={{ uri: "https://i.ibb.co/VYdnkZnj/profile.jpg" }} style={styles.profileImage} />
          <Text style={styles.logoText}>Moxora</Text>
        </View>
        <Ionicons name="search" size={24} color="#515452" style={styles.searchIcon} />
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]} // Post data
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <PostCard profileImage={"https://i.ibb.co/VYdnkZnj/profile.jpg"} name={"Rohit Kumar"} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.followersContainer}>
            <View style={styles.mystory}>
              <View style={styles.mystoryImage}>
                <Feather name="plus" size={30} color="#4e4f4e" />
              </View>
              <Text style={{ color: '#6b6e6c', fontWeight: '600' }}>You</Text>
            </View>
            <FlatList
              horizontal
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <FollowerIconCard profileImage={"https://i.ibb.co/VYdnkZnj/profile.jpg"} name={"Rohit Kumar"} />}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            />
          </View>
        )}
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
    padding: 20,
    backgroundColor : 'white'
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
    fontWeight: '600',
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
    backgroundColor : 'transparent'
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
