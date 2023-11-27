import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useTest from "../../../hooks/useTest";
import "./ManageTest.css";
import Swal from "sweetalert2";

const ManageTest = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const axiosSecure = useAxiosSecure();
    const { testData, testLoading } = useTest();
    const {
        data: tests,
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ["tests", itemsPerPage, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `tests?page=${currentPage}&limit=${itemsPerPage}`
            );
            return res.data.tests;
        },
    });

    if (loading || testLoading) {
        return <Loading />;
    }

    const numberOfPages = Math.ceil(testData.length / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

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

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this test!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/tests/${item._id}`);
                console.log(res.data);
                if (res.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Test deleted",
                        timer: 1500,
                    });
                }
                refetch();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Cancelled", "Your Test is safe :)", "error");
            }
        });
    };

    return (
        <div className="px-40">
            <SectionTitle heading="Manage Test" />
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="w-[5%]">#</th>
                            <th className="w-[15%]">Test Name</th>
                            <th className="w-[25%]">Details</th>
                            <th className="w-[25%]">Preparation</th>
                            <th className="w-[15%]">Price</th>
                            <th className="w-[10%]">Update</th>
                            <th className="w-[10%]">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((item, index) => (
                            <tr key={item._id}>
                                <td>
                                    {index + 1 + currentPage * itemsPerPage}
                                </td>
                                <td>{item.title}</td>
                                <td>{item.details}</td>
                                <td>{item.preparation}</td>
                                <td>${item.price}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/updatetest/${item._id}`}
                                        className="btn btn-ghost btn-xs text-xl text-yellow-600"
                                    >
                                        <FaEdit />
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteItem(item)}
                                        className="btn btn-ghost btn-xs text-xl text-red-600"
                                    >
                                        <RiDeleteBin5Line />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                        className="w-52"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ManageTest;
