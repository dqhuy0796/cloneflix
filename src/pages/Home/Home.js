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
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative">
            <Header />
            {!_.isEmpty(bannerMediaData) ? <Banner data={bannerMediaData} /> : <BannerSkeleton />}
            <section className="z-[1] relative main-bg-custom-gradient">
                <SwiperPlaylist title={"Netflix Originals"} movies={netflixOriginals.results} />
                <SwiperPlaylist title={"Top Rated Movies"} movies={moviesTopRated.results} />
                <SwiperPlaylist title={"Trending On Netflix"} movies={moviesTrending.results} />
            </section>
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
});

const mapDispatchToProps = (dispatch) => ({
    fetchBannerMediaData: () => dispatch(fetchBannerMediaData()),
    discoverMovieGenres: () => dispatch(discoverMovieGenres()),
    discoverNetflixOriginals: () => dispatch(discoverNetflixOriginals()),
    discoverMoviesTopRated: () => dispatch(discoverMoviesTopRated()),
    discoverMoviesTrending: () => dispatch(discoverMoviesTrending()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
