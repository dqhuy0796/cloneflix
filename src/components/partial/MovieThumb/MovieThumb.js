import PropTypes from "prop-types";
import { useRef } from "react";
import { SquareLogo } from "~/components/Icons";
import { SMALL_IMAGE_BASE_URL } from "~/constants";
//redux
import { connect } from "react-redux";
import { setPreviewModal } from "~/redux/actions/modalActions";

function MovieThumb({ data, setPreviewModal }) {
    const movieRef = useRef(null);

    const handleMouseEnter = () => {
        const rect = movieRef.current.getBoundingClientRect();
        // vị trí của ref so với page = vị trí tương đối của ref với browser cộng với vị trí hiện tại của page trên browser
        const position = {
            top: rect.top + window.pageYOffset,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
        };
        setPreviewModal(position, data);
    };

    return (
        <>
            <div
                ref={movieRef}
                onMouseEnter={handleMouseEnter}
                className="relative w-full pt-[56.25%] rounded-md overflow-hidden bg-dark-900"
            >
                <img
                    src={`${SMALL_IMAGE_BASE_URL}${data.backdrop_path || data.poster_path}`}
                    alt={data.title || data.name || data.original_title || data.original_name}
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
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    //
});

const mapDispatchToProps = (dispatch) => ({
    setPreviewModal: (position, data) => dispatch(setPreviewModal(position, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieThumb);
