import PropTypes from "prop-types";
import { memo, useContext, useRef } from "react";

import { SMALL_IMAGE_BASE_URL } from "~/constants";
import { useViewport } from "~/hooks";
import { action, MiniModalContext } from "~/miniModalContext";

function MovieThumb({ movie }) {
    const movieRef = useRef(null);
    const [state, dispatch] = useContext(MiniModalContext);

    const handleMouseEnter = () => {
        const rect = movieRef.current.getBoundingClientRect();
        const payload = {
            isShowing: true,
            movie: movie,
            position: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right },
        };
        dispatch(action.setMiniModal(payload));
    };

    const isMobile = useViewport().width < 1024;

    return (
        <>
            <div
                ref={movieRef}
                onMouseEnter={handleMouseEnter}
                className="relative w-full pt-[150%] lg:pt-[56.25%] rounded-md overflow-hidden bg-dark-900 text-center"
            >
                <img
                    src={`${SMALL_IMAGE_BASE_URL}${isMobile ? movie.poster_path || movie.backdrop_path : movie.backdrop_path || movie.poster_path}`}
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
