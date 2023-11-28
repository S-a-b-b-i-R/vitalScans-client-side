// import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
// import {
//     loadCaptchaEnginge,
//     LoadCanvasTemplate,
//     validateCaptcha,
// } from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || "/dashboard";
    // const captchaRef = useRef(null);
    const { login } = useAuth();
    // const [disabled, setDisabled] = useState(true);

    // useEffect(() => {
    //     loadCaptchaEnginge(5);
    // }, []);

    // const handleValidateCaptcha = (e) => {
    //     e.preventDefault();
    //     const captcha = captchaRef.current.value;
    //     console.log(captcha);
    //     const result = validateCaptcha(captcha);
    //     if (result) {
    //         setDisabled(false);
    //     } else {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Invalid Captcha",
    //             showConfirmButton: false,
    //             timer: 1000,
    //         });
    //         captchaRef.current.value = "";
    //         setDisabled(true);
    //     }
    // };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((result) => {
                Swal.fire({
                    icon: "success",
                    title: "Logged In!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate(state);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                // setDisabled(true);
            });
    };
    return (
        <div>
            <Helmet>
                <title>vitalScans | Login</title>
            </Helmet>
            <div className="hero bg-base-100 text-textCol">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img
                            className="object-cover h-[500px]"
                            src="https://i.ibb.co/cvQ5w04/login-Page.png"
                            alt=""
                        />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <h1 className="text-center p-3 text-2xl font-bold">
                            Login
                        </h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Captcha</span>
                                </label>
                                <LoadCanvasTemplate />
                                <input
                                    ref={captchaRef}
                                    // onBlur={handleValidateCaptcha}
                                    type="text"
                                    placeholder="type the letters above here"
                                    name="captcha"
                                    className="input input-bordered"
                                    required
                                />
                                <button
                                    className="btn btn-outline btn-xs"
                                    onClick={handleValidateCaptcha}
                                >
                                    Validate
                                </button>
                            </div> */}
                            <div className="form-control mt-6">
                                <button
                                    // disabled={disabled}
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="divider"></div>
                        <div className="px-8 mb-5">
                            <SocialLogin />
                            <p className="text-center">
                                New here?{" "}
                                <Link className="text-blue-400" to="/signup">
                                    Create An Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
