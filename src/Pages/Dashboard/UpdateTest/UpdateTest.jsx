import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Button from "../../../Components/Button/Button";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const UpdateTest = () => {
    const axiosSecure = useAxiosSecure();
    const params = useParams();
    const {
        data: testData,
        isPending,
        refetch,
    } = useQuery({
        queryKey: ["test", params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tests/${params.id}`);
            return res.data.test;
        },
    });
    const { register, handleSubmit, reset } = useForm();
    if (isPending) {
        return <Loading />;
    }
    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.put(`/tests/${params.id}`, data);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Test Updated!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
                reset();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    return (
        <div className="px-40">
            <SectionTitle heading="Update Test" />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        <div className="flex gap-2">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">
                                        Test Name
                                    </span>
                                </label>
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    placeholder="Test Name"
                                    defaultValue={testData.title}
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    {...register("price", { required: true })}
                                    type="number"
                                    step={0.01}
                                    placeholder="Price"
                                    defaultValue={testData.price}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Test Description
                                </span>
                            </label>
                            <textarea
                                {...register("details", { required: true })}
                                className="textarea textarea-bordered h-24"
                                placeholder="Test Details"
                                defaultValue={testData.details}
                            ></textarea>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Preparation</span>
                            </label>
                            <textarea
                                {...register("preparation", { required: true })}
                                className="textarea textarea-bordered h-24"
                                placeholder="Preparation Details"
                                defaultValue={testData.preparation}
                            ></textarea>
                        </div>
                        <div>
                            <Button type="submit" text="Update Test" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTest;
