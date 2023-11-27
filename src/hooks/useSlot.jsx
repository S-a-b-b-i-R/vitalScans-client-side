import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSlot = () => {
    const axiosSecure = useAxiosSecure();
    const {
        data: slotData,
        error: slotError,
        isPending: slotLoading,
        refetch: slotRefetch,
    } = useQuery({
        queryKey: ["slot"],
        queryFn: async () => {
            const res = await axiosSecure.get("/slots");
            return res.data.slots;
        },
    });
    return { slotData, slotError, slotLoading, slotRefetch };
};

export default useSlot;
