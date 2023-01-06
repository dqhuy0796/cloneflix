import _ from "lodash";
import { useEffect } from "react";
import { connect } from "react-redux";
import DetailsModal from "~/components/modals/DetailsModal";
import PreviewModal from "~/components/modals/PreviewModal";
import Banner from "~/components/partial/Banner";
import SwiperPlaylist from "~/components/partial/SwiperPlaylist";
import BannerSkeleton from "~/components/skeleton/BannerSkeleton";
import Footer from "~/layouts/Footer";
import Header from "~/layouts/Header";
import { fetchBannerMediaData } from "~/redux/actions/bannerActions";
import {
    discoverMovieGenres,
    discoverMoviesTopRated,
    discoverMoviesTrending,
    discoverNetflixOriginals,
} from "~/redux/actions/moviesActions";
import { getTvShowGenres, getTvShowsTopRated, getTvShowsTrending } from "~/redux/actions/tvShowsActions";

function Home({
    bannerMediaData,
    fetchBannerMediaData,
    discoverMovieGenres,
    netflixOriginals,
    discoverNetflixOriginals,
    moviesTopRated,
    discoverMoviesTopRated,
    moviesTrending,
    discoverMoviesTrending,
    getTvShowGenres,
    tvShowsTopRated,
    getTvShowsTopRated,
    tvShowsTrending,
    getTvShowsTrending,
}) {
    // const [netflixOriginals, setNetflixOriginals] = useState([]);
    // const [trendingMovies, setTrendingMovies] = useState([]);
    // const [topRatedMovies, setTopRatedMovies] = useState([]);
    // // const [trendingTvShows, setTrendingTvShows] = useState([]);
    // // const [topRatedTvShows, setTopRatedTvShows] = useState([]);

    useEffect(() => {
        Promise.all([
            fetchBannerMediaData(),
            discoverMovieGenres(),
            discoverNetflixOriginals(),
            discoverMoviesTopRated(),
            discoverMoviesTrending(),
            getTvShowGenres(),
            getTvShowsTopRated(),
            getTvShowsTrending(),
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-dark-900">
            <Header />
            {!_.isEmpty(bannerMediaData) ? <Banner data={bannerMediaData} /> : <BannerSkeleton />}
            <SwiperPlaylist title={"Netflix Originals"} movies={netflixOriginals.results} />
            <SwiperPlaylist title={"Top Rated Movies"} movies={moviesTopRated.results} />
            <SwiperPlaylist title={"Trending On Netflix"} movies={moviesTrending.results} />
            <SwiperPlaylist title={"Top Rated Shows"} movies={tvShowsTopRated.results} />
            <SwiperPlaylist title={"Trending Shows"} movies={tvShowsTrending.results} />
            <Footer />
            <PreviewModal />
            <DetailsModal />
        </div>
    );
}

const mapStateToProps = (state) => ({
    bannerMediaData: state.banner.data,
    netflixOriginals: state.movies.netflixOriginals,
    moviesTopRated: state.movies.moviesTopRated,
    moviesTrending: state.movies.moviesTrending,
    tvShowsTopRated: state.tvShows.tvShowsTopRated,
    tvShowsTrending: state.tvShows.tvShowsTrending,
});

const mapDispatchToProps = (dispatch) => ({
    fetchBannerMediaData: () => dispatch(fetchBannerMediaData()),
    discoverMovieGenres: () => dispatch(discoverMovieGenres()),
    discoverNetflixOriginals: () => dispatch(discoverNetflixOriginals()),
    discoverMoviesTopRated: () => dispatch(discoverMoviesTopRated()),
    discoverMoviesTrending: () => dispatch(discoverMoviesTrending()),
    getTvShowGenres: () => dispatch(getTvShowGenres()),
    getTvShowsTopRated: () => dispatch(getTvShowsTopRated()),
    getTvShowsTrending: () => dispatch(getTvShowsTrending()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
