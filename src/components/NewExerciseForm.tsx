import { useContext, useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { CheckBox } from "./CheckBox";
import { Barbell, Repeat, AlignCenterHorizontal } from "phosphor-react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledInput } from "./ControlledInput";
import { Button } from "./Button";
import * as yup from "yup";
import api from "../services/api";
import { Loading } from "./Loading";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

type FormData = {
    amount_series: number;
    amount_repeat: number;
    load: number;
}

type NewExerciseFormProps = {
    exercise_id: string;
    user_id: string | undefined;
}

const schema = yup.object({
    amount_series: yup.number().transform((value) => (isNaN(value) || value === null || value === undefined) ? 1 : value).min(1).required('Informe a quantidade de séries'),
    amount_repeat: yup.number().transform((value) => (isNaN(value) || value === null || value === undefined) ? 1 : value).min(1).required('Informe a quantidade de repetições'),
    load: yup.number().transform((value) => (isNaN(value) || value === null || value === undefined) ? 1 : value).min(1)
});

export function NewExerciseForm({ exercise_id, user_id }: NewExerciseFormProps) {

    const navigate = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const {signOut} = useContext(AuthContext);

    const [days, setDays] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);

    function handleToggleWeekDay(weekDayIndex: number) {

        if (days.includes(weekDayIndex)) { // para desmarcar
            setDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else { // para marcar
            setDays(prevState => [...prevState, weekDayIndex]);
        }

    }

    function handleExerciseRegister(data: FormData) {

        if (days.length === 0) {

            ToastAndroid.show('Para concluir, você deve selecionar ao menos um dia da semana.', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);

        days.map(async (day: number) => {

            await api.post('/training', {
                exercise_id,
                user_id,
                amount_series: data.amount_series,
                amount_repeat: data.amount_repeat,
                load: data.load,
                day_week: day
            })
                .then(response => {

                    ToastAndroid.show('Exercício adicionado com sucesso!', ToastAndroid.SHORT);

                })
                .catch(error => {

                    if (error.response.status === 401) {

                        ToastAndroid.show('Sessão Expirada!', ToastAndroid.SHORT);
                        signOut();

                    }

                    ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT);
                    console.log('erro ao cadastrar treino: ', error.response.data.error);

                })

        });

        setLoading(false);

    }

    if (loading) {
        return <Loading />;
    }

    return (
        <View className="w-[90%] flex flex-col mx-auto box-border">
            <View className="justify-around flex-row my-4">
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

                <View className="flex flex-row flex-wrap items-center gap-4 mb-5">
                    <Barbell size={32} color="#00875F" />
                    <Text className="text-white font-medium">Séries:</Text>
                    <ControlledInput 
                        name="amount_series"
                        className="w-14 bg-gray_500 py-1 px-2 font-regular text-base rounded-md text-white" 
                        keyboardType="numeric" 
                        placeholder="0" 
                        placeholderTextColor="#7C7C8A"
                        control={control}
                        error={errors.amount_series}
                    />
                </View>

                <View className="flex-row flex-wrap items-center gap-4 mb-5">
                    <Repeat size={32} color="#00875F" />
                    <Text className="text-white font-medium">Repetições:</Text>
                    <ControlledInput
                        name="amount_repeat" 
                        className="w-14 bg-gray_500 py-1 px-2 font-regular text-base rounded-md text-white" 
                        keyboardType="numeric" 
                        placeholder="0" 
                        placeholderTextColor="#7C7C8A"
                        control={control}
                        error={errors.amount_repeat}
                    />
                </View>

                <View className="flex-row items-center gap-4 mb-5">
                    <AlignCenterHorizontal size={32} color="#00875F" />
                    <Text className="text-white font-medium">Carga (kg):</Text>
                    <ControlledInput 
                        name="load"
                        className="w-14 bg-gray_500 py-1 px-2 font-regular text-base rounded-md text-white" 
                        keyboardType="numeric" 
                        placeholder="0" 
                        placeholderTextColor="#7C7C8A"
                        control={control}
                    />
                </View>

                <Button 
                    action={handleSubmit(handleExerciseRegister)}
                    title="Adicionar exercício"
                />
        </View>
    );

}