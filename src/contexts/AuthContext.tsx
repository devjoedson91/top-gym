import { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

type AuthContextData = {
    loadingAuth: boolean;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
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

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
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

    async function signOut() {

        // const response = await api.post('/v1/logout');

        // const { msg } = response.data;

        // alert(msg);

		await AsyncStorage.clear().then(() => {
            setUser({ id: '', name: '', email: '', token: '' });
		});
	}

    return (
        <AuthContext.Provider value={{ isAuthenticated, loadingAuth, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    );

}