import { useQuery } from "@tanstack/react-query";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Components/Loading/Loading";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AvailableTest = () => {
    const axiosPublic = useAxiosPublic();
    const [startDate, setStartDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [endDate, setEndDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const {
        data: slotData,
        isPending: slotLoading,
        refetch,
    } = useQuery({
        queryKey: ["slots"],
        queryFn: async () => {
            console.log(startDate, endDate);
            const res = await axiosPublic.get(`/slots/${startDate}/${endDate}`);
            return res.data.slots;
        },
    });
    if (slotLoading) return <Loading />;

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(startDate, endDate);
        refetch();
    };

    return (
        <div>
            <SectionTitle heading="Available Test" />
            <Container>
                <form onSubmit={handleSearch}>
                    <div className="flex gap-2 items-end justify-center">
                        <div className="form-control w-1/3">
                            <label className="label">
                                <span className="label-text">From Date</span>
                            </label>
                            <input
                                type="date"
                                defaultValue={new Date()
                                    .toISOString()
                                    .slice(0, 10)}
                                className="input input-bordered"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-1/3">
                            <label className="label">
                                <span className="label-text">To Date</span>
                            </label>
                            <input
                                type="date"
                                defaultValue={new Date()
                                    .toISOString()
                                    .slice(0, 10)}
                                onChange={(e) => {
                                    if (e.target.value < startDate) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "End date can't be less than start date!",
                                        });
                                        setEndDate(
                                            new Date()
                                                .toISOString()
                                                .slice(0, 10)
                                        );
                                    } else {
                                        setEndDate(e.target.value);
                                    }
                                }}
                                className="input input-bordered"
                            />
                        </div>
                        <div>
                            <Button text="Search" type="submit" />
                        </div>
                    </div>
                </form>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Test</th>
                                <th>Details</th>
                                <th>Price</th>
                                <th>Slots</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slotData.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.testId.title}</td>
                                    <td>{item.testId.details}</td>
                                    <td>${item.testId.price}</td>
                                    <td>{item.slotNum}</td>
                                    <td>{item.testDate.slice(0, 10)}</td>
                                    <td>
                                        <Link
                                            to={`/testdetail/${item.testId._id}`}
                                        >
                                            <Button text="Details" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
};

export default AvailableTest;
