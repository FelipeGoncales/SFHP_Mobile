import { ImageBackground, Text, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import FormLogin from '../components/FormLogin';

function LoginScreen() {

    return (
        <ImageBackground source={require('../assets/login-bg.png')} style={styles.bg}>
            <Logo />

            <FormLogin />
        </ImageBackground>
    )

}

export default LoginScreen;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 30
    }
})