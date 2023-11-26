import PropTypes from "prop-types";
const FeaturedTestCard = ({ test }) => {
    return (
        <div className="card bg-base-200 ">
            <div className="card-body">
                <h2 className="card-title">{test.title}</h2>
                <p>{test.details}</p>
                <p>
                    <span>Prep: </span>
                    {test.preparation}
                </p>
            </div>
        </div>
    );
};

FeaturedTestCard.propTypes = {
    test: PropTypes.object,
};

export default FeaturedTestCard;
