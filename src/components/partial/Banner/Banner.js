import _ from "lodash";
import { memo, useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FiInfo } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { VscMute, VscUnmute } from "react-icons/vsc";
import ReactPlayer from "react-player/youtube";
import HorizontalButton from "~/components/shared/buttons/HorizontalButton";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import { LARGE_IMAGE_BASE_URL, YOUTUBE_NO_COOKIE_EMBED_BASE_URL } from "~/constants";

function Banner({ data }) {
    const [trailer, setTrailer] = useState({});

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
            const trailerData = getTrailer(data.videos.results);
            if (!_.isEmpty(trailerData)) {
                setTrailer(trailerData);
            }
        }
    }, [data]);

    const [player, setPlayer] = useState({
        width: "100%",
        height: "100%",
        muted: true,
        playing: false,
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

    const handlePlayTrailer = () => {
        setPlayer((prevState) => ({
            ...prevState,
            playing: true,
        }));
    };

    const handleHideTrailer = () => {
        setPlayer((prevState) => ({
            ...prevState,
            playing: false,
        }));
    };

    const handleSetScrolled = () => {
        if (window.scrollY > 256) {
            setTrailer((prevState) => ({
                ...prevState,
                playing: false,
            }));
            setPlayer((prevState) => ({
                ...prevState,
                playing: false,
            }));
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleSetScrolled);

        return () => window.removeEventListener("scroll", handleSetScrolled);
    }, []);

    return (
        <div className="z-0 relative h-[38vw] bg-dark-900">
            <div className="relative w-full pt-[56.25%] bg-dark-900 overflow-hidden">
                {!_.isEmpty(trailer) && (
                    <ReactPlayer
                        url={`${YOUTUBE_NO_COOKIE_EMBED_BASE_URL}${trailer.key}?showinfo=0&enablejsapi=1&origin=${process.env.REACT_APP_MY_URL}`}
                        {...player}
                        onReady={handlePlayTrailer}
                        onEnded={handleHideTrailer}
                        onError={handleHideTrailer}
                        className={`banner-player`}
                    />
                )}

                <img
                    src={`${LARGE_IMAGE_BASE_URL}${data.backdrop_path || data.poster_path}`}
                    alt={data.title || data.name || data.original_title || data.original_name}
                    className={`banner-backdrop ${player.playing && "opacity-0 animation-fade-out"}`}
                />

                <div className={`info-overlay ${player.playing && "opacity-0 animation-fade-out"}`}></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end pl-[60px] w-full bg-transparent">
                <div className="w-1/2 2xl:w-1/3 bg-transparent overflow-hidden transition-all duration-300">
                    <p className="line-clamp-2 text-[40px] font-bold text-white text-shadow-dark mb-5">
                        {data.title || data.name || data.original_title || data.original_name}
                    </p>
                    {!player.playing && <p className="info-overview">{data.overview}</p>}
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
                        {!_.isEmpty(trailer) && (
                            <>
                                {player.playing ? (
                                    <IconOnlyButton color={"dark"} border onClick={handleToggleMute}>
                                        {player.muted ? <VscMute /> : <VscUnmute />}
                                    </IconOnlyButton>
                                ) : (
                                    <IconOnlyButton color={"dark"} border onClick={handleReplay}>
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
    );
}

export default memo(Banner);
