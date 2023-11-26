import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useTest = () => {
    const axiosPublic = useAxiosPublic();
    const {
        data: testData,
        error: testError,
        isPending: testLoading,
    } = useQuery({
        queryKey: ["test"],
        queryFn: async () => {
            const res = await axiosPublic.get("/tests");
            return res.data.tests;
        },
    });
    return { testData, testError, testLoading };
};

export default useTest;
