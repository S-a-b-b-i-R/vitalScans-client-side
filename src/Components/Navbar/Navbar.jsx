import { useContext } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("logged out");
                Swal.fire({
                    icon: "success",
                    title: "Logged out!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const navLinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/tests">Tests</NavLink>
            </li>
            <li>
                <NavLink to="/services">Services</NavLink>
            </li>
            <li>
                <NavLink to="/about">About Us</NavLink>
            </li>
            {user && (
                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
            )}
        </>
    );

    let profilePhoto = "";
    if (user !== null) {
        if (user.photoURL !== null) {
            profilePhoto = user.photoURL;
        } else {
            profilePhoto = "https://i.ibb.co/VqVnHpt/logo.png";
        }
    } else {
        profilePhoto = "https://i.ibb.co/VqVnHpt/logo.png";
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-textCol"
                    >
                        {navLinks}
                    </ul>
                </div>
                <Link to="/">
                    <img
                        className="w-20 lg:w-40"
                        src="https://i.ibb.co/L5Wm6jk/logo.png"
                        alt=""
                    />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-textCol font-bold gap-2">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {/* <a className="btn">Button</a> */}
                {user && (
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        {user !== null ? (
                            <div className="w-10 rounded-full">
                                <img src={profilePhoto} />
                            </div>
                        ) : (
                            <span></span>
                        )}
                    </label>
                )}
                {user ? (
                    <details className="dropdown">
                        <summary className="m-1 btn border-none font-bold hover:bg-white text-textCol hover:text-mainCol">
                            {user.displayName !== null
                                ? user.displayName
                                : user.email}
                        </summary>
                        <ul className="p-2 shadow menu dropdown-content w-36 z-[1] rounded-box right-0">
                            <li>
                                <Link
                                    onClick={handleLogout}
                                    className="btn btn-ghost btn-sm rounded-btn normal-case"
                                >
                                    Logout
                                </Link>
                            </li>
                            {/* <li>
                                <Link
                                    to="/updateprofile"
                                    className="btn btn-ghost btn-sm rounded-btn normal-case"
                                >
                                    Update Profile
                                </Link>
                            </li> */}
                        </ul>
                    </details>
                ) : (
                    <ul className="p-2 shadow menu dropdown-content z-[1]  rounded-box">
                        <li>
                            <NavLink
                                to="/login"
                                className="btn btn-ghost btn-sm rounded-btn normal-case font-bold"
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Navbar;
