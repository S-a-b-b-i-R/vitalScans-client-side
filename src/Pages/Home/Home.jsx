import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import FeaturedTest from "../../Components/FeaturedTest/FeaturedTest";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>vitalScans | Home</title>
            </Helmet>
            <Banner />
            <FeaturedTest />
        </div>
    );
};

export default Home;
