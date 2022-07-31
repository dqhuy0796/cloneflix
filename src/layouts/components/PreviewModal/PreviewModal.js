import { memo, useContext, useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoCloseSharp, IoPlay, IoPlaySharp } from "react-icons/io5";
import { VscMute, VscUnmute } from "react-icons/vsc";

import { LARGE_IMAGE_BASE_URL, SMALL_IMAGE_BASE_URL, YOUTUBE_BASE_URL } from "~/constants";
import { action, PreviewModalContext } from "~/PreviewModalContext";
import Button from "~/components/shared/Button";
import RoundIconButton from "~/components/shared/RoundIconButton";
import AutoPlayer from "~/components/shared/AutoPlayer";
import EpisodeItem from "~/components/shared/EpisodeItem";
import * as service from "~/services";

function PreviewModal() {
    const [state, dispatch] = useContext(PreviewModalContext);

    const [modalMovie, setModalMovie] = useState(null);
    const [modalStyle, setModalStyle] = useState(null);
    const [isModalFullsize, setModalFullsize] = useState(false);
    const [trailer, setTrailer] = useState({
        data: null,
        isPlaying: true,
    });
    const [season, setSeason] = useState(null);

    const handlePlayerReady = () => {
        setTrailer((prevState) => ({
            ...prevState,
            isPlaying: true,
        }));
    };
    const handlePlayerError = () => {
        setTrailer((prevState) => ({
            ...prevState,
            isPlaying: false,
        }));
    };
    const handlePlayerPlay = () => {};
    const handlePlayerEnded = () => {
        setTrailer((prevState) => ({
            ...prevState,
            isPlaying: false,
        }));
    };

    const [player, setPlayer] = useState({
        url: null,
        muted: true,
        playing: true,
        onReady: handlePlayerReady,
        onError: handlePlayerError,
        onPlay: handlePlayerPlay,
        onEnded: handlePlayerEnded,
    });

    const handleToggleMute = () => {
        setPlayer((prevState) => ({
            ...prevState,
            muted: !prevState.muted,
        }));
    };

    const getTrailer = (videos) => {
        /**
         * get all items have type are "trailer" and "teaser"
         * get all items have name are "official trailer" and "official teaser"
         * if have official trailer or teaser let's return it
         * else return 1 of items have type are "trailer" and "teaser"
         */
        const checkKey = (type) => {
            const keywords = ["trailer", "teaser"];
            return keywords.some((key) => type.toLowerCase().includes(key));
        };
        const filterByType = videos.filter((item) => checkKey(item.type));
        const filterByName = filterByType.filter((item) => item.name.toLowerCase().includes("official"));
        if (filterByName.length > 0) {
            return filterByName[0];
        }
        return filterByType[0];
    };

    useEffect(() => {
        const caculatePosition = (position) => {
            if (!state.isFullsize) {
                const modalWidth = ((position.right - position.left) * 4) / 3;
                if (position.left < 100) {
                    setModalStyle({
                        width: `${modalWidth}px`,
                        top: `${position.top}px`,
                        left: "60px",
                        transformOrigin: "left",
                        transform: "translateY(-25%)",
                        animation: "ModalFadeIn ease-in-out 0.3s",
                    });
                } else if (window.innerWidth - position.right < 100) {
                    setModalStyle({
                        width: `${modalWidth}px`,
                        top: `${position.top}px`,
                        right: "60px",
                        transformOrigin: "right",
                        transform: "translateY(-25%)",
                        animation: "ModalFadeIn ease-in-out 0.3s",
                    });
                } else {
                    const pos = (position.left + position.right - modalWidth) / 2;
                    setModalStyle({
                        width: `${modalWidth}px`,
                        top: `${position.top}px`,
                        left: `${pos}px`,
                        transformOrigin: "center",
                        transform: "translateY(-25%)",
                        animation: "ModalFadeIn ease-in-out 0.3s",
                    });
                }
            } else {
                setModalStyle({
                    inset: "0",
                    width: "100%",
                    transformOrigin: "center",
                    animation: "FadeIn ease-in-out 0.3s",
                });
            }
        };
        const getMovieData = async () => {
            const res = !!state.movie?.first_air_date ? await service.fetchTvShow(state.movie?.id) : await service.fetchMovie(state.movie?.id);
            setModalMovie(res);
            // check exist trailer/teaser
            if (!!res.videos.results && !!getTrailer(res.videos.results)) {
                const trailerResult = getTrailer(res.videos.results);
                setTrailer((prevState) => ({
                    ...prevState,
                    data: trailerResult,
                }));
                setPlayer((prevState) => ({
                    ...prevState,
                    url: `${YOUTUBE_BASE_URL}${trailerResult.key}`,
                }));
            }
            if (!!state.movie?.first_air_date) {
                const getSeasonData = async () => {
                    const resSeason = await service.fetchTvShowSeason(state.movie?.id);
                    console.log(resSeason);
                    setSeason(resSeason);
                };
                getSeasonData();
            }
        };
        if (state.isShowing) {
            caculatePosition(state.position);
            setModalFullsize(state.isFullsize);
            getMovieData();
        }
    }, [state]);

    useEffect(() => {
        if (isModalFullsize) {
            setModalStyle({
                inset: "0",
                width: "100%",
                transformOrigin: "center",
                animation: "FadeIn ease-in-out 0.3s",
            });
        }
    }, [isModalFullsize]);

    const handleMouseLeave = () => {
        // hide modal
        dispatch(action.setHidePreviewModal());
        // reset movie data
        setModalMovie(null);
        // reset modal size
        setModalFullsize(false);
        // reset trailer
        setTrailer((prevState) => ({
            ...prevState,
            isPlaying: true,
        }));
        // reset auto player
        setPlayer((prevState) => ({
            ...prevState,
            url: null,
        }));
    };

    const handleCloseModal = () => {
        dispatch(action.setHidePreviewModal());
    };

    const handleAddToMyList = () => {};

    const handleToggleReaction = () => {
        console.log("I liked it LMAO");
    };

    const handleClickOpenMovieDetail = () => {
        setModalFullsize(true);
    };

    console.log("minimodal re-render");
    // need to improve performance when mouse over and mouse leave

    // pre load modal

    // pop up to become large modal

    // auto play trailer video

    return (
        <div
            onMouseLeave={isModalFullsize ? () => {} : handleMouseLeave}
            style={modalStyle}
            className={`preview-modal ${isModalFullsize ? "overlay" : "mini"} ${state.isShowing ? "flex justify-center" : "hidden"}`}
        >
            <div className="w-full max-w-[900px]">
                <div className="relative z-0 w-full pt-[150%] lg:pt-[56.25%] rounded-t-lg overflow-hidden">
                    <img
                        src={`${isModalFullsize ? LARGE_IMAGE_BASE_URL : SMALL_IMAGE_BASE_URL}${state.movie?.backdrop_path || state.movie?.poster_path}`}
                        alt={state.movie?.title || state.movie?.name || state.movie?.original_title || state.movie?.original_name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {isModalFullsize && !!player.url && trailer.isPlaying && (
                        <>
                            <AutoPlayer props={player} className={`scale-x-[100%] scale-y-[100%]`} />
                            <div className={`absolute inset-0 bg-transparent`}></div>
                        </>
                    )}
                    {isModalFullsize && (
                        <RoundIconButton
                            sizeS
                            border
                            onClick={handleCloseModal}
                            className={`absolute z-10 top-4 right-4 transition-transform duration-300 ease-in-out hover:rotate-180`}
                        >
                            <IoCloseSharp />
                        </RoundIconButton>
                    )}
                </div>

                <ul className="relative z-[1] text-light-900 bg-dark-900 py-4 text-base rounded-b-lg">
                    <li className={`flex items-center gap-x-2 w-full ${isModalFullsize ? "fullsize-action" : "px-4 mb-3"}`}>
                        {isModalFullsize ? (
                            <>
                                <Button leftIcon={<IoPlay />} className={"flex h-12 text-black bg-light-900/80 hover:bg-light-900/50"}>
                                    Play
                                </Button>
                                <RoundIconButton sizeM border onClick={handleAddToMyList}>
                                    <FiPlus />
                                </RoundIconButton>
                                <RoundIconButton sizeM border onClick={handleToggleReaction}>
                                    <BiLike />
                                </RoundIconButton>
                                {trailer.isPlaying && (
                                    <RoundIconButton sizeM border className={"ml-auto"} onClick={handleToggleMute}>
                                        {player.muted ? <VscMute /> : <VscUnmute />}
                                    </RoundIconButton>
                                )}
                            </>
                        ) : (
                            <>
                                <RoundIconButton sizeS border revert>
                                    <IoPlaySharp className="relative left-0.5" />
                                </RoundIconButton>
                                <RoundIconButton sizeS border onClick={handleAddToMyList}>
                                    <FiPlus />
                                </RoundIconButton>
                                <RoundIconButton sizeS border onClick={handleToggleReaction}>
                                    <BiLike />
                                </RoundIconButton>
                                <RoundIconButton sizeS border className={"ml-auto"} onClick={handleClickOpenMovieDetail}>
                                    <BsChevronDown className="relative top-0.5" />
                                </RoundIconButton>
                            </>
                        )}
                    </li>
                    <li className={isModalFullsize ? "flex px-10 gap-x-5" : "px-4 mb-2"}>
                        <div className={isModalFullsize ? "w-2/3" : "mb-2 w-full"}>
                            <div className="flex items-center mb-5 gap-x-3">
                                <p className="text-green-600">{`${Math.ceil(state.movie?.vote_average * 10)}% Match`}</p>
                                <p className="px-1 text-sm border border-solid border-light-100">{state.movie?.adult ? "18+" : "13+"}</p>
                                {isModalFullsize && !!state.movie?.first_air_date && (
                                    <p className="font-semibold">{`${state.movie?.first_air_date.slice(0, 4)}`}</p>
                                )}
                                {isModalFullsize && !!state.movie?.release_date && (
                                    <p className="font-semibold">{`${state.movie?.release_date.slice(0, 4)}`}</p>
                                )}
                                {!!modalMovie?.number_of_seasons && (
                                    <p className="font-semibold">
                                        {modalMovie?.number_of_seasons <= 1
                                            ? `${modalMovie?.number_of_episodes} episodes`
                                            : `${modalMovie?.number_of_seasons} seasons`}
                                    </p>
                                )}
                            </div>
                            {isModalFullsize && <p className={`info-overview`}>{modalMovie?.overview}</p>}
                        </div>
                        <div className={`flex flex-col gap-y-3 mb-2 capitalize ${isModalFullsize ? "w-1/3" : "w-full"}`}>
                            {isModalFullsize ? (
                                <>
                                    {!!modalMovie?.created_by && (
                                        <div>
                                            <span className="text-sm text-light-100/70 mr-1">Created by:</span>
                                            {modalMovie?.created_by.map((item) => (
                                                <span key={item.id} className="genre-item comma mr-1">
                                                    {item.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {!!modalMovie?.production_companies && (
                                        <div>
                                            <span className="text-sm text-light-100/70 mr-1">Producted by:</span>
                                            {modalMovie?.production_companies.map((item) => (
                                                <span key={item.id} className="genre-item comma mr-1">
                                                    {item.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {modalMovie?.genres.length > 0 && (
                                        <div>
                                            <span className="mr-1 text-sm font-light text-light-100">Genres:</span>
                                            {modalMovie?.genres.map((item) => (
                                                <span key={item.id} className={`genre-item ${isModalFullsize ? "comma mr-1" : "red-dot"}`}>
                                                    {item.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {!!modalMovie?.tagline && (
                                        <div>
                                            <span className="text-sm text-light-100/70 mr-1">This show is:</span>
                                            <span className="genre-item comma mr-1">{modalMovie?.tagline}</span>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div>
                                    {modalMovie?.genres.length > 0 &&
                                        modalMovie?.genres.map((item) => (
                                            <span key={item.id} className="genre-item red-dot">
                                                {item.name}
                                            </span>
                                        ))}
                                </div>
                            )}
                        </div>
                    </li>
                    {isModalFullsize && (
                        <>
                            <li className="px-10">
                                {!!season?.episodes && (
                                    <div>
                                        <div className="flex justify-between">
                                            <p className="text-xl">Episodes</p>
                                            <p className="max-w-[640px] text-lg text-ellipsis whitespace-nowrap overflow-hidden">
                                                {state.movie?.title || state.movie?.name || state.movie?.original_title || state.movie?.original_name}
                                            </p>
                                        </div>
                                        <ul className="w-full">
                                            {season?.episodes.map((item) => (
                                                <li key={item.episode_number} className="w-full rounded overflow-hidden border-b border-b-light-100">
                                                    <EpisodeItem data={item} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default memo(PreviewModal);
