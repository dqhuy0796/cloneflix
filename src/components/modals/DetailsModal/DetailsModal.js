import _ from "lodash";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FiCheck, FiPlus } from "react-icons/fi";
import { IoCloseSharp, IoPlay } from "react-icons/io5";
import ContentList from "~/components/partial/ContentList";
import PreviewInfo from "~/components/partial/PreviewInfo";
import Recommendations from "~/components/partial/Recommendations/Recommendations";
import SeasonDetails from "~/components/partial/SeasonDetails/SeasonDetails";
import TrailersAndMore from "~/components/partial/TrailersAndMore";
import HorizontalButton from "~/components/shared/buttons/HorizontalButton";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import ElementSkeleton from "~/components/skeleton/ElementSkeleton";
import { LARGE_IMAGE_BASE_URL } from "~/constants";
import { tvShowService, movieService } from "~/services";
//redux
import { connect } from "react-redux";
import { hideDetailsModal } from "~/redux/actions/modalActions";
import { addToMyListAction, removeFromMyListAction } from "~/redux/actions/userActions";

function DetailsModal({
    detailsShowing,
    preload,
    hideDetailsModal,
    myList,
    addToMyListAction,
    removeFromMyListAction,
}) {
    const mediaName = preload.title || preload.name || preload.original_title || preload.original_name;
    const [recommendations, setRecommendations] = useState([]);
    const [season, setSeason] = useState({});
    const [data, setData] = useState({});
    const [isExistsInMyList, setExistsInMyList] = useState(false);
    const historyDocumentTitle = document.title;

    useEffect(() => {
        const fetchData = async () => {
            if (!_.isEmpty(preload)) {
                const response = preload.first_air_date
                    ? await tvShowService.getTvShowDetails(preload.id)
                    : await movieService.getMovieDetails(preload.id);
                if (!_.isEmpty(response)) {
                    setData(response);
                }
            }
        };
        const fetchRecommendations = async () => {
            const response = preload.first_air_date
                ? await tvShowService.getTvShowRecommendations(preload.id)
                : await movieService.getMovieRecommendations(preload.id);
            if (!_.isEmpty(response)) {
                setRecommendations(response.results);
            }
        };

        const fetchSeason = async (tvShowId, seasonNumber) => {
            const response = await tvShowService.getTvShowSeason(tvShowId, seasonNumber);
            if (!_.isEmpty(response)) {
                setSeason(response);
            }
        };
        if (detailsShowing) {
            document.body.style.overflow = "hidden";
            document.title = `${mediaName} - Netflix`;
            fetchData();
            fetchRecommendations();
            if (preload.first_air_date) {
                fetchSeason(preload.id);
            }
        }
        return () => {
            document.body.style.overflow = "overlay";
            document.title = historyDocumentTitle;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailsShowing]);

    // const getLastestAvailable = () => {
    //     if (data.first_air_date && !_.isEmpty(data.seasons)) {
    //         let lastestSeason = data.seasons[0];
    //         for (let i = data.seasons.length - 1; i >= 0; i--) {
    //             const element = data.seasons[i];
    //             if (element.air_date !== null && element.episode_count > 0) {
    //                 lastestSeason = element;
    //                 break;
    //             }
    //         }
    //         fetchSeason(data.id, lastestSeason.season_number);
    //     } else {
    //         setSeason({});
    //     }
    // }

    useEffect(() => {
        const results = myList.filter((item) => item.id === preload.id);
        if (!_.isEmpty(results)) {
            setExistsInMyList(true);
        }

        return () => setExistsInMyList(false);
    }, [preload, myList]);

    const handleCloseModal = () => {
        hideDetailsModal();
        setData({});
        setSeason({});
        setRecommendations([]);
    };

    return (
        <span className="hi-i-m-modal">
            <div className={"fixed z-[999] inset-0 flex justify-center pt-8 pb-1 bg-dark-900/30 overflow-y-auto"}>
                <div className="w-full h-max max-w-[900px] bg-dark-900 rounded-lg overflow-hidden shadow-sm shadow-dark-100">
                    <div className="relative z-0 w-full pt-[56.25%] rounded-t-lg overflow-hidden">
                        {!_.isEmpty(preload) ? (
                            <img
                                src={`${LARGE_IMAGE_BASE_URL}${preload.backdrop_path || preload.poster_path}`}
                                alt={mediaName}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <ElementSkeleton type="backdrop" className="bg-dark-900" />
                        )}

                        <IconOnlyButton theme={"dark"} className="close-btn" onClick={handleCloseModal}>
                            <IoCloseSharp />
                        </IconOnlyButton>

                        <div className="absolute left-0 right-0 bottom-0 p-10 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent">
                            <p className="line-clamp-2 mb-4 w-1/2 text-4xl font-bold text-white text-shadow-dark">
                                {mediaName}
                            </p>
                            <div className="flex items-center w-full gap-x-1">
                                <HorizontalButton leftIcon={<IoPlay />} theme={"light"} to={`/watching/${preload.id}`}>
                                    Play
                                </HorizontalButton>
                                {isExistsInMyList ? (
                                    <IconOnlyButton
                                        theme={"dark"}
                                        size={2}
                                        border
                                        onClick={() => removeFromMyListAction(preload)}
                                    >
                                        <FiCheck />
                                    </IconOnlyButton>
                                ) : (
                                    <IconOnlyButton
                                        theme={"dark"}
                                        size={2}
                                        border
                                        onClick={() => addToMyListAction(preload)}
                                    >
                                        <FiPlus />
                                    </IconOnlyButton>
                                )}
                                <IconOnlyButton border theme={"dark"}>
                                    <BiLike />
                                </IconOnlyButton>
                            </div>
                        </div>
                    </div>

                    <ul className="flex flex-col gap-y-10 relative z-[1] list-none p-10">
                        <li>
                            {!_.isEmpty(data) && <PreviewInfo data={data} />}
                            <div className="flex mt-4 gap-x-6">
                                <div className="w-2/3">
                                    {preload.overview && (
                                        <p className={"text-justify font-medium text-light-500 mb-5"}>
                                            {preload.overview || "No overview"}
                                        </p>
                                    )}
                                </div>
                                <div className="w-1/3">
                                    {data.created_by && data.created_by.length > 0 && (
                                        <ContentList title={"Created by"} data={data.created_by} />
                                    )}
                                    {data.production_companies && (
                                        <ContentList title={"Producted by"} data={data.production_companies} />
                                    )}
                                    {data.production_countries && (
                                        <ContentList title={"Countries"} data={data.production_countries} />
                                    )}
                                    {data.genres && data.genres.length > 0 && (
                                        <ContentList title={"Genres"} data={data.genres} />
                                    )}
                                </div>
                            </div>
                        </li>
                        {!_.isEmpty(season) && (
                            <li>
                                <SeasonDetails data={season} />
                            </li>
                        )}
                        {!_.isEmpty(recommendations) && (
                            <li>
                                <Recommendations data={recommendations} />
                            </li>
                        )}
                        {data.videos && (
                            <li>
                                <TrailersAndMore data={data.videos.results} />
                            </li>
                        )}
                        <li>
                            <h3 className="mb-4 text-2xl font-medium text-light-900">
                                <span className="mr-4 text-light-100">About</span>
                                <strong>{data.name || data.original_title || data.original_name}</strong>
                            </h3>
                            {data.created_by && data.created_by && (
                                <ContentList title={"Created by"} data={data.created_by} max={5} />
                            )}
                            {data.production_companies && (
                                <ContentList title={"Producted by"} data={data.production_companies} max={5} />
                            )}
                            {data.production_countries && (
                                <ContentList title={"Countries"} data={data.production_countries} max={5} />
                            )}
                            {data.genres && data.genres.length > 0 && (
                                <ContentList title={"Genres"} data={data.genres} max={5} />
                            )}
                            <div>
                                <span className="text-[13px] font-normal text-light-100 mr-1">Maturity rating:</span>
                                <span className="px-1 py-0.5 mx-2 text-xs text-light-500 border border-solid border-light-100">
                                    {data.adult ? "18+" : "13+"}
                                </span>
                                <span className="content-item">
                                    {`Recommended for ages ${data.adult ? "18+" : "13+"} and up`}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </span>
    );
}
const mapStateToProps = (state) => ({
    detailsShowing: state.modal.detailsShowing,
    preload: state.modal.data,
    myList: state.user.myList,
});

const mapDispatchToProps = (dispatch) => ({
    hideDetailsModal: () => dispatch(hideDetailsModal()),
    addToMyListAction: (data) => dispatch(addToMyListAction(data)),
    removeFromMyListAction: (data) => dispatch(removeFromMyListAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsModal);
