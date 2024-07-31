
import NavBarLogged from "../../shared/components/NavBarLogged";
import { useNavigate } from 'react-router-dom';

export default function Reportes() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <>
            <NavBarLogged color='camell'/>
            <div className='bg-camell-cei h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <button 
                        onClick={() => handleNavigate('/reportes/reprobados')}
                        className='bg-blue-500 text-white p-2 rounded mx-2'
                    >
                        Estudiantes Reprobados
                    </button>
                    <button 
                        onClick={() => handleNavigate('/reportes/ciclo')}
                        className='bg-blue-500 text-white p-2 rounded mx-2'
                    >
                        Reporte de Ciclos
                    </button>
                </div>
            </div>
        </>
    );
}