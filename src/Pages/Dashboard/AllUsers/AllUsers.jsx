import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { GrUpdate } from "react-icons/gr";
import { ImBlocked } from "react-icons/im";
import { CgUnblock } from "react-icons/cg";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {
        data: users = [],
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data.users;
        },
    });
    if (isPending) {
        return <Loading />;
    }

    const handleUpdateUser = (id) => {
        Swal.fire({
            title: "Are you sure to make this user admin?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${id}`).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "User updated",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                });
            }
        });
    };

    const handleBlockUser = (id) => {
        Swal.fire({
            title: "Are you sure to block this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/block/${id}`).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "User blocked",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                });
            }
        });
    };

    const handleUnBlockUser = (id) => {
        Swal.fire({
            title: "Are you sure to unblock this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/block/${id}`).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "User unblocked",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        refetch();
                    }
                });
            }
        });
    };
    const showModal = (user) => {
        Swal.fire({
            title: `${user.name}'s Details`,
            html: `<p><b>Name:</b> ${user.name}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Role:</b> ${user.role}</p>
            <p><b>Active:</b> ${user.isActive}</p>
            <p><b>Blood Group:</b> ${user.bloodGroup}</p>
            `,
            confirmButtonText: "Ok",
        });
    };

    return (
        <div className="px-40">
            <SectionTitle heading="All Users" />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Block</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{users.indexOf(user) + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "admin" ? (
                                        <>Admin</>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleUpdateUser(user._id)
                                                }
                                                className="btn bg-transparent border-black"
                                            >
                                                <GrUpdate />
                                            </button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    {user.isActive === false ? (
                                        <button
                                            onClick={() =>
                                                handleUnBlockUser(user._id)
                                            }
                                            className="btn bg-transparent border-black"
                                        >
                                            Unblock
                                            <CgUnblock />
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleBlockUser(user._id)
                                                }
                                                className="btn bg-transparent border-black"
                                            >
                                                Block
                                                <ImBlocked />
                                            </button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn bg-transparent border-black"
                                        onClick={() => showModal(user)}
                                    >
                                        Details
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

export default AllUsers;
