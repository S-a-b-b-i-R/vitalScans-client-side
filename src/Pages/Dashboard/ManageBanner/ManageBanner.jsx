import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ManageBanner = () => {
    const axiosSecure = useAxiosSecure();
    const { data: bannerData, isPending: loading } = useQuery({
        queryKey: ["banner"],
        queryFn: async () => {
            const res = await axiosSecure.get("/banners");
            return res.data.banners;
        },
    });
    if (loading) {
        return <Loading />;
    }
    console.log(bannerData);
    return (
        <div>
            <SectionTitle heading="Manage Banners" />
        </div>
    );
};

export default ManageBanner;
