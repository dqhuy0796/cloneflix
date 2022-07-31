import PropTypes from "prop-types";
import { memo, useContext, useRef } from "react";
import { SquareLogo } from "~/components/Icons";

import { SMALL_IMAGE_BASE_URL } from "~/constants";
import { useViewport } from "~/hooks";
import { action, PreviewModalContext } from "~/PreviewModalContext";

function MovieThumb({ movie }) {
    const movieRef = useRef(null);
    const [state, dispatch] = useContext(PreviewModalContext);

    const handleMouseEnter = () => {
        const rect = movieRef.current.getBoundingClientRect();
        // vị trí của ref so với page = vị trí tương đối của ref với browser cộng với vị trí hiện tại của page trên browser
        const payload = {
            isShowing: true,
            movie: movie,
            position: {
                top: rect.top + window.pageYOffset,
                bottom: rect.bottom,
                left: rect.left,
                right: rect.right,
            },
        };
        const timeOut = setTimeout(() => {}, 500);
        dispatch(action.setShowPreviewModal(payload));
        console.log(state);
    };

    const isMobile = useViewport().width < 1024;

    return (
        <>
            <div ref={movieRef} onMouseEnter={handleMouseEnter} className="relative w-full pt-[150%] lg:pt-[56.25%] rounded-md overflow-hidden bg-dark-900">
                <img
                    src={`${SMALL_IMAGE_BASE_URL}${isMobile ? movie.poster_path || movie.backdrop_path : movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title || movie.name || movie.original_title || movie.original_name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute top-1.5 left-1.5">
                    <SquareLogo className={"h-full max-h-6 w-auto"} />
                </div>
            </div>
        </>
    );
}

MovieThumb.propTypes = {
    movie: PropTypes.object.isRequired,
};

export default memo(MovieThumb);
