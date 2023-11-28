import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button/Button";

const TestResults = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: appointmentData, isPending: appointmentLoading } = useQuery({
        queryKey: ["payments", user.email],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentsuccess/${user.email}`);

            return res.data.payment;
        },
    });
    if (loading || appointmentLoading) return <Loading />;

    // useEffect(() => {
    //     const filter = appointmentData.filter(
    //         (item) => item.status === "success"
    //     );
    //     setFilterData(filter);
    // }, [appointmentData]);
    return (
        <div className="px-40">
            <SectionTitle heading="Test Results" />
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
                                    <td>{appointmentData.indexOf(item) + 1}</td>
                                    <td>{item.testId.title}</td>
                                    <td>{item.date.slice(0, 10)}</td>
                                    <td>
                                        {item.status === "pending" ? (
                                            <span className="text-yellow-400 font-bold">
                                                Pending
                                            </span>
                                        ) : (
                                            <Link
                                                to={`/dashboard/report/${item._id}`}
                                            >
                                                <Button text="Report" />
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex justify-center items-center h-96">
                    <h1 className="text-2xl font-bold text-gray-400">
                        No Test Results Found!
                    </h1>
                </div>
            )}
        </div>
    );
};

export default TestResults;
