import { useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CheckBox } from "../components/CheckBox";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

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
                     <View className="flex-col">
                        <Text
                            key={`${weekDay}-${i}`}
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
                <View className="mb-3">
                    <Text className="text-white font-medium text-base mb-3">Costas</Text>
                    <TouchableOpacity 
                        className="bg-gray_500 mb-3 w-full h-[120px] p-3 rounded-lg flex flex-row items-center justify-between"
                    >
                        <View>
                            <Text className="text-white font-medium text-lg">Remada frontal</Text>
                            <View className="flex-row">

                            </View>
                        </View>
                        <CheckBox checked={true} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="bg-gray_500 mb-3 w-full h-[120px] p-3 rounded-lg flex flex-row items-center justify-between"
                    >
                        <View>
                            <Text className="text-white font-medium text-lg">Remada frontal</Text>
                            <View className="flex-row">

                            </View>
                        </View>
                        <CheckBox checked={true} />
                    </TouchableOpacity>
                </View>

                <View className="mb-3">
                    <Text className="text-white font-medium text-base mb-3">Biceps</Text>
                    <TouchableOpacity 
                        className="bg-gray_500 mb-3 w-full h-[120px] p-3 rounded-lg flex flex-row items-center justify-between"
                    >
                        <View>
                            <Text className="text-white font-medium text-lg">Remada frontal</Text>
                            <View className="flex-row">

                            </View>
                        </View>
                        <CheckBox checked={true} />
                    </TouchableOpacity>
                </View>

                <View className="mb-3">
                    <Text className="text-white font-medium text-base mb-3">Trapézio</Text>
                    <TouchableOpacity 
                        className="bg-gray_500 mb-3 w-full h-[120px] p-3 rounded-lg flex flex-row items-center justify-between"
                    >
                        <View>
                            <Text className="text-white font-medium text-lg">Remada frontal</Text>
                            <View className="flex-row">

                            </View>
                        </View>
                        <CheckBox checked={true} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}