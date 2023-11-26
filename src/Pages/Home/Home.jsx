import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>vitalScans | Home</title>
            </Helmet>
            <Banner />
        </div>
    );
};

export default Home;
