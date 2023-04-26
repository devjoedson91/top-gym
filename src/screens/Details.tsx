import { useLayoutEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RouteDetailParams = {
    Detail: ExerciseDetailProps;
}

type DetailRouteProps = RouteProp<RouteDetailParams, 'Detail'>;

export function Details() {

    const route = useRoute<DetailRouteProps>();

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    useLayoutEffect(() => {

        navigation.setOptions({
            title: route.params ? route.params?.name : 'Detalhes do exercício'
        });

    }, [navigation]);

    return (
        <SafeAreaView className="bg-background flex-1 p-6">
            <Text>Details</Text>
        </SafeAreaView>
    );
}