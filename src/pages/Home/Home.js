import { useEffect, useState } from "react";

import * as service from "~/services";
import Header from "~/layouts/components/Header";
import Banner from "~/components/partial/Banner";
import BannerSkeleton from "~/components/skeleton/BannerSkeleton/BannerSkeleton";
import SwiperPlaylist from "~/components/partial/SwiperPlaylist";
import Footer from "~/layouts/components/Footer";
import PreviewModal from "~/layouts/components/PreviewModal";

function Home() {
    // Movies
    const [netflixOriginals, setNetflixOriginals] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    // TV Shows
    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);

    useEffect(() => {
        const getApiData = async () => {
            const [netflixOriginals, trendingMovies, topRatedMovies, topRatedTvShows, trendingTvShows] = await Promise.all([
                service.discoverNetflixOriginals(),
                // movies
                service.discoverTrendingMovies(),
                service.discoverTopRatedMovies(),
                // tv shows
                service.discoverTopRatedTvShows(),
                service.discoverTrendingTvShows(),
            ]);
            setNetflixOriginals(netflixOriginals);
            setTrendingMovies(trendingMovies);
            setTopRatedMovies(topRatedMovies);
            setTopRatedTvShows(topRatedTvShows);
            setTrendingTvShows(trendingTvShows);
        };
        getApiData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative">
            <PreviewModal />
            <Header />
            {netflixOriginals.length > 0 ? <Banner data={netflixOriginals} /> : <BannerSkeleton />}
            <section className="z-[1] relative main-bg-custom-gradient">
                <SwiperPlaylist title={"Netflix Originals"} movies={netflixOriginals} />
                <SwiperPlaylist title={"Only on Netflix"} movies={trendingMovies} />
                <SwiperPlaylist title={"Trending TV Show"} movies={trendingTvShows} />
                <SwiperPlaylist title={"Top rated Movies"} movies={topRatedMovies} />
                <SwiperPlaylist title={"Top rated TV Shows"} movies={topRatedTvShows} />
            </section>
            <Footer />
        </div>
    );
}

export default Home;
