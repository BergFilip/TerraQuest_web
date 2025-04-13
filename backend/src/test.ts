import axios from 'axios';

const getJWTToken = async (username: string, password: string) => {
    const url = 'https://api.makcorps.com/auth';
    const payload = {
        username,
        password
    };

    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(url, payload, { headers });
        return response.data.token; // JWT Token
    } catch (error) {
        console.error('Błąd logowania:', error.response?.data || error.message);
        return null;
    }
};

// Test login (wstaw dane użytkownika)
getJWTToken('your_username', 'your_password')
    .then((token) => {
        if (token) {
            console.log('JWT Token:', token);
        } else {
            console.log('Nie udało się uzyskać tokena.');
        }
    });
