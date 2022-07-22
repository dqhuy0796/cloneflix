import { useContext, useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Banner from "~/components/Banner";
import MiniModal from "~/components/MiniModal";
import SwiperPlaylist from "~/components/SwiperPlaylist";
import Footer from "~/layouts/components/Footer";
import Header from "~/layouts/components/Header";
import { MiniModalContext, MiniModalProvider, useMiniModalContext } from "~/miniModalContext";
import * as httpRequest from "~/utils/httpRequest";

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
        overview:
            "Perilously close to war, the leaders of Piltover and Zaun reach an ultimatum. But a fateful standoff changes both cities forever.",
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

function Home() {
    // Movies
    const [genres, setGenres] = useState([]);
    // const [bannerMovie, setBannerMovie] = useState({});
    const [bannerMovie, setBannerMovie] = useState(BASE_MOVIE);
    const [netflixOriginals, setNetflixOriginals] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);

    // TV Shows
    const [trendingTVShows, setTrendingTVShows] = useState([]);
    const [topRatedTVShows, setTopRatedTVShows] = useState([]);

    // problem how to get all genre one time only and use in all page
    const fetctAllGenre = async () => {
        const query = "/genre/movie/list";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
            },
        });
        setGenres(data);
    };

    // Movies
    const fetchMovie = async (id) => {
        const data = await httpRequest.fetchApi(`/movie/${id}`, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                append_to_response: "videos",
            },
        });
        setBannerMovie(data);
    };

    const fetchTrendingMovies = async () => {
        const query = "/trending/movie/day";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                page: 1,
            },
        });
        setTrendingMovies(data.results);
    };

    const fetchNetflixOriginals = async () => {
        const query = "/discover/movie";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                with_networks: 213,
                page: 1,
            },
        });
        setNetflixOriginals(data.results);
        fetchMovie(data.results[Math.floor(Math.random() * data.results.length)].id);
    };

    const fetchTopRatedMovies = async () => {
        const query = "/movie/top_rated";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                page: 1,
            },
        });
        setTopRatedMovies(data.results);
    };

    const fetchActionMovies = async () => {
        const query = "/discover/movie";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                with_genres: 28,
                page: 1,
            },
        });
        setActionMovies(data.results);
    };

    // TV shows
    const fetchTVShow = async (id) => {
        const data = await httpRequest.fetchApi(`/tv/${id}`, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                append_to_response: "videos",
            },
        });
        setBannerMovie(data);
    };

    const fetchTopRatedTVShows = async () => {
        const query = "/tv/top_rated";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                page: 1,
            },
        });
        setTopRatedTVShows(data.results);
    };

    const fetchTrendingTVShows = async () => {
        const query = "/trending/tv/day";
        const data = await httpRequest.fetchApi(query, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                page: 1,
            },
        });
        setTrendingTVShows(data.results);
    };

    useEffect(() => {
        // fetchTVShow(94605);
        fetctAllGenre();
        fetchNetflixOriginals();
        fetchTrendingMovies();
        fetchTopRatedMovies();
        fetchActionMovies();
        fetchTopRatedTVShows();
        fetchTrendingTVShows();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [state, dispatch] = useMiniModalContext();
    let { showModal, posX, posY, movie } = state;
    console.log(state);

    return (
        <>
            <Header />
            <main>
                <Banner movie={bannerMovie} />

                <section className="z-[1] relative main-bg-custom-gradient">
                    <SwiperPlaylist title={"Netflix Originals"} movies={netflixOriginals} />
                    <SwiperPlaylist title={"Only on Netflix"} movies={trendingMovies} />
                    <SwiperPlaylist title={"Trending TV"} movies={trendingTVShows} />
                    <SwiperPlaylist title={"Top rated movies"} movies={topRatedMovies} />
                    <SwiperPlaylist title={"Top rated TV Shows"} movies={topRatedTVShows} />
                    <SwiperPlaylist title={"Action"} movies={actionMovies} />
                    <SwiperPlaylist title={"My List"} movies={trendingMovies} />
                </section>
                {!!state && !!movie && <MiniModal movie={movie} />}
            </main>
            <Footer />
        </>
    );
}

export default Home;
