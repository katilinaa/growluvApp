import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, Platform} from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
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
            router.push('/feed')
        } catch (error){
            setError(error.message)
        }
    }
    const content = (<ThemedView style= {styles.container}>
        <Spacer />
      <ThemedText style ={styles.title} title={true}>
        Login to your account
      </ThemedText>

      <ThemedTextInput
        style={{width: '80%', marginBottom: 10, borderRadius: 6}}
        placeholder='Email Address'
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        editable={true}
        pointerEvents="auto"
      />

      <ThemedTextInput
        style={{width: '80%', marginBottom: 5}}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        editable={true}
        pointerEvents="auto"
      />
     
      <ThemedButton onPress={handleSubmit}>
        <Text style= {{color: "#f2f2f2"}}>Login</Text>
      </ThemedButton>

      <Spacer height={10} />
      {error && <Text style={styles.error}>{error}</Text>}
       <Spacer />

      <Spacer height={10} />
      <Link href="/register" >
       <ThemedText style= {{textAlign: 'center'}}>New to GrowLuv? Sign up here</ThemedText>
       </Link>

    </ThemedView>
    )
  return Platform.OS == 'web' ? content : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {content}
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
