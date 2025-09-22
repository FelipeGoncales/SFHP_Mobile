import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../design/colors';

function Logo() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.img}></Image>
            <Text style={styles.title}>SFHP</Text>
        </View>
    )
}

export default Logo;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 47,
        height: 42,
        resizeMode: "contain"
    },
    title: {
        fontSize: 28,
        color: colors.white,
        fontWeight: 800
    }
})