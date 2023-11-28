import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";

const Appointment = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: appointmentData, isPending: appointmentLoading } = useQuery({
        queryKey: ["payments", user.email],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data.payment;
        },
    });

    if (appointmentLoading || loading) return <Loading />;
    console.log(appointmentData);
    return (
        <div>
            <Container>
                <SectionTitle heading="My Appointments" />
                {appointmentData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Test</th>
                                    <th>Date</th>
                                    <th>Results</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentData.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            {appointmentData.indexOf(item) + 1}
                                        </td>
                                        <td>{item.testId.title}</td>
                                        <td>{item.date.slice(0, 10)}</td>
                                        <td>
                                            {item.status === "pending" ? (
                                                <span className="bg-yellow-400 p-2 rounded-md font-bold">
                                                    Pending
                                                </span>
                                            ) : (
                                                <span className="bg-green-400 p-2 rounded-md font-bold">
                                                    Ready
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-96">
                        <h1 className="text-3xl text-textCol">
                            No appointments yet!
                        </h1>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Appointment;
