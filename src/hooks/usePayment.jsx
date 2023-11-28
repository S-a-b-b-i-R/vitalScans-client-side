import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePayment = () => {
    const axiosSecure = useAxiosSecure();
    const {
        data: paymentData,
        error: paymentError,
        isPending: paymentLoading,
        refetch: paymentRefetch,
    } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payments");
            return res.data.payments;
        },
    });
    return { paymentData, paymentError, paymentLoading, paymentRefetch };
};

export default usePayment;
