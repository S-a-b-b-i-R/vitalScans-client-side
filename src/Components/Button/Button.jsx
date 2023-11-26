import PropTypes from "prop-types";

const Button = ({ text }) => {
    return (
        <button className="btn bg-mainCol hover:bg-mainCol font-bold text-textCol">
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Button;
