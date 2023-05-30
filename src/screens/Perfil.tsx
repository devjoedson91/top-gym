import { useContext, useLayoutEffect, useState } from "react";
import { Text, View, KeyboardAvoidingView, Image, TouchableOpacity, Platform, ScrollView, Pressable, Alert, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledInput } from "../components/ControlledInput";
import { AuthContext } from "../contexts/AuthContext";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";
import { Loading } from "../components/Loading";
import mime from "mime";

type FormData = {
    name: string;
    email?: string;
    password?: string;
    password_confirm: string;
}

const schema = yup.object({
    name: yup.string(),
    email: yup.string().email('E-mail inválido'),
    password: yup.string(),
    password_confirm: yup.string().oneOf([yup.ref('password')], 'A senha de confirmação não confere')
});

interface AvatarProps {
    name: string;
    type: string | null;
    uri: string;
}

export function Perfil() {

    const navigation = useNavigation<NativeStackNavigationProp<TabParamsList>>();

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const { me, signOut, userInfo } = useContext(AuthContext);

    const [avatar, setAvatar] = useState<AvatarProps>();
    const [avatarPreview, setAvatarPreview] = useState('');

    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {

        navigation.setOptions({
            header: () => (
                <View className="bg-secondary h-[100] flex flex-row items-center justify-center px-5">
                    <Text className="text-white font-medium text-lg">Perfil</Text>
                </View>
            ),
            headerShown: true
        });

    }, [navigation]);

    async function handlePickerImage() {

        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {

            Alert.alert('Permissão necessária', 'Permita que sua aplicação acesse as imagens');

        } else {

            const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: false,
                aspect: [4, 4],
                quality: 1
            });

            if (canceled) {

                ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
            } else {

                // const newImageUri =  "file:///" + assets[0].uri.split("file:/").join("");

                const fileName = assets[0].uri.substring(assets[0].uri.lastIndexOf('/') + 1, assets[0].uri.length);

                const file = {
                    name: fileName,
                    type: mime.getType(assets[0].uri),
                    uri: Platform.OS === 'ios' ? assets[0].uri.replace('file:///', '') : assets[0].uri,
                };

                setAvatarPreview(assets[0].uri);
                setAvatar(file);
                
            }
        }

    }

    async function handleUserUpdate(data: FormData) {

        let formData: any = {...data};

        if (avatarPreview !== '') {
            Object.assign(formData, {avatar: avatarPreview});
        }

        Object.keys(data).map(key => {

            if (formData[key] === '') delete formData[key];

        });

        if (formData['password']) {

            if (formData['password'].length < 4) {

                ToastAndroid.show('A senha deve ter ao menos 4 dígitos', ToastAndroid.SHORT);
                return;
            }

            if (!formData['password_confirm'] || formData['password_confirm'] === '') {
                ToastAndroid.show('Confirme a senha', ToastAndroid.SHORT);
                return;
            }
        }

        if (Object.keys(formData).length < 1) return;

        try {

            setLoading(true);

            await api.put(`/user?user_id=${me.id}`, formData);

            if (formData.email || formData.password) {

                setLoading(false);
                ToastAndroid.show('Entre novamente com seu novo login e senha', ToastAndroid.SHORT);
                signOut();
                return;

            }

            setLoading(false);
            userInfo();
            ToastAndroid.show('Usuário atualizado com sucesso!', ToastAndroid.SHORT);

        } catch(err) {
            setLoading(false);
            ToastAndroid.show('Erro ao atualizar usuário', ToastAndroid.SHORT);
            console.log('Erro ao atualizar usuário: ', err);
        }

    }

    if (loading) {
        return <Loading />
    }

    return (
        <KeyboardAvoidingView 
            className="bg-background flex-1 py-4 px-5" 
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView>
                <View className="mb-3">
                    <Image 
                        source={avatarPreview !== '' ? {uri: avatarPreview} : me.avatar ? {uri: me.avatar} : require("../assets/no-perfil.jpg")}
                        className="rounded-full w-[148px] h-[148px] self-center"
                    />
                    <Pressable onPress={handlePickerImage}>
                        <Text className="font-regular text-green_500 text-base text-center">Alterar foto</Text>
                    </Pressable>
                </View>

                <View className="mb-3">
                    <ControlledInput 
                        name="name"
                        className="w-full bg-gray_500 mb-1 p-3 font-regular text-base rounded-md text-white"
                        placeholder="Nome"
                        placeholderTextColor="#7C7C8A" 
                        control={control}
                        error={errors.name}
                    />
                    <ControlledInput
                        name="email" 
                        className="w-full bg-gray_500 p-3 mb-1 mt-3 font-regular text-base rounded-md text-white"
                        placeholder="E-mail"
                        placeholderTextColor="#7C7C8A"
                        control={control}
                        error={errors.email}
                    />
                </View>
                <View className="mb-3">
                    <Text className="font-regular text-white text-base mb-3">Alterar senha</Text>
                    <ControlledInput
                        name="password" 
                        className="w-full bg-gray_500 mb-1 p-3 font-regular text-base rounded-md text-white"
                        placeholder="Nova senha"
                        placeholderTextColor="#7C7C8A"
                        secureTextEntry={true} 
                        control={control}
                        error={errors.password}
                    />
                    <ControlledInput 
                        name="password_confirm"
                        className="w-full bg-gray_500 p-3 mb-1 mt-3 font-regular text-base rounded-md text-white"
                        placeholder="Confirmar senha"
                        placeholderTextColor="#7C7C8A"
                        secureTextEntry={true} 
                        control={control}
                        error={errors.password_confirm}
                    />
                </View>
                <TouchableOpacity 
                    className="w-full flex justify-center items-center rounded-md bg-green_700 p-3 self-center" 
                    activeOpacity={0.8}
                    onPress={handleSubmit(handleUserUpdate)}         
                >
                    <Text className="text-white text-lg font-medium">Atualizar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}