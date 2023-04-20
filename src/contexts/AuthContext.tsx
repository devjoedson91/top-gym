import { ReactNode, createContext } from "react";

type AuthContextData = {
    isAuthenticated: boolean;
    signIn: () => void;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const isAuthenticated = true;

    function signIn() {

        
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated ,signIn }}>
            { children }
        </AuthContext.Provider>
    );

}