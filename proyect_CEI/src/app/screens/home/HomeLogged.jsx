import Footer from "../../shared/components/Footer";
import Mission from "../../shared/components/Mission";
import NavBarLogged from "../../shared/components/NavBarLogged";
import Phrase from "../../shared/components/Phrase";


function HomeLogged() {
  return (
    <>
        <NavBarLogged color={'camell'}/>
        <Mission color={'camell'}/>
        <Phrase/>
        <Footer/>
    </>
  );
}

export default HomeLogged;