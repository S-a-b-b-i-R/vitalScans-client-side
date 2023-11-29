import { useQuery } from "@tanstack/react-query";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import FeaturedTestCard from "./FeaturedTestCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeaturedTest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: slotData, isPending: slotLoading } = useQuery({
        queryKey: ["slots"],
        queryFn: async () => {
            const res = await axiosSecure.get("/topbookings");
            return res.data.topThreeTests;
        },
    });

    if (slotLoading) return <Loading />;

    console.log(slotData);
    return (
        <Container>
            <div className="space-y-6 my-6">
                <h1 className="text-center text-2xl lg:text-5xl font-bold text-textCol">
                    Featured Tests
                </h1>
                <div className="divider w-1/3 mx-auto"></div>
                <div className="grid grid-col-1 lg:grid-cols-3 gap-2 mx-5">
                    {slotData?.map((test) => (
                        <FeaturedTestCard key={test._id} test={test} />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default FeaturedTest;
