import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const Wallet = () => {
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/wallets/', {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setWallets(response.data);
            } catch (error) {
                console.error('Error fetching wallets:', error);
            }
        };

        fetchWallets();
    }, []);

    return (
        <Paper style={{ padding: '20px' }}>
            <Typography variant="h5">Your Wallets</Typography>
            <List>
                {wallets.map((wallet) => (
                    <ListItem key={wallet.id}>
                        <ListItemText 
                            primary={`${wallet.currency.symbol}: ${wallet.balance}`}
                            secondary={`≈ $${(wallet.balance * wallet.currency.current_price).toFixed(2)}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Wallet;