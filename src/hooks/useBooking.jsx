import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useBooking = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        data: booking = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: [user?.email, "booking"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${user.email}`);
            return res.data.bookings;
        },
    });
    return [booking, isPending, refetch];
};

export default useBooking;
