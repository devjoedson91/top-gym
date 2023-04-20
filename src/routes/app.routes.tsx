import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { House, ClockCounterClockwise, UserCircle } from "phosphor-react-native";
import { StackRoutes } from "./stackRoutes";
import { Historic } from "../screens/Historic";
import { Perfil } from "../screens/Perfil";

const Tab = createBottomTabNavigator<TabParamsList>();

export default function AppRoutes() {

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#202024',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    height: 120
                },
                headerTintColor: '#fff',
                tabBarHideOnKeyboard: true, // a tab bar nao vai ficar por cima do teclado
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#121212',
                tabBarStyle: {
                    backgroundColor: '#202024',
                    borderTopWidth: 0,
                    height: 80
                }
            }}
        >
            <Tab.Screen 
                name="HomeTab"
                component={StackRoutes}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <House size={32} color="#00875F"  />;
                        }

                        return <House size={32} color="#C4C4CC" />;
                        
                    }
                }}
            />
            <Tab.Screen 
                name="Historic"
                component={Historic}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <ClockCounterClockwise size={32} color="#00875F" />;
                        }

                        return <ClockCounterClockwise size={32} color="#C4C4CC" />;                       
                    }
                }}
            />
            <Tab.Screen 
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        if (focused) {
                            return <UserCircle size={32} color="#00875F" />;
                            
                        }
                        return <UserCircle size={32} color="#C4C4CC" />;
                    }
                }}
            />
        </Tab.Navigator>
    );

}