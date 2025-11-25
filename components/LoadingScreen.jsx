import {ActivityIndicator, Dimensions, View} from "react-native";
import colors from "../design/colors";

function LoadingScreen() {
    return (
        <View style={styles.loadingScreen}>
            <ActivityIndicator size="large" color={colors.blueDark} />
        </View>
    )
}

// Width e height da tela
const { width, height } = Dimensions.get("window");

const styles = {
    loadingScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: 'white',
        zIndex: 9999999,
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export default LoadingScreen;