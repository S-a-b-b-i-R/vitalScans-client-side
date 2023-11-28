import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Button from "../../Components/Button/Button";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const TestDetail = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const params = useParams();
    const { data: slot, isPending } = useQuery({
        queryKey: ["test", params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/slots/${params.id}`);
            return res.data.slot;
        },
    });
    const { data: userData } = useQuery({
        queryKey: ["user", user.email],
        enabled: !!user,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data.user;
        },
    });
    if (isPending || loading) return <Loading />;
    const handleBookNow = async () => {
        if (userData.isActive === false) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please contact Admin to unblock your account!",
                showConfirmButton: true,
            });
            return;
        }
        const { value: coupon } = await Swal.fire({
            title: "Enter your coupon",
            input: "text",
            inputLabel: "Coupon Code",
            inputPlaceholder: "Enter your coupon code",
        });
        if (coupon) {
            const code = coupon.toUpperCase();
            const result = await axiosPublic.get(`/banners/discount/${code}`);
            if (result.status === 200) {
                if (result.data.discount === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Invalid coupon code!",
                        showConfirmButton: true,
                    });
                }
                const booking = {
                    userId: user.email,
                    testId: slot.testId._id,
                    slotId: slot._id,
                    discount: result.data.discount,
                };
                console.log(booking);
                const res = await axiosSecure.post("/bookings", booking);
                if (res.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Test booked",
                        showConfirmButton: true,
                    });
                    navigate("/payment");
                }
            }
        }
    };
    return (
        <Container>
            <SectionTitle heading="Test Detail" />
            <div className="flex items-center">
                <div className="w-1/2 space-y-4">
                    <h1 className="text-2xl text-textCol">
                        Test Name:{" "}
                        <span className="font-bold">{slot.testId.title}</span>
                    </h1>
                    <p className="text-lg text-textCol">
                        <span className="underline">Description:</span>{" "}
                        <span>{slot.testId.details}</span>
                    </p>
                    <p className="text-lg text-textCol">
                        <span className="underline">Preparation:</span>{" "}
                        <span>{slot.testId.preparation}</span>
                    </p>
                    <p className="text-lg text-textCol">
                        <span className="underline">Price:</span>{" "}
                        <span>${slot.testId.price}</span>
                    </p>
                    <p className="text-lg text-textCol">
                        <span className="underline">Available Slots:</span>{" "}
                        <span>{slot.slotNum}</span>
                    </p>
                    {/* <button onClick={handleBookNow}>book now</button> */}
                    {slot.slotNum > 0 && (
                        <div onClick={handleBookNow}>
                            <Button text="Book Now" />
                        </div>
                    )}
                    {slot.slotNum === 0 && (
                        <div>
                            <p>No slots avaialbe</p>
                            <Link to="/tests">
                                <button className="btn bg-red-500 text-white hover:bg-red-500">
                                    Try another slot
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="w-1/2">
                    <img
                        src="https://i.ibb.co/DM0xCBV/test-detail-removebg-preview.png"
                        alt=""
                    />
                </div>
            </div>
        </Container>
    );
};

export default TestDetail;
