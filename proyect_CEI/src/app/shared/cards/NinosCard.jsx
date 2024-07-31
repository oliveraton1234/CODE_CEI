import Kids from '../../../assets/images/ninos.png';

const CardNinos = ({ nombre, correoElectronico,estatus, color, nino }) => {

    const colorBorder = {
        blue: 'border-blue-cei',
        orange: 'border-orange-cei',
        camell: 'border-camell-cei',
        green: 'border-green-500',
        red: 'border-red-500',
        yellow: 'border-yellow-500',    
    }

    return (
        <div 
        className={`${colorBorder[color]} flex items-center p-3 border-2  rounded-lg bg-white shadow my-4`}
        >
        <img
            className="w-14 h-14 rounded-full"
            src={Kids}
            alt="Avatar del niño"
        />
        <div className='ml-6'>
            <p className="text-lg font-bold">{nombre}</p>
            <p className="text-sm text-gray-600">{correoElectronico}</p>
            <p className={`text-sm font-semibold ${estatus === 'Activo' ? 'text-green-500' : 'text-red-500'}`}>
            {estatus}
            </p>
        </div>
        </div>
    );
};

export default CardNinos;
