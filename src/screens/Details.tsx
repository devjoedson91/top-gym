import { useLayoutEffect, useState } from "react";
import { Text, View, SafeAreaView, Pressable, Image, Modal, TextInput } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header } from "../components/Header";
import { Barbell, Repeat, CaretLeft, Person, Play, AlignCenterHorizontal  } from "phosphor-react-native";
import { VideoView } from "../components/VideoView";
import { CheckBox } from "../components/CheckBox";
import { Button } from "../components/Button";

type RouteDetailParams = {
    Detail: ExerciseDetailProps;
}

type DetailRouteProps = RouteProp<RouteDetailParams, 'Detail'>;

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function Details() {

    const route = useRoute<DetailRouteProps>();

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const [showVideo, setShowVideo] = useState(false);

    const [days, setDays] = useState<number[]>([]);

    useLayoutEffect(() => {

        navigation.setOptions({
            header: () => (
                <Header>
                    <Pressable onPress={() => navigation.goBack()}>
                        <CaretLeft size={35} color="#00B37E" />
                    </Pressable>
                    <Text className="text-white font-medium text-lg">{route.params ? route.params?.name : 'Detalhes do Exercício'}</Text>
                    <View className="flex flex-row items-center gap-1">
                        <Person size={20} color="#C4C4CC" />
                        <Text className="text-white font-medium text-base">Quadríceps</Text>
                    </View>
                </Header>
            ),
        });

    }, [navigation]);

    function handleOpenVideo() {

        setShowVideo(true);

    }

    function handleToggleWeekDay(weekDayIndex: number) {

        if (days.includes(weekDayIndex)) { // para desmarcar
            setDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else { // para marcar
            setDays(prevState => [...prevState, weekDayIndex]);
        }

    }

    function handleSaveExercise(exercise_id: number | string) {

        alert(exercise_id);

    }

    return (
        <SafeAreaView className="bg-background flex-1 p-4">
            <Pressable onPress={handleOpenVideo}>
                <View className="absolute z-[9] top-0 left-0 right-0 bottom-0 items-center justify-center">
                    <Play size={40} color="#fafafa" />
                </View>
                <Image source={{uri: route.params?.cover}} className="w-full h-56 rounded-lg"/>
            </Pressable>

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
                <TextInput 
                    className="w-14 bg-gray_500 p-1 font-regular text-base rounded-md text-white" 
                    keyboardType="numeric"
                />
                <Text className="text-white font-medium">Séries</Text>
            </View>

            <View className="flex-row items-center gap-4 mb-5">
                <Repeat size={32} color="#00875F" />
                <TextInput 
                    className="w-14 bg-gray_500 p-1 font-regular text-base rounded-md text-white" 
                    keyboardType="numeric"
                />
                <Text className="text-white font-medium">Repetições</Text>
            </View>

            <View className="flex-row items-center gap-4 mb-5">
                <AlignCenterHorizontal size={32} color="#00875F" />
                <TextInput 
                    className="w-14 bg-gray_500 p-1 font-regular text-base rounded-md text-white" 
                    keyboardType="numeric"
                />
                <Text className="text-white font-medium">Carga (kg)</Text>
            </View>

            <Button 
                action={() => handleSaveExercise(route.params?.id)} 
                title="Adicionar exercício"
            />

            <Modal visible={showVideo} animationType="slide">
                <VideoView 
                    handleClose={() => setShowVideo(false)}
                    videoUrl={route.params?.video}
                />
            </Modal>
        </SafeAreaView>
    );
}