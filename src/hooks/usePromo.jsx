import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePromo = () => {
    const axiosPublic = useAxiosPublic();
    const { data: promos, isPending: promoLoading } = useQuery({
        queryKey: ["promo"],
        queryFn: async () => {
            const res = await axiosPublic.get("/promos");
            return res.data.promos;
        },
    });
    return { promos, promoLoading };
};

export default usePromo;
