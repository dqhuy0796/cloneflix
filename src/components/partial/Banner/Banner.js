import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FiInfo, FiPlus } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { VscMute, VscUnmute } from "react-icons/vsc";
import ReactPlayer from "react-player/youtube";

import Button from "~/components/shared/Button";
import RoundIconButton from "~/components/shared/RoundIconButton";
import BannerSkeleton from "~/components/skeleton/BannerSkeleton";
import { LARGE_IMAGE_BASE_URL, YOUTUBE_BASE_URL } from "~/constants";
import { useViewport } from "~/hooks";
import * as service from "~/services";

function Banner({ data }) {
    // Process data
    const [bannerMovie, setBannerMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);

    // Get {trailer}
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
        const getApiData = async () => {
            const random = Math.floor(Math.random() * data.length);
            const res = await service.fetchMovie(data[random].id);
            setBannerMovie(res);
            setTrailer(getTrailer(res.videos.results));
        };
        getApiData();
    }, [data]);

    console.log(bannerMovie);
    console.log("banner re-render");

    const isMobile = useViewport().width < 1024;

    // state
    const [showOverview, setShowOverview] = useState(true);
    const [showTrailer, setShowTrailer] = useState(true);
    // player state
    const [muted, setMuted] = useState(true);
    const [playing, setPlaying] = useState(true);
    const [loop, setLoop] = useState(false);
    const [played, setPlayed] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1.0);

    const handleToggleMute = () => {
        setMuted((prev) => !prev);
    };

    const handleReplay = () => {
        setShowTrailer(true);
        setPlaying(true);
    };

    const handleShowTrailerHideOverview = () => {
        setShowTrailer(true);
        setTimeout(() => setShowOverview(false), 10000);
    };

    const handleHideTrailerShowOverview = () => {
        setShowTrailer(false);
        setShowOverview(true);
    };

    // need to improve performence of trailer show
    return (
        <>
            {!!bannerMovie ? (
                <div className="z-0 relative lg:h-[38vw] bg-dark-900 -mb-[1px]">
                    <div className="relative w-full pt-[150%] sm:pt-[100%] lg:pt-[56.25%] overflow-hidden border-none">
                        {!!trailer && showTrailer && !isMobile ? (
                            <ReactPlayer
                                url={`${YOUTUBE_BASE_URL}${trailer.key}`}
                                width="100%"
                                height="100%"
                                playing={playing}
                                controls={false}
                                light={false}
                                volume={1}
                                muted={muted}
                                loop={loop}
                                played={played}
                                loaded={loaded}
                                duration={duration}
                                playbackRate={playbackRate}
                                onReady={() => console.log("onReady")}
                                onPlay={handleShowTrailerHideOverview}
                                onEnded={handleHideTrailerShowOverview}
                                onError={handleHideTrailerShowOverview}
                                className="z-0 absolute inset-0 scale-x-[110%] scale-y-[120%]"
                            />
                        ) : (
                            <img
                                src={`${LARGE_IMAGE_BASE_URL}${
                                    isMobile ? bannerMovie.poster_path || bannerMovie.backdrop_path : bannerMovie.backdrop_path || bannerMovie.poster_path
                                }`}
                                alt={bannerMovie.title || bannerMovie.name || bannerMovie.original_title || bannerMovie.original_name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}

                        <div
                            className={`absolute left-0 right-0 bottom-0 top-1/3 lg:top-0 lg:right-1/3 bg-gradient-to-t lg:bg-gradient-to-r from-dark-900 via-dark-900/50 to-transparent 
                        ${showOverview ? "opacity-100" : "opacity-0"}`}
                        ></div>
                    </div>
                    <div className="z-0 absolute inset-0 flex items-end justify-between lg:pl-[60px] w-full bg-transparent">
                        <div className="flex flex-col justify-end w-full lg:w-1/2 2xl:w-1/3 gap-5 font-bold text-white bg-transparent transition-all ease-linear duration-300">
                            <p className="text-[24px] lg:text-[40px] lg:leading-10 xl:text-5xl w-full text-center lg:text-left font-bold text-white text-shadow-dark">
                                {bannerMovie.title || bannerMovie.name || bannerMovie.original_title || bannerMovie.original_name}
                            </p>

                            <ul className="flex lg:hidden items-center justify-center flex-wrap gap-x-5">
                                {bannerMovie.genres.map((item) => (
                                    <li key={item.id} className="genre-item">
                                        {item.name}
                                    </li>
                                ))}
                            </ul>

                            <p
                                className={`hidden lg:line-clamp-4 lg:text-lg xl:text-xl font-semibold text-light-500 overflow-hidden ${
                                    showOverview ? "h-28" : "h-0"
                                }`}
                            >
                                {bannerMovie.overview}
                            </p>

                            <div className="mb-5 lg:mb-0 flex items-center justify-evenly lg:justify-start gap-4">
                                <Button topIcon={<FiPlus />} className={"lg:hidden bg-transparent text-white"}>
                                    My List
                                </Button>
                                <Button leftIcon={<IoPlay />} className={"flex h-12 lg:min-w-[160px] text-black bg-light-900/80 hover:bg-light-900/50"}>
                                    Play
                                </Button>
                                <Button leftIcon={<FiInfo />} className={"hidden lg:flex h-12 lg:min-w-[160px] text-white bg-dark-100/80 hover:bg-dark-100/50"}>
                                    More Info
                                </Button>
                                <Button topIcon={<FiInfo />} className={"lg:hidden bg-transparent text-white"}>
                                    Info
                                </Button>
                            </div>
                        </div>

                        <div className="z-0 hidden lg:flex">
                            {showTrailer ? (
                                <RoundIconButton onClick={handleToggleMute} className="border-white border">
                                    {muted ? <VscMute /> : <VscUnmute />}
                                </RoundIconButton>
                            ) : (
                                <RoundIconButton onClick={handleReplay} className="border-white border">
                                    <AiOutlineReload />
                                </RoundIconButton>
                            )}
                            <div className="flex items-center pl-2 ml-5 min-w-[100px] text-xl text-white font-semibold bg-dark-900/50 border-l-4 border-l-light-500">
                                {bannerMovie.adult ? "18+" : "13+"}
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

Banner.propTypes = {
    data: PropTypes.array.isRequired,
};

export default memo(Banner);
