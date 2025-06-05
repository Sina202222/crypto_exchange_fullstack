// api.tsx

import axios from 'axios';
import type {  Currency, Wallet, Transaction, User  } from '../types';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/',
});

// اضافه کردن توکن به هدر در صورت وجود
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default {
    // Currency Endpoints
    getCurrencies: () : Promise<{ data: Currency[] }> => api.get('currencies/'),
    
    // Wallet Endpoints
    getWallets: () : Promise<{ data: Wallet[] }>  => api.get('wallets/'),
    createWallet: (data: Omit<Wallet, 'id' | 'user' | 'currency'> 
        & { currency_id: number }) => api.post('wallets/', data),
    
    // Transaction Endpoints
    getTransactions: () : Promise<{ data: Transaction[] }>  => api.get('orders/'),
    createTransactions: (data: Omit<Transaction, 'id' | 'user' | 'currency' | 'created_at' | 'updated_at'> & { currency_id: number }) => api.post('orders/', data),
    executeTransactions: (id: number): Promise<{ data: Transaction }>  => api.post(`orders/${id}/execute/`),
    
    // Auth Endpoints
    login: (username: string, password: string) => 
        api.post('token-auth/', { username, password }),
    register: (userData: { username: string; email: string; password: string }) => 
        api.post('register/', userData),
    getCurrentUser: (): Promise<{ data: User }> => 
        api.get('users/me/'),
};