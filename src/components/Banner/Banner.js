import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FiInfo, FiPlus } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { VscMute, VscUnmute } from "react-icons/vsc";
import ReactPlayer from "react-player/youtube";

import { LARGE_IMAGE_BASE_URL, YOUTUBE_BASE_URL } from "~/constants";
import { useViewport } from "~/hooks";
import * as service from "~/services";
import Button from "../Button";
import RoundIconButton from "../RoundIconButton";

const BASE_MOVIE = {
    adult: false,
    backdrop_path: "/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",
    created_by: [
        {
            id: 3299121,
            credit_id: "6186be85d388ae0043fe3adb",
            name: "Alex Yee",
            gender: 2,
            profile_path: "/nTAS8k6wyonvoiwSxYnDibvPA8Q.jpg",
        },
        {
            id: 3417189,
            credit_id: "6232b5947ac829007a7b37bd",
            name: "Christian Linke",
            gender: 2,
            profile_path: null,
        },
    ],
    episode_run_time: [39],
    first_air_date: "2021-11-06",
    genres: [
        {
            id: 16,
            name: "Animation",
        },
        {
            id: 10765,
            name: "Sci-Fi & Fantasy",
        },
        {
            id: 10759,
            name: "Action & Adventure",
        },
        {
            id: 18,
            name: "Drama",
        },
    ],
    homepage: "https://arcane.com",
    id: 94605,
    in_production: true,
    languages: ["en"],
    last_air_date: "2021-11-20",
    last_episode_to_air: {
        air_date: "2021-11-20",
        episode_number: 9,
        id: 3246870,
        name: "The Monster You Created",
        overview: "Perilously close to war, the leaders of Piltover and Zaun reach an ultimatum. But a fateful standoff changes both cities forever.",
        production_code: "",
        runtime: 39,
        season_number: 1,
        show_id: 94605,
        still_path: "/dbnGqpGWUjLcTVQxr5k1V3no8BB.jpg",
        vote_average: 9.1,
        vote_count: 19,
    },
    name: "Arcane",
    next_episode_to_air: null,
    networks: [
        {
            id: 213,
            name: "Netflix",
            logo_path: "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png",
            origin_country: "",
        },
    ],
    number_of_episodes: 9,
    number_of_seasons: 1,
    origin_country: ["US"],
    original_language: "en",
    original_name: "Arcane",
    overview:
        "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    popularity: 118.786,
    poster_path: "/ohGz4HDYGTite1GmRhRuBMVAn03.jpg",
    production_companies: [
        {
            id: 99496,
            logo_path: "/6WTCdsmIH6qR2zFVHlqjpIZhD5A.png",
            name: "Fortiche Production",
            origin_country: "FR",
        },
        {
            id: 124172,
            logo_path: "/sBlhznEktXKBqC87Bsfwpo1YbYR.png",
            name: "Riot Games",
            origin_country: "US",
        },
    ],
    production_countries: [
        {
            iso_3166_1: "FR",
            name: "France",
        },
        {
            iso_3166_1: "US",
            name: "United States of America",
        },
    ],
    seasons: [
        {
            air_date: "2021-11-06",
            episode_count: 9,
            id: 134187,
            name: "Season 1",
            overview: "",
            poster_path: "/4kREE8KulUNDtgWoOFAzUiR9mUh.jpg",
            season_number: 1,
        },
    ],
    spoken_languages: [
        {
            english_name: "English",
            iso_639_1: "en",
            name: "English",
        },
    ],
    status: "Returning Series",
    tagline: "",
    type: "Scripted",
    vote_average: 9.1,
    vote_count: 2217,
    videos: {
        results: [
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Final Trailer",
                key: "3Svs_hl897c",
                site: "YouTube",
                size: 1080,
                type: "Trailer",
                official: true,
                published_at: "2021-10-31T15:00:01.000Z",
                id: "617fcd72c7c224006566cca3",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Imagine Dragons & JID - Enemy (from the series Arcane League of Legends) | Official Music Video",
                key: "F5tSoaJ93ac",
                site: "YouTube",
                size: 1080,
                type: "Clip",
                official: true,
                published_at: "2021-10-28T11:00:05.000Z",
                id: "61c6d1c0b042280090264bd9",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Official Trailer",
                key: "fXmAurh012s",
                site: "YouTube",
                size: 1080,
                type: "Trailer",
                official: true,
                published_at: "2021-09-25T17:50:01.000Z",
                id: "614fdd7fb0460500285f8e14",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Official Announcement",
                key: "_WtVfkTGFvo",
                site: "YouTube",
                size: 1080,
                type: "Teaser",
                official: true,
                published_at: "2021-05-03T15:34:31.000Z",
                id: "60901fb31108a80024f991a0",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Arcane: Animated Series Announcement",
                key: "IA-v_LB3Qpc",
                site: "YouTube",
                size: 1080,
                type: "Teaser",
                official: true,
                published_at: "2019-10-16T01:47:56.000Z",
                id: "5da7a66b944a57001323d24e",
            },
        ],
    },
};
function Banner({ data }) {
    // process data
    const [currentMovie, setCurrentMovie] = useState(BASE_MOVIE);
    useEffect(() => {
        const getApiData = async () => {
            const result = await service.fetchMovie(data[Math.floor(Math.random() * data.length)].id);
            setCurrentMovie(result);
        };
        getApiData();
    }, [data]);

    const genres = currentMovie.genres;

    // get trailer link
    const getTrailer = (data) => {
        const checkKey = (videoType) => {
            const keywords = ["Trailer", "Teaser"];
            return keywords.some((key) => videoType.includes(key));
        };
        const results = data.filter((item) => checkKey(item.type));
        return results[0];
    };
    let trailer = {};
    trailer = getTrailer(currentMovie.videos.results);

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
                        onReady={() => console.log("onReady")}
                        onPlay={() => setShowTrailer(true)}
                        onEnded={() => setShowTrailer(false)}
                        onError={() => setShowTrailer(false)}
                        className="z-0 absolute inset-0 scale-x-[106%] scale-y-[116%]"
                    />
                ) : (
                    <img
                        src={`${LARGE_IMAGE_BASE_URL}${
                            isMobile ? currentMovie.poster_path || currentMovie.backdrop_path : currentMovie.backdrop_path || currentMovie.poster_path
                        }`}
                        alt={currentMovie.title || currentMovie.name || currentMovie.original_title || currentMovie.original_name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                <div className="absolute left-0 right-0 bottom-0 top-1/3 lg:top-0 lg:right-1/3 bg-gradient-to-t lg:bg-gradient-to-r from-dark-900 via-dark-900/50 to-transparent"></div>
            </div>
            <div className="z-0 absolute inset-0 flex items-end justify-between lg:pl-[60px] w-full bg-transparent">
                <div className="flex flex-col justify-end w-full lg:w-1/2 2xl:w-1/3 gap-5 font-bold text-white bg-transparent">
                    <p className="text-[24px] lg:text-[40px] lg:leading-10 xl:text-5xl w-full text-center lg:text-left font-bold text-white text-shadow-dark">
                        {currentMovie.title || currentMovie.name || currentMovie.original_title || currentMovie.original_name}
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

                    <p className={"hidden lg:line-clamp-4 lg:text-lg xl:text-xl font-semibold text-light-500"}>{currentMovie?.overview}</p>

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
                            {currentMovie.adult ? "18+" : "13+"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

Banner.propTypes = {
    data: PropTypes.array.isRequired,
};

export default memo(Banner);
