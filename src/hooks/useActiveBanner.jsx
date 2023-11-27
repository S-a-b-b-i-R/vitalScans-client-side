import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useActiveBanner = () => {
    const axiosPublic = useAxiosPublic();
    const {
        data: activeBanner,
        error: activeBannerError,
        isPending: activeBannerLoading,
        refetch: activeBannerRefetch,
    } = useQuery({
        queryKey: ["activeBanner"],
        queryFn: async () => {
            const res = await axiosPublic.get("/banners/active");
            return res.data.banner;
        },
    });
    return {
        activeBanner,
        activeBannerError,
        activeBannerLoading,
        activeBannerRefetch,
    };
};

export default useActiveBanner;
