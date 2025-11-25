import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    RefreshControl,
    Dimensions, TouchableWithoutFeedback, ActivityIndicator
} from 'react-native';
import { TokenContext } from '../context/tokenContext';
import urlAPI from '../config/urlAPI';
import { useNavigation } from '@react-navigation/native';
import colors from "../design/colors";
import Header from '../components/Header';
import CardConsulta from "../components/CardConsulta";
import CardConsultaAtual from "../components/CardConsultaAtual";
import ModalBarraLateral from "../components/ModalBarraLateral";
import LoadingScreen from "../components/LoadingScreen";

function HomeScreen() {

    // Estado para armazenar a lista de consultas obtidas da API.
    const [consultas, setConsultas] = useState([]);

    // Tela de loading
    const [loading, setLoading] = useState(true);

    // Estado para controlar a visibilidade do modal.
    const [showModal, setShowModal] = useState(false);

    // Hook para ter acesso ao objeto de navegação (usado para redirecionar).
    const navigation = useNavigation();

    // Obtém o token de autenticação armazenado globalmente (Context API).
    const { token } = useContext(TokenContext);

    // Estado para controlar o indicador de carregamento (ActivityIndicator) e o RefreshControl.
    const [refreshing, setRefreshing] = useState(true);

    // Função assíncrona para buscar os dados das consultas na API.
    useEffect(() => {
        const fetchGetConsultas = async () => {
            // Verifica se o token existe; se não, redireciona o usuário para a tela de Login.
            if (!token) return navigation.navigate('Login');

            // Faz a requisição GET para a API, passando o token no header para autenticação.
            const response = await fetch(`${urlAPI}/get_consultas?p=True`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Converte a resposta da API para JSON.
            const data = await response.json();

            // Atualiza o estado 'consultas' com a lista retornada pela API.
            setConsultas(data.consultas);

            setLoading(false);
        };

        fetchGetConsultas(); // Executa a busca de consultas.

        // Desativa o indicador de loading inicial.
        // Idealmente, deve ser movido para dentro de fetchGetConsultas após a resposta da API.
        setRefreshing(false);
    }, [token, navigation]); // Dependências: reexecuta se 'token' ou 'navigation' mudarem.

    // Função acionada pelo 'RefreshControl' quando o usuário puxa a tela para baixo.
    const onRefresh = async () => {
        setLoading(true);
        setRefreshing(true); // Ativa o indicador de recarregamento.

        // Define uma função interna e assíncrona para buscar os dados da API.
        const fetchGetConsultas = async () => {
            // Verifica se o token de autenticação existe.
            if (!token) return navigation.navigate('Login'); // Se não houver token, redireciona o usuário para a tela de Login e encerra a função.

            // Realiza a requisição GET para buscar as consultas.
            const response = await fetch(`${urlAPI}/get_consultas?p=True`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Converte o corpo da resposta HTTP (JSON) em um objeto JavaScript.
            const data = await response.json();
            // Atualiza o estado das consultas com os dados recebidos da API.
            setConsultas(data.consultas);
        };

        // Aguarda a execução completa da busca de dados.
        await fetchGetConsultas();
        // Desativa o indicador de recarregamento, sinalizando que a operação terminou.
        setRefreshing(false);
        setLoading(false);
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>

                {
                    loading ? (
                        <LoadingScreen />
                    ) : null
                }

                <Header setShowModal={setShowModal} showModal={showModal} />

                {
                    showModal ? (
                        <TouchableWithoutFeedback onPress={() => setShowModal(false)} >
                            <View style={styles.containerModal}>
                                <ModalBarraLateral setShowModal={setShowModal} />
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null
                }

                <Text style={styles.textTitleConsulta}>Consulta atual</Text>

                {consultas && consultas.filter(consulta => consulta?.situacao !== "Alta recebida").length > 0 ? (
                    consultas
                        .filter(consulta => consulta?.situacao !== "Alta recebida")
                        .map((consulta, index) => (
                            <CardConsultaAtual key={index} consulta={consulta} />
                        ))
                ) : (
                    <Text style={styles.consultNofFound}>Nenhuma consulta encontrada.</Text>
                )}

                <Text style={styles.textTitleConsulta}>Histórico de consultas</Text>

                <View style={styles.containerCardConsulta}>
                    {consultas && consultas.filter(consulta => consulta?.situacao === "Alta recebida").length > 0 ? (
                        consultas
                            .filter(consulta => consulta?.situacao === "Alta recebida")
                            .map((consulta, index) => (
                                <CardConsulta key={index} consulta={consulta} />
                            ))
                    ) : (
                        <Text style={styles.consultNofFound}>Nenhuma consulta encontrada.</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

// Width e height da tela
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 20,
        paddingBottom: 20
    },
    containerModal: {
        height: height,
        width: width,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999,
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
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,
    },
    textTitleConsulta: {
        color: colors.blueDark,
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    consultNofFound: {
        paddingHorizontal: 22,
        fontSize: 16,
    },
    loadingScreen: {
        position: "absolute",
        height: height,
        width: width,
        top: 0,
        left: 0,
        zIndex: 9999999,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    }
})
