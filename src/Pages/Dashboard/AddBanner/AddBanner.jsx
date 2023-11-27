import { useForm } from "react-hook-form";
import Button from "../../../Components/Button/Button";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hositng_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hositng_key}`;
const AddBanner = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });
        if (res.data.success) {
            //now send the menu item to server with image url
            const banner = {
                title: data.title,
                description: data.description,
                image: res.data.data.display_url,
                coupon: data.coupon,
                discount: parseInt(data.discount),
            };
            const respons = await axiosSecure.post("/banners", banner);
            console.log(respons);
            if (respons.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Banner added",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
            }
        }
        console.log(res.data);
    };
    return (
        <div className="px-40">
            <SectionTitle heading="Add Banner" />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        <div className="flex gap-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Banner Title
                                    </span>
                                </label>
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    placeholder="Banner Title"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Banner Description
                                </span>
                            </label>
                            <textarea
                                {...register("description", { required: true })}
                                className="textarea textarea-bordered h-24"
                                placeholder="Banner Description"
                            ></textarea>
                        </div>

                        <div className="flex gap-2">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Coupon</span>
                                </label>
                                <input
                                    {...register("coupon", {
                                        required: true,
                                    })}
                                    className="input input-bordered w-full"
                                    placeholder="Coupon Code"
                                ></input>
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Discount</span>
                                </label>
                                <input
                                    {...register("discount", {
                                        required: true,
                                    })}
                                    type="number"
                                    step={1}
                                    className="input input-bordered w-full"
                                    placeholder="Coupon Code"
                                ></input>
                            </div>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Banner Image</span>
                            </label>
                            <input
                                {...register("image", { required: true })}
                                type="file"
                                className="file-input w-full max-w-xs"
                            />
                        </div>
                        <div>
                            <Button type="submit" text="Add banner" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBanner;
