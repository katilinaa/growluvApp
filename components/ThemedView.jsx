import {View, useColorScheme, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const ThemedView = ({style, safe = false, scrollable = false, contentContainerStyle,...props}) => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    const insets = useSafeAreaInsets()
   const containerStyle = safe 
      ? [{
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }, style]
      : [{backgroundColor: theme.background}, style]

  if (!safe) return (
    <View 
        style ={[{backgroundColor: theme.background}, style]}
        {...props}
    />  
  )

  if (scrollable){
    return (
      <ScrollView style= {containerStyle}
        contentContainerStyle={[{
          flexGrow: 1}, contentContainerStyle]}
        {...props}
      />
    )
  }

  return (
    <View 
        style={containerStyle}
        {...props}
      /> 
  )
}

export default ThemedView