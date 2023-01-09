import _, { random } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsModal from "~/components/modals/DetailsModal";
import PreviewModal from "~/components/modals/PreviewModal";
import Banner from "~/components/partial/Banner";
import SwiperPlaylist from "~/components/partial/SwiperPlaylist";
import BannerSkeleton from "~/components/skeleton/BannerSkeleton";
import { browseService, movieService, tvShowService } from "~/services";
//redux
import { connect } from "react-redux";
import { loadBreadcrumbAction, loadTypeParamAction, resetCurrentGenreAction } from "~/redux/actions/pageActions";

function Browse({
    previewShowing,
    detailsShowing,
    loadBreadcrumbAction,
    loadTypeParamAction,
    resetCurrentGenreAction,
}) {
    const [playlists, setPlaylists] = useState([]);
    const [banner, setBanner] = useState({});
    const { type } = useParams();

    // header and title handle
    useEffect(() => {
        const historyDocumentTitle = document.title;
        switch (type) {
            case "tv":
                loadTypeParamAction({ value: "tv", title: "TV Shows" });
                document.title = "TV Shows - Netflix";
                break;
            case "movie":
                loadTypeParamAction({ value: "movie", title: "Movies" });
                document.title = "Movies - Netflix";
                break;
            case "lastest":
                loadTypeParamAction({ value: "lastest", title: "Lastest" });
                document.title = "Lastest - Netflix";
                break;
            default:
                loadTypeParamAction({ value: "", title: "" });
                document.title = "Home - Netflix";
                break;
        }
        resetCurrentGenreAction();

        return () => {
            document.title = historyDocumentTitle;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    // media data handler
    useEffect(() => {
        const fetchTvShows = async () => {
            const tvShowsAiringToday = await tvShowService.getTvShowsAiringToday();
            const tvShowsOnTheAir = await tvShowService.getTvShowsOnTheAir();
            const tvShowsTopRated = await tvShowService.getTvShowsTopRated();
            const tvShowsTrending = await tvShowService.getTvShowsTrending();
            const tvShowsPopular = await tvShowService.getTvShowsPopular();

            setPlaylists([
                { title: "Trending", data: tvShowsTrending },
                { title: "Popular", data: tvShowsPopular },
                { title: "Airing Today", data: tvShowsAiringToday },
                { title: "On The Air", data: tvShowsOnTheAir },
                { title: "Top Rated", data: tvShowsTopRated },
            ]);
        };
        const fetchMovies = async () => {
            const moviesNowPlaying = await movieService.getMoviesNowPlaying();
            const moviesUpComing = await movieService.getMoviesUpComing();
            const moviesTopRated = await movieService.getMoviesTopRated();
            const moviesTrending = await movieService.getMoviesTrending();
            const moviesPopular = await movieService.getMoviesPopular();

            setPlaylists([
                { title: "Trending", data: moviesTrending },
                { title: "Now Playing", data: moviesNowPlaying },
                { title: "Popular", data: moviesPopular },
                { title: "Up Coming", data: moviesUpComing },
                { title: "Top Rated", data: moviesTopRated },
            ]);
        };

        const fetchLastest = async () => {
            const moviesNowPlaying = await movieService.getMoviesNowPlaying();
            const tvShowsAiringToday = await tvShowService.getTvShowsAiringToday();
            const moviesUpComing = await movieService.getMoviesUpComing();
            const tvShowsOnTheAir = await tvShowService.getTvShowsOnTheAir();
            const netflixTrending = await browseService.getNetflixTrending();

            setPlaylists([
                { title: "Now Playing", data: moviesNowPlaying },
                { title: "Airing Today", data: tvShowsAiringToday },
                { title: "Up Coming", data: moviesUpComing },
                { title: "On The Air", data: tvShowsOnTheAir },
                { title: "Trending on Netflix", data: netflixTrending },
            ]);
        };

        const fetchBrowse = async () => {
            const netflixTrending = await browseService.getNetflixTrending();
            const netflixOriginals = await browseService.getNetflixOriginals();
            const moviesPopular = await movieService.getMoviesPopular();
            const moviesTopRated = await movieService.getMoviesTopRated();
            const tvShowsPopular = await tvShowService.getTvShowsPopular();
            const tvShowsTopRated = await tvShowService.getTvShowsTopRated();

            setPlaylists([
                { title: "Trending on Netflix", data: netflixTrending },
                { title: "Netflix Original", data: netflixOriginals },
                { title: "Popular Movies", data: moviesPopular },
                { title: "Popular TV Shows", data: tvShowsPopular },
                { title: "Top Rated Movies", data: moviesTopRated },
                { title: "Top Rated TV Shows", data: tvShowsTopRated },
            ]);
        };
        setPlaylists([]);
        switch (type) {
            case "tv":
                fetchTvShows();
                break;
            case "movie":
                fetchMovies();
                break;
            case "lastest":
                fetchLastest();
                break;
            default:
                fetchBrowse();
                break;
        }
    }, [type]);

    // banner handler
    useEffect(() => {
        const fetchBanner = async () => {
            if (!_.isEmpty(playlists)) {
                const randomIndex = random(playlists[0].data.results.length);
                const randomMedia = playlists[0].data.results[randomIndex];
                if (randomMedia) {
                    if (randomMedia.first_air_date) {
                        const response = await tvShowService.getTvShowDetails(randomMedia.id);
                        setBanner(response);
                    } else {
                        const response = await movieService.getMovieDetails(randomMedia.id);
                        setBanner(response);
                    }
                }
            }
        };
        setBanner({});
        fetchBanner();
    }, [playlists]);

    return (
        <div className="bg-dark-900 min-h-screen">
            <div className="relative min-h-[20vh]">
                {!_.isEmpty(banner) ? <Banner data={banner} /> : <BannerSkeleton />}
            </div>
            {!_.isEmpty(playlists) &&
                playlists.map((item, index) => (
                    <SwiperPlaylist key={index} title={item.title} movies={item.data.results} />
                ))}
            {previewShowing && <PreviewModal />}
            {detailsShowing && <DetailsModal />}
        </div>
    );
}

const mapStateToProps = (state) => ({
    detailsShowing: state.modal.detailsShowing,
    previewShowing: state.modal.previewShowing,
    type: state.page.type,
    genres: state.page.genres,
    genreId: state.page.genreId,
    currentGenre: state.page.currentGenre,
    breadcrumb: state.page.breadcrumb,
});

const mapDispatchToProps = (dispatch) => ({
    resetCurrentGenreAction: () => dispatch(resetCurrentGenreAction()),
    loadTypeParamAction: (type) => dispatch(loadTypeParamAction(type)),
    loadBreadcrumbAction: (type, genre) => dispatch(loadBreadcrumbAction(type, genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
