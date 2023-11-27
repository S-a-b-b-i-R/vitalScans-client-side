import PropTypes from "prop-types";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading/Loading";

const AdminRoutes = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { user, loading } = useAuth();
    const location = useLocation();
    const path = location.pathname;
    if (isAdminLoading || loading) {
        return <Loading />;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={path} />;
};

AdminRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoutes;
