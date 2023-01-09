import _ from "lodash";
import { useEffect, useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { connect } from "react-redux";
import { SquareLogo } from "~/components/Icons";
import PreviewInfo from "~/components/partial/PreviewInfo";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import { SMALL_IMAGE_BASE_URL } from "~/constants";
import { addToMyListAction, removeFromMyListAction } from "~/redux/actions/userActions";

function RecommendationItem({ data, myList, addToMyListAction, removeFromMyListAction }) {
    const imagePath = data.backdrop_path || data.poster_path;
    const mediaName = data.title || data.name || data.original_title || data.original_name;
    const [isExistsInMyList, setExistsInMyList] = useState(false);

    useEffect(() => {
        const results = myList.filter((item) => item.id === data.id);
        if (!_.isEmpty(results)) {
            setExistsInMyList(true);
        }
        return () => setExistsInMyList(false);
    }, [data, myList]);

    return (
        <div className="flex flex-col min-w-[240px] w-full h-full rounded overflow-hidden bg-dark-500 group">
            <div className="relative pt-[56.25%] w-full">
                {imagePath ? (
                    <img
                        src={`${SMALL_IMAGE_BASE_URL}${imagePath}`}
                        alt={mediaName}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg text-light-100">No thumbnails</span>
                    </div>
                )}
                <div className="absolute top-2 left-2">
                    <SquareLogo className={"h-full max-h-6 w-auto"} />
                </div>

                <IconOnlyButton
                    border
                    theme={"dark"}
                    to={`/watching/${data.id}`}
                    className="absolute-center opacity-0 group-hover:opacity-100"
                >
                    <IoPlay />
                </IconOnlyButton>

                <div className="absolute left-0 right-0 bottom-0 px-2 translate-y-[1px] bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent">
                    <p title={mediaName} className=" line-clamp-1 text-lg font-bold text-light-900 text-shadow-dark">
                        {mediaName || "Unknown"}
                    </p>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <PreviewInfo data={data} className={"w-1/2"} />
                    {isExistsInMyList ? (
                        <IconOnlyButton theme={"dark"} size={1} border onClick={() => removeFromMyListAction(data)}>
                            <FiCheck />
                        </IconOnlyButton>
                    ) : (
                        <IconOnlyButton theme={"dark"} size={1} border onClick={() => addToMyListAction(data)}>
                            <FiPlus />
                        </IconOnlyButton>
                    )}
                </div>
                {!_.isUndefined(data.overview) && (
                    <p className="line-clamp-5 font-semibold text-light-100 text-sm mb-4">
                        {data.overview || "No overview"}
                    </p>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    myList: state.user.myList,
});

const mapDispatchToProps = (dispatch) => ({
    addToMyListAction: (data) => dispatch(addToMyListAction(data)),
    removeFromMyListAction: (data) => dispatch(removeFromMyListAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationItem);
