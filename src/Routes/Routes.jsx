import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
    },
]);

export default Routes;
