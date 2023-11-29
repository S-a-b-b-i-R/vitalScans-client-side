import { Helmet } from "react-helmet-async";
import Container from "../../Components/Container/Container";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AboutUs = () => {
    return (
        <Container>
            <Helmet>
                <title>vitalScans | About Us</title>
            </Helmet>
            <SectionTitle heading="About Us" />
            <div className="flex flex-col lg:flex-row gap-2 items-center">
                <div className="w-full lg:w-1/2 space-y-4">
                    <p>
                        <span className="text-mainCol font-bold text-xl">
                            vitalScans
                        </span>
                        , is a sister concern of{" "}
                        <span className="text-mainCol font-bold text-xl">
                            vitalPharma
                        </span>
                        , one of the largest pharmaceutical companies in the
                        country which is famous for its consistent quality,
                        conformance with international standards, and ethical
                        practices throughout all its processes.
                    </p>
                    <div className="divider"></div>
                    <p>
                        <span className="text-mainCol font-bold text-xl">
                            vitalScans
                        </span>
                        , started its journey in 2019 in Shyamoly, Dhaka, with
                        the vision of taking diagnostic services to a new height
                        by providing the most accurate and reliable test results
                        to all its customers and caring for the patients at the
                        top of its values.
                    </p>
                    <div className="divider"></div>
                    <p>
                        <span className="text-mainCol font-bold text-xl">
                            vitalScans
                        </span>{" "}
                        provides best-in-class diagnostic services covering all
                        sorts of pathological tests including most rare
                        parameters. It has also the world&apos;s latest 3.0T (3
                        Tesla) MRI and 128-Slice CT Scan machines. For other
                        imaging, HDCL has 1000mA fully digital X-ray, OPG,
                        Cephalogram, 4D Ultrasound, Colour Doppler Echo,
                        Musculoskeletal Ultrasound, 12-Channel ECG, ETT,
                        Spirometry, Uroflowmetry, etc. Also, the center has its
                        own Molecular lab equipped with fully automated DNA
                        extraction machines and negative pressure-controlled
                        zones.
                    </p>
                    <div className="divider"></div>
                    <p>
                        <span className="text-mainCol font-bold text-xl">
                            vitalScans
                        </span>{" "}
                        offers various &quot;Executive Health Check-up
                        Packages&quot; suitable to your age and physical
                        conditions. To support its customer further, HDCL offers
                        Home Sample Collection and Report Delivery as well
                        within Dhaka city. Above all, HDCL has a dedicated team
                        of Customer Care Officers to ensure one-2-one support
                        during the entire time of your staying with us.
                    </p>
                </div>
                <div className="w-full lg:w-1/2">
                    <img
                        src="https://i.ibb.co/JvZLG2N/4955644-removebg-preview.png"
                        alt=""
                    />
                </div>
            </div>
        </Container>
    );
};

export default AboutUs;
