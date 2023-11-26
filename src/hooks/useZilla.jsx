import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useZilla = () => {
    const axiosPublic = useAxiosPublic();
    const {
        data: zillaData,
        error: zillaError,
        isPending: zillaLoading,
    } = useQuery({
        queryKey: ["zilla"],
        queryFn: async () => {
            const res = await axiosPublic.get(
                "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json"
            );
            return res.data[2].data.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        },
    });
    return { zillaData, zillaError, zillaLoading };
};

export default useZilla;
