import { useContext, useLayoutEffect, useState } from "react";
import { Pressable, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignOut, CaretRight } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { MuscleButton } from "../components/MuscleButton";

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
        video: 'https://www.youtube.com/watch?v=5YpVRG94q9c&ab_channel=LiriaFreitas'
    },
    {
        id: 2,
        name: 'Remada curvada',
        cover: 'https://img.freepik.com/fotos-premium/remada-curvada-com-halteres_600776-10095.jpg?w=740',
        video: null
    },
    {
        id: 3,
        name: 'Remada unilateral',
        cover: 'https://blog.totalpass.com.br/wp-content/uploads/2022/12/treino-de-costas-remada-unilateral.jpg',
        video: null
    },
    {
        id: 4,
        name: 'Levantamento terra',
        cover: 'https://img.freepik.com/free-photo/muscular-build-man-making-effort-while-weightlifting-during-cross-training-gym_637285-2488.jpg?w=740&t=st=1682513764~exp=1682514364~hmac=0c776e52c26a99026ad306f90af89c96fe0dfa6dd47a8ba56ed63f0de035ea27',
        video: 'https://www.youtube.com/watch?v=og3V7NtHx8I&ab_channel=M%C3%A9todoF90'
    },
    {
        id: 5,
        name: 'Supino reto',
        cover: 'https://img.freepik.com/free-photo/focused-man-doing-workout-weight-bench_329181-14155.jpg?w=740&t=st=1682513277~exp=1682513877~hmac=556bd6ae9cc8879fa108e10dff474e65ef4cb9d19b5f68c35091458d3d1139ae',
        video: null
    },
    {
        id: 6,
        name: 'Tríceps corda',
        cover: 'https://img.freepik.com/free-photo/muscular-man-doing-triceps_1163-799.jpg?w=360&t=st=1682454141~exp=1682454741~hmac=5d3e9e57e3738bf3b42208ad8042134cfe7b81edec8240da6aa886e6a9963d7f',
        video: null
    }
];

export function Home() {

    const tabNavigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const stackNavigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    const { signOut } = useContext(AuthContext);

    const [categoryMuscle, setCategoryMuscle] = useState<number[]>([]);

    useLayoutEffect(() => setCategoryMuscle(prevState => [categories[0].id]), []);

    useLayoutEffect(() => {

        tabNavigation.setOptions({
            header: () => (
                <Header>
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
                </Header>
            ),            
        });

    }, [tabNavigation]);

    function handleNavigate(item: ExerciseDetailProps) {

        stackNavigation.navigate('Details', item);

    }

    function handleSelectMuscle(category_id: number) {

        setCategoryMuscle(prevState => [category_id]);

    }

    return (
      <SafeAreaView className="bg-background flex-1 p-6">
        <View className="mb-6">
          <FlatList 
            data={categories}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (

                <MuscleButton 
                    title={item.name} 
                    selected={categoryMuscle.some(category => category === item.id)} 
                    action={() => handleSelectMuscle(item.id)} 
                />

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
                    className="bg-gray_500 mb-3 w-full h-[120px] py-3 rounded-lg flex flex-row items-center justify-around"
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
