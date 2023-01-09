import _ from "lodash";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { FiCheck, FiPlus } from "react-icons/fi";
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
import { addToMyListAction, removeFromMyListAction } from "~/redux/actions/userActions";

function PreviewModal({
    position,
    data,
    hidePreviewModal,
    showDetailsModal,
    myList,
    addToMyListAction,
    removeFromMyListAction,
}) {
    const mediaTitle = data.title || data.name || data.original_title || data.original_name;
    const mediaBackdrop = data.backdrop_path || data.poster_path;
    const [modalStyle, setModalStyle] = useState({});
    const [isExistsInMyList, setExistsInMyList] = useState(false);
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

    const handleAddToMyList = () => {
        addToMyListAction(data);
    };

    const handleRemoveFromMyList = () => {
        removeFromMyListAction(data);
    };

    useEffect(() => {
        const results = myList.filter((item) => item.id === data.id);
        if (!_.isEmpty(results)) {
            setExistsInMyList(true);
        }

        return () => setExistsInMyList(false);
    }, [data, myList]);

    const handleToggleReaction = () => {};

    return (
        <div style={modalStyle} onMouseLeave={handleMouseLeave} className="absolute z-40 block">
            <div className="w-full h-full bg-dark-900 rounded-lg overflow-hidden shadow-sm shadow-dark-100 animation-modal-fade-in">
                <div className="relative w-full pt-[56.25%] overflow-hidden">
                    {!_.isEmpty(mediaBackdrop) ? (
                        <img
                            src={`${SMALL_IMAGE_BASE_URL}${mediaBackdrop}`}
                            alt={mediaTitle}
                            className="absolute inset-0 w-full h-full object-cover bg-dark-900"
                        />
                    ) : (
                        <ElementSkeleton type="backdrop" className="bg-dark-900" />
                    )}
                    <div className="absolute top-2 left-2">
                        <SquareLogo className={"h-full max-h-9 w-auto"} />
                    </div>
                </div>

                <ul className="relative list-none p-4">
                    <li className="absolute left-0 right-0 bottom-full px-4 pt-10 translate-y-[1px] bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent">
                        <p
                            title={mediaTitle}
                            className="line-clamp-1 text-xl font-bold text-light-900 text-shadow-dark"
                        >
                            {mediaTitle}
                        </p>
                    </li>
                    <li className="flex justify-between w-full">
                        <div className="flex gap-x-1">
                            <IconOnlyButton theme={"light"} size={1} to={`/watching/${data.id}`}>
                                <IoPlaySharp className="relative left-0.5" />
                            </IconOnlyButton>

                            {isExistsInMyList ? (
                                <IconOnlyButton theme={"dark"} size={1} border onClick={handleRemoveFromMyList}>
                                    <FiCheck />
                                </IconOnlyButton>
                            ) : (
                                <IconOnlyButton theme={"dark"} size={1} border onClick={handleAddToMyList}>
                                    <FiPlus />
                                </IconOnlyButton>
                            )}

                            <IconOnlyButton theme={"dark"} size={1} border onClick={handleToggleReaction}>
                                <BiLike />
                            </IconOnlyButton>
                        </div>
                        <IconOnlyButton theme={"dark"} size={1} border onClick={() => showDetailsModal()}>
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
    position: state.modal.previewPosition,
    data: state.modal.data,
    myList: state.user.myList,
});

const mapDispatchToProps = (dispatch) => ({
    hidePreviewModal: () => dispatch(hidePreviewModal()),
    showDetailsModal: () => dispatch(showDetailsModal()),
    addToMyListAction: (data) => dispatch(addToMyListAction(data)),
    removeFromMyListAction: (data) => dispatch(removeFromMyListAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewModal);
