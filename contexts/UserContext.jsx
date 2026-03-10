import AsyncStorage from '@react-native-async-storage/async-storage'
import {createContext, useState, useContext, useEffect} from 'react'
export const UserContext = createContext()

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [authChecked, setAuthChecked] = useState(false)

    const login = async (email, password) => {
        const response = await fetch('http://192.168.1.133:3000/loginUsers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        if (response.ok) {
            setUser(data.user)
            await AsyncStorage.setItem('token', data.token)
            await AsyncStorage.setItem('user', JSON.stringify(data.user))
        } else {
            throw new Error(data.error)
        }
    }
    async function register(email, password, username) {
        const response = await fetch('http://192.168.1.133:3000/registerUsers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username })
        })
        const data = await response.json()
        if (response.ok) {
            setUser(data.user)
            await AsyncStorage.setItem('token', data.token)
            await AsyncStorage.setItem('user', JSON.stringify(data.user))
        } else {
            throw new Error(data.error)
        }
    }
    async function logout() {
        setUser(null)
        await AsyncStorage.removeItem('token')
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token')
            const user = await AsyncStorage.getItem('user')
            if (token && user) {
                // Optionally verify token with backend
                setUser(JSON.parse(user))
            }
            setAuthChecked(true)
        }
        checkAuth()
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