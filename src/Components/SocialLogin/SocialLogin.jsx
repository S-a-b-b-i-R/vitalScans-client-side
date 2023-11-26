import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state?.from?.pathname || "/";
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    icon: "success",
                    title: "Logged In!",
                    showConfirmButton: false,
                    timer: 1500,
                });

                axiosPublic
                    .post("/users", {
                        name: result.user.displayName,
                        email: result.user.email,
                    })
                    .then((result) => {
                        console.log(result);
                        if (result.data.acknowledged) {
                            console.log("User Created");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                navigate(state);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn w-full">
                    <FcGoogle size={40} />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;
