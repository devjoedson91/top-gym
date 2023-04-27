import { useContext } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

interface ButtonProps {
    action: () => void;
    title: string
}

export function Button({ action, title }: ButtonProps) {

    const { loadingAuth } = useContext(AuthContext);

    return (
        <TouchableOpacity
            className="flex justify-center items-center rounded-md bg-green_700 py-3 w-full"
            activeOpacity={0.8}
            onPress={action}
        >
            {
                loadingAuth ? (
                    <ActivityIndicator size={25} color="#fff" />
                ) : (
                    <Text className="text-white text-lg font-medium">{title}</Text>
                )
            }
        </TouchableOpacity>
    );  

}