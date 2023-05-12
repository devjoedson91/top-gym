import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
    title: string;
    selected: boolean;
    action: () => void;
}

export function MuscleButton({ title, selected, action }: ButtonProps) {

    return (
        <>
            {
                selected ? (
                    <TouchableOpacity
                        className="mr-3 bg-gray_500 p-3 border border-green_500 rounded-lg justify-center items-center" 
                        onPress={action}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-medium text-lg">{title}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        className="mr-3 bg-gray_500 p-2 rounded-lg justify-center items-center"
                        onPress={action}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-medium text-lg">{title}</Text>
                    </TouchableOpacity>
                )
            }
        </>
    );
}