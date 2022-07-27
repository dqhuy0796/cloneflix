import PropTypes from "prop-types";
import { memo, useReducer, useRef } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import MovieThumb from "~/components/partial/MovieThumb";
import MovieThumbSkeleton from "~/components/skeleton/MovieThumbSkeleton";
import MiniModal from "~/layouts/components/MiniModal";
import { MiniModalContext } from "~/miniModalContext";
import reducer, { initState } from "~/miniModalContext/reducer";

SwiperCore.use([Navigation]);

function SwiperPlaylist({ title, movies, className }) {
    const [state, dispatch] = useReducer(reducer, initState);

    const swiperBreakpoint = {
        0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
        },
        320: {
            slidesPerView: 3,
            slidesPerGroup: 3,
        },
        768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
        1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
        },
        1280: {
            slidesPerView: 5,
            slidesPerGroup: 5,
        },
        1536: {
            slidesPerView: 6,
            slidesPerGroup: 6,
        },
    };

    const swiperPrevRef = useRef(null);
    const swiperNextRef = useRef(null);

    return (
        <MiniModalContext.Provider value={[state, dispatch]}>
            <div className={`relative z-0 py-[2vw] ${className}`}>
                {state.isShowing && <MiniModal />}

                <h1 className="px-3 lg:px-[60px] flex items-center h-12 w-full overflow-hidden capitalize text-ellipsis whitespace-nowrap font-bold text-[20px] leading-9 text-white bg-transparent">
                    {title}
                </h1>

                <Swiper
                    spaceBetween={5}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    loop={true}
                    // loopFillGroupWithBlank={true}
                    breakpoints={swiperBreakpoint}
                    navigation={{
                        prevEl: swiperPrevRef.current ? swiperPrevRef.current : undefined,
                        nextEl: swiperNextRef.current ? swiperNextRef.current : undefined,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = swiperPrevRef.current;
                        swiper.params.navigation.nextEl = swiperNextRef.current;
                    }}
                    className="playlist-swiper group"
                >
                    {movies.length > 0
                        ? movies.map((movie) => (
                              <SwiperSlide key={movie.id} className="">
                                  <MovieThumb movie={movie} />
                              </SwiperSlide>
                          ))
                        : [1, 2, 3, 4, 5, 6].map((n) => (
                              <SwiperSlide key={n}>
                                  <MovieThumbSkeleton />
                              </SwiperSlide>
                          ))}

                    <button ref={swiperPrevRef} className="playlist-navigation left-0">
                        <BsChevronCompactLeft />
                    </button>

                    <button ref={swiperNextRef} className="playlist-navigation right-0">
                        <BsChevronCompactRight />
                    </button>
                </Swiper>
            </div>
        </MiniModalContext.Provider>
    );
}

SwiperPlaylist.propTypes = {
    title: PropTypes.string,
    movies: PropTypes.array.isRequired,
};

export default memo(SwiperPlaylist);
