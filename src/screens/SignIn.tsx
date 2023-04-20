import { useContext } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Barbell } from "phosphor-react-native";
import { BackgroundPage } from "../components/BackgroundPage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";

export function SignIn() {

    const navigation = useNavigation<NativeStackNavigationProp<CredentialsParamsList>>();

    const { signIn } = useContext(AuthContext);

    function handleLogin() {

        signIn();

    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <BackgroundPage>
                <View className="w-full h-full px-9 flex flex-col items-center justify-evenly z-[1]">
                    <View className="flex flex-row flex-wrap items-center justify-center gap-2">
                        <Barbell size={55} color="#00B37E" />
                        <Text className="font-bold text-white text-3xl">Top Gym</Text>
                        <Text className="font-medium text-white text-base">Treine sua mente e seu corpo</Text>
                    </View>
                    <View className="w-full flex items-center gap-5">
                        <Text className="text-white text-lg font-medium">Acesse sua conta</Text>
                        <TextInput 
                            className="w-full bg-background p-3 font-regular text-base rounded-md text-white"
                            placeholder="E-mail"
                            placeholderTextColor="#7C7C8A"
                        />
                        <TextInput 
                             className="w-full bg-background p-3 font-regular text-base rounded-md text-white"
                             placeholder="Senha"
                             placeholderTextColor="#7C7C8A"
                             secureTextEntry={true}
                        />
                        <TouchableOpacity 
                            className="flex justify-center items-center rounded-md bg-green_700 py-3 w-full" 
                            activeOpacity={0.8}
                            onPress={() => handleLogin()}
                        >
                            <Text className="text-white text-lg font-medium">Acessar</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="w-full flex items-center gap-4">
                        <Text className="text-white text-base font-regular">Ainda não tem acesso?</Text>
                        <TouchableOpacity 
                            className="flex justify-center items-center rounded-md border-2 border-green_700 bg-transparent py-3 w-full" 
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text className="text-white text-lg font-medium">Criar conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <LinearGradient className="absolute left-0 right-0 bottom-0 h-[55%] bg-transparent" colors={['transparent', 'rgba(0, 0, 0, .7)', 'rgba(0, 0, 0, .95)']} />
            </BackgroundPage>       
        </SafeAreaView>
    );

}