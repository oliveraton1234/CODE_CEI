
import PropTypes from 'prop-types';
import CEI from "../../../assets/images/CEI.png";

function NavBar({color}) {

    const colorBack = {
        blue: 'bg-blue-cei',
        orange: 'bg-orange-cei',
        camell: 'bg-camell-cei'
    }

    return(
        <div className={`${colorBack[color]} flex pb-16 pt-5`}>
            <a href='/'> <img className='w-20 ml-20 ' alt="logo" src={CEI}/></a>
            <a href='/login' className='ml-auto mt-5 mr-32'><button  className='h-10  bg-orange-cei text-white rounded-lg shadow-md hover:bg-right-top hover:text-white focus:outline-none '>Ingresa</button></a>
        </div>
    )
}

NavBar.propTypes = {
    backgroundColor: PropTypes.oneOf(['blue', 'orange', 'camell']).isRequired
};


export default NavBar;