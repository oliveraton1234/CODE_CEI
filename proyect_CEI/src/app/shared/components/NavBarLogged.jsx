import CEI from '../../../assets/images/CEI.png';
import Kids from '../../../assets/images/ninos.png';
import Man from '../../../assets/images/hombre.png';
import Reporte from '../../../assets/images/reporte.png';
import Materias from '../../../assets/images/materias.png';

function NavBarLogged({color}) {

    const colorBack = {
        blue: 'bg-blue-cei',
        orange: 'bg-orange-cei',
        camell: 'bg-camell-cei'
    }

    return(
        <div className={`${colorBack[color]} flex pb-16 pt-5`}>
            <a href='/'> <img className='w-20 ml-20 ' alt="logo" src={CEI}/></a>
            
            <div className='flex place-items-center ml-20 mt-3 '>
        
                <a href='/kids' className='group flex place-items-center p-2 hover:bg-navy-blue-cei rounded-2xl'>
                    <img className='w-12' alt="logo" src={Kids} />
                    <span className='ml-3 group-hover:text-white'>Niños</span>
                </a>
                
                <a href='/donors' className='group flex place-items-center ml-5 p-2 hover:bg-navy-blue-cei rounded-2xl '>
                    <img className='w-12' alt="logo" src={Man} />
                    <span className='group-hover:text-white'>Padrinos</span>
                </a>

                <a href='/reportes' className='group flex place-items-center ml-5 p-2 hover:bg-navy-blue-cei rounded-2xl '>
                    <img className='w-12 pr-1' alt="logo" src={Reporte} />
                    <span className='group-hover:text-white'>Reportes</span>
                </a>

                <a href='/materiasForm' className='group flex place-items-center ml-5 p-2 hover:bg-navy-blue-cei rounded-2xl '>
                    <img className='w-12 pr-1' alt="logo" src={Materias} />
                    <span className='group-hover:text-white'>Materias</span>
                </a>
            </div>

            <a href='/login' className='ml-auto mt-5 mr-32'><button  className='h-10  bg-orange-cei text-white rounded-lg shadow-md hover:bg-right-top hover:text-white focus:outline-none '>Salir</button></a>
        </div>
    )
}

export default NavBarLogged;