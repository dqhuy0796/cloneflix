import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Banner from "~/components/Banner";
import Playlist from "~/components/Playlist";
import Header from "~/layouts/components/Header";
import * as httpRequest from "~/utils/httpRequest";

const BASE_MOVIE = {
    adult: false,
    backdrop_path: "/5PnypKiSj2efSPqThNjTXz8jwOg.jpg",
    belongs_to_collection: null,
    budget: 0,
    genres: [
        {
            id: 14,
            name: "Fantasy",
        },
        {
            id: 28,
            name: "Action",
        },
    ],
    homepage: "https://www.hulu.com/movie/the-princess-39519f9b-f0d4-49e0-bfdf-e8e6592cae71",
    id: 759175,
    imdb_id: "tt13406136",
    original_language: "en",
    original_title: "The Princess",
    overview:
        "A beautiful, strong-willed young royal refuses to wed the cruel sociopath to whom she is betrothed and is kidnapped and locked in a remote tower of her father’s castle. With her scorned, vindictive suitor intent on taking her father’s throne, the princess must protect her family and save the kingdom.",
    popularity: 201.761,
    poster_path: "/9pCoqX24a6rE981fY1O3PmhiwrB.jpg",
    production_companies: [
        {
            id: 333,
            logo_path: "/5xUJfzPZ8jWJUDzYtIeuPO4qPIa.png",
            name: "Original Film",
            origin_country: "US",
        },
        {
            id: 127928,
            logo_path: "/h0rjX5vjW5r8yEnUBStFarjcLT4.png",
            name: "20th Century Studios",
            origin_country: "US",
        },
    ],
    production_countries: [
        {
            iso_3166_1: "BG",
            name: "Bulgaria",
        },
        {
            iso_3166_1: "US",
            name: "United States of America",
        },
    ],
    release_date: "2022-06-16",
    revenue: 0,
    runtime: 94,
    spoken_languages: [
        {
            english_name: "English",
            iso_639_1: "en",
            name: "English",
        },
    ],
    status: "Released",
    tagline: "Bow to no one.",
    title: "The Princess",
    video: false,
    vote_average: 6.6,
    vote_count: 68,
    videos: {
        results: [
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Battle",
                key: "mfOohqS0g2w",
                site: "YouTube",
                size: 1080,
                type: "Teaser",
                official: true,
                published_at: "2022-07-02T19:00:12.000Z",
                id: "62c09a8771f095007cc33c92",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "The Princess in 60 Seconds",
                key: "UJD6cTCuN_4",
                site: "YouTube",
                size: 1080,
                type: "Featurette",
                official: true,
                published_at: "2022-06-30T21:43:36.000Z",
                id: "62bec589e942be040d7b4e3e",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "You’re in the Presence of a Princess",
                key: "PzbOvgOD7cw",
                site: "YouTube",
                size: 1080,
                type: "Clip",
                official: true,
                published_at: "2022-06-28T18:15:02.000Z",
                id: "62bba3702e2b2c031cecc7f7",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "The Princess’ Guide",
                key: "tIjWNwvkPCM",
                site: "YouTube",
                size: 1080,
                type: "Featurette",
                official: true,
                published_at: "2022-06-27T19:00:21.000Z",
                id: "62bba3b5229ae21212d4b344",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Heart",
                key: "bfx-asgiogw",
                site: "YouTube",
                size: 1080,
                type: "Teaser",
                official: true,
                published_at: "2022-06-26T18:00:08.000Z",
                id: "62bbca7a9a9f9a00614290c6",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Ladylike",
                key: "wmK7xuUH2xo",
                site: "YouTube",
                size: 1080,
                type: "Teaser",
                official: true,
                published_at: "2022-06-21T17:00:34.000Z",
                id: "62b6a66de1faed00610d4b05",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Official Clip: Nice to Meet You",
                key: "-BRYiHqsIKg",
                site: "YouTube",
                size: 1080,
                type: "Clip",
                official: true,
                published_at: "2022-06-15T15:00:22.000Z",
                id: "62aab8893d43e00051139efd",
            },
            {
                iso_639_1: "en",
                iso_3166_1: "US",
                name: "Official Trailer",
                key: "6kFCkfdOfMU",
                site: "YouTube",
                size: 1080,
                type: "Trailer",
                official: true,
                published_at: "2022-06-02T14:00:00.000Z",
                id: "6298dc57ca8354544b3bc6d1",
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

    const fetchMovie = async (id) => {
        const data = await httpRequest.fetchApi(`/movie/${id}`, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                append_to_response: "videos",
            },
        });
        console.log(data.videos);
        setBannerMovie(data);
    };

    const fetchTVShow = async (id) => {
        const data = await httpRequest.fetchApi(`/tv/${id}`, {
            params: {
                api_key: httpRequest.API_KEY,
                language: "en-US",
                append_to_response: "videos",
            },
        });
        return data;
    };

    const fetchTrendingMovies = async () => {
        const query = "/trending/all/day";
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
        const IDresults = data.results.map((item) => item.id);
        let TVShows = [];
        IDresults.map(async (id) => {
            let TVShow = await fetchTVShow(id);
            TVShows.push(TVShow);
        });
        console.log(TVShows);
    };

    useEffect(() => {
        fetctAllGenre();
        fetchNetflixOriginals();
        fetchTrendingMovies();
        fetchTopRatedMovies();
        fetchActionMovies();
        fetchTopRatedTVShows();
        // fetchBannerMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)].id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />
            <section className="relative bg-dark-900">
                <Banner movie={bannerMovie} />
                <Playlist
                    title={"Netflix Originals"}
                    movies={netflixOriginals}
                    className="py-6 bg-dark-900 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:bg-transparent lg:bg-gradient-to-b lg:from-transparent lg:via-dark-900 lg:to-dark-900"
                />
            </section>
            <section className="bg-dark-900">
                <Playlist title={"Only on Netflix"} movies={trendingMovies} className="py-6" />
                <Playlist title={"Top rated movies"} movies={topRatedMovies} className="py-6" />
                <Playlist title={"Top rated TV Shows"} movies={topRatedTVShows} className="py-6" />
                <Playlist title={"Action"} movies={actionMovies} className="py-6" />
                <Playlist title={"My List"} movies={trendingMovies} className="py-6" />
            </section>
        </>
    );
}

export default Home;
