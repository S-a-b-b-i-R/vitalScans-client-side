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
import CreateSlot from "../Pages/Dashboard/CreateSlot/CreateSlot";
import ManageSlot from "../Pages/Dashboard/ManageSlot/ManageSlot";
import UpdateSlot from "../Pages/Dashboard/UpdateSlot/UpdateSlot";
import PrivateRoutes from "./PrivateRoutes";
import AvailableTest from "../Pages/AvailableTest/AvailableTest";
import AddBanner from "../Pages/Dashboard/AddBanner/AddBanner";
import ManageBanner from "../Pages/Dashboard/ManageBanner/ManageBanner";
import TestDetail from "../Pages/TestDetail/TestDetail";
import Payment from "../Pages/Payment/Payment";

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
                element: (
                    <PrivateRoutes>
                        <UpdateProfile />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/tests",
                element: (
                    <PrivateRoutes>
                        <AvailableTest />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/testdetail/:id",
                element: (
                    <PrivateRoutes>
                        <TestDetail />
                    </PrivateRoutes>
                ),
            },
            {
                path: "/payment",
                element: (
                    <PrivateRoutes>
                        <Payment />
                    </PrivateRoutes>
                ),
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
            {
                path: "addslot",
                element: (
                    <AdminRoutes>
                        <CreateSlot />
                    </AdminRoutes>
                ),
            },
            {
                path: "manageslot",
                element: (
                    <AdminRoutes>
                        <ManageSlot />
                    </AdminRoutes>
                ),
            },
            {
                path: "updateslot/:id",
                element: (
                    <AdminRoutes>
                        <UpdateSlot />
                    </AdminRoutes>
                ),
            },
            {
                path: "addbanner",
                element: (
                    <AdminRoutes>
                        <AddBanner />
                    </AdminRoutes>
                ),
            },
            {
                path: "managebanner",
                element: (
                    <AdminRoutes>
                        <ManageBanner />
                    </AdminRoutes>
                ),
            },
        ],
    },
]);

export default Routes;
