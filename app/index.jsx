import { StyleSheet, Text, } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
// Themed Components
import ThemedView from '../components/ThemedView'
import Spacer from '../components/Spacer'
import ThemedText from '../components/ThemedText'

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style ={styles.title} title={true}>
        Ready to make a difference?
      </ThemedText>

      <Spacer height={10} />
      <ThemedText >Sign in to your account.</ThemedText>
      <Spacer height={20} />
       
       <Link href="/login" style={styles.link}>
       <ThemedText>Login Page</ThemedText>
       </Link>
       <Link href="/register" style={styles.link}>
         <ThemedText>Register Page</ThemedText>
        </Link>
         <Link href="/profile" style={styles.link}>
         <ThemedText>Profile Page</ThemedText>
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
    borderBottomWidth: 1
  }
})