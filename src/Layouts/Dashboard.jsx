import { NavLink, Outlet } from "react-router-dom";
import { FaCartShopping, FaUsers } from "react-icons/fa6";
import { FaHome, FaCalendarAlt, FaListUl } from "react-icons/fa";
import { RiReservedFill } from "react-icons/ri";
import { MdRateReview, MdPayment } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { TbMedicalCross } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { GiKnightBanner, GiTatteredBanner } from "react-icons/gi";
import Loading from "../Components/Loading/Loading";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    if (isAdminLoading) return <Loading />;
    return (
        <div className="flex min-h-screen">
            {/* dashboard side-bar */}
            <div className="w-64 min-h-full bg-orange-100">
                <ul className="menu p-4">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminhome">
                                    <FaHome />
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addtest">
                                    <TbMedicalCross />
                                    Add Test
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/managetests">
                                    <FaListUl />
                                    Manage Tests
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addslot">
                                    <IoCreate />
                                    Create Slot
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageslot">
                                    <FaListUl />
                                    Manage Slot
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addbanner">
                                    <GiKnightBanner />
                                    Add Banner
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/managebanner">
                                    <GiTatteredBanner />
                                    Mange Banner
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <GiTatteredBanner />
                                    Manage Appointments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers />
                                    All Users
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/cart">
                                    <FaCartShopping />
                                    My Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/userhome">
                                    <FaHome />
                                    User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reservation">
                                    <RiReservedFill />
                                    Reservation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/review">
                                    <MdRateReview />
                                    Add a Review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymenthistory">
                                    <MdPayment />
                                    Payment History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaCalendarAlt />
                                    My Bookings
                                </NavLink>
                            </li>
                        </>
                    )}
                    <div className="divider"></div>
                    {/* common navlinks */}
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <RiContactsLine />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 bg-blue-100">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
