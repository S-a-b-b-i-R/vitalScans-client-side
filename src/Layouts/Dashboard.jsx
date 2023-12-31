import { NavLink, Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaHome, FaListUl } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { TbMedicalCross } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { GiKnightBanner, GiTatteredBanner } from "react-icons/gi";
import { PiQueue } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Loading from "../Components/Loading/Loading";
import useAdmin from "../hooks/useAdmin";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    if (isAdminLoading) return <Loading />;
    return (
        <div className="flex min-h-screen">
            <Helmet>
                <title>vitalScans | Dashboard</title>
            </Helmet>
            {/* <div className="w-1/4 min-h-full bg-orange-100 print:hidden">
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
                                    Manage Banner
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageappointments">
                                    <PiQueue />
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
                                <NavLink to="/dashboard/updateprofile">
                                    <CgProfile />
                                    My Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/appointments">
                                    <PiQueue />
                                    My Upcoming Appointments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/testresults">
                                    <FaListUl />
                                    Test Results
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymenthistory">
                                    <MdPayment />
                                    Payment History
                                </NavLink>
                            </li>
                        </>
                    )}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div> */}
            {/* dashboard content */}
            {/* <div className="flex-1 bg-blue-100">
                <Outlet></Outlet>
            </div> */}
            <div className="drawer lg:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content p-10">
                    <Outlet></Outlet>

                    <label
                        htmlFor="my-drawer-2"
                        className="btn bg-mainCol drawer-button lg:hidden"
                    >
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
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
                                        Manage Banner
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageappointments">
                                        <PiQueue />
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
                                    <NavLink to="/dashboard/updateprofile">
                                        <CgProfile />
                                        My Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/appointments">
                                        <PiQueue />
                                        My Upcoming Appointments
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/testresults">
                                        <FaListUl />
                                        Test Results
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymenthistory">
                                        <MdPayment />
                                        Payment History
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
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
