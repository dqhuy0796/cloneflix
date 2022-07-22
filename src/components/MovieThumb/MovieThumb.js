import PropTypes from "prop-types";
import { memo, useEffect, useRef } from "react";

import { SMALL_IMAGE_BASE_URL } from "~/constants";
import { action, useMiniModalContext } from "~/miniModalContext";

function MovieThumb({ movie }) {
    const movieRef = useRef(null);

    const [state, dispatch] = useMiniModalContext();

    const handleMouseEnter = () => {
        const rect = movieRef.current.getBoundingClientRect();
        const payload = {
            showModal: true,
            movieData: movie,
            positionX: rect.x,
            positionY: rect.y,
        };
        dispatch(action.setShowMiniModal(payload));
        console.log(state);
    };

    return (
        <>
            <div
                ref={movieRef}
                onClick={handleMouseEnter}
                // onMouseEnter={handleMouseEnter}
                className="relative w-full pt-[150%] lg:pt-[56.25%] rounded-md overflow-hidden"
            >
                <img
                    src={`${SMALL_IMAGE_BASE_URL}${movie.poster_path || movie.backdrop_path}`}
                    alt={movie.title || movie.name || movie.original_title || movie.original_name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <img
                    src={`${SMALL_IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title || movie.name || movie.original_title || movie.original_name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
            </div>
        </>
    );
}

MovieThumb.propTypes = {
    movie: PropTypes.object.isRequired,
};

export default memo(MovieThumb);
