import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./assets/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./app/logic/store";

const queryClient = new QueryClient();
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
