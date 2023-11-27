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
        booking[0]?.discount > 0
            ? booking[0].testId.price -
              (booking[0].testId.price * booking[0].discount) / 100
            : booking[0]?.testId.price;

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
            console.log("[PaymentMethod]", paymentMethod);
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
            console.log(confirmError);
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
            console.log(paymentIntent);
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
                    slotId: booking[0].slotId,
                    testId: booking[0].testId._id,
                    status: "pending",
                    bookingId: booking[0]._id,
                };
                console.log(booking, payment);
                const res = await axiosSecure.post("/payments", payment);
                console.log(res);
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
        <div className="w-2/3 mx-auto">
            <form onSubmit={handleSubmit}>
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
