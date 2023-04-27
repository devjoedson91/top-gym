import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { Check } from "phosphor-react-native";
import colors from "tailwindcss/colors";

interface Props extends TouchableOpacityProps {
    checked: boolean;
}

export function CheckBox({ checked = false, ...rest }: Props) {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            className="flex-row mb-2 items-center"
            {...rest}
        >
            {
                checked ? (
                    <View className="w-8 h-8 bg-green_500 rounded-lg items-center justify-center">
                        <Check size={25} color={colors.white} />
                    </View>
                ) : (
                    <View className="w-8 h-8 bg-gray_600 rounded-lg" />
                )
            }
        </TouchableOpacity>
    );

}