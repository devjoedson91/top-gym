import { SafeAreaView, TouchableOpacity, Text } from "react-native";
import { CaretLeft } from "phosphor-react-native";
import WebView from "react-native-webview";

interface VideoViewProps {
    handleClose: () => void;
    videoUrl: string | null;
}

export function VideoView({ handleClose, videoUrl }: VideoViewProps) {

    return (
        <SafeAreaView className="flex-1 w-full">
            <TouchableOpacity
                className="w-full bg-secondary p-5 flex flex-row items-center"
                onPress={handleClose}
            >
                <CaretLeft size={35} color="#00B37E" />
                <Text className="text-white text-lg font-medium ml-4">Voltar</Text>
            </TouchableOpacity>

            <WebView 
                className="flex-1 w-full"
                source={{uri: videoUrl ?? ''}}
            />
        </SafeAreaView>
    );

}