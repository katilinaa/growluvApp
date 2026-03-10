import {Pressable, StyleSheet} from 'react-native'
import { Colors } from '../constants/Colors'

function ThemedButton({style, ...props}){
    return (
        <Pressable 
            style={({pressed}) => [styles.btn, pressed && styles.pressed, style]}
            {...props}
        />
    )
}
const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.primary,
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: 1},
        elevation: 5,
        padding: 18,
        borderRadius: 35,
        marginVertical: 10,
        width: '70%',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.5,
    }
})

export default ThemedButton