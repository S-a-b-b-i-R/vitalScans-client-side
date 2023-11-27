import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Button from "../../../Components/Button/Button";
import Swal from "sweetalert2";

const AddTest = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.post("/tests", data);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Test Added!",
                    showConfirmButton: false,
                    timer: 1500,
                });
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
            <SectionTitle heading="Add Test" />
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
                            ></textarea>
                        </div>
                        <div>
                            <Button type="submit" text="Add Test" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTest;
