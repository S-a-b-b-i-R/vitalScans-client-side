import { useQuery } from "@tanstack/react-query";
import Button from "../../Components/Button/Button";
import Container from "../../Components/Container/Container";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Components/Loading/Loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./AvailableTest.css";
import { Helmet } from "react-helmet-async";

const AvailableTest = () => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
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
        queryKey: ["slots", itemsPerPage, currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/slots/${startDate}/${endDate}?page=${currentPage}&limit=${itemsPerPage}`
            );
            return res.data.slots;
        },
    });
    const {
        data: slotCount,
        isPending: slotCountLoading,
        refetch: slotCountRefetch,
    } = useQuery({
        queryKey: ["slotsCount"],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/slotnum/${startDate}/${endDate}`
            );
            return res.data.slotNumber;
        },
    });
    useEffect(() => {
        const numberofPages = Math.ceil(slotCount / itemsPerPage);
        setPages([...Array(numberofPages).keys()]);
    }, [startDate, endDate, refetch, slotCount, itemsPerPage]);
    if (slotLoading || slotCountLoading) return <Loading />;

    const handleItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextpage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        if (startDate > endDate) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Start date can't be after end date!",
            });
            return;
        } else if (startDate < new Date().toISOString().slice(0, 10)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Start date can't be past dates!",
            });
            return;
        }
        refetch();
        slotCountRefetch();
    };

    return (
        <div>
            <Helmet>
                <title>vitalScans | All Tests</title>
            </Helmet>
            <SectionTitle heading="Available Tests" />
            <Container>
                <form onSubmit={handleSearch}>
                    <div className="flex gap-2 items-end justify-center">
                        <div className="form-control w-1/3">
                            <label className="label">
                                <span className="label-text">From Date</span>
                            </label>
                            <input
                                type="date"
                                defaultValue={startDate}
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
                                defaultValue={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="input input-bordered"
                            />
                        </div>
                        <div>
                            <Button text="Search" type="submit" />
                        </div>
                    </div>
                </form>
                <div className="overflow-x-auto">
                    {slotData.length ? (
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
                                        <td>
                                            {index +
                                                1 +
                                                currentPage * itemsPerPage}
                                        </td>
                                        <td>{item.testId.title}</td>
                                        <td>{item.testId.details}</td>
                                        <td>${item.testId.price}</td>
                                        <td>{item.slotNum}</td>
                                        <td>{item.testDate.slice(0, 10)}</td>
                                        <td>
                                            <Link
                                                to={`/testdetail/${item._id}`}
                                            >
                                                <Button text="Details" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex justify-center items-center h-96">
                            <h1 className="text-3xl font-semibold text-gray-500">
                                No Tests Found!
                            </h1>
                        </div>
                    )}
                </div>
                <div className="pagination">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className="bg-mainCol p-2 rounded-md"
                    >
                        Previous
                    </button>
                    {pages.map((page) => (
                        <button
                            className={
                                currentPage === page
                                    ? "selected p-2"
                                    : "bg-gray-300 p-2"
                            }
                            onClick={() => setCurrentPage(page)}
                            key={page}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        onClick={handleNextpage}
                        disabled={currentPage === pages[pages.length - 1]}
                        className="bg-mainCol p-2 rounded-md"
                    >
                        Next
                    </button>
                    <div className="flex items-center">
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPage}
                            className="w-32 lg:w-52 border-2 p-1"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AvailableTest;
