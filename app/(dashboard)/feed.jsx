import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import React, { use } from 'react'
import FeedComponent from '../../components/FeedComponent'
import ThemedView from '../../components/ThemedView'
import ThemedButton from '../../components/ThemedButton'

const Feed = () => {
  const router = useRouter()
  return (
  <ThemedView style={styles.container}>
  <SafeAreaView style={{ flex: 1, }} edges = {['top']}>
    
      <FeedComponent/>

      <ThemedButton style = {styles.postButton} onPress ={() => router.push('/post')}>
        <Text style = {{color: '#f2f2f2', fontSize: 30, bottom: 5}}>+</Text>
      </ThemedButton>

    </SafeAreaView>
    </ThemedView>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
})