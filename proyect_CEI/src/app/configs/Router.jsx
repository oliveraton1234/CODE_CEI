import { BrowserRouter, Routes, Route, createHashRouter, RouterProvider } from "react-router-dom"
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


function Router() {
    return (
        <BrowserRouter basename={import.meta.env.DEV ? '/' : '/proyect_CEI/'}>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/home" element={<HomeLogged/>} />
                <Route path="/kids" element={<Ninos/>} />
                <Route path="/create-nino" element={<CreateNinoForm/>} />
                <Route path="/donors" element={<Donadores/>} />
                <Route path="/data-ninos" element={<EditNinoForm  />}/>
                <Route path="/edit-donors" element={<EditDoners  />}/>
                <Route path="/create-donors" element={<CreateDoners/>} />
                <Route path="/materiasForm" element={<BloquesForm/>} />
                <Route path="/reportes" element={<Reportes/>} />
                <Route path="/reportes/reprobados" element={<TableComponent/>} />
                <Route path="/reportes/ciclo" element={<ReportesCiclo/>} />


                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

// const router = createHashRouter([
//     {
//         path: "/",
//         element: <LandingPage />
//     },
//     {
//         path: "/login",
//         element: <LoginPage />
//     },
//     {
//         path: "/home",
//         element: <HomeLogged />
//     },
//     {
//         path: "/kids",
//         element: <Ninos />
//     },
//     {
//         path: "/create-nino",
//         element: <CreateNinoForm />
//     },
//     {
//         path: "/donors",
//         element: <Donadores />
//     },
//     {
//         path: "/data-ninos",
//         element: <EditNinoForm />
//     },
//     {
//         path: "/edit-donors",
//         element: <EditDoners />
//     },
//     {
//         path: "/create-donors",
//         element: <CreateDoners />
//     },
//     {
//         path: "/materiasForm",
//         element: <BloquesForm />
//     },
//     {
//         path: "/reportes",
//         element: <Reportes />
//     },
//     {
//         path: "/reportes/reprobados",
//         element: <TableComponent />
//     },
//     {
//         path: "/reportes/ciclo",
//         element: <ReportesCiclo />
//     },
//     {
//         path: "*",
//         element: <h1>Not Found</h1>
//     }
// ]);

// function Router() {
//     return <RouterProvider router={router} />;
// }

export default Router;