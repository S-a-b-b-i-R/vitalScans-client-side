import { useNavigate, useParams } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import { useForm } from "react-hook-form";
import Button from "../../../Components/Button/Button";
import Swal from "sweetalert2";

const CreateReport = () => {
    const params = useParams();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const { data: paymentData, isPending: paymentLoading } = useQuery({
        queryKey: ["payment", params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${params.id}`);
            return res.data.payment;
        },
    });

    const { data: userData, isPending: userLoading } = useQuery({
        queryKey: ["user", params.id],
        enabled: !!paymentData,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${paymentData.email}`);
            return res.data.user;
        },
    });

    if (paymentLoading || userLoading) return <Loading />;

    const onSubmit = async (data) => {
        const report = {
            paymentId: paymentData._id,
            userId: userData._id,
            testId: paymentData.testId._id,
            testDate: paymentData.date,
            results: data.results,
        };
        const result = await axiosSecure.post("/reports", report);
        if (result.status === 200) {
            reset();
            Swal.fire({
                icon: "success",
                title: "Report created",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/dashboard/manageappointments");
        }
    };

    return (
        <div>
            <SectionTitle heading="Create Report" />
            <div className="px-40">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-400">Name</p>
                            <p className="text-gray-600 font-bold">
                                {userData.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Email</p>
                            <p className="text-gray-600 font-bold">
                                {userData.email}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Test</p>
                            <p className="text-gray-600 font-bold">
                                {paymentData.testId.title}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Date</p>
                            <p className="text-gray-600 font-bold">
                                {paymentData.date.slice(0, 10)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Blood Group</p>
                            <p className="text-gray-600 font-bold">
                                {userData.bloodGroup}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Amount</p>
                            <p className="text-gray-600 font-bold">
                                {paymentData.amount}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400">Status</p>
                            <p className="text-gray-600 font-bold">
                                {paymentData.status}
                            </p>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-gray-400">
                                Test Results
                            </span>
                        </label>
                        <textarea
                            {...register("results", { required: true })}
                            className="textarea textarea-bordered h-52"
                            placeholder="Test Results"
                        ></textarea>
                    </div>
                    <div className="flex justify-center mt-5">
                        <Button type="submit" text="Create Report" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateReport;
