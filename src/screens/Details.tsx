import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, Pressable, Image, Modal, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Header } from "../components/Header";
import { CaretLeft, Person, Play } from "phosphor-react-native";
import { VideoView } from "../components/VideoView";
import { NewExerciseForm } from "../components/NewExerciseForm";

type RouteDetailParams = {
    Detail: ExerciseDetailProps;
}

type DetailRouteProps = RouteProp<RouteDetailParams, 'Detail'>;

export function Details() {

    const route = useRoute<DetailRouteProps>();

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const [showVideo, setShowVideo] = useState(false);

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
                        <Text className="text-white font-medium text-base">{route.params?.category}</Text>
                    </View>
                </Header>
            ),
        });   

    }, [navigation]);

    function handleOpenVideo() {

        setShowVideo(true);

    }

    return (
        <KeyboardAvoidingView 
            className="bg-background flex-1 p-4" 
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={}
        >
            <ScrollView>
                <Pressable onPress={handleOpenVideo}>
                    <View className="absolute z-[9] top-0 left-0 right-0 bottom-0 items-center justify-center">
                        <Play size={40} color="#fafafa" />
                    </View>
                    <Image source={{uri: route.params?.cover}} className="w-full h-52 rounded-lg"/>
                </Pressable>

                <NewExerciseForm />
                
                <Modal visible={showVideo} animationType="slide">
                    <VideoView 
                        handleClose={() => setShowVideo(false)}
                        videoUrl={route.params?.video}
                    />
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}