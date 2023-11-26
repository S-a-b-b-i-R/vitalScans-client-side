import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

import Container from "../../Components/Container/Container";
import { useEffect, useState } from "react";
import useZilla from "../../hooks/useZilla";
import Loading from "../../Components/Loading/Loading";
import useUpazilla from "../../hooks/useUpazilla";
import useAuth from "../../hooks/useAuth";
import Button from "../../Components/Button/Button";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hositng_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hositng_key}`;
const UpdateProfile = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [zillaId, setZillaId] = useState(null);
    const [upazillaId, setUpazillaId] = useState(null);
    const [file, setFile] = useState();
    const { zillaData, zillaLoading } = useZilla();
    const { upazillaData, upazillaLoading, upazillaRefetch } =
        useUpazilla(zillaId);
    const { user, loading, updateUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        upazillaRefetch();
    }, [zillaId, upazillaRefetch]);

    if (zillaLoading || upazillaLoading || loading) return <Loading />;
    const handleUpdateProfile = async (e) => {
        let photoURL = "";
        e.preventDefault();
        if (file) {
            const imageFile = { image: file };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
            console.log(res);
            if (res.data.success) {
                photoURL = res.data.data.display_url;
            }
        }
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = photoURL.length > 0 ? photoURL : user.photoURL;
        const blood_group = bloodGroup;
        const zilla_id = zillaId;
        const upazilla_id = upazillaId;
        const data = {
            name,
            email,
            photo,
            blood_group,
            zilla_id,
            upazilla_id,
        };
        console.log(data, user.displayName, user.photoURL);
        if (user.displayName !== name || user.photoURL !== photo) {
            updateUserProfile(name, photo)
                .then(() => {
                    console.log("Profile Updated");
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
        try {
            const res = await axiosSecure.put(`/users`, data);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    };
    return (
        <div>
            <Helmet>
                <title>vitalScans | Update Profile</title>
            </Helmet>
            <SectionTitle
                heading="Update Profile"
                subheading="***Updating is mandatory for availing services***"
            />
            <Container>
                <div>
                    <form onSubmit={handleUpdateProfile} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="name"
                                placeholder="name"
                                name="name"
                                className="input input-bordered"
                                defaultValue={user.displayName}
                                required
                            />
                        </div>
                        <div className="flex gap-2 items-start">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    defaultValue={user.email}
                                    disabled
                                    required
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">
                                        Blood Group
                                    </span>
                                </label>
                                <select
                                    className="border border-slate-300 p-3 rounded-lg"
                                    defaultValue="Select Blood Group"
                                    onChange={(e) => {
                                        setBloodGroup(e.target.value);
                                        console.log(bloodGroup);
                                    }}
                                >
                                    <option disabled>Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="B+">B+</option>
                                    <option value="O+">O+</option>
                                    <option value="AB+">AB+</option>
                                    <option value="A-">A-</option>
                                    <option value="B-">B-</option>
                                    <option value="O-">O-</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-2 items-start">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">
                                        Select District
                                    </span>
                                </label>
                                <select
                                    className="border border-slate-300 p-3 rounded-lg"
                                    defaultValue="Select District"
                                    onChange={(e) => {
                                        setZillaId(e.target.value);
                                    }}
                                >
                                    <option disabled>Select District</option>
                                    {zillaData.map((item) => (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">
                                        Select Upazilla
                                    </span>
                                </label>
                                <select
                                    className="border border-slate-300 p-3 rounded-lg"
                                    defaultValue="Select Upazilla"
                                    onChange={(e) => {
                                        setUpazillaId(e.target.value);
                                    }}
                                >
                                    <option value={null} disabled>
                                        Select Upazilla
                                    </option>
                                    {upazillaData.map((item) => (
                                        <option value={item.id} key={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <label className="label">
                                    <span className="label-text">
                                        Update Photo
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        console.log(e.target.files);
                                        setFile(e.target.files[0]);
                                    }}
                                    className="file-input file-input-bordered w-full max-w-xs"
                                />
                            </div>
                            {user && (
                                <div className="w-1/2">
                                    <label className="label">
                                        <span className="label-text">
                                            Current Photo
                                        </span>
                                    </label>
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <Button type="submit" text="Update Profile" />
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default UpdateProfile;
