import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StackRoutes } from "./stackRoutes";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {

    return (
        <Tab.Navigator
            screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true, // a tab bar nao vai ficar por cima do teclado
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#121212',
            tabBarStyle: {
                backgroundColor: '#fff',
                borderTopWidth: 0
            }
        }}
        >
            <Tab.Screen 
                name="HomeTab"
                component={StackRoutes}
                
            />
        </Tab.Navigator>
    );

}