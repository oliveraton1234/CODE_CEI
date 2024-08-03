import imgChildren from '../../../assets/images/CEI_Landing_1.jpeg';
import imgChildren2 from '../../../assets/images/mission_2.jpg';

function Mission({color}) {

    const colorBack = {
        blue: 'bg-blue-cei',
        orange: 'bg-orange-cei',
        camell: 'bg-camell-cei'
    }

    return (
        <div className={`${colorBack[color]} flex`}>
            <div className="w-2/4 pl-96 md:pl-52">
                <h1 className=" mb-14 font-bold text-6xl" >New Name , Same Mission</h1>
                
                <p className="mt-3.5  text-xl leading-loose" >
                In January 2024, we changed our organization’s name from Oaxaca Streetchildren Grassroots to Oaxaca Youth Empowerment (OYE).
                </p>
                <p className=" mt-3.5  text-xl leading-loose" >
                We are the primary funder for Centro de Esperanza Infantil (CEI), 
                a non-profit based in Oaxaca, Mexico., that operates two centers: Casa
                Jodi and Casa Emilie. Both provide lunch daily, academic tutoring and 
                counseling, and workshops to upwards of 550 program participants and their 
                families. Casa Jodi also houses CEI’s administrative staff, who manage the
                financial aid that provides students with uniforms, shoes, and materials, and
                underwrites their school fees.
                </p>
            </div>
            <div className="w-2/4  ">
                <img className=' pl-10 pr-3 ' src={imgChildren2} alt="children"/>
            </div>
        </div>
    )
}

// Mission.propTypes = {
//     backgroundColor: PropTypes.oneOf(['blue', 'orange', 'camell']).isRequired
// };

export default Mission;