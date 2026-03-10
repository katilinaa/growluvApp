import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ThemedView from './ThemedView'

const MediaInput = ({onAddImage, onAddVideo}) => {
  return (
    <Pressable>
    <ThemedView style={styles.toolbar}>
      <TouchableOpacity onPress={onAddImage}>
        <Ionicons name="image-outline" size={24} color="gray"/>
        </TouchableOpacity>
    <TouchableOpacity onPress={onAddVideo}>
        <Ionicons name="videocam-outline" size={24} color="gray"/>
        </TouchableOpacity>
    </ThemedView>
    </Pressable>
  )
}

export default MediaInput

const styles = StyleSheet.create({
    btn:{
        flexDirection:'row',
        justifyContent:'flex-start',
        right: 120,
        gap: 10,
        borderRadius:50,
        marginHorizontal:30,
        marginBottom:20
    } 
})