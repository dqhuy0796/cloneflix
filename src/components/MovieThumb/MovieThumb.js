import PropTypes from "prop-types";
import { FiPlus } from "react-icons/fi";
import { IoPlaySharp } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";

import { IMAGE_BASE_URL } from "~/constants";
import { useViewport } from "~/hooks";
import RoundIconButton from "../RoundIconButton";

function MovieThumb({ movie }) {
    const viewport = useViewport();

    const isMobile = viewport.width < 1024;

    return (
        <>
            {isMobile ? (
                <div className="relative w-full pt-[150%] lg:pt-[56.25%] rounded-md overflow-hidden">
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path || movie.backdrop_path}`}
                        alt={movie.title || movie.name || movie.original_title || movie.original_name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                </div>
            ) : (
                <div className="group w-full h-full rounded overflow-hidden">
                    <div className="movie-poster relative w-full pt-[150%] lg:pt-[56.25%]">
                        <img
                            src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                            alt={movie.title || movie.name || movie.original_title || movie.original_name}
                            className="z-0 absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </div>
                    <div className="movie-info text-light-900 bg-dark-500">
                        {/* <p className="">{movie.title || movie.name || movie.original_title || movie.original_name}</p> */}
                        <ul>
                            <li className="flex items-center gap-2 p-4">
                                <RoundIconButton textBlack>
                                    <IoPlaySharp className="relative left-0.5" />
                                </RoundIconButton>
                                <RoundIconButton>
                                    <FiPlus />
                                </RoundIconButton>
                                <RoundIconButton>
                                    <BiLike />
                                </RoundIconButton>
                                <RoundIconButton className={"ml-auto"}>
                                    <BsChevronDown className="relative top-0.5" />
                                </RoundIconButton>
                            </li>
                            <li className="flex items-center gap-2 p-2">
                                <p className="text-base font-semibold text-green-500">
                                    {`${Math.ceil(movie.vote_average * 10)}% Match`}
                                </p>
                                <p className="px-1 text-xs font-bold border border-solid border-light-100 rounded-none">
                                    {movie.adult ? "18+" : "16+"}
                                </p>
                            </li>
                            <li className="flex items-center gap-2 p-2">
                                {movie.genre_ids.map((item) => (
                                    <p>{item}</p>
                                ))}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

MovieThumb.propTypes = {
    movie: PropTypes.object.isRequired,
};

export default MovieThumb;
