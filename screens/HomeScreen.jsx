import { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import { TokenContext } from '../context/tokenContext';
import urlAPI from '../config/urlAPI';
import { useNavigation } from '@react-navigation/native';
import colors from "../design/colors";
import Header from '../components/Header';
import CardConsulta from "../components/CardConsulta";
import Card_ConsultaAtual from "../components/Card_ConsultaAtual";

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
        <ScrollView>
            <View style={styles.container}>
                <Header />

                <Text style={styles.textTitleConsulta}>Consulta atual</Text>

                <View style={styles.containerCardConsulta}>
                    <Card_ConsultaAtual />
                </View>

                <Text style={styles.textTitleConsulta}>Histórico de consultas</Text>

                <View style={styles.containerCardConsulta}>
                    <CardConsulta />
                </View>

                <View style={styles.containerCardConsulta}>
                    <CardConsulta />
                </View>

                <View style={styles.containerCardConsulta}>
                    <CardConsulta />
                </View>

                <View style={styles.modalBarraLateral}>
                    <TouchableOpacity style={styles.btnBarraLateral}>
                        <Image source={require('../assets/icone-user-simples.png')}  style={styles.img}></Image>
                        <Text style={styles.textBtn}>Minha conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnBarraLateral}>
                        <Image source={require('../assets/icone-sair.png')} style={styles.img}></Image>
                        <Text style={styles.textBtn}>Sair</Text>
                    </TouchableOpacity>
                </View>

                <Text>Olá, {name}!</Text>

                <TouchableOpacity style={styles.btnLogout} onPress={() => logout()}>
                    <Text style={styles.textLogout}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 20,
    },
    btnLogout: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.redBase,
    },
    textLogout: {
        color: colors.white,
        fontWeight: 700,
    },
    containerCardConsulta: {
        boxSizing: 'border-box',
        width: '100%',
    },
    textTitleConsulta: {
        color: colors.blueDark,
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    modalBarraLateral: {
        backgroundColor: colors.white,
        height: 90,
        width: 180,
        borderRadius: 15,
        justifyContent: "center",
        paddingHorizontal: 25,
        gap: 10
    },
    textBtn: {
        color: colors.black,
        fontSize: 18,
        fontWeight: "500",
    },
    btnBarraLateral: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5
    },
    img: {
        width: 25,
        height: 25,
    }
})
