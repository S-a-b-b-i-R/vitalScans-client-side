import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import usePayment from "../../../hooks/usePayment";
import { GrUpdate } from "react-icons/gr";

const ManageAppointments = () => {
    const { paymentData, paymentLoading } = usePayment();
    if (paymentLoading) return <Loading />;
    console.log(paymentData);
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAppointments;
