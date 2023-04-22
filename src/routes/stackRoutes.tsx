import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";

const Stack = createNativeStackNavigator();

export function StackRoutes() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                    headerStyle: {
                        backgroundColor: "#202024",
                    },
                    headerTintColor: "#fff",
                }} 
            />
            <Stack.Screen name="Details" component={Details} options={{headerShown: false}} />
        </Stack.Navigator>
    );

}

// headerStyle: {
//     backgroundColor: '#202024',
//     elevation: 0,
//     shadowOpacity: 0,
//     borderBottomWidth: 0,
//     height: 120
// },