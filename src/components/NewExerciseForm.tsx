import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { CheckBox } from "./CheckBox";
import { Barbell, Repeat, AlignCenterHorizontal } from "phosphor-react-native";
import { useForm } from "react-hook-form";
import { ControlledInput } from "./ControlledInput";
import { Button } from "./Button";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type FormData = {
    amount_series: number;
    amount_repeat: number;
    load: number;
}

export function NewExerciseForm() {

    const { control, handleSubmit } = useForm<FormData>();

    const [days, setDays] = useState<number[]>([]);

    function handleToggleWeekDay(weekDayIndex: number) {

        if (days.includes(weekDayIndex)) { // para desmarcar
            setDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else { // para marcar
            setDays(prevState => [...prevState, weekDayIndex]);
        }

    }

    function handleExerciseRegister(data: FormData) {

        console.log(data);

    }

    return (
        <View>
            <View className="w-full justify-around flex-row mt-4 mb-3">
                {
                    weekDays.map((weekDay, i) => (
                        <View 
                            className="flex-col"
                            key={`${weekDay}-${i}`}
                        >
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

                <View className="flex-row items-center gap-4 mb-5">
                    <Barbell size={32} color="#00875F" />
                    <ControlledInput 
                        name="series"
                        className="w-14 bg-gray_500 py-1 px-2 font-regular text-base rounded-md text-white" 
                        keyboardType="numeric" 
                        placeholder="0" 
                        placeholderTextColor="#7C7C8A"
                        control={control}
                    />
                    <Text className="text-white font-medium">Séries</Text>
                </View>

                <View className="flex-row items-center gap-4 mb-5">
                    <Repeat size={32} color="#00875F" />
                    <ControlledInput
                        name="repeat" 
                        className="w-14 bg-gray_500 py-1 px-2 font-regular text-base rounded-md text-white" 
                        keyboardType="numeric" 
                        placeholder="0" 
                        placeholderTextColor="#7C7C8A"
                        control={control}
                    />
                    <Text className="text-white font-medium">Repetições</Text>
                </View>

                <View className="flex-row items-center gap-4 mb-5">
                    <AlignCenterHorizontal size={32} color="#00875F" />
                    <ControlledInput 
                        name="load"
                        className="w-14 bg-gray_500 py-1 px-2 font-regular text-base rounded-md text-white" 
                        keyboardType="numeric" 
                        placeholder="0" 
                        placeholderTextColor="#7C7C8A"
                        control={control}
                    />
                    <Text className="text-white font-medium">Carga (kg)</Text>
                </View>

                <Button 
                    action={handleSubmit(handleExerciseRegister)} 
                    title="Adicionar exercício"
                />
        </View>
    );

}