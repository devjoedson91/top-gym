import { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { Alert } from "react-native";

type AuthContextData = {
    loadingAuth: boolean;
    isAuthenticated: boolean;
    me: UserInfoProps;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
	token: string;
};

type SignInProps = {
	email: string;
	password: string;
};

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });

    const [me, setMe] = useState<UserInfoProps>({
        id: '',
        name: '',
        email: '',
        avatar: ''
    });

    const [loadingAuth, setLoadingAuth] = useState(false);

    const isAuthenticated = !!user.name;

    useEffect(() => {

        async function getToken() {

            const userInfo = await AsyncStorage.getItem('@top-gym');

            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

                setUser({ 
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token 
                });
            }

        }

        getToken();

    }, []);

    useEffect(() => {

        async function userInfo() {

            const response = await api.get('/me');

            setMe(response.data);
        }

        userInfo();

    }, [user]);

    async function signIn({ email, password }: SignInProps) {

        setLoadingAuth(true);

        try {

            const response = await api.post('/session', { email, password })

            const { id, name, token } = response.data;

            const data = {...response.data};

            await AsyncStorage.setItem('@top-gym', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({ id, name, email, token });

            setLoadingAuth(false);
        } catch(err) {
            console.log('Erro ao fazer login: '+err);
            setLoadingAuth(false);
        }
    }

    async function signUp(data: SignUpProps) {

        setLoadingAuth(true);

        try {

            await api.post('/users', { name: data.name, email: data.email, password: data.password });
            setLoadingAuth(false);

        } catch(err) {
            Alert.alert('Erro ao cadastrar usuário: '+err);
            console.log('ERRO AO CADASTRAR: ', err);
            setLoadingAuth(false);
        }

    }

    async function signOut() {

        // const response = await api.post('/v1/logout');

        // const { msg } = response.data;

        // alert(msg);

		await AsyncStorage.clear().then(() => {
            setUser({ id: '', name: '', email: '', token: '' });
		});
	}

    return (
        <AuthContext.Provider value={{ isAuthenticated, loadingAuth, me, signIn, signOut, signUp }}>
            { children }
        </AuthContext.Provider>
    );

}