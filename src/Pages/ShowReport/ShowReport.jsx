import { useParams } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";
import Container from "../../Components/Container/Container";
import Button from "../../Components/Button/Button";

const ShowReport = () => {
    const params = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: reportData, isPending } = useQuery({
        queryKey: ["report", params.id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/report/${params.id}`);
            return res.data.report;
        },
    });
    if (isPending) return <Loading />;

    return (
        <Container id="GFG">
            <SectionTitle heading="Report" />
            <div
                // ref={targetRef}
                className="w-5/6 mx-auto border border-black px-5 py-20 mb-5 space-y-14"
            >
                <div className="flex justify-between">
                    <div>
                        <img
                            className="h-20"
                            src="https://i.ibb.co/L5Wm6jk/logo.png"
                            alt=""
                        />
                    </div>
                    <div>
                        <p>
                            <span className="font-bold">Patient Name: </span>
                            {reportData.userId.name}
                        </p>
                        <p>
                            <span className="font-bold">Patient Email: </span>
                            {reportData.userId.email}
                        </p>
                        <p>
                            <span className="font-bold">Blood Group: </span>
                            {reportData.userId.bloodGroup}
                        </p>
                    </div>
                    <div>
                        <p>
                            <span className="font-bold">Test Name: </span>
                            {reportData.testId.title}
                        </p>
                        <p>
                            <span className="font-bold">Test Date: </span>
                            {reportData.testDate.slice(0, 10)}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="font-bold mb-2">Findings:</p>
                    <div className="border-2 border-dotted border-black p-3">
                        {reportData.results}
                    </div>
                </div>
                <div>
                    <p className="font-bold mb-2">Advice:</p>
                    <div className="border-2 border-dotted border-black p-3">
                        This is for educational purpose only. If you have any
                        health issues, contact a health professional
                        immediately.
                    </div>
                </div>
            </div>

            <div
                className="flex justify-center print:hidden"
                onClick={() => {
                    //print a specific element that has the id of "printableArea"
                    window.print();
                }}
            >
                <Button text="Print" />
            </div>
        </Container>
    );
};

export default ShowReport;
