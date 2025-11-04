import { StyleSheet, ImageBackground} from 'react-native';
import Logo from "../components/Logo";
import FormChangePassword from "../components/FormChangePassword";

function RecSenhaScreen() {

    return (
        <ImageBackground source={require('../assets/login-bg.png')} style={styles.bg}>
            <Logo />

            <FormChangePassword />
        </ImageBackground>
    )
}

export default RecSenhaScreen;

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 30
    }
})