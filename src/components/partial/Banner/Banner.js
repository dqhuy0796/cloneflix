import _ from "lodash";
import { memo, useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { VscMute, VscUnmute } from "react-icons/vsc";
import ReactPlayer from "react-player/youtube";
import HorizontalButton from "~/components/shared/buttons/HorizontalButton";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import BannerSkeleton from "~/components/skeleton/BannerSkeleton";
import { LARGE_IMAGE_BASE_URL, YOUTUBE_BASE_URL } from "~/constants";

function Banner({ data }) {
    const [trailer, setTrailer] = useState({
        data: null,
        playing: false,
    });

    const getTrailer = (videos) => {
        const checkKey = (type) => {
            const keywords = ["trailer", "teaser"];
            return keywords.some((key) => type.toLowerCase().includes(key));
        };
        // get all items have type are "trailer" and "teaser"
        const typeFilter = videos.filter((item) => checkKey(item.type));
        // get all items have name are "official trailer" and "official teaser"
        const nameFilter = typeFilter.filter((item) => item.name.toLowerCase().includes("official"));
        // if have official trailer or teaser let's return it
        if (nameFilter.length > 0) {
            return nameFilter[0];
        }
        // else return 1 of items have type are "trailer" and "teaser"
        return typeFilter[0];
    };

    useEffect(() => {
        if (!_.isEmpty(data)) {
            setTrailer((prevState) => ({
                ...prevState,
                playing: true,
                data: getTrailer(data.videos.results),
            }));
        }
    }, [data]);

    const [playerState, setPlayer] = useState({
        width: "100%",
        height: "100%",
        muted: true,
        playing: true,
        loop: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        controls: false,
        light: false,
        volume: 1,
    });

    const handleToggleMute = () => {
        setPlayer((prevState) => ({
            ...prevState,
            muted: !prevState.muted,
        }));
    };

    const handleReplay = () => {
        setTrailer((prevState) => ({
            ...prevState,
            playing: true,
        }));
        setPlayer((prevState) => ({
            ...prevState,
            playing: true,
        }));
    };

    const handlePlayTrailerHideOverview = () => {
        setTrailer((prevState) => ({
            ...prevState,
            playing: true,
        }));
    };

    const handleHideTrailerShowOverview = () => {
        setTrailer((prevState) => ({
            ...prevState,
            playing: false,
        }));
    };

    console.log("banner re-render", data.title || data.name);

    // need to improve performence (fix re-render many times, trailer show with better solution...)
    return (
        <>
            {!_.isEmpty(data) ? (
                <div className="z-0 relative h-[38vw] bg-dark-900">
                    <div className="relative w-full pt-[56.25%] bg-dark-900 overflow-hidden">
                        {!_.isEmpty(trailer.data) && trailer.playing ? (
                            <ReactPlayer
                                url={`${YOUTUBE_BASE_URL}${trailer.data.key}`}
                                {...playerState}
                                onReady={handlePlayTrailerHideOverview}
                                onPlay={handlePlayTrailerHideOverview}
                                onEnded={handleHideTrailerShowOverview}
                                onError={handleHideTrailerShowOverview}
                                className="z-0 absolute inset-0 scale-x-[110%] scale-y-[135%] bg-dark-900"
                            />
                        ) : (
                            <img
                                src={`${LARGE_IMAGE_BASE_URL}${data.backdrop_path || data.poster_path}`}
                                alt={data.title || data.name || data.original_title || data.original_name}
                                className="absolute inset-0 w-full h-full object-cover bg-dark-900 animation-fade-in"
                            />
                        )}

                        <div className={`info-overlay ${trailer.playing && "opacity-0"}`}></div>
                    </div>
                    <div className="z-0 absolute inset-0 flex flex-col justify-end pl-[60px] w-full bg-transparent">
                        <div className="w-1/2 2xl:w-1/3 text-white bg-transparent overflow-hidden transition-transform duration-300">
                            <p className="text-[40px] font-bold text-white text-shadow-dark mb-5">
                                {data.title || data.name || data.original_title || data.original_name}
                            </p>

                            {!trailer.playing && (
                                <>
                                    <p className="text-justify line-clamp-4 text-base font-semibold text-light-500 transition-transform duration-300 mb-5">
                                        {data.overview}
                                    </p>
                                    {data.genres && data.genres.length > 0 && (
                                        <ul className="flex items-center justify-start mb-5">
                                            {data.genres.map((item) => (
                                                <li key={item.id} className="genre-item red-dot">
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start gap-4">
                                <HorizontalButton leftIcon={<IoPlay />} type={"light"}>
                                    Play
                                </HorizontalButton>
                                <HorizontalButton leftIcon={<FiInfo />} type={"dark"}>
                                    More Info
                                </HorizontalButton>
                            </div>
                            <div className="flex items-center h-full">
                                {!_.isEmpty(trailer.data) && (
                                    <>
                                        {trailer.playing ? (
                                            <IconOnlyButton border onClick={handleToggleMute}>
                                                {playerState.muted ? <VscMute /> : <VscUnmute />}
                                            </IconOnlyButton>
                                        ) : (
                                            <IconOnlyButton border onClick={handleReplay}>
                                                <AiOutlineReload />
                                            </IconOnlyButton>
                                        )}
                                    </>
                                )}
                                <div className="flex items-center pl-2 ml-5 w-28 h-full text-xl text-white font-semibold bg-dark-900/50 border-l-4 border-l-light-500">
                                    {data.adult ? "18+" : "13+"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <BannerSkeleton />
            )}
        </>
    );
}

export default memo(Banner);
