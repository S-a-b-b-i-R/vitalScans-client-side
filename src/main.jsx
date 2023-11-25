import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes/Routes";
import "./index.css";
import AuthProvider from "./Providers/Authprovider";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider>
                    <RouterProvider router={Routes} />
                </HelmetProvider>
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>
);
