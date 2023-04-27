import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Barbell } from "phosphor-react-native";
import { BackgroundPage } from "../components/BackgroundPage";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {

    const navigation = useNavigation();

    async function handleSignUp() {

        navigation.goBack();

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
                        <Text className="text-white text-lg font-medium">Crie sua conta</Text>
                        <TextInput 
                            className="w-full bg-gray_500 p-3 font-regular text-base rounded-md text-white"
                            placeholder="Nome"
                            placeholderTextColor="#7C7C8A"
                        />
                        <TextInput 
                            className="w-full bg-gray_500 p-3 font-regular text-base rounded-md text-white"
                            placeholder="E-mail"
                            placeholderTextColor="#7C7C8A"
                        />
                        <TextInput 
                             className="w-full bg-gray_500 p-3 font-regular text-base rounded-md text-white"
                             placeholder="Senha"
                             placeholderTextColor="#7C7C8A"
                             secureTextEntry={true}
                        />
                        <TouchableOpacity 
                            className="flex justify-center items-center rounded-md bg-green_700 py-3 w-full" 
                            activeOpacity={0.8} 
                            onPress={() => handleSignUp()}
                        >
                            <Text className="text-white text-lg font-medium">Criar e acessar</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="w-full flex items-center gap-4">
                        <TouchableOpacity 
                            className="flex justify-center items-center rounded-md border-2 border-green_700 bg-transparent py-3 w-full" 
                            activeOpacity={0.8} 
                            onPress={() => navigation.goBack()}
                        >
                            <Text className="text-white text-lg font-medium">Voltar para o login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <LinearGradient className="absolute left-0 right-0 bottom-0 h-[55%] bg-transparent" colors={['transparent', 'rgba(0, 0, 0, .7)', 'rgba(0, 0, 0, .95)']} />
            </BackgroundPage>       
        </SafeAreaView>
    );

}