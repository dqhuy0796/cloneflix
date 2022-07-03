import PropTypes from "prop-types";
import Button from "../Button";
function MovieBackground({ data }) {
    return (
        <>
            <div className="w-[100%] h-[100%] relative bg-red-400 mx-auto">
                <img
                    src={data.poster_url || data.thumb_url}
                    alt={data.name}
                    className="absolute inset-0 w-[100%] object-cover"
                />
                <div className="info p-[8px] bg-transparent backdrop-blur-xl">
                    <p>{data.name}</p>
                    <Button>play</Button>
                </div>
            </div>
        </>
    );
}

MovieBackground.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MovieBackground;
