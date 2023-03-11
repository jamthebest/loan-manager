import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { API_URL } from '../config';

export const register = (name: string, email: string, username: string, password: string) => {
    return axios.post(API_URL + 'users/', {
        name,
        email,
        username,
        password,
    });
};

export const login = async (username: string, password: string) => {
    const signIn = useSignIn();
    return axios
        .post(API_URL + 'auth/login/', {
            username,
            password,
        })
        .then((response) => {
            signIn({
                token: response.data.access_token,
                expiresIn: 10,
                tokenType: 'Bearer',
                authState: { id: response.data.id, email: response.data.email, name: response.data.name, username }
            });
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);

    return null;
};