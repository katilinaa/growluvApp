import { StyleSheet, Text, } from 'react-native'
import { Link, useRouter } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext'
// Themed Components
import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'
import ThemedLoader from '../components/ThemedLoader'

const Home = () => {
  const router = useRouter()
  const { user, authChecked } = useUser()
  useEffect(() => {
    if (authChecked && user) {
      router.replace('/(dashboard)/feed')
    }
  }, [user, authChecked])

  if (!authChecked || user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedLoader></ThemedLoader>
        <Text>Loading...</Text>
      </ThemedView>
    )
  }
  return (
    <ThemedView style={styles.container}>
      <ThemedText style ={styles.title} title={true}>
        Ready to make a difference?
      </ThemedText>

      <Spacer height={10} />
      <ThemedText >Sign in to your account.</ThemedText>
      <Spacer height={20} />
       
      <ThemedButton onPress ={() => router.push('/login')}>
        <Text style= {{color: "#f2f2f2"}}>Login</Text>
      </ThemedButton>
       <Link href="/register" style={styles.link}>
         <ThemedText>New To GrowLuv? Sign Up</ThemedText>
        </Link>
    </ThemedView>
  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
  }
})