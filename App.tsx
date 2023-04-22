import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { Loading } from "./src/components/Loading";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    
     <NavigationContainer>
        <AuthProvider>
            <Routes />
            <StatusBar
                // barStyle="light-content"
                // backgroundColor="transparent"
                // translucent
            />
        </AuthProvider>
     </NavigationContainer> 
   
  );
}
