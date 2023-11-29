import PropTypes from "prop-types";
const FeaturedTestCard = ({ test }) => {
    return (
        <div className="card bg-base-200 ">
            <div className="card-body">
                <h2 className="card-title">{test.test.title}</h2>
                <p>{test.test.details}</p>
                <p>
                    <span>Prep: </span>
                    {test.test.preparation}
                </p>
            </div>
        </div>
    );
};

FeaturedTestCard.propTypes = {
    test: PropTypes.object,
};

export default FeaturedTestCard;
