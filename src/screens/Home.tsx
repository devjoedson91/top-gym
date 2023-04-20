import { useLayoutEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignOut } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function Home() {

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: () => (
              <Pressable>
                  <SignOut size={32} color="#fff" />
              </Pressable>
            )
        });

    }, [navigation]); 

    return (
      <View className="bg-background flex-1 px-8 pt-16 flex justify-center items-center">
          <Text className="text-white">Home page</Text>
      </View>
    );
}
