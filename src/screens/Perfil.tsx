import { useLayoutEffect } from "react";
import { Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function Perfil() {

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    useLayoutEffect(() => {

        navigation.setOptions({
            header: () => (
                <View className="bg-secondary h-[100] flex flex-row items-center justify-center px-5">
                    <Text className="text-white font-medium text-lg">Perfil</Text>
                </View>
            ),
            headerShown: true
        });

    }, [navigation]);

    return (
        <KeyboardAvoidingView 
            className="bg-background flex-1 py-4 px-5" 
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <View className="mb-3">
                    <Image 
                        source={require('../assets/perfil.jpg')}
                        className="rounded-full w-[148px] h-[148px] self-center"
                    />
                    <Text className="font-regular text-green_500 text-base text-center">Alterar foto</Text>
                </View>
                <View className="mb-3">
                    <TextInput 
                        className="w-full bg-gray_500 mb-3 p-3 font-regular text-base rounded-md text-white"
                        placeholder="Nome"
                        placeholderTextColor="#7C7C8A"
                    />
                    <TextInput 
                        className="w-full bg-gray_500 p-3 font-regular text-base rounded-md text-white"
                        placeholder="E-mail"
                        placeholderTextColor="#7C7C8A"
                    />
                </View>
                <View className="mb-3">
                    <Text className="font-regular text-white text-base mb-3">Alterar senha</Text>
                    <TextInput 
                        className="w-full bg-gray_500 mb-3 p-3 font-regular text-base rounded-md text-white"
                        placeholder="Senha antiga"
                        placeholderTextColor="#7C7C8A"
                        secureTextEntry={true} 
                    />
                    <TextInput 
                        className="w-full bg-gray_500 p-3 font-regular text-base rounded-md text-white"
                        placeholder="Nova senha"
                        placeholderTextColor="#7C7C8A"
                        secureTextEntry={true} 
                    />
                </View>
                <TouchableOpacity 
                    className="w-full flex justify-center items-center rounded-md bg-green_700 p-3 self-center" 
                    activeOpacity={0.8}            
                >
                    <Text className="text-white text-lg font-medium">Atualizar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}