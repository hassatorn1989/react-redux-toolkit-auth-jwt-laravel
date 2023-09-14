import axios from 'axios';

const API_URL = 'http://localhost:8000'

const login = async (data: any) => {
    return await axios.post(`${API_URL}/api/login`, data, { withCredentials: true });
}

const me = async () => {
    let token = localStorage.getItem('access_token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    return await axios.get(`${API_URL}/api/me`, config);
}

const refreshToken = async () => {
    try{
        let token = localStorage.getItem('access_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        return await axios.post(`${API_URL}/api/refresh`, {}, config);
    }catch(error){
        
    }
}

const logout = async () => {
    let token = localStorage.getItem('access_token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    return await axios.post(`${API_URL}/api/logout`, {} , config);
}

export default {
    login, me, logout, refreshToken
}