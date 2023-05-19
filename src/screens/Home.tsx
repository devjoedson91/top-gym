import { useContext, useLayoutEffect, useEffect, useState, useRef } from "react";
import { Pressable, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView, Alert } from "react-native";
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

    const { me } = useContext(AuthContext);

    useLayoutEffect(() => {

        tabNavigation.setOptions({
            header: () => (
                <Header>
                    <View className="flex flex-row gap-3 items-center">
                        <Image 
                            className="w-[60px] h-[60px] rounded-full"
                            source={me.avatar ? {uri: me.avatar} : require('../assets/no-perfil.jpg')}
                        />
                        <View>
                            <Text className="text-white font-medium">Olá,</Text>
                            <Text className="text-white font-bold text-base">{me.name}</Text>
                        </View>                   
                    </View>
                    <Pressable onPress={signOut}>
                        <SignOut size={32} color="#fff" />
                    </Pressable>
                </Header>
            ),            
        });

    }, [tabNavigation, me]);

    const [categories, setCategories] = useState<CategoriesProps[]>([]);
    const [muscleSelected, setMuscleSelected] = useState<CategoriesProps | undefined>();

    const [exercises, setExercises] = useState<ExerciseDetailProps[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => { 

        async function listCategories() {

            try {
    
                setLoading(true);
    
                const response = await api.get('/categories');
    
                setCategories(() => {
    
                    const sortCategories = 
                    response.data.sort((a: CategoriesProps, b: CategoriesProps) => (a.muscle > b.muscle) ? 1 : ((b.muscle > a.muscle) ? -1 : 0));
    
                    return sortCategories;
    
                });
    
                setMuscleSelected(response.data[0]);
    
                setLoading(false);
    
            } catch(err) {
    
                setLoading(false);
                console.log('erro na requisição de categorias: ', err);
            }
    
        }

        listCategories();
    }, []);

    async function listExercises() {

        try {

           if (muscleSelected?.id) {

                setLoading(true);

                const response = await api.get('/category/exercise', {
                    params: {
                        category_id: muscleSelected.id
                    }
                });

                setExercises(response.data);

                setLoading(false);

           } else {
              return;
           }

        } catch(err) {

            setLoading(false);
            console.log('erro na requisição de exercicios: ', err);
        }

    }

    useEffect(() => {

        listExercises();

    }, [muscleSelected]);


    function handleNavigate(item: ExerciseDetailProps) {

        stackNavigation.navigate('Details', item);

    }

    function handleSelectMuscle(category: CategoriesProps) {

        setMuscleSelected(category);

    }

    if (loading) {

        return <Loading />;

    }

    return (
      <SafeAreaView className="bg-background flex-1 p-6">
        <View className="mb-6">
          <FlatList 
            data={categories}
            keyExtractor={item => item.id}
            renderItem={({item}) => (

                <MuscleButton 
                    title={item.muscle} 
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
                    keyExtractor={item => item.id}
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
