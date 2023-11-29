import { useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useTest from "../../../hooks/useTest";
import Swal from "sweetalert2";
import Button from "../../../Components/Button/Button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateSlot = () => {
    const { testData, testLoading } = useTest();
    const [testId, setTestId] = useState(null);
    const [testDate, setTestDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [slotNum, setSlotNum] = useState(1);
    const axiosSecure = useAxiosSecure();
    if (testLoading) return <Loading />;
    const handelAddSlot = async (e) => {
        e.preventDefault();
        if (!testId) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a test!",
            });
            return;
        }
        if (!testDate) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a date!",
            });
            return;
        }
        if (!slotNum) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a slot number!",
            });
            return;
        }
        const data = {
            testId,
            testDate,
            slotNum,
        };
        try {
            const res = await axiosSecure.post("/slots", data);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Slot created successfully!",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };
    return (
        <div className="px-40">
            <SectionTitle heading="Create Slot" />
            <div className="w-2/3 mx-auto">
                <form onSubmit={handelAddSlot} className="card-body">
                    <div className="flex gap-2">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Test</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                required
                                defaultValue="Select Test"
                                onChange={(e) => setTestId(e.target.value)}
                            >
                                <option disabled>Select Test</option>
                                {testData.map((test) => (
                                    <option key={test._id} value={test._id}>
                                        {test.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input
                                type="date"
                                defaultValue={new Date()
                                    .toISOString()
                                    .slice(0, 10)}
                                className="input input-bordered"
                                onChange={(e) => setTestDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Total Slots</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered"
                            min={1}
                            step={1}
                            defaultValue={1}
                            onChange={(e) => setSlotNum(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <Button type="submit" text="Create Slot" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSlot;
