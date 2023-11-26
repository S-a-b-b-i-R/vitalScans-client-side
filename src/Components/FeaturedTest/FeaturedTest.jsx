import useTest from "../../hooks/useTest";
import Loading from "../Loading/Loading";
import FeaturedTestCard from "./FeaturedTestCard";

const FeaturedTest = () => {
    const { testData, testLoading } = useTest();
    if (testLoading) return <Loading />;

    return (
        <div className="space-y-6 my-6">
            <h1 className="text-center text-5xl font-bold text-textCol">
                Featured Tests
            </h1>
            <div className="divider w-1/3 mx-auto"></div>
            <div className="grid grid-cols-4 gap-2 mx-5">
                {testData.map((test) => (
                    <FeaturedTestCard key={test._id} test={test} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedTest;
