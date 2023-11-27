import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import Dashboard from "../Layouts/Dashboard";
import AddTest from "../Pages/Dashboard/AddTest/AddTest";
import AdminRoutes from "./AdminRoutes";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/updateprofile",
                element: <UpdateProfile />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                // admin routes
                path: "addtest",
                element: (
                    <AdminRoutes>
                        <AddTest />
                    </AdminRoutes>
                ),
            },
        ],
    },
]);

export default Routes;
