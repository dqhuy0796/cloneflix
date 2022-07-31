import PropTypes from "prop-types";
import { memo, useEffect, useRef, useState } from "react";
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
    const [bannerMovie, setBannerMovie] = useState(null);
    const [trailer, setTrailer] = useState({
        data: null,
        isPlaying: true,
    });
    const [playerState, setPlayer] = useState({
        muted: true,
        playing: true,
        loop: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
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
        const getApiData = async () => {
            const random = Math.floor(Math.random() * data.length);
            const randomMovie = data[random];
            // cannot load properties of undefined ('id')
            const res = !!randomMovie?.first_air_date ? await service.fetchTvShow(randomMovie?.id) : await service.fetchMovie(randomMovie?.id);
            setBannerMovie(res);
            // cannot load properties of undefined ('videos')
            if (!!res.videos.results) {
                setTimeout(() => {
                    setTrailer((prevState) => ({
                        ...prevState,
                        data: getTrailer(res.videos.results),
                    }));
                }, 1234);
            }
        };
        getApiData();
    }, [data]);

    const { muted, playing, loop, played, loaded, duration, playbackRate } = playerState;

    const handleToggleMute = () => {
        setPlayer((prevState) => ({
            ...prevState,
            muted: !prevState.muted,
        }));
    };

    const handleReplay = () => {
        setTrailer((prevState) => ({
            ...prevState,
            isPlaying: true,
        }));
        setPlayer((prevState) => ({
            ...prevState,
            playing: true,
        }));
    };

    const handlePlayTrailerHideOverview = () => {
        setTrailer((prevState) => ({
            ...prevState,
            isPlaying: true,
        }));
    };

    const handleHideTrailerShowOverview = () => {
        setTrailer((prevState) => ({
            ...prevState,
            isPlaying: false,
        }));
    };

    const isMobile = useViewport().width < 1024;

    useEffect(() => {
        if (isMobile) {
            setTrailer((prevState) => ({
                ...prevState,
                isPlaying: false,
            }));
        }
    }, [isMobile]);

    const playerRef = useRef(null);

    // console.log("banner re-render");

    // need to improve performence (fix re-render many times, trailer show with better solution...)
    return (
        <>
            {data.length > 0 && !!bannerMovie ? (
                <div className="z-0 relative lg:h-[38vw] bg-dark-900 -mb-[1px]">
                    <div className="relative w-full pt-[150%] sm:pt-[100%] lg:pt-[56.25%] bg-dark-900 overflow-hidden">
                        {!!trailer.data && trailer.isPlaying ? (
                            <ReactPlayer
                                ref={playerRef}
                                url={`${YOUTUBE_BASE_URL}${trailer.data.key}`}
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
                                onReady={() => {}}
                                onPlay={handlePlayTrailerHideOverview}
                                onEnded={handleHideTrailerShowOverview}
                                onError={() => console.log("error")}
                                className="z-0 absolute inset-0 scale-x-[110%] scale-y-[135%] bg-dark-900"
                            />
                        ) : (
                            <img
                                src={`${LARGE_IMAGE_BASE_URL}${
                                    isMobile ? bannerMovie.poster_path || bannerMovie.backdrop_path : bannerMovie.backdrop_path || bannerMovie.poster_path
                                }`}
                                alt={bannerMovie.title || bannerMovie.name || bannerMovie.original_title || bannerMovie.original_name}
                                className="absolute inset-0 w-full h-full object-cover bg-dark-900 animation-fade-in"
                            />
                        )}

                        <div
                            className={`info-overlay lg:transition-all lg:duration-300 ${!!trailer.data && trailer.isPlaying && "lg:delay-[5s] lg:opacity-0"}`}
                        ></div>
                    </div>
                    <div className="z-0 absolute inset-0 flex flex-col justify-end lg:pl-[60px] w-full bg-transparent">
                        <div className="info-container">
                            <p className={`info-title ${!!trailer.data && trailer.isPlaying && "lg:delay-[5s] lg:translate-y-24"}`}>
                                {bannerMovie.title || bannerMovie.name || bannerMovie.original_title || bannerMovie.original_name}
                            </p>

                            <p className={`info-overview ${!!trailer.data && trailer.isPlaying && "lg:delay-[5s] lg:translate-y-24"}`}>
                                {bannerMovie.overview}
                            </p>

                            <ul className="info-genre">
                                {bannerMovie.genres.map((item) => (
                                    <li key={item.id} className="genre-item red-dot">
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="info-action">
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
                            <div className="z-0 hidden lg:flex h-full">
                                {!!trailer.data && (
                                    <>
                                        {trailer.isPlaying ? (
                                            <RoundIconButton onClick={handleToggleMute} sizeM border>
                                                {muted ? <VscMute /> : <VscUnmute />}
                                            </RoundIconButton>
                                        ) : (
                                            <RoundIconButton onClick={handleReplay} sizeM border>
                                                <AiOutlineReload />
                                            </RoundIconButton>
                                        )}
                                    </>
                                )}
                                <div className="flex items-center pl-2 ml-5 w-28 text-xl text-white font-semibold bg-dark-900/50 border-l-4 border-l-light-500">
                                    {bannerMovie.adult ? "18+" : "13+"}
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

Banner.propTypes = {
    data: PropTypes.array.isRequired,
};

export default memo(Banner);
