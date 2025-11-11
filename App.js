import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RecSenhaScreen from "./screens/RecSenhaScreen"
import { TokenProvider } from "./context/tokenContext";
import { CpfPacienteProvider } from "./context/CpfPacienteContext";
import { EmailRecSenhaProvider } from "./context/emailRecSenhaContext";
import ChangePasswordScreen from "./screens/changePasswordScreen";
import profileScreen from "./screens/ProfileScreen";
import DetalhesConsultaScreen from "./screens/DetalhesConsultaScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <TokenProvider>
            <CpfPacienteProvider>
                <EmailRecSenhaProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Home"
                                component={HomeScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="RecSenha"
                                component={RecSenhaScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ChangePassword"
                                component={ChangePasswordScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Profile"
                                component={profileScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="DetalhesConsulta"
                                component={DetalhesConsultaScreen}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </EmailRecSenhaProvider>
            </CpfPacienteProvider>
        </TokenProvider>
    );
}