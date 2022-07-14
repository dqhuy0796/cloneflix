import { memo, useRef } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import MovieThumb from "../MovieThumb";

function Playlist({ title, movies, className }) {
    const playlistRef = useRef(null);

    const handleClickToScroll = (direction) => {
        if (playlistRef.current) {
            //-----------------------------------------------
            // playlistRef (overflow-x-visible)
            //-----------------------------------------------

            // const currentPlaylist = window.getComputedStyle(playlistRef.current);
            // const matrix = new DOMMatrixReadOnly(currentPlaylist.transform);
            // const currentWidth = currentPlaylist.width.replace(/\D+/g, "");
            // let currentPositionX = matrix.m41 / currentWidth;
            // if (direction === "left") {
            //     currentPositionX = currentPositionX - 1;
            // } else if (direction === "right") {
            //     currentPositionX = currentPositionX + 1;
            // }
            // playlistRef.current.style.transform = `translate3d(${currentPositionX * 100}%, 0, 0)`;

            //-----------------------------------------------
            // playlistRef (overflow-x-scroll)
            //-----------------------------------------------
            const { scrollLeft, clientWidth } = playlistRef.current;
            const scrollToPosition = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            playlistRef.current.scrollTo({ left: scrollToPosition, behavior: "smooth" });
        }
    };

    console.log("re-render " + title);

    return (
        <div className={className}>
            <h1 className="px-3 lg:px-[60px] mb-2 w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-2xl text-white bg-transparent">
                {title}
            </h1>

            <div className="group flex bg-transparent w-full overflow-x-hidden overflow-y-visible">
                <button className="slider-navigation" onClick={() => handleClickToScroll("left")}>
                    <BsChevronCompactLeft />
                </button>
                <ul ref={playlistRef} className="slider-wrapper">
                    {movies.map((movie) => (
                        <li
                            key={movie.id}
                            className="block h-full w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/4 xl:w-1/5 2xl:w-1/6 bg-transparent shrink-0 p-1"
                        >
                            <MovieThumb movie={movie} />
                        </li>
                    ))}
                </ul>
                <button className="slider-navigation" onClick={() => handleClickToScroll("right")}>
                    <BsChevronCompactRight />
                </button>
            </div>
        </div>
    );
}

export default memo(Playlist);
