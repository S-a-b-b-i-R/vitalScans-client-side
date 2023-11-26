import Marquee from "react-fast-marquee";
import Container from "../Container/Container";
import Button from "../Button/Button";

const Banner = () => {
    return (
        <div>
            <Container>
                <div className="bg-base-100 flex justify-between items-center text-textCol">
                    <div className="w-1/2 text-left">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">
                                Hello there 👋, Welcome to your dashboard
                            </h1>
                            <p className="mb-5">
                                Everything you need to get started
                            </p>
                            <h2 className="mb-5">
                                Use Coupon{" "}
                                <span className="bg-mainCol p-2 rounded-md font-bold">
                                    WELCOME
                                </span>{" "}
                                to get{" "}
                                <span className="text-lg font-bold">50%</span>{" "}
                                off
                            </h2>
                            <Marquee className="mb-5">
                                <p className="mx-2">
                                    Your Health Matters! Comprehensive
                                    Diagnostics at Your Service.
                                </p>
                                <p className="mx-2">
                                    Precision Testing for Peace of Mind - Visit
                                    Our Diagnostic Center Today.
                                </p>
                                <p className="mx-2">
                                    Swift and Accurate Results: Trust{" "}
                                    <strong>vitalScans</strong>.
                                </p>
                                <p className="mx-2">
                                    Empowering Health through Advanced
                                    Diagnostics - Your Wellness, Our Priority.
                                </p>
                                <p className="mx-2">
                                    Innovative Diagnostics, Caring for You Every
                                    Step of the Way.
                                </p>
                                <p className="mx-2">
                                    Ensuring Your Well-Being:{" "}
                                    <em>vitalScans</em> Diagnostics.
                                </p>
                                <p className="mx-2">
                                    State-of-the-Art Testing Facilities for a
                                    Healthier Tomorrow.
                                </p>
                                <p className="mx-2">
                                    Your Health Journey Begins Here - Welcome to{" "}
                                    <strong>vitalScans</strong>.
                                </p>
                                <p className="mx-2">
                                    Leading the Way in Diagnostics: Choose
                                    Excellence, Choose Us!
                                </p>
                                <p className="mx-2">
                                    Precision Diagnostics for a Healthier You -
                                    Walk-Ins Welcome!
                                </p>
                            </Marquee>
                            <Button text="All Tests" />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <img
                            className="w-full object-cover"
                            src="https://i.ibb.co/pbkD45Z/banner-3.png"
                            alt=""
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;
