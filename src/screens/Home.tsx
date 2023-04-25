import { useContext, useLayoutEffect } from "react";
import { Pressable, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignOut } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";

export function Home() {

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const { signOut } = useContext(AuthContext);

    useLayoutEffect(() => {

        navigation.setOptions({
            header: () => (
                <View className="bg-secondary h-[100] flex flex-row items-center justify-around">
                    <View className="flex flex-row gap-3 items-center">
                        <Image 
                            className="w-[60px] h-[60px] rounded-full"
                            source={require('../assets/perfil.jpg')} 
                        />
                        <View>
                            <Text className="text-white font-medium">Olá,</Text>
                            <Text className="text-white font-bold text-base">Joedson Ferreira</Text>
                        </View>                   
                    </View>
                    <Pressable onPress={signOut}>
                        <SignOut size={32} color="#fff" />
                    </Pressable>
                </View>
            ),
            
        });

    }, [navigation]);

    const categories = [
        {
            id: 1,
            name: 'Costas'
        },
        {
            id: 2,
            name: 'Peito'
        },
        {
            id: 3,
            name: 'Bíceps'
        },
        {
            id: 4,
            name: 'Tríceps'
        },
        {
            id: 5,
            name: 'Ombros'
        },
        {
            id: 6,
            name: 'Trapézio'
        },
    ];

    return (
      <SafeAreaView className="bg-background flex-1 p-6">
        <View className="mb-6">
          <FlatList 
            data={categories}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
                <TouchableOpacity
                    key={item.id}
                    className="mr-2 w-24 h-11 border border-green_500 rounded-md justify-center items-center"
                >
                    <Text className="text-white font-medium text-lg">{item.name}</Text>
                </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <Text className="text-white font-medium text-base mb-6">Exercícios</Text>
          <FlatList 
            data={categories}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
                <View className="bg-secondary mb-3 w-full h-[120px] rounded-lg self-center"></View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    );
}
