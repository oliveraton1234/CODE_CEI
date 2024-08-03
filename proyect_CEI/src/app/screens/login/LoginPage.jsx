import ImgLogin from "../../../assets/images/LoginImgE.jpeg";
import CEI from '../../../assets/images/CEI.png';

function LoginPage() {

    

    const login = () => {
        window.location.href = "/home";
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
                <input className="w-full border border-gray-300 rounded-md py-3 px-4 mb-4" placeholder="User" />
                <input className="w-full border border-gray-300 rounded-md py-3 px-4 mb-4" placeholder="Password" />
                <button onClick={login} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4">Log In</button>
            </div>
        </div>
    </div>

  );
}

export default LoginPage;
