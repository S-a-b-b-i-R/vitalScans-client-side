import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Container from "../Components/Container/Container";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="space-y-10">
            <Container>
                <Navbar />
            </Container>

            <div className="min-h-[calc(100vh-224px-81.25px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
