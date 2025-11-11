import { useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import { TokenContext } from '../context/tokenContext';
import urlAPI from '../config/urlAPI';
import { useNavigation } from '@react-navigation/native';
import colors from "../design/colors";
import Header from '../components/Header';
import CardConsulta from "../components/CardConsulta";
import CardConsultaAtual from "../components/CardConsultaAtual";
import ModalBarraLateral from "../components/ModalBarraLateral";

function HomeScreen() {
    // Variável state do nome
    const [consultas, setConsultas] = useState([]);

    // Variável state para controle da modal
    const [showModal, setShowModal] = useState(false);

    // Hook useNavigation
    const navigation = useNavigation();

    // Obtém o token do context
    const { token } = useContext(TokenContext);

    // useEffect para buscar dados ao carregar a página
    useEffect(() => {
        // Fetch na URL da API
        const fetchGetConsultas = async () => {
            if (!token) return navigation.navigate('Login'); // evita chamada antes de ter o token

            const response = await fetch(`${urlAPI}/get_consultas?p=True`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // Resposta da API
            const data = await response.json();

            // Atualiza a lista de consultas
            setConsultas(data.consultas);
        };

        fetchGetConsultas();
    }, [token]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Header setShowModal={setShowModal} showModal={showModal} />

                {
                    showModal ? (<ModalBarraLateral setShowModal={setShowModal} />) : null
                }

                <Text style={styles.textTitleConsulta}>Consulta atual</Text>

                {
                    consultas.filter(consulta => consulta.situacao !== "Alta recebida").length > 0 ? (
                        consultas
                            .filter(consulta => consulta.situacao !== "Alta recebida")
                            .map((consulta, index) => (
                                <CardConsultaAtual key={index} consulta={consulta} />
                            ))
                    ) : (
                        <Text style={styles.consultNofFound}>Nenhuma consulta encontrada.</Text>
                    )
                }

                <Text style={styles.textTitleConsulta}>Histórico de consultas</Text>

                <View style={styles.containerCardConsulta}>
                    {
                        consultas.filter(consulta => consulta.situacao === "Alta recebida").length > 0 ? (
                            consultas
                                .filter(consulta => consulta.situacao === "Alta recebida")
                                .map((consulta, index) => (
                                    <CardConsulta key={index} consulta={consulta} />
                                ))
                        ) : (
                            <Text style={styles.consultNofFound}>Nenhuma consulta encontrada.</Text>
                        )
                    }
                </View>
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
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
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
    }
})
