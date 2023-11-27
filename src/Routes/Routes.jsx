import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import Dashboard from "../Layouts/Dashboard";
import AddTest from "../Pages/Dashboard/AddTest/AddTest";
import AdminRoutes from "./AdminRoutes";
import ManageTest from "../Pages/Dashboard/ManageTest/ManageTest";
import UpdateTest from "../Pages/Dashboard/UpdateTest/UpdateTest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";

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
                path: "addtest",
                element: (
                    <AdminRoutes>
                        <AddTest />
                    </AdminRoutes>
                ),
            },
            {
                path: "managetests",
                element: (
                    <AdminRoutes>
                        <ManageTest />
                    </AdminRoutes>
                ),
            },
            {
                path: "updatetest/:id",
                element: (
                    <AdminRoutes>
                        <UpdateTest />
                    </AdminRoutes>
                ),
            },
            {
                path: "users",
                element: (
                    <AdminRoutes>
                        <AllUsers />
                    </AdminRoutes>
                ),
            },
        ],
    },
]);

export default Routes;
