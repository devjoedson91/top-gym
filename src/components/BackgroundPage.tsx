import { ReactNode } from "react"
import { ImageBackground } from "react-native";

type BgProps = {
    children: ReactNode;
}

export function BackgroundPage({ children}: BgProps) {

    const ImageBg = "../assets/bg-sign-img.png";

    return (
        <ImageBackground source={require(ImageBg)} resizeMode="cover" style={{ height: '100%'}}>
            { children }
        </ImageBackground>
    );

}