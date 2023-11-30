import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../Components/Loading/Loading";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Label,
    LabelList,
} from "recharts";
import PropTypes from "prop-types";

const AdminHome = () => {
    const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

    const axiosPublic = useAxiosPublic();

    const { data: stats, isPending } = useQuery({
        queryKey: ["stats"],
        queryFn: async () => {
            const res = await axiosPublic.get("/salesstats");
            return res.data.totalSalesByTest;
        },
    });

    if (isPending) return <Loading />;

    let totalSales = 0;
    let totalTests = 0;
    stats.forEach((stat) => {
        totalSales += stat.totalSales / 100;
        totalTests += stat.totalBooked;
    });

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${
            x + width / 2
        },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
            y + height
        } ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return (
            <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
        );
    };

    TriangleBar.propTypes = {
        fill: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
    };
    return (
        <div className="space-y-10">
            <div className="flex justify-center gap-5">
                <div className="stats shadow-xl bg-transparent w-40">
                    <div className="stat">
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-value">$ {totalSales}</div>
                    </div>
                </div>
                <div className="stats shadow-xl bg-transparent w-40">
                    <div className="stat">
                        <div className="stat-title">Total Tests</div>
                        <div className="stat-value">{totalTests}</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-10 items-center">
                <div>
                    <BarChart
                        width={730}
                        height={350}
                        data={stats}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="testTitle">
                            <Label
                                value="Sales per Test"
                                offset={0}
                                position="insideBottom"
                            />
                        </XAxis>
                        <YAxis />
                        <Bar
                            dataKey="totalSales"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: "top" }}
                        >
                            {stats.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % 20]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div>
                    <BarChart
                        width={730}
                        height={350}
                        data={stats}
                        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="testTitle">
                            <Label
                                value="Pages of my website"
                                offset={0}
                                position="insideBottom"
                            />
                        </XAxis>
                        <YAxis
                            label={{
                                value: "pv of page",
                                angle: -90,
                                position: "insideLeft",
                            }}
                        />
                        <Bar dataKey="totalBooked" fill="#8884d8">
                            <LabelList dataKey="testTitle" position="top" />
                        </Bar>
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
