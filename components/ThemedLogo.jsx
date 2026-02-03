import { Image, useColorScheme } from "react-native";

//images
import DarkLogo from '../assets/logo.png';
import LightLogo from '../assets/logo.png';

const ThemedLogo =() => {
    const colorScheme = useColorScheme();
    const logo = colorScheme === 'dark' ? DarkLogo : LightLogo;
    return(
        <Image source={logo}/>
    )
}

export default ThemedLogo