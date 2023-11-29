import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Components/Loading/Loading";
import ServiceCard from "./ServiceCard";
import Container from "../../Components/Container/Container";
import { Helmet } from "react-helmet-async";

const Services = () => {
    const axiosPublic = useAxiosPublic();
    const { data: services = [], isPending } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axiosPublic.get("/services");
            return res.data.services;
        },
    });

    if (isPending) {
        return <Loading />;
    }

    return (
        <Container>
            <Helmet>
                <title>vitalScans | Services</title>
            </Helmet>
            <SectionTitle heading="Services" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </Container>
    );
};

export default Services;
