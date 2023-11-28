import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isPending } = useQuery({
        queryKey: ["payments", user.email],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data.payment;
        },
    });

    if (loading || isPending) return <Loading />;

    const total = data.reduce((sum, payment) => {
        return sum + payment.amount / 100;
    }, 0);
    console.log(data, total);
    return (
        <div className="px-40">
            <SectionTitle heading="Payment History" />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test</th>
                            <th>Test Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {data.map((payment, index) => {
                            return (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.testId.title}</td>

                                    <td>
                                        {payment.date.toString().slice(0, 10)}
                                    </td>
                                    <td>$ {payment.amount / 100}</td>
                                    <td>
                                        {payment.status === "success" ? (
                                            <span className="bg-green-500 p-2 rounded-md text-white">
                                                Report Ready
                                            </span>
                                        ) : (
                                            <span className="bg-red-500 p-2 rounded-md text-white">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="text-black text-md font-bold">
                            <th></th>
                            <th></th>
                            <th>Total Payments: </th>
                            <td className="font-bold">${total.toFixed(2)}</td>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
