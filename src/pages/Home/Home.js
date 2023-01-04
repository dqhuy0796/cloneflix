import { useEffect } from "react";

import { connect } from "react-redux";
import Banner from "~/components/partial/Banner";
import SwiperPlaylist from "~/components/partial/SwiperPlaylist";
import Footer from "~/layouts/Footer";
import Header from "~/layouts/Header";
import { fetchBannerMediaData } from "~/redux/actions/bannerActions";
import {
    discoverMoviesTopRated,
    discoverMoviesTrending,
    discoverNetflixOriginals,
} from "~/redux/actions/moviesActions";

function Home({
    bannerMediaData,
    fetchBannerMediaData,
    netflixOriginals,
    discoverNetflixOriginals,
    moviesTopRated,
    discoverMoviesTopRated,
    moviesTrending,
    discoverMoviesTrending,
}) {
    // const [netflixOriginals, setNetflixOriginals] = useState([]);
    // const [trendingMovies, setTrendingMovies] = useState([]);
    // const [topRatedMovies, setTopRatedMovies] = useState([]);
    // // const [trendingTvShows, setTrendingTvShows] = useState([]);
    // // const [topRatedTvShows, setTopRatedTvShows] = useState([]);

    useEffect(() => {
        Promise.all([
            fetchBannerMediaData(),
            discoverNetflixOriginals(),
            discoverMoviesTopRated(),
            discoverMoviesTrending(),
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative">
            <Header />
            <Banner data={bannerMediaData} />
            <section className="z-[1] relative main-bg-custom-gradient">
                <SwiperPlaylist title={"Netflix Originals"} movies={netflixOriginals.results} />
                <SwiperPlaylist title={"Top Rated Movies"} movies={moviesTopRated.results} />
                <SwiperPlaylist title={"Trending On Netflix"} movies={moviesTrending.results} />
            </section>
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => ({
    bannerMediaData: state.banner.data,
    netflixOriginals: state.movies.netflixOriginals,
    moviesTopRated: state.movies.moviesTopRated,
    moviesTrending: state.movies.moviesTrending,
});

const mapDispatchToProps = (dispatch) => ({
    fetchBannerMediaData: () => dispatch(fetchBannerMediaData()),
    discoverNetflixOriginals: () => dispatch(discoverNetflixOriginals()),
    discoverMoviesTopRated: () => dispatch(discoverMoviesTopRated()),
    discoverMoviesTrending: () => dispatch(discoverMoviesTrending()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
