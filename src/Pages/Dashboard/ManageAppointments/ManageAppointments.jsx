import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import usePayment from "../../../hooks/usePayment";
import { GrUpdate } from "react-icons/gr";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageAppointments = () => {
    const axiosSecure = useAxiosSecure();
    const { paymentData, paymentLoading, paymentRefetch } = usePayment();

    if (paymentLoading) return <Loading />;

    const handleCancel = async (id) => {
        try {
            const res = await axiosSecure.patch(`/payments/${id}`);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Appointment cancelled",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            paymentRefetch();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Test already conducted!",
            });
        }
    };

    return (
        <div className="px-40">
            <SectionTitle heading="Manage Appointments" />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Test</th>
                            <th>Patient Name</th>
                            <th>Patient Email</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentData.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.testId.title}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.date.slice(0, 10)}</td>
                                <td>
                                    {item.status === "pending" ? (
                                        <>
                                            <Link
                                                to={`/dashboard/createreport/${item._id}`}
                                                className="btn bg-transparent border-black"
                                            >
                                                <GrUpdate />
                                            </Link>
                                        </>
                                    ) : (
                                        <span>Ready</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn bg-transparent border-black"
                                        onClick={() => handleCancel(item._id)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAppointments;
