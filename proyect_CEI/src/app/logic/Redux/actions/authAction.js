
import axios from 'axios'

export const login = (email, password) => dispatch => {
    axios.post('/api/login', { email, password })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    token: response.data.token,
                    user: response.data.user
                }
            });
        })
        .catch(error => {
            console.error('Login failed:', error);
        });
};

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
};
