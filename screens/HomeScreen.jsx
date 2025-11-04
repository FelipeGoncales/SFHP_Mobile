import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TokenContext } from '../context/tokenContext';
import urlAPI from '../config/urlAPI';
import { useNavigation } from '@react-navigation/native';
import colors from "../design/colors";

function HomeScreen() {
    // Variável state do nome
    const [name, setName] = useState('');

    // Hook useNavigation
    const navigation = useNavigation();

    // Obtém o token do context
    const { token, setToken } = useContext(TokenContext);

    // useEffect para buscar dados ao carregar a página
    useEffect(() => {
        // Fetch na URL da API
        const fetchData = async () => {
            if (!token) return navigation.navigate('Login'); // evita chamada antes de ter o token

            const response = await fetch(`${urlAPI}/cadastro`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Resposta da API
            const data = await response.json();

            // Obtém os dados do usuário
            const user = data.user;

            // Obtém o tipo do usuário
            const tipoUsuario = parseInt(user.tipo_usuario);

            // Atualiza o nome
            setName(user.nome);
        };

        fetchData();
    }, [token]);

    // Logout
    function logout() {
        // Limpa o token
        setToken('');

        // Redireciona para login
        return navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text>Olá, {name}!</Text>

            <TouchableOpacity style={styles.btnLogout} onPress={() => logout()}>
                <Text style={styles.textLogout}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    btnLogout: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.redBase,
    },
    textLogout: {
        color: colors.white,
        fontWeight: 700,
    }
})
