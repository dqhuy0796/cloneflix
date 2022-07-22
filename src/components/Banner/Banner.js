import PropTypes from "prop-types";
import { memo, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { FiInfo, FiPlus } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { VscMute, VscUnmute } from "react-icons/vsc";

import { LARGE_IMAGE_BASE_URL, YOUTUBE_BASE_URL } from "~/constants";
import { useViewport } from "~/hooks";
import Button from "../Button";
import RoundIconButton from "../RoundIconButton";

function Banner({ title, movie }) {
    const genres = movie.genres;

    // get trailer link
    const getTrailer = (data) => {
        const checkKey = (videoType) => {
            const keywords = ["Trailer", "Teaser"];
            return keywords.some((key) => videoType.includes(key));
        };
        const results = data.filter((item) => checkKey(item.type));
        console.log(results);
        return results[0];
    };

    let trailer = getTrailer(movie.videos.results);

    console.log("banner re-render");

    const isMobile = useViewport().width < 1024;

    // state
    const [showOverview, setShowOverview] = useState(false);
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

    useEffect(() => {
        const overviewHidden = setTimeout(() => {
            setShowOverview(true);
        }, 10000);

        return () => clearTimeout(overviewHidden);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // need to improve performence of trailer show
    return (
        <div className="z-0 relative lg:h-[38vw] bg-blue-100">
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
                        onReady={() => setShowTrailer(true)}
                        onPlay={() => setShowTrailer(true)}
                        onEnded={() => setShowTrailer(false)}
                        onError={() => setShowTrailer(false)}
                        className="z-0 absolute inset-0 scale-x-[106%] scale-y-[116%]"
                    />
                ) : (
                    <img
                        src={`${LARGE_IMAGE_BASE_URL}${
                            isMobile
                                ? movie.poster_path || movie.backdrop_path
                                : movie.backdrop_path || movie.poster_path
                        }`}
                        alt={movie.title || movie.name || movie.original_title || movie.original_name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                <div className="absolute left-0 right-0 bottom-0 top-1/3 lg:top-0 lg:right-1/3 bg-gradient-to-t lg:bg-gradient-to-r from-dark-900 via-dark-900/50 to-transparent"></div>
            </div>
            <div className="z-0 absolute inset-0 flex items-end justify-between lg:pl-[60px] w-full bg-transparent">
                <div className="flex flex-col justify-end w-full lg:w-1/2 2xl:w-1/3 gap-5 font-bold text-white bg-transparent">
                    <p className="text-[24px] lg:text-[40px] lg:leading-10 xl:text-5xl w-full text-center lg:text-left font-bold text-white text-shadow-dark">
                        {movie.title || movie.name || movie.original_title || movie.original_name}
                    </p>

                    {genres && (
                        <div className="lg:hidden">
                            <ul className="flex items-center justify-center flex-wrap gap-x-5">
                                {genres.map((item) => (
                                    <li key={item.id} className="genre-item">
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <p className={"hidden lg:line-clamp-4 lg:text-lg xl:text-xl font-semibold text-light-500"}>
                        {movie.overview}
                    </p>

                    <div className="mb-5 lg:mb-0 flex items-center justify-evenly lg:justify-start gap-4">
                        <Button topIcon={<FiPlus />} className={"lg:hidden bg-transparent text-white"}>
                            My List
                        </Button>
                        <Button
                            leftIcon={<IoPlay />}
                            className={"flex h-12 lg:min-w-[160px] text-black bg-light-900/80 hover:bg-light-900/50"}
                        >
                            Play
                        </Button>
                        <Button
                            leftIcon={<FiInfo />}
                            className={
                                "hidden lg:flex h-12 lg:min-w-[160px] text-white bg-dark-100/80 hover:bg-dark-100/50"
                            }
                        >
                            More Info
                        </Button>
                        <Button topIcon={<FiInfo />} className={"lg:hidden bg-transparent text-white"}>
                            Info
                        </Button>
                    </div>
                </div>

                {!isMobile && (
                    <div className="z-0 flex">
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
                            {movie.aldult ? "18+" : "13+"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

Banner.propTypes = {
    movie: PropTypes.object.isRequired,
};

export default memo(Banner);
