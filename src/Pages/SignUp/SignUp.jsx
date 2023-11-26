import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then((result) => {
                updateUserProfile(data.name, data.url)
                    .then(() => {
                        //create user in database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        };
                        axiosPublic
                            .post("/users", userInfo)
                            .then((result) => {
                                // console.log(result);
                                if (result.status === 200) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Signed Up!",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    navigate("/");
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>
            <div className="hero bg-base-100">
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
                            Sign Up
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="card-body"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    {...register("name", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.name && (
                                    <span className="text-red-700">
                                        Name is required
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Photo URL
                                    </span>
                                </label>
                                <input
                                    type="url"
                                    placeholder="photo url"
                                    name="name"
                                    {...register("url", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.url && (
                                    <span className="text-red-700">
                                        Url is required
                                    </span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    {...register("email", { required: true })}
                                    className="input input-bordered"
                                />
                                {errors.email && (
                                    <span className="text-red-700">
                                        Email is required
                                    </span>
                                    // <p role="alert">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ">
                                        Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    {...register("password", {
                                        required: true,
                                        maxLength: 20,
                                        minLength: 6,
                                        pattern:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                    })}
                                    className="input input-bordered"
                                />
                                {errors.password?.type === "required" && (
                                    <span className="text-red-700">
                                        Password is required
                                    </span>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <span className="text-red-700">
                                        Password must be at least 6 characters
                                    </span>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <span className="text-red-700">
                                        Password must be less than 20 characters
                                    </span>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <span className="text-red-700">
                                        Password must contain at least one
                                        uppercase letter, one lowercase letter,
                                        one number and one special character
                                    </span>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <div className="px-8 mb-5">
                            <SocialLogin />
                            <p className="text-center">
                                Already have ana ccount?{" "}
                                <Link className="text-blue-400" to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
