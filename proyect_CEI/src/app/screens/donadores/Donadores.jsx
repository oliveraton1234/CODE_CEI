import NavBarLogged from "../../shared/components/NavBarLogged";
import SearchDoners from "./components/SearchDoners";

function Donadores(){
    return (
        <div className="h-screen bg-camell-cei">
            <NavBarLogged color={'camell'}/>
            <SearchDoners/>
        </div>
    )
}

export default Donadores;