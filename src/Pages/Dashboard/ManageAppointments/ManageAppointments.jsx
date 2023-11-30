import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { getPaymentsBySearchString } from "../../../api/payment";
import { useEffect } from "react";

const ManageAppointments = () => {
    const [searchString, setSearchString] = useState("null");
    const axiosSecure = useAxiosSecure();

    const {
        data: searchData = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["search", "payments", searchString],
        queryFn: async () => await getPaymentsBySearchString(searchString),
    });

    useEffect(() => {
        refetch();
    }, [searchString, refetch]);

    if (isPending) return <Loading />;

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
            <div className="flex justify-center">
                <div className="join mb-5">
                    <input
                        className="input input-bordered join-item w-72"
                        placeholder="Email"
                        name="searchstring"
                    />
                    <button
                        className="btn join-item rounded-r-md bg-mainCol hover:bg-mainCol"
                        onClick={() =>
                            setSearchString(
                                document.getElementsByName("searchstring")[0]
                                    .value
                            )
                        }
                    >
                        Search
                    </button>
                </div>
            </div>
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
                            <th>Report</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchData.payments.map((item, index) => (
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
