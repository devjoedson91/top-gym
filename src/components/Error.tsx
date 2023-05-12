import { Text } from "react-native";

type Props = {
    text: string | undefined;
}

export function Error({ text }: Props) {

    return (
        <Text className="text-red_default ml-4 font-regular">{text}</Text>
    );
}