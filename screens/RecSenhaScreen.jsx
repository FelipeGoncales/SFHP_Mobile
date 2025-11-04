import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

function RecSenhaScreen() {

    const navigation = useNavigation();

    function voltarLogin() {
        return navigation.navigate('Login')
    }
    return (
        <View>
            <Text>Rec senha</Text>

            <TouchableOpacity onPress={voltarLogin}>
                <Text>voltar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RecSenhaScreen;