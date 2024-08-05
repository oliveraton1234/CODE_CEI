import React from "react";
import { BrowserRouter, Routes, Route, createHashRouter, RouterProvider } from "react-router-dom"
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./assets/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./app/logic/store";

const queryClient = new QueryClient();
import { ThemeProvider } from "@material-tailwind/react";
import LandingPage from "./app/screens/landing/LandingPage.jsx";
import LoginPage from "./app/screens/login/LoginPage.jsx";
import HomeLogged from "./app/screens/home/HomeLogged.jsx";
import Ninos from "./app/screens/ninos/ninos.jsx";
import CreateNinoForm from "./app/screens/createNino/CreateNino.jsx";
import Donadores from "./app/screens/donadores/Donadores.jsx";
import EditNinoForm from "./app/screens/EditNino/EditNino.jsx";
import EditDoners from "./app/screens/editDoners/EditDoners.jsx";
import CreateDoners from "./app/screens/createDoners/CreateDoners.jsx";
import BloquesForm from "./app/screens/bloquesForm/BloquesForm.jsx";
import Reportes from "./app/screens/reportes/Reportes.jsx";
import TableComponent from "./app/screens/reportes/components/Table.jsx";
import { ReportesCiclo } from "./app/screens/reportes/components/ReportesCiclo.jsx";

const router = createHashRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/home",
        element: <HomeLogged />
    },
    {
        path: "/kids",
        element: <Ninos />
    },
    {
        path: "/create-nino",
        element: <CreateNinoForm />
    },
    {
        path: "/donors",
        element: <Donadores />
    },
    {
        path: "/data-ninos",
        element: <EditNinoForm />
    },
    {
        path: "/edit-donors",
        element: <EditDoners />
    },
    {
        path: "/create-donors",
        element: <CreateDoners />
    },
    {
        path: "/materiasForm",
        element: <BloquesForm />
    },
    {
        path: "/reportes",
        element: <Reportes />
    },
    {
        path: "/reportes/reprobados",
        element: <TableComponent />
    },
    {
        path: "/reportes/ciclo",
        element: <ReportesCiclo />
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    {/* <RouterProvider router={router} />; */}
                    <App />
                </QueryClientProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
