import { useContext, useLayoutEffect } from "react";
import { Pressable, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignOut, CaretRight } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";

export function Home() {

    const tabNavigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const stackNavigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    const { signOut } = useContext(AuthContext);

    useLayoutEffect(() => {

        tabNavigation.setOptions({
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

    }, [tabNavigation]);

    function handleNavigate(item: ExerciseDetailProps) {

        stackNavigation.navigate('Details', item);

    }

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

    const exercises = [
        {
            id: 1,
            name: 'Puxada frontal',
            cover: 'https://img.freepik.com/free-photo/high-angle-woman-doing-exercises-arms_23-2148419870.jpg?w=740&t=st=1682514888~exp=1682515488~hmac=c375a602b8856f35463f7933e5bf337c03dd0252e1646dafb517005185e60041',
        },
        {
            id: 2,
            name: 'Remada curvada',
            cover: 'https://img.freepik.com/fotos-premium/remada-curvada-com-halteres_600776-10095.jpg?w=740',
        },
        {
            id: 3,
            name: 'Remada unilateral',
            cover: 'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treino-de-costas-remada-unilateral.jpg',
        },
        {
            id: 4,
            name: 'Levantamento terra',
            cover: 'https://img.freepik.com/free-photo/muscular-build-man-making-effort-while-weightlifting-during-cross-training-gym_637285-2488.jpg?w=740&t=st=1682513764~exp=1682514364~hmac=0c776e52c26a99026ad306f90af89c96fe0dfa6dd47a8ba56ed63f0de035ea27',
        },
        {
            id: 5,
            name: 'Supino reto',
            cover: 'https://img.freepik.com/free-photo/focused-man-doing-workout-weight-bench_329181-14155.jpg?w=740&t=st=1682513277~exp=1682513877~hmac=556bd6ae9cc8879fa108e10dff474e65ef4cb9d19b5f68c35091458d3d1139ae',
        },
        {
            id: 6,
            name: 'Tríceps corda',
            cover: 'https://img.freepik.com/free-photo/muscular-man-doing-triceps_1163-799.jpg?w=360&t=st=1682454141~exp=1682454741~hmac=5d3e9e57e3738bf3b42208ad8042134cfe7b81edec8240da6aa886e6a9963d7f',
        }
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
        <View className="flex-1">
          <Text className="text-white font-medium text-base mb-6">Exercícios</Text>
          <FlatList 
            data={exercises}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
                <TouchableOpacity 
                    className="bg-secondary mb-3 w-full h-[120px] py-3 rounded-lg flex flex-row items-center justify-around"
                    key={item.id} 
                    onPress={() => handleNavigate(item)}
                >
                    {
                        item.cover ? (
                            <Image 
                                source={{uri: item.cover}}
                                className="w-[120px] h-full rounded-lg" 
                                resizeMode="contain"
                            />
                        ) : (
                            <View className="w-[120] h-full rounded-lg bg-gray_300"></View>
                        )
                    }
                    <Text className="text-white font-medium text-base">{item.name}</Text>
                    <CaretRight size={32} color="#fff" />
                </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    );
}
