import {createContext, useState, useContext, useEffect} from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from '../firebase'
import { generateFirebaseAuthErrorMessage } from '../contexts/ErrorHandler.ts'
import { set } from 'firebase/database'
export const UserContext = createContext()

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [authChecked, setAuthChecked] = useState(false)

    async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        // onAuthStateChanged will automatically set the user
    }
    catch(error) {
        const errorMessage = generateFirebaseAuthErrorMessage(error)
        //Debugging purposes
        console.log('error code in context:', error.code)
        console.log('error message in context:', errorMessage)
        throw new Error(errorMessage)
    }
    }
    async function register(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        await login(email, password)
        // Verification email checking - to be enabled later
        // await sendEmailVerification(user)
        // alert('Verification email sent. Please verify your email before logging in.')
    }
    catch(error) {
        const errorMessage = generateFirebaseAuthErrorMessage(error)
        //Debugging purposes
        console.log('error code in context:', error.code)
        console.log('error message in context:', errorMessage)
        throw new Error(errorMessage)
        }
    }
    async function logout() {
        try{
        await signOut(auth)
        setUser(null)
        }
        catch(error){
        console.log('Logout error:', error)
        throw new Error('Failed to logout. Please try again.')
        }
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setAuthChecked(true)
        })
        return unsubscribe
    }, [])

    return(
        <UserContext.Provider value={{user, login, register, logout, authChecked}}> 
        {children}
        </UserContext.Provider>        
    )
}
    
export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}