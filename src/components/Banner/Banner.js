import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiInfo, FiPlus } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import YouTube from "react-youtube";

import { IMAGE_BASE_URL } from "~/constants";
import Button from "../Button";

function Banner({ title, movie }) {
    const genres = movie.genres;

    const getTrailer = (data) => {
        const checkKey = (videoType) => {
            const keywords = ["Teaser", "Trailer"];
            return keywords.some((key) => videoType.includes(key));
        };
        const result = data.filter((item) => checkKey(item.type));
        return result[0];
    };

    let trailer = getTrailer(movie.videos.results);
    console.log("re-render");

    const youtubeOptions = {
        height: "390",
        width: "640",
        playerVars: {
            modestbranding: 1,
            rel: 0,
            autoplay: 1,
            mute: 1,
            controls: 1,
            disablekb: 1,
            cc_load_policy: 3,
            iv_load_policy: 3,
            origin: "http://localhost:3000",
        },
    };

    const [showOverview, setShowOverview] = useState(false);
    const [showTrailer, setShowTrailer] = useState(true);
    const [player, setPlayer] = useState();
    // need for mute button

    useEffect(() => {
        const overviewHidden = setTimeout(() => {
            setShowOverview(true);
        }, 10000);

        return () => clearTimeout(overviewHidden);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative w-full pt-[150%] sm:pt-[100%] lg:pt-[56.25%] overflow-hidden border-none">
            {!!title && (
                <p className="z-10 absolute top-20 left-4 text-xl font-bold lg:left-[60px] lg:text-[44px] lg:font-black text-white text-shadow-dark">
                    {title}
                </p>
            )}
            <div className="absolute inset-0 w-full h-full">
                <div className="relative z-0 w-full h-full overflow-hidden inset-shadow">
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path || movie.backdrop_path}`}
                        alt={movie.title || movie.name || movie.original_title || movie.original_name}
                        className="lg:hidden absolute inset-0 w-full h-full object-cover object-top"
                    />
                    {!!trailer && showTrailer ? (
                        <>
                            <div className="absolute z-[2] inset-0 w-full h-full overflow-hidden select-none"></div>
                            <YouTube
                                videoId={trailer.key}
                                title={trailer.name}
                                opts={youtubeOptions}
                                onReady={(target) => setPlayer(target)}
                                onPlay={() => setShowTrailer(true)}
                                onEnd={() => setShowTrailer(false)}
                                onError={() => setShowTrailer(false)}
                                className="absolute inset-0 w-full h-full"
                                iframeClassName="hidden lg:block absolute z-[1] inset-0 w-full h-full scale-x-[106%] scale-y-[116%]"
                            />
                        </>
                    ) : (
                        <img
                            src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                            alt={movie.title || movie.name || movie.original_title || movie.original_name}
                            className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                        />
                    )}

                    <div className="lg:hidden z-[2] absolute inset-0 bg-gradient-to-t from-dark-900 via-[#00000033] to-transparent"></div>

                    <div className="z-[2] flex flex-col justify-end absolute left-0 right-0 -bottom-1 py-2 px-4 min-h-[60%] font-bold text-white bg-transparent lg:top-0 lg:bottom-1/3 lg:left-[60px] lg:w-[40%] lg:px-0 lg:pb-0">
                        <p className="mb-5 text-[24px] lg:text-5xl w-full lg:w-[120%] text-center lg:text-left font-bold text-white">
                            {movie.title || movie.name || movie.original_title || movie.original_name}
                        </p>

                        {genres && (
                            <div className="lg:hidden mb-5">
                                <ul className="flex items-center justify-center gap-x-5">
                                    {genres.map((item) => (
                                        <li
                                            key={item.id}
                                            className="relative text-sm font-semibold text-light-500 after:contents-none after:z-[1] after:absolute after:-right-2.5 after:top-1/2 after:w-1.5 after:h-1.5 after:translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-primary-color last:after:hidden"
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {!showOverview && (
                            <p className={"hidden lg:line-clamp-4 mb-5 text-xl font-semibold text-light-500"}>
                                {movie.overview}
                            </p>
                        )}

                        <div className="mb-5 flex items-center justify-evenly lg:justify-start gap-4">
                            <Button topIcon={<FiPlus />} className={"lg:hidden bg-transparent text-white"}>
                                My List
                            </Button>
                            <Button
                                leftIcon={<IoPlay />}
                                className={"flex h-12 text-black bg-white hover:bg-light-900"}
                            >
                                Play
                            </Button>
                            <Button leftIcon={<FiInfo />} className={"hidden lg:flex h-12 text-white bg-dark-100"}>
                                More Info
                            </Button>
                            <Button topIcon={<FiInfo />} className={"lg:hidden bg-transparent text-white"}>
                                Info
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Banner.propTypes = {
    movie: PropTypes.object.isRequired,
};

export default memo(Banner);
