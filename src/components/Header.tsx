import { ReactNode } from "react";
import { View } from "react-native";

type ChildrenProps = {
    children: ReactNode;
}

export function Header({ children }: ChildrenProps) {
    return (
        <View className="bg-secondary h-[100] flex flex-row items-center justify-between px-5">
            { children }
        </View>
    );
}