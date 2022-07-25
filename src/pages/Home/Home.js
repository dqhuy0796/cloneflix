import { useContext, useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Banner from "~/components/partial/Banner";
import MiniModal from "~/layouts/components/MiniModal";
import SwiperPlaylist from "~/components/partial/SwiperPlaylist";
import Footer from "~/layouts/components/Footer";
import Header from "~/layouts/components/Header";
import * as service from "~/services";
import { useMiniModalContext } from "~/miniModalContext";
import BannerSkeleton from "~/components/skeleton/BannerSkeleton/BannerSkeleton";

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

    const [state, dispatch] = useMiniModalContext();
    // let { showModal, posX, posY, movie } = state;
    console.log(state);

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
            {/* {!!state && <MiniModal />} */}
            <Footer />
        </>
    );
}

export default Home;
