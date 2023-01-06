import _ from "lodash";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoPlaySharp } from "react-icons/io5";
import { SquareLogo } from "~/components/Icons";
import GenreList from "~/components/partial/GenreList";
import PreviewInfo from "~/components/partial/PreviewInfo";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import ElementSkeleton from "~/components/skeleton/ElementSkeleton";
import { SMALL_IMAGE_BASE_URL } from "~/constants";
// redux
import { connect } from "react-redux";
import { hidePreviewModal, showDetailsModal } from "~/redux/actions/modalActions";

function PreviewModal({ showing, position, data, hidePreviewModal, showDetailsModal }) {
    const [modalStyle, setModalStyle] = useState(null);
    const caculatePosition = (position) => {
        const modalWidth = (position.right - position.left) * 1.5;
        if (position.left < 100) {
            setModalStyle({
                width: `${modalWidth}px`,
                top: `${position.top}px`,
                left: "60px",
                transformOrigin: "left",
                transform: "translateY(-25%)",
            });
        } else if (window.innerWidth - position.right < 100) {
            setModalStyle({
                width: `${modalWidth}px`,
                top: `${position.top}px`,
                right: "60px",
                transformOrigin: "right",
                transform: "translateY(-25%)",
            });
        } else {
            const pos = (position.left + position.right - modalWidth) / 2;
            setModalStyle({
                width: `${modalWidth}px`,
                top: `${position.top}px`,
                left: `${pos}px`,
                transformOrigin: "center",
                transform: "translateY(-25%)",
            });
        }
    };
    useEffect(() => {
        caculatePosition(position);
    }, [position]);

    const handleMouseLeave = () => {
        hidePreviewModal();
    };

    const handleAddToMyList = () => {};

    const handleToggleReaction = () => {};

    const handleFullsizeModal = () => {
        hidePreviewModal();
        showDetailsModal();
    };

    return (
        <div
            style={modalStyle}
            onMouseLeave={handleMouseLeave}
            className={`absolute z-40 ${showing ? "block" : "hidden"}`}
        >
            <div className="w-full h-full bg-dark-900 rounded-lg overflow-hidden shadow-sm shadow-dark-100 animation-modal-fade-in ">
                <div className="relative w-full pt-[56.25%] overflow-hidden">
                    {_.isEmpty(data) ? (
                        <ElementSkeleton type="backdrop" className="bg-dark-900" />
                    ) : (
                        <img
                            src={`${SMALL_IMAGE_BASE_URL}${data.backdrop_path || data.poster_path}`}
                            alt={data.title || data.name || data.original_title || data.original_name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute top-2 left-2">
                        <SquareLogo className={"h-full max-h-9 w-auto"} />
                    </div>
                </div>

                <ul className="relative list-none p-4">
                    <li className="absolute left-0 right-0 bottom-full px-4 pt-10 translate-y-[1px] bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent">
                        <p
                            title={data.title || data.name || data.original_title || data.original_name}
                            className=" line-clamp-1 text-xl font-bold text-light-900 text-shadow-dark"
                        >
                            {data.title || data.name || data.original_title || data.original_name}
                        </p>
                    </li>
                    <li className="flex justify-between w-full">
                        <div className="flex gap-x-1">
                            <IconOnlyButton color={"light"} size={1} border>
                                <IoPlaySharp className="relative left-0.5" />
                            </IconOnlyButton>
                            <IconOnlyButton color={"dark"} size={1} border onClick={handleAddToMyList}>
                                <FiPlus />
                            </IconOnlyButton>
                            <IconOnlyButton color={"dark"} size={1} border onClick={handleToggleReaction}>
                                <BiLike />
                            </IconOnlyButton>
                        </div>
                        <IconOnlyButton color={"dark"} size={1} border onClick={handleFullsizeModal}>
                            <BsChevronDown className="relative top-0.5" />
                        </IconOnlyButton>
                    </li>
                    <li className="mt-4 mb-2">
                        <PreviewInfo data={data} />
                    </li>
                    <li>
                        <GenreList ids={data.genre_ids} max={3} />
                    </li>
                </ul>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    showing: state.modal.preview.showing,
    position: state.modal.preview.position,
    data: state.modal.preview.data,
});

const mapDispatchToProps = (dispatch) => ({
    hidePreviewModal: () => dispatch(hidePreviewModal()),
    showDetailsModal: () => dispatch(showDetailsModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewModal);
