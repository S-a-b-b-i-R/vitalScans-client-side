import PropTypes from "prop-types";

const ServiceCard = ({ service }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={service.imageUrl} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{service.category}</h2>
                <p>{service.description}</p>
            </div>
        </div>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.object,
};

export default ServiceCard;
