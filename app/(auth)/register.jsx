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

const register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {user, register} = useUser()

    const handleSubmit = () => {
        try{
            register(email, password)
            console.log('Registered user:', user)
        } catch (error){

        }
    }
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView style= {styles.container}>
        <Spacer />
      <ThemedText style ={styles.title} title={true}>
        Register For an Account
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
        <Text style= {{color: "#f2f2f2"}}>Register</Text>
      </ThemedButton>

      <Spacer height={100} />
      <Link href="/login" >
       <ThemedText style= {{textAlign: 'center'}}>Already with us? Login here</ThemedText>
       </Link>
    </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default register

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
    }
})
