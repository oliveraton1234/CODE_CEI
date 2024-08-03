
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = (email, password, navigate) => dispatch => {
    axios.post(`${API_BASE_URL}/users/login`, { email, password })
        .then(response => {
            localStorage.setItem('token', response.token);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    token: response.data.token,
                    user: response.data
                }
            });
            navigate('/home');
        })
        .catch(error => {
            console.error('Login failed:', error);
            alert('Error ' + error.response.data)
        });
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
};
