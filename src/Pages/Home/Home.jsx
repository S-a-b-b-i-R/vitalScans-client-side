import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import FeaturedTest from "../../Components/FeaturedTest/FeaturedTest";
import Promotion from "../../Components/Promotion/Promotion";

const Home = () => {
    return (
        <div className="space-y-20">
            <Helmet>
                <title>vitalScans | Home</title>
            </Helmet>
            <Banner />
            <FeaturedTest />
            <Promotion />
        </div>
    );
};

export default Home;
