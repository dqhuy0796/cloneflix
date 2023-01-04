import { memo, useRef } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import MovieThumb from "~/components/partial/MovieThumb";
import MovieThumbSkeleton from "~/components/skeleton/MovieThumbSkeleton";

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

    console.log(`${title} re-render`);

    return (
        <div className={`py-[2vw] ${className}`}>
            <h1 className="px-3 lg:px-[60px] flex items-center h-12 w-full overflow-hidden capitalize text-ellipsis whitespace-nowrap font-bold text-2xl text-white bg-transparent">
                {title || "Unknown playlist"}
            </h1>

            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                slidesPerGroup={1}
                loop={true}
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
                {movies && movies.length > 0
                    ? movies.map((movie) => (
                          <SwiperSlide key={movie.id} className="">
                              <MovieThumb movie={movie} />
                          </SwiperSlide>
                      ))
                    : [1, 2, 3, 4, 5, 6].map((index) => (
                          <SwiperSlide key={index}>
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
    );
}

export default memo(SwiperPlaylist);
