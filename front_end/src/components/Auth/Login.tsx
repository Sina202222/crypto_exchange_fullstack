import  { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api-auth/login/', {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            history.push('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Paper style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
            <Typography variant="h5">Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Login
                </Button>
            </form>
        </Paper>
    );
};

export default Login;