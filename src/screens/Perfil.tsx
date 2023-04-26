import { useLayoutEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
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
        <SafeAreaView className="bg-background flex-1 p-4">
            <Text>Perfil</Text>
        </SafeAreaView>
    );
}