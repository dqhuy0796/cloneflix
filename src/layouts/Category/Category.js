import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsModal from "~/components/modals/DetailsModal";
import PreviewModal from "~/components/modals/PreviewModal";
import MovieThumb from "~/components/partial/MovieThumb";
import { loadTypeParamAction } from "~/redux/actions/pageActions";
import { browseService, movieService, tvShowService } from "~/services";

//redux
import _ from "lodash";
import { connect } from "react-redux";

function Category({ previewShowing, detailsShowing, currentGenre, searchKeyword, myList, loadTypeParamAction }) {
    const [playlist, setPlaylist] = useState([]);
    const { type, genreId } = useParams();

    useEffect(() => {
        const historyDocumentTitle = document.title;
        const fetchTvShowsByGenreId = async (id) => {
            const response = await tvShowService.getTvShowsByGenreId(id);
            if (!_.isEmpty(response)) {
                setPlaylist(response.results);
            }
        };
        const fetchMoviesByGenreId = async (id) => {
            const response = await movieService.getMoviesByGenreId(id);
            if (!_.isEmpty(response)) {
                setPlaylist(response.results);
            }
        };

        setPlaylist([]);
        switch (type) {
            case "tv":
                fetchTvShowsByGenreId(genreId);
                document.title = `TV ${currentGenre.name} - Netflix`;
                break;
            case "movie":
                fetchMoviesByGenreId(genreId);
                document.title = `Movie ${currentGenre.name} - Netflix`;
                break;
            default:
                break;
        }

        return () => {
            setPlaylist([]);
            document.title = historyDocumentTitle;
        };
    }, [type, genreId, currentGenre, loadTypeParamAction]);

    useEffect(() => {
        const historyDocumentTitle = document.title;
        const fetchDataByKeyword = async (searchKeyword) => {
            const response = await browseService.getSearchMultiResult(searchKeyword);
            if (!_.isEmpty(response)) {
                setPlaylist(response.results);
            }
        };

        if (type === "search") {
            setPlaylist([]);
            fetchDataByKeyword(searchKeyword);
            document.title = "Search - Netflix";
        }

        return () => {
            setPlaylist([]);
            document.title = historyDocumentTitle;
        };
    }, [searchKeyword, type]);

    useEffect(() => {
        const historyDocumentTitle = document.title;
        if (type === "mylist") {
            setPlaylist([]);
            loadTypeParamAction({ value: "my list", title: "My List" });
            setPlaylist(myList);
            document.title = "My List - Netflix";
        }

        return () => {
            setPlaylist([]);
            document.title = historyDocumentTitle;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myList, type]);

    return (
        <div className="p-[60px] bg-dark-900 min-h-screen">
            <div className="min-h-[160px] pt-24 pb-16">
                {type === "search" && (
                    <h2 className="text-2xl font-semibold text-light-900">{`Search results for '${searchKeyword}'`}</h2>
                )}
            </div>
            <ul className="grid grid-cols-autofit-180 lg:grid-cols-autofit-240 xl:grid-cols-autofit-300 gap-x-2 gap-y-16">
                {!_.isEmpty(playlist) &&
                    playlist.map((item, index) => (
                        <li key={index}>
                            <MovieThumb data={item} />
                        </li>
                    ))}
            </ul>
            {previewShowing && <PreviewModal />}
            {detailsShowing && <DetailsModal />}
        </div>
    );
}

const mapStateToProps = (state) => ({
    detailsShowing: state.modal.detailsShowing,
    previewShowing: state.modal.previewShowing,
    currentGenre: state.page.currentGenre,
    searchKeyword: state.page.searchKeyword,
    myList: state.user.myList,
});

const mapDispatchToProps = (dispatch) => ({
    loadTypeParamAction: (data) => dispatch(loadTypeParamAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
