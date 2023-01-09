import _ from "lodash";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
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
import { useNavigate, useParams } from "react-router";
//redux
import { connect } from "react-redux";

function Details({ preload }) {
    const [recommendations, setRecommendations] = useState([]);
    const [season, setSeason] = useState({});
    const [data, setData] = useState({});

    const navigate = useNavigate();
    const { mediaId } = useParams();
    const mediaName = preload.title || preload.name || preload.original_title || preload.original_name;
    const mediaBackdrop = `${LARGE_IMAGE_BASE_URL}${preload.backdrop_path || preload.poster_path}`;

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.title = `${mediaName} - Netflix`;
        const fetchData = async () => {
            if (!_.isEmpty(preload)) {
                const response = preload.first_air_date
                    ? await tvShowService.getTvShowDetails(mediaId)
                    : await movieService.getMovieDetails(mediaId);
                if (!_.isEmpty(response)) {
                    setData(response);
                }
            }
        };
        fetchData();

        return () => {
            document.body.style.overflow = "overlay";
            document.title = "Netflix";
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preload]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!_.isEmpty(preload)) {
                const response = preload.first_air_date
                    ? await tvShowService.getTvShowRecommendations(mediaId)
                    : await movieService.getMovieRecommendations(mediaId);
                if (!_.isEmpty(response)) {
                    setRecommendations(response.results);
                }
            } else {
                setRecommendations({});
            }
        };
        fetchRecommendations();

        const fetchSeason = async (tvShowId, seasonNumber) => {
            const response = await tvShowService.getTvShowSeason(tvShowId, seasonNumber);
            if (!_.isEmpty(response)) {
                setSeason(response);
            }
        };
        if (preload.first_air_date) {
            if (!_.isEmpty(data.seasons)) {
                let lastestSeason = data.seasons[0];
                for (let i = data.seasons.length - 1; i >= 0; i--) {
                    const element = data.seasons[i];
                    if (element.air_date !== null && element.episode_count > 0) {
                        lastestSeason = element;
                        break;
                    }
                }
                fetchSeason(data.id, lastestSeason.season_number);
            } else {
                fetchSeason(mediaId);
            }
        }
    }, [preload, data, mediaId]);

    const handleCloseDetails = () => {
        setRecommendations([]);
        setSeason({});
        navigate(-1);
    };

    return (
        <div className="details-modal-page">
            <div className={"fixed z-[999] inset-0 flex justify-center pt-8 pb-1 bg-dark-900/30 overflow-y-auto"}>
                <div className="w-full h-max max-w-[900px] bg-dark-900 rounded-lg overflow-hidden shadow-sm shadow-dark-100">
                    <div className="relative z-0 w-full pt-[56.25%] rounded-t-lg overflow-hidden">
                        {_.isEmpty(data) ? (
                            <ElementSkeleton type="backdrop" className="bg-dark-900" />
                        ) : (
                            <img
                                src={mediaBackdrop}
                                alt={mediaName}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}

                        <IconOnlyButton theme={"dark"} className="close-btn" onClick={handleCloseDetails}>
                            <IoCloseSharp />
                        </IconOnlyButton>

                        <div className="absolute left-0 right-0 bottom-0 p-10 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent">
                            <p className="line-clamp-2 mb-4 w-1/2 text-4xl font-bold text-white text-shadow-dark">
                                {mediaName}
                            </p>
                            <div className="flex items-center w-full gap-x-1">
                                <HorizontalButton leftIcon={<IoPlay />} type={"light"}>
                                    Play
                                </HorizontalButton>
                                <IconOnlyButton border theme={"dark"}>
                                    <FiPlus />
                                </IconOnlyButton>
                                <IconOnlyButton border theme={"dark"}>
                                    <BiLike />
                                </IconOnlyButton>
                            </div>
                        </div>
                    </div>

                    <ul className="flex flex-col gap-y-10 relative z-[1] list-none p-10">
                        <li>
                            <PreviewInfo data={data} />
                            <div className="flex mt-4 gap-x-6">
                                <div className="w-2/3">
                                    {data.overview && (
                                        <p className={`info-overview`}>{data.overview || "not have overview"}</p>
                                    )}
                                </div>
                                <div className="w-1/3">
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
                                </div>
                            </div>
                        </li>
                        {!_.isEmpty(season) && (
                            <li>
                                <SeasonDetails data={season} />
                            </li>
                        )}
                        {recommendations.length > 0 && (
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
                                <span className="mr-4">About</span>
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
        </div>
    );
}
const mapStateToProps = (state) => ({
    preload: state.modal.details.data,
});

const mapDispatchToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
