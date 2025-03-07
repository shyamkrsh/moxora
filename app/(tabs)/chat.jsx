import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FollowerIconCard from '../../components/FollowerIconCard';
import ContactCard from '../../components/ContactCard';

const Chat = () => {
  return (
    <>
      <View style={styles.chatPageContainer}>
        <View style={styles.header}>
          <Text style={styles.pageTitleText}>Chats</Text>
          <Ionicons name="menu-outline" size={30} color="black" style={styles.menuIcon} />
        </View>
        <View style={styles.searchContainer}>
          <Feather name="search" size={24} color="black" style={styles.searchIcon} />
          <TextInput placeholder='Search' style={styles.searchInput} />
        </View>

        <View>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => <ContactCard profileImage={"https://i.ibb.co/VYdnkZnj/profile.jpg"} name={"Rajesh Kumar"} message={"Hi, shyam how are you bro??"} date={"3d ago"}/>}
            ListHeaderComponent={() => (
              <View style={styles.followersContainer}>
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
        </View>

      </View>
    </>
  )
}

export default Chat

let styles = StyleSheet.create({
  chatPageContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white'
  },
  pageTitleText: {
    color : '#454745',
    fontSize: 25,
    fontWeight: 600
  },
  menuIcon: {
    fontSize: 35
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '85%',
    backgroundColor: '#f0f2f0',
    alignSelf: 'center',
    padding: 2,
    borderRadius: 8,
  },
  searchIcon: {
    color: '#a2a3a2',
    fontSize: 20,
    padding: 5
  },
  searchInput: {
    flex: 1
  },
  followersContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    backgroundColor: '#e3e3e3',
    marginTop: 10
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
})                                 