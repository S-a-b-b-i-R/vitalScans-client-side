import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useSlot from "../../../hooks/useSlot";
import { GrUpdate } from "react-icons/gr";

const ManageSlot = () => {
    const { slotData, slotLoading } = useSlot();
    if (slotLoading) return <Loading />;
    return (
        <div>
            <SectionTitle heading="Manage Slots" />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Slots</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slotData.map((item) => (
                            <tr key={item._id}>
                                <td>{slotData.indexOf(item) + 1}</td>
                                <td>{item.testId.title}</td>
                                <td>{item.testDate.slice(0, 10)}</td>
                                <td>{item.slotNum}</td>
                                <td>
                                    <>
                                        <Link
                                            to={`/dashboard/updateslot/${item._id}`}
                                            className="btn bg-transparent border-black"
                                        >
                                            <GrUpdate />
                                        </Link>
                                    </>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageSlot;
