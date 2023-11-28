import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSlot = () => {
    const axiosPublic = useAxiosPublic();
    const {
        data: slotData,
        error: slotError,
        isPending: slotLoading,
        refetch: slotRefetch,
    } = useQuery({
        queryKey: ["slot"],
        queryFn: async () => {
            const res = await axiosPublic.get("/slots");
            return res.data.slots;
        },
    });
    return { slotData, slotError, slotLoading, slotRefetch };
};

export default useSlot;
