import { useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CheckBox } from "../components/CheckBox";
import { Barbell, Repeat, Trash } from "phosphor-react-native";
import colors from "tailwindcss/colors";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const trainnings = [
    {
        id: 1,
        name: "Costas",
        exercises: [
            {
                id: 1,
                name: "Puxada frontal",
                training: [
                    {
                        id: 1,
                        week_day: 1,
                        amount_series: 4,
                        amount_repeat: 12
                    }
                ]
            },
            {
                id: 2,
                name: "Remada curvada",
                training: [
                    {
                        id: 1,
                        week_day: 1,
                        amount_series: 4,
                        amount_repeat: 12
                    }
                ]
            },
            {
                id: 3,
                name: "Remada unilateral",
                training: [
                    {
                        id: 1,
                        week_day: 1,
                        amount_series: 4,
                        amount_repeat: 12
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Bíceps",
        exercises: [
            {
                id: 4,
                name: "Rosca direta",
                training: [
                    {
                        id: 1,
                        week_day: 1,
                        amount_series: 4,
                        amount_repeat: 12
                    }
                ]
            },
            {
                id: 5,
                name: "Rosca martelo",
                training: [
                    {
                        id: 1,
                        week_day: 1,
                        amount_series: 4,
                        amount_repeat: 12
                    }
                ]
            },
            {
                id: 6,
                name: "Alternados",
                training: [
                    {
                        id: 1,
                        week_day: 1,
                        amount_series: 4,
                        amount_repeat: 12
                    }
                ]
            }
        ]
    }      
];

export function Historic() {

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const [days, setDays] = useState<number[]>([]);

    useLayoutEffect(() => {

        navigation.setOptions({
            headerShown: true,
            header: () => (
                <View className="bg-secondary h-[100] flex flex-row items-center justify-center px-5">
                    <Text className="text-white font-medium text-lg">Ficha Semanal</Text>
                </View>
            )
        });

    }, [navigation]);

    function handleToggleWeekDay(weekDayIndex: number) {

        if (days.includes(weekDayIndex)) { // para desmarcar
            setDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else { // para marcar
            setDays(prevState => [weekDayIndex]);
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {
                    trainnings.map((trainning, i) => (

                        <View className="mb-3" key={`${i}-${trainning.name}`}>
                            <Text className="text-white font-medium text-base mb-3">
                                {trainning.name}
                            </Text>
                            {
                                trainning.exercises.map((exercise, i) => (
                                    <TouchableOpacity 
                                        className="bg-gray_500 mb-3 w-full h-[120px] p-3 rounded-lg flex flex-row items-center justify-between" 
                                        key={`${i}-${exercise.name}`}
                                    >
                                        <View>
                                            <Text className="text-white font-medium text-lg mb-4">
                                                {exercise.name}
                                            </Text>
                                            <View className="flex flex-row gap-2 items-center">
                                                <Barbell size={32} color="#00875F" />
                                                <Text className="text-white font-medium">
                                                    {
                                                        exercise.training.map(item => `${item.amount_series} séries`)
                                                    }    
                                                </Text>
                                                <Repeat size={32} color="#00875F" />
                                                <Text className="text-white font-medium">
                                                    {
                                                        exercise.training.map(item => `${item.amount_repeat} repetições`)
                                                    }  
                                                </Text>
                                            </View>
                                        </View>
                                        <View className="flex items-center gap-2">
                                            <CheckBox checked={true} />
                                            <Pressable>
                                                <Trash size={38} color={colors.red['500']} />
                                            </Pressable>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>

                    ))
                }
            
            </ScrollView>
        </SafeAreaView>
    );
}