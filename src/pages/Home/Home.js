import { useEffect, useState } from "react";

import * as service from "~/services";
import Header from "~/layouts/components/Header";
import Banner from "~/components/partial/Banner";
import BannerSkeleton from "~/components/skeleton/BannerSkeleton/BannerSkeleton";
import SwiperPlaylist from "~/components/partial/SwiperPlaylist";
import Footer from "~/layouts/components/Footer";

function Home() {
    // Movies
    const [netflixOriginals, setNetflixOriginals] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    // TV Shows
    const [trendingTVShows, setTrendingTVShows] = useState([]);
    const [topRatedTVShows, setTopRatedTVShows] = useState([]);

    useEffect(() => {
        const getApiData = async () => {
            const [netflixOriginals, trendingMovies, topRatedMovies, topRatedTVShows, trendingTVShows] = await Promise.all([
                service.discoverNetflixOriginals(),
                // movies
                service.discoverTrendingMovies(),
                service.discoverTopRatedMovies(),
                // tv shows
                service.discoverTopRatedTVShows(),
                service.discoverTrendingTVShows(),
            ]);
            setNetflixOriginals(netflixOriginals);
            setTrendingMovies(trendingMovies);
            setTopRatedMovies(topRatedMovies);
            setTopRatedTVShows(topRatedTVShows);
            setTrendingTVShows(trendingTVShows);
        };
        getApiData();
        // const timer = setTimeout(async () => {
        //     const [netflixOriginals, trendingMovies, topRatedMovies, topRatedTVShows, trendingTVShows] = await Promise.all([
        //         service.discoverNetflixOriginals(),
        //         // movies
        //         service.discoverTrendingMovies(),
        //         service.discoverTopRatedMovies(),
        //         // tv shows
        //         service.discoverTopRatedTVShows(),
        //         service.discoverTrendingTVShows(),
        //     ]);
        //     setNetflixOriginals(netflixOriginals);
        //     setTrendingMovies(trendingMovies);
        //     setTopRatedMovies(topRatedMovies);
        //     setTopRatedTVShows(topRatedTVShows);
        //     setTrendingTVShows(trendingTVShows);
        // }, 5000);

        // return () => clearTimeout(timer);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />
            {netflixOriginals.length > 0 ? <Banner data={netflixOriginals} /> : <BannerSkeleton />}
            <section className="z-[1] relative main-bg-custom-gradient">
                <SwiperPlaylist title={"Netflix Originals"} movies={netflixOriginals} />
                <SwiperPlaylist title={"Only on Netflix"} movies={trendingMovies} />
                <SwiperPlaylist title={"Trending TV Show"} movies={trendingTVShows} />
                <SwiperPlaylist title={"Top rated Movies"} movies={topRatedMovies} />
                <SwiperPlaylist title={"Top rated TV Shows"} movies={topRatedTVShows} />
            </section>
            <Footer />
        </>
    );
}

export default Home;
