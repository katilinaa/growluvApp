import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { useUser } from '../../contexts/UserContext'

// Themed Components
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const { login, user } = useUser()

    const handleSubmit = async () => {
      setError(null)
        try{
            await login(email, password)
            console.log('Registered user:', user)
        } catch (error){
            setError(error.message)
        }
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style= {styles.container}>
        <Spacer />
      <ThemedText style ={styles.title} title={true}>
        Login to your account
      </ThemedText>

      <ThemedTextInput
        style={{width: '80%', marginBottom: 20}}
        placeholder='Email'
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <ThemedTextInput
        style={{width: '80%', marginBottom: 20}}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
     
      <ThemedButton onPress={handleSubmit}>
        <Text style= {{color: "#f2f2f2"}}>Login</Text>
      </ThemedButton>

      <Spacer />
      {error && <Text style={styles.error}>{error}</Text>}

      <Spacer height={100} />
      <Link href="/register" >
       <ThemedText style= {{textAlign: 'center'}}>New to GrowLuv? Sign up here</ThemedText>
       </Link>
    </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 30
    },
    btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
    },
    pressed: {
        opacity: 0.8,
    },
    error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  }
})
