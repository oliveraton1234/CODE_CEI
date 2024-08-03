// import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Router, Route, Switch, Link } from 'wouter';

import LandingPage from "../screens/landing/LandingPage";
import LoginPage from "../screens/login/LoginPage";
import HomeLogged from "../screens/home/HomeLogged";
import Ninos from "../screens/ninos/ninos";
import Donadores from "../screens/donadores/Donadores";
import CreateNinoForm from "../screens/createNino/CreateNino";
import CreateDoners from "../screens/createDoners/CreateDoners";
import EditNinoForm from "../screens/EditNino/EditNino";
import EditDoners from "../screens/editDoners/EditDoners";
import BloquesForm from "../screens/bloquesForm/BloquesForm";
import Reportes from "../screens/reportes/Reportes";
import TableComponent from "../screens/reportes/components/Table";
import { ReportesCiclo } from "../screens/reportes/components/ReportesCiclo";

function RouterApp() {
    return (
        <Router>
            <div>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/home">Home Logged</Link>
                    
                </nav>

                <Switch>
                    <Route path="/" component={LandingPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/home" component={HomeLogged} />
                    <Route path="/kids" component={Ninos} />
                    <Route path="/create-nino" component={CreateNinoForm} />
                    <Route path="/donors" component={Donadores} />
                    <Route path="/data-ninos" component={EditNinoForm} />
                    <Route path="/edit-donors" component={EditDoners} />
                    <Route path="/create-donors" component={CreateDoners} />
                    <Route path="/materiasForm" component={BloquesForm} />
                    <Route path="/reportes" component={Reportes} />
                    <Route path="/reportes/reprobados" component={TableComponent} />
                    <Route path="/reportes/ciclo" component={ReportesCiclo} />

                </Switch>
            </div>
        </Router>
    );
}

export default RouterApp;