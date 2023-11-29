import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { GrUpdate } from "react-icons/gr";
import Swal from "sweetalert2";

const ManageBanner = () => {
    const axiosSecure = useAxiosSecure();
    const {
        data: bannerData,
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ["banner"],
        queryFn: async () => {
            const res = await axiosSecure.get("/banners");
            return res.data.banners;
        },
    });
    if (loading) {
        return <Loading />;
    }
    const handleSetActive = async (id) => {
        const res = await axiosSecure.patch(`/banners/${id}`);
        if (res.status === 200) {
            Swal.fire({
                icon: "success",
                title: "Banner activated",
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();
        }
    };
    return (
        <div className="px-40">
            <SectionTitle heading="Manage Banners" />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Banner Title</th>
                            <th>Banner Text</th>
                            <th>Coupon</th>
                            <th>Discount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {bannerData?.map((banner, index) => (
                            <tr key={banner._id}>
                                <td>{index + 1}</td>
                                <td>{banner.title}</td>
                                <td>{banner.description}</td>
                                <td>{banner.coupon}</td>
                                <td>{banner.discount}</td>
                                <td>
                                    {banner.isActive ? (
                                        "active"
                                    ) : (
                                        <button
                                            className="btn  btn-sm"
                                            onClick={() =>
                                                handleSetActive(banner._id)
                                            }
                                        >
                                            <GrUpdate />
                                        </button>
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

export default ManageBanner;
