import usePromo from "../../hooks/usePromo";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Promotion = () => {
    const { promos, promoLoading } = usePromo();
    if (promoLoading) return <Loading />;
    console.log(promos);
    return (
        <Container>
            <div className="space-y-6 my-6">
                <h1 className="text-center text-5xl font-bold text-textCol">
                    Recommendations
                </h1>
                <div className="divider w-1/3 mx-auto"></div>
                <Carousel
                    autoPlay
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                    interval={3000}
                >
                    {promos?.map((promo) => (
                        <div key={promo._id}>
                            <div className="space-y-4 bg-base-200 p-2">
                                <p className="text-2xl">
                                    <b>{promo.title}</b>
                                </p>
                                <p>{promo.description}</p>
                            </div>
                            <img
                                src={promo.imageUrl}
                                alt="promo"
                                className="object-center w-full h-[600px]"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </Container>
    );
};

export default Promotion;
