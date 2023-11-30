import { Helmet } from "react-helmet-async";
import Container from "../../Components/Container/Container";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Career = () => {
    return (
        <div>
            <Helmet>
                <title>vitalScans | Career</title>
            </Helmet>
            <Container>
                <SectionTitle heading="Career Opportunities" />
                <div className="space-y-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-lg">
                            Welcome to{" "}
                            <span className="text-mainCol font-bold">
                                vitalScans
                            </span>
                            , where we believe in fostering a collaborative and
                            dynamic work environment. Our commitment to
                            excellence in healthcare is reflected in the passion
                            and dedication of our team. Join us in our mission
                            to provide top-notch diagnostic services and
                            contribute to the well-being of our community.
                        </p>
                    </div>
                    <div className="divider text-xl font-bold text-textCol">
                        Why Choose Us
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="card glass">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Cutting-Edge Technology
                                </h2>
                                <p>
                                    At{" "}
                                    <span className="text-mainCol font-bold">
                                        vitalScans
                                    </span>
                                    , we invest in the latest technology to
                                    ensure accurate and efficient diagnostic
                                    services. Join us to work with
                                    state-of-the-art equipment and stay at the
                                    forefront of medical advancements.
                                </p>
                                <div className="card-actions justify-end"></div>
                            </div>
                        </div>
                        <div className="card glass">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Collaborative Team
                                </h2>
                                <p>
                                    Our team is our strength. We promote a
                                    culture of collaboration, respect, and
                                    continuous learning. By joining us, you
                                    become a part of a community that values
                                    your contributions and supports your
                                    professional growth.
                                </p>
                                <div className="card-actions justify-end"></div>
                            </div>
                        </div>
                        <div className="card glass">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Commitment to Quality
                                </h2>
                                <p>
                                    Quality is at the heart of everything we do.
                                    As a member of our team, you will play a
                                    crucial role in maintaining the highest
                                    standards of diagnostic accuracy and patient
                                    care.
                                </p>
                                <div className="card-actions justify-end"></div>
                            </div>
                        </div>
                    </div>
                    <div className="divider text-xl font-bold text-textCol">
                        Current Open Positions
                    </div>
                    <div>
                        <p className="text-center text-lg">
                            Explore the exciting career opportunities currently
                            available at{" "}
                            <span className="text-mainCol font-bold">
                                vitalScans
                            </span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="card glass">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Diagnostic Technologist
                                </h2>
                                <p>
                                    Join our team of skilled diagnostic
                                    technologists to perform and interpret
                                    various diagnostic tests.
                                </p>
                                <div className="card-actions justify-end"></div>
                            </div>
                        </div>
                        <div className="card glass">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Administrative Assistant
                                </h2>
                                <p>
                                    Contribute to the smooth operation of our
                                    diagnostic center by providing
                                    administrative support and ensuring a
                                    positive experience for our patients.
                                </p>
                                <div className="card-actions justify-end"></div>
                            </div>
                        </div>
                        <div className="card glass">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Medical Billing Specialist
                                </h2>
                                <p>
                                    Join our finance team to handle the billing
                                    and reimbursement processes efficiently.
                                </p>
                                <div className="card-actions justify-end"></div>
                            </div>
                        </div>
                    </div>
                    <div className="divider text-xl font-bold text-textCol">
                        How to Apply
                    </div>
                    <div>
                        <p className="text-center text-lg">
                            To apply for a position at{" "}
                            <span className="text-mainCol font-bold">
                                vitalScans
                            </span>{" "}
                            , please send your resume and a cover letter
                            detailing your experience and interest in the
                            position to{" "}
                            <a
                                className="text-mainCol font-bold"
                                href="mailto:jobs@vitalscans.com"
                            >
                                jobs@vitalscans.com
                            </a>
                            . Be sure to include the position title in the
                            subject line.
                        </p>
                    </div>
                    <div className="divider text-xl font-bold text-textCol">
                        Employee Testimonials
                    </div>
                    <div>
                        <p className="text-center text-lg">
                            Curious about what it&apos;s like to work at{" "}
                            <span className="text-mainCol font-bold">
                                vitalScans
                            </span>
                            ? Hear directly from our team members
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="card glass">
                            <div className="card-body">
                                <div className="flex gap-2">
                                    <div className="avatar">
                                        <div className="w-14 rounded-full">
                                            <img src="https://i.ibb.co/zVk8w8x/member1.png" />
                                        </div>
                                    </div>
                                    <h2 className="card-title">
                                        John Doe, Diagnostic Technologist
                                    </h2>
                                </div>
                                <p>
                                    &quot;I&apos;ve been a part of{" "}
                                    <span className="text-mainCol font-bold">
                                        vitalScans
                                    </span>{" "}
                                    for three years, and it&apos;s been an
                                    incredible journey. The support from
                                    colleagues and the focus on professional
                                    development make it an excellent place to
                                    grow in my career.&quot;
                                </p>
                                <div className="card-actions justify-end"></div>
                            </div>
                        </div>
                        <div className="card glass">
                            <div className="card-body">
                                <div className="flex gap-2">
                                    <div className="avatar">
                                        <div className="w-14 rounded-full">
                                            <img src="https://i.ibb.co/N3MjPcV/member2.png" />
                                        </div>
                                    </div>
                                    <h2 className="card-title">
                                        Jennifer Jane, Administrative Assistant
                                    </h2>
                                </div>
                                <p>
                                    &quot;The positive work environment at{" "}
                                    <span className="text-mainCol font-bold">
                                        vitalScans
                                    </span>{" "}
                                    is something I truly value. The emphasis on
                                    teamwork and a shared commitment to
                                    excellence make it a great place to work
                                    every day.&quot;
                                </p>
                                <div className="card-actions justify-end"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Career;
