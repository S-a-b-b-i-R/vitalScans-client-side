import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import "./Common.css";

const CheckoutForm = () => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [booking, isPending, refetch] = useBooking();
    const { user, loading: userLoading } = useAuth();
    const price =
        booking[booking.length - 1]?.discount > 0
            ? booking[booking.length - 1].testId.price -
              (booking[booking.length - 1].testId.price *
                  booking[booking.length - 1].discount) /
                  100
            : booking[booking.length - 1]?.testId.price;
    useEffect(() => {
        if (price > 0) {
            axiosSecure
                .post("create-payment-intent", {
                    price: price,
                })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: error.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            setError("");
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous",
                    },
                },
            });
        if (confirmError) {
            setError(confirmError.message);
            setTransactionId("");
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: confirmError.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            setError("");
            setLoading(false);
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user.email,
                    name: user.displayName,
                    paymentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    date: new Date(),
                    slotId: booking[booking.length - 1].slotId,
                    testId: booking[booking.length - 1].testId._id,
                    status: "pending",
                    bookingId: booking[booking.length - 1]._id,
                };
                const res = await axiosSecure.post("/payments", payment);
                refetch();
                Swal.fire({
                    icon: "success",
                    title: "Payment Successful",
                    text: `Payment ID: ${paymentIntent.id}`,
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                });
            }
        }
    };
    return (
        <div className="w-full md:w-2/3 md:mx-auto">
            <form onSubmit={handleSubmit}>
                <div>
                    {/* details of the price and test */}
                    <div>
                        <p className="text-lg text-textCol border-2 p-1">
                            <span className="underline">Test Name:</span>{" "}
                            <span className="font-bold">
                                {booking[booking.length - 1]?.testId.title}
                            </span>
                        </p>
                        <p className="text-lg text-textCol border-2 p-1">
                            <span className="underline">Test Price:</span>{" "}
                            <span>
                                ${booking[booking.length - 1]?.testId.price}
                            </span>
                        </p>
                        <p className="text-lg text-textCol border-2 p-1">
                            <span className="underline">Discount:</span>{" "}
                            <span>
                                {booking[booking.length - 1]?.discount}%
                            </span>
                        </p>
                        <p className="text-lg text-textCol border-2 p-1">
                            <span className="underline">Price:</span>{" "}
                            <span>${price}</span>
                        </p>
                    </div>
                </div>
                <CardElement />
                <div className="flex justify-center">
                    <button
                        className="btn btn-sm btn-primary"
                        type="submit"
                        disabled={!stripe || !clientSecret || loading}
                    >
                        Pay
                    </button>
                </div>
                <p className="text-red-500">{error}</p>
            </form>
        </div>
    );
};

export default CheckoutForm;
