import Footer from "../../shared/components/Footer";
import NavBar from "../../shared/components/navBar";
import Mission from "../../shared/components/Mission";
import Phrase from "../../shared/components/Phrase";

function LandingPage() {
  return (
    <>
      <NavBar color={'blue'}/>
      <Mission color={'blue'}/>
      <Phrase/>
      <Footer/>
    </>
  );
}

export default LandingPage;