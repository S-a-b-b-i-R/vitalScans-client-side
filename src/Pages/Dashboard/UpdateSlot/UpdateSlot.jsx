import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useTest from "../../../hooks/useTest";
import Button from "../../../Components/Button/Button";
import Loading from "../../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateSlot = () => {
    const { testData, testLoading } = useTest();
    const [testId, setTestId] = useState(null);
    const [testDate, setTestDate] = useState(
        new Date().toISOString().slice(0, 10)
    );
    const [slotNum, setSlotNum] = useState(1);
    const params = useParams();
    const axiosSecure = useAxiosSecure();

    const {
        data: slotData,
        isPending: slotLoading,
        refetch: slotRefetch,
    } = useQuery({
        queryKey: ["slot", params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/slots/${params.id}`);
            return res.data.slot;
        },
    });

    if (testLoading || slotLoading) return <Loading />;

    const handelUpdateSlot = async (e) => {
        e.preventDefault();
        if (!testId && !slotData.testId._id) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a test!",
            });
            return;
        }
        if (!testDate && !slotData.testDate) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a date!",
            });
            return;
        }
        if (!slotNum && !slotData.slotNum) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a slot number!",
            });
            return;
        }
        const data = {
            testId: testId ? testId : slotData.testId._id,
            testDate: testDate ? testDate : slotData.testDate,
            slotNum: slotNum ? slotNum : slotData.slotNum,
        };
        try {
            const res = await axiosSecure.post("/slots", data);
            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Slot updated successfully!",
                });
            }
            slotRefetch();
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
            <SectionTitle heading="Update Slot" />
            <div className="w-2/3 mx-auto">
                <form onSubmit={handelUpdateSlot} className="card-body">
                    <div className="flex gap-2">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Test</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                required
                                defaultValue={
                                    slotData
                                        ? slotData.testId._id
                                        : "Select Test"
                                }
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
                                defaultValue={
                                    slotData
                                        ? new Date(slotData.testDate)
                                              .toISOString()
                                              .slice(0, 10)
                                        : new Date().toISOString().slice(0, 10)
                                }
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
                            defaultValue={slotData ? slotData.slotNum : 1}
                            onChange={(e) => setSlotNum(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <Button type="submit" text="Update Slot" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSlot;
