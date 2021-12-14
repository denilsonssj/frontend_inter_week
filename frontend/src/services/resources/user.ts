import api from '../api';

import { SignInInfo } from 'interfaces/SignIn';
import { SignUpInfo } from 'interfaces/SignUp';
import { AuthData } from 'interfaces/Auth';

const BASE_URL: string = '/user'; 

export const signIn = async (data: SignInInfo) => {
    const response = await api.post(`${BASE_URL}/signin`, data);
    return response;
}

export const me = async () => {
    return api.get<AuthData>(`${BASE_URL}/me`);
}

export const signUp = async (data: SignUpInfo) => {
    const response = await api.post(`${BASE_URL}/signup`, data);
    return response;
}