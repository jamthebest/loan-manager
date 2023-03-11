import axios from 'axios';
import { API_URL } from '../config'

export const register = (name: string, email: string, username: string, password: string) => {
    return axios.post(API_URL + 'users/', {
        name,
        email,
        username,
        password,
    });
};

export const login = (username: string, password: string) => {
    return axios
        .post(API_URL + 'auth/login/', {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
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