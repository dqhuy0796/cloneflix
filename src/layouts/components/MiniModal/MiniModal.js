import { BiLike } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoPlaySharp } from "react-icons/io5";

import { useContext, useEffect, useRef, useState } from "react";
import RoundIconButton from "~/components/shared/RoundIconButton";
import { SMALL_IMAGE_BASE_URL } from "~/constants";
import { action, MiniModalContext } from "~/miniModalContext";
import * as service from "~/services";

function MiniModal() {
    const [state, dispatch] = useContext(MiniModalContext);

    const { isShowing, movie, position } = state;

    const [modalPosition, setModalPosition] = useState(null);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const caculatePosition = (position) => {
            const modalWidth = ((position.right - position.left) * 4) / 3;
            if (position.left < 100) {
                setModalPosition({ width: `${modalWidth}px`, left: "60px", transformOrigin: "left" });
            } else if (window.innerWidth - position.right < 100) {
                setModalPosition({ width: `${modalWidth}px`, right: "60px", transformOrigin: "right" });
            } else {
                const pos = (position.left + position.right - modalWidth) / 2;
                setModalPosition({ width: `${modalWidth}px`, left: `${pos}px`, transformOrigin: "center" });
            }
        };
        caculatePosition(state.position);

        const getGenresNameById = (genresArray) => {
            const checkGenreId = (item) => {
                return state.movie.genre_ids.some((id) => item.id === id);
            };
            return genresArray.filter((item) => checkGenreId(item));
        };
        const getApiGenres = async () => {
            // 2 api return duplicate result
            const result = state.movie?.media_type ? await service.fetchTvShowGenres() : await service.fetchMovieGenres();
            const filteredGenres = getGenresNameById(result.genres);
            if (filteredGenres.length > 4) filteredGenres.splice(4, filteredGenres.length - 4);
            setGenres(filteredGenres);
        };
        getApiGenres();
    }, [state]);

    const modalRef = useRef(null);

    const handleMouseLeave = () => {
        dispatch(action.setHideMiniModal());
    };

    // need to improve performance when mouse over and mouse leave

    return (
        <div
            ref={modalRef}
            onMouseLeave={handleMouseLeave}
            style={modalPosition}
            className={`absolute z-[9999] top-1/2 -translate-y-1/2 bg-dark-900 rounded-lg overflow-hidden shadow-xs animation-fade-in`}
        >
            <div className="relative w-full pt-[150%] lg:pt-[56.25%] rounded-md overflow-hidden">
                <img
                    src={`${SMALL_IMAGE_BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
                    alt={movie?.title || movie?.name || movie?.original_title || movie?.original_name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <ul className="text-light-900 bg-dark-500 p-4">
                <li className="flex items-center gap-x-2 mb-3">
                    <RoundIconButton sizeS border revert>
                        <IoPlaySharp className="relative left-0.5" />
                    </RoundIconButton>
                    <RoundIconButton sizeS border>
                        <FiPlus />
                    </RoundIconButton>
                    <RoundIconButton sizeS border>
                        <BiLike />
                    </RoundIconButton>
                    <RoundIconButton sizeS border className={"ml-auto"}>
                        <BsChevronDown className="relative top-0.5" />
                    </RoundIconButton>
                </li>
                <li className="flex items-center gap-x-2 mb-2">
                    <p className="font-medium text-green-600">{`${Math.ceil(movie?.vote_average * 10)}% Match`}</p>
                    <p className="px-1 text-[12px] font-light border border-solid border-light-100 rounded-none">{movie?.adult ? "18+" : "13+"}</p>
                </li>
                <li className="flex items-center gap-x-5">
                    {genres.length > 0 &&
                        genres.map((item) => (
                            <p key={item.id} className="genre-item">
                                {item.name}
                            </p>
                        ))}
                </li>
            </ul>
        </div>
    );
}

export default MiniModal;
