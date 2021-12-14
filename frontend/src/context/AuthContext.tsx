import { createContext, ReactNode, useState } from 'react';

import { AuthData } from 'interfaces/Auth';
import { SignInInfo } from 'interfaces/SignIn';
import { SignUpInfo } from 'interfaces/SignUp';
import { signIn, signUp, me } from 'services/resources/user';

export interface AuthContextData {
    user: AuthData;
    userSignIn: (userInfo: SignInInfo) => Promise<AuthData>;
    userSignUp: (userInfo: SignUpInfo) => Promise<AuthData>;
    getCurrentUser: () => Promise<AuthData>;
    useLogout: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<AuthData>(() => {
        const user = localStorage.getItem('@Inter:User');
        if (user) {
            return JSON.parse(user);
        }
        return {} as AuthData;
    });

    const userSignIn = async (userInfo: SignInInfo) => {
        const response = await signIn(userInfo);
        if (response.status !== 200) {
            return response.data;
        }
        const { accessToken } = response.data;
        if (accessToken) {
            localStorage.setItem('@Inter:Token', accessToken);
        }
        return getCurrentUser();
    }

    const userSignUp = async (userInfo: SignUpInfo) => {
        const { data } = await signUp(userInfo);
        if (data.accessToken) {
            localStorage.setItem('@Inter:Token', data.accessToken);
        }
        const user = await getCurrentUser();
        localStorage.setItem('@Inter:Token', JSON.stringify(user));
        return user;
    }

    const getCurrentUser = async () => {
        const { data } = await me();
        setUser(data);
        localStorage.setItem('@Inter:User', JSON.stringify(data));
        return data;
    }

    const useLogout = () => {
        localStorage.removeItem('@Inter:Token');
        localStorage.removeItem('@Inter:User');
    }

    return (
        <AuthContext.Provider value={{ user, userSignIn, userSignUp, getCurrentUser, useLogout }}>
            {children}
        </AuthContext.Provider>
    );
}