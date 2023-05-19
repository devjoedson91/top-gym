import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Barbell } from "phosphor-react-native";
import { BackgroundPage } from "../components/BackgroundPage";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledInput } from "../components/ControlledInput";
import { Button } from "../components/Button";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type FormData = {
    name: string;
    email: string;
    password: string;
}

const schema = yup.object({
    name: yup.string().required('Informe o seu nome'),
    email: yup.string().email('E-mail inválido').required('Informe o e-mail'),
    password: yup.string().min(4, 'A senha deve ter ao menos 6 digitos').required('Informe a senha'),
    // password_confirm: yup.string().oneOf([yup.ref('password')], 'A senha de confirmação não confere')
});

export function SignUp() {

    const navigation = useNavigation();

    const { signUp } = useContext(AuthContext);

    const { control, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    async function handleSignUp(data: FormData) {

        await signUp(data);

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
                        <ControlledInput 
                            name="name"
                            className="w-full bg-gray_500 p-3 font-regular text-base rounded-md text-white"
                            placeholder="Nome"
                            placeholderTextColor="#7C7C8A" 
                            control={control}
                            error={errors.name}
                        />
                        <ControlledInput
                            name="email" 
                            className="w-full bg-gray_500 p-3 font-regular text-base rounded-md text-white"
                            placeholder="E-mail"
                            placeholderTextColor="#7C7C8A" 
                            control={control}
                            error={errors.email}
                        />
                        <ControlledInput
                             name="password" 
                             className="w-full bg-gray_500 p-3 font-regular text-base rounded-md text-white"
                             placeholder="Senha"
                             placeholderTextColor="#7C7C8A"
                             secureTextEntry={true}
                             control={control}
                             error={errors.password}
                        />
                        <TouchableOpacity 
                            className="flex justify-center items-center rounded-md bg-green_700 py-3 w-full" 
                            activeOpacity={0.8} 
                            onPress={handleSubmit(handleSignUp)}
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