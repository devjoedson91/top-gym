import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CheckBox } from "../components/CheckBox";
import { Barbell, Repeat, Trash, Person, ArrowsCounterClockwise } from "phosphor-react-native";
import colors from "tailwindcss/colors";
import api from "../services/api";
import { Loading } from "../components/Loading";
import { AuthContext } from "../contexts/AuthContext";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function Historic() {

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const { me } = useContext(AuthContext);

    const [days, setDays] = useState<number[]>([1]);

    const [trainings, setTrainings] = useState<TrainingsProps[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: true,
            header: () => (
                <View className="bg-secondary h-[100] flex flex-row items-center justify-center px-5">
                    <Text className="text-white font-medium text-lg">Ficha Semanal</Text>
                    <Pressable 
                        onPress={() => loadTrainings()}
                        className="absolute left-6"
                    >
                        <ArrowsCounterClockwise size={30} color="#00B37E" />
                    </Pressable>
                </View>
            )
        });

    }, [navigation]);

    async function loadTrainings() {

        try {

            setLoading(true);

            console.log(me.id);

            const response = await api.get('/user/trainings', {
                params: {
                    user_id: me.id
                }
            });

            const filterTraining = response.data.filter((training: TrainingsProps ) => {

                return training.day_week === days[0];

            });

            const keys = filterTraining.map((key: TrainingsProps) => {

                return key.muscle;

            });

            setCategories(Array.from(new Set(keys)));

            setTrainings(filterTraining);

            setLoading(false);

        } catch(err) {

            Alert.alert('Erro ao carregar treinos: '+err);
            console.log(err);
            setLoading(false);

        }

    }

    useEffect(() => {
        loadTrainings();
    }, [days]);

    function handleToggleWeekDay(weekDayIndex: number) {

        setDays(prevState => [weekDayIndex]);

    }

    async function handlePutAsCompleted(id: string) {

        try {

            setLoading(true);

            await api.patch(`/training?training_id=${id}`);
            loadTrainings();

            setLoading(false);

        } catch(err) {

            setLoading(false);
            console.log('erro ao completar ou descompletar treino: ', err);
        }

    }

    async function handlePutAsDeleted(id: string) {
        setLoading(true);

        try {

            await api.delete('/training', {
                params: {
                    training_id: id
                }
            });

            loadTrainings();

            setLoading(false);

        } catch(err) {

            setLoading(false);
            console.log('erro ao remover treino: ', err);
        }
    }

    return (
        <SafeAreaView className="bg-background flex-1 px-6 pt-1">
            <View className="w-full justify-around flex-row mt-6 mb-3">
               {
                  weekDays.map((weekDay, i) => (
                     <View className="flex-col" key={`${weekDay}-${i}`}>
                        <Text
                            className="text-gray_200 text-xl font-bold text-center mx-1 mb-2"
                        >
                            {weekDay}
                        </Text>
                        <CheckBox 
                            checked={days.includes(i)} 
                            onPress={() => handleToggleWeekDay(i)} 
                        />
                     </View>
                  ))
               }
            </View>
            {
                loading ? <Loading /> :
                categories.length === 0 ? 
                <View className="flex-1 flex items-center justify-center">
                    <Text className="text-white">NÃO HÁ TREINO PARA ESSE DIA</Text>
                </View> : 
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {
                        categories.map((category, i) => (
                            <View className="mb-3" key={`${i}-${category}`}>
                                <View className="flex flex-row gap-2">
                                    <Text className="text-white font-medium text-base mb-3">
                                        {category}
                                    </Text>
                                    <Person size={20} color="#C4C4CC" />
                                </View>
                                {
                                    trainings.map((training, i) => (
                                        training.muscle === category &&
                                        <TouchableOpacity 
                                            className="bg-gray_500 mb-3 w-full p-3 rounded-lg flex flex-row items-center justify-between" 
                                            key={`${training.id}`}
                                        >
                                            <View>
                                                <Text className="text-white font-medium text-lg mb-3">
                                                    {training.exercise}
                                                </Text>
                                                <View className="flex flex-row gap-3 items-center mb-3">
                                                    <Barbell size={32} color="#00875F" />
                                                    <Text className="text-white font-medium">
                                                        {
                                                            `${training.amount_series} séries`
                                                        }    
                                                    </Text>
                                                    <Repeat size={32} color="#00875F" />
                                                    <Text className="text-white font-medium">
                                                    {
                                                        `${training.amount_repeat} rept`
                                                    }  
                                                    </Text>
                                                </View>
                                                <View className="flex flex-row gap-3 items-center">
                                                    <CheckBox 
                                                        checked={training.is_completed}
                                                        onPress={() => handlePutAsCompleted(training.id)}
                                                    />
                                                    <Text className="text-white font-medium text-base">Marcar como concluído</Text>
                                                </View>
                                            </View>
                                            <Pressable onPress={() => handlePutAsDeleted(training.id)}>
                                                <Trash size={38} color={colors.red['500']} />
                                            </Pressable>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        ))
                    }
                
                </ScrollView>
            }
        </SafeAreaView>
    );
}