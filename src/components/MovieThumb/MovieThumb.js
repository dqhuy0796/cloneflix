import PropTypes from "prop-types";
import Button from "../Button";
function MovieThumb({ data }) {
    return (
        <>
            <div className="w-[100%] h-[100%] relative bg-red-400 mx-auto">
                <img
                    src={data.thumb_url}
                    alt={data.name}
                    className="absolute inset-0 w-[100%] h-[100%] object-cover"
                />
            </div>
        </>
    );
}

MovieThumb.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MovieThumb;
