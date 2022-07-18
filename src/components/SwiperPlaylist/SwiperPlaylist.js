import PropTypes from "prop-types";
import { memo, useRef } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

// import "swiper/css";

import MovieThumb from "../MovieThumb";

SwiperCore.use([Navigation]);

function SwiperPlaylist({ title, movies, className }) {
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
        <div className={className}>
            <h1 className="px-3 lg:px-[60px] mb-2 w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold text-2xl text-white bg-transparent">
                {title}
            </h1>

            <Swiper
                slidesPerView={1}
                spaceBetween={4}
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
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id} className="">
                        <MovieThumb movie={movie} />
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
    );
}

SwiperPlaylist.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default memo(SwiperPlaylist);
