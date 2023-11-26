import { useContext } from "react";
import { AuthContext } from "../../Providers/Authprovider";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
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
            {user ? (
                <li>
                    <a className="" onClick={handleLogout}>
                        Log Out
                    </a>
                </li>
            ) : (
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            )}
        </>
    );
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
                <img
                    className="w-40"
                    src="https://i.ibb.co/L5Wm6jk/logo.png"
                    alt=""
                />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-textCol font-bold gap-2">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;
