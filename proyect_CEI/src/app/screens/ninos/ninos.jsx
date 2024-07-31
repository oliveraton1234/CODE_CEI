import NavBarLogged from "../../shared/components/NavBarLogged";
import SearchKids from "./components/SearchKids";

function Ninos() {
    return (
        <div className=" min-h-screen bg-camell-cei">
            <NavBarLogged color={'camell'}/>
            <SearchKids/>
        </div>
    );
}

export default Ninos;