import PropTypes from "prop-types";
const SectionTitle = ({ heading, subheading }) => {
    return (
        <div className="space-y-2 mb-4 mt-4">
            {subheading && (
                <p className="text-center text-mainCol text-xl italic">
                    {subheading}
                </p>
            )}
            <div className="divider w-1/3 mx-auto"></div>
            <h3 className="font-bold text-center text-textCol text-3xl">
                {heading}
            </h3>
            <div className="divider w-1/3 mx-auto"></div>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subheading: PropTypes.string,
};

export default SectionTitle;
