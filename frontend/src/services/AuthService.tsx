import axios from 'axios';

const API_URL = 'http://localhost:8000'

const login = async (data : any) => {
    return await axios.post(`${API_URL}/api/login`, data, { withCredentials: true });
}

const me = async () => {
    let token = localStorage.getItem('access_token');
    console.log(token);
    
    const config = {
        headers: { Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjk0NTk1Mzg2LCJleHAiOjE2OTQ1OTg5ODYsIm5iZiI6MTY5NDU5NTM4NiwianRpIjoiV1ZLUFEwYTNpU3ZNc3B2USIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ckGdXXjVe_Rli9g_VEyL53O65zLadj5Wrc3ORR8T7z4` }
    };
    return await axios.post(`${API_URL}/api/me`, config);
}

export default {
    login, me
}