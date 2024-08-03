import ImgLogin from "../../../assets/images/LoginImgE.jpeg";
import CEI from '../../../assets/images/CEI.png';
import { useDispatch } from 'react-redux';
import { login } from '../../logic/Redux/actions/authAction'; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!user || !password) {
            alert("Por favor, ingrese usuario y contraseña");
            return;
        }
        dispatch(login(user, password, navigate));
    };

    return (
        <div className="flex justify-center items-center h-screen bg-orange-100">
            <div className="bg-white rounded-2xl shadow-2xl flex items-center m-28">
                <div className="w-1/2 p-8">
                    <img className="h-full w-full object-cover" src={ImgLogin} alt="Img Logo" />
                </div>
                <div className="w-1/2 flex flex-col justify-center items-center p-40">
                    <a href="/">
                        <img className="w-36 mb-8 " alt="logo" src={CEI} />
                    </a>
                    <h1 className="text-3xl font-bold mb-5">Hello Again!</h1>
                    <p className="text-sm text-center mb-7">Oaxaca Youth Empowerment serves children and youth in Oaxaca, Mexico, to help ensure their full and continued access to education.</p>
                    <input
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-3 px-4 mb-4"
                        placeholder="User" />
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="w-full border border-gray-300 rounded-md py-3 px-4 mb-4"
                        placeholder="Password" />
                    <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4">Log In</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
