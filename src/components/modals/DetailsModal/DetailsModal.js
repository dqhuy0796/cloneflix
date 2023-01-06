import _ from "lodash";
import { useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { IoCloseSharp, IoPlay } from "react-icons/io5";
import PreviewDetails from "~/components/partial/PreviewDetails";
import PreviewInfo from "~/components/partial/PreviewInfo";
import TrailersAndMore from "~/components/partial/TrailersAndMore";
import HorizontalButton from "~/components/shared/buttons/HorizontalButton";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import ElementSkeleton from "~/components/skeleton/ElementSkeleton";
import { LARGE_IMAGE_BASE_URL } from "~/constants";
//redux
import { connect } from "react-redux";
import { hideDetailsModal } from "~/redux/actions/modalActions";

function DetailsModal({ showing, data, hideDetailsModal }) {
    useEffect(() => {
        if (showing) {
            document.body.style.overflow = "hidden";
        }

        return () => (document.body.style.overflow = "overlay");
    }, [showing]);

    const handleCloseModal = () => {
        hideDetailsModal();
    };

    return (
        <div className={showing ? "block" : "hidden"}>
            <div className={"fixed z-[999] inset-0 flex justify-center pt-8 pb-2 bg-dark-900/30 overflow-y-auto"}>
                <div className="w-full h-max max-w-[900px] bg-dark-900 rounded-lg overflow-hidden shadow-sm shadow-dark-100">
                    <div className="modal-header relative z-0 w-full pt-[56.25%] rounded-t-lg overflow-hidden">
                        {_.isEmpty(data) ? (
                            <ElementSkeleton type="backdrop" className="bg-dark-900" />
                        ) : (
                            <img
                                src={`${LARGE_IMAGE_BASE_URL}${data.backdrop_path || data.poster_path}`}
                                alt={data.title || data.name || data.original_title || data.original_name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}

                        <IconOnlyButton border color={"dark"} className="close-btn" onClick={handleCloseModal}>
                            <IoCloseSharp />
                        </IconOnlyButton>

                        <div className="modal-action">
                            <HorizontalButton leftIcon={<IoPlay />} type={"light"}>
                                Play
                            </HorizontalButton>
                            <IconOnlyButton border color={"dark"}>
                                <FiPlus />
                            </IconOnlyButton>
                            <IconOnlyButton border color={"dark"}>
                                <BiLike />
                            </IconOnlyButton>
                        </div>
                    </div>

                    <ul className="flex flex-col gap-y-4 relative z-[1] list-none p-10">
                        <li>
                            <PreviewInfo data={data} />
                        </li>
                        <li className="flex gap-x-6">
                            <div className="w-2/3">
                                {data.overview && <p className={`info-overview`}>{data.overview}</p>}
                            </div>
                            <div className="w-1/3">
                                <PreviewDetails data={data} />
                            </div>
                        </li>
                        {data.videos && (
                            <li>
                                <TrailersAndMore data={data.videos.results} />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    showing: state.modal.details.showing,
    data: state.modal.details.data,
});

const mapDispatchToProps = (dispatch) => ({
    hideDetailsModal: () => dispatch(hideDetailsModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal);
