import { useContext, useLayoutEffect, useEffect, useState, useRef } from "react";
import { Pressable, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignOut, CaretRight } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { MuscleButton } from "../components/MuscleButton";
import api from "../services/api";
import { Loading } from "../components/Loading";

export function Home() {

    const tabNavigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const stackNavigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    const { signOut } = useContext(AuthContext);

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

    const [categories, setCategories] = useState<CategoriesProps[]>([]);
    const [muscleSelected, setMuscleSelected] = useState<CategoriesProps | undefined>();

    const [exercises, setExercises] = useState<ExercisesProps[]>([]);

    const [loading, setLoading] = useState(false);

    async function listCategories() {

        setLoading(true);

        const response = await api.get('/v1/categories');

        setCategories(() => {

            const sortCategories = 
            response.data.sort((a: CategoriesProps, b: CategoriesProps) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

            return sortCategories;

        });

        setMuscleSelected(response.data[0]);

        setLoading(false);

    }

    async function listExercises() {

        setLoading(true);

        const response = await api.get(`/v1/categories/${muscleSelected?.id || ''}`);

        const { exercises } = response.data;

        setExercises(exercises);

        setLoading(false);

    }

    useEffect(() => { 
        listCategories() 
    }, []);

    useEffect(() => {

        listExercises();

    }, [muscleSelected]);


    function handleNavigate(item: ExerciseDetailProps) {

        stackNavigation.navigate('Details', item);

    }

    function handleSelectMuscle(category: CategoriesProps) {

        setMuscleSelected(category);

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
                    selected={muscleSelected?.id === item.id}
                    action={() => handleSelectMuscle(item)} 
                />

            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View className="flex-1">
          <Text className="text-white font-medium text-base mb-6">Exercícios</Text>
          {
            loading ? (
                <Loading />
            ) : (
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
            )
          }
        </View>
      </SafeAreaView>
    );
}
