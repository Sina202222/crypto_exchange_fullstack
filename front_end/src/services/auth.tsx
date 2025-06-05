import axios from 'axios';

const authApi = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export default {
    login: (username, password) => 
        authApi.post('token-auth/', { username, password }),
    register: (userData) => 
        authApi.post('register/', userData),
    getCurrentUser: () => 
        authApi.get('users/me/'),
};