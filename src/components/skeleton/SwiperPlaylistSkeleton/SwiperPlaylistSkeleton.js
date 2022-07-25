import ElementSkeleton from "../ElementSkeleton";
import MovieThumbSkeleton from "../MovieThumbSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";

function SwiperPlaylistSkeleton({ className }) {
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
    return (
        <div className={`py-[3vw] ${className}`}>
            <h1 className="px-3 lg:px-[60px] mb-2 w-full h-9">
                <ElementSkeleton type="title" />
            </h1>

            <Swiper spaceBetween={5} slidesPerView={1} slidesPerGroup={1} breakpoints={swiperBreakpoint} className="playlist-swiper">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <SwiperSlide key={n}>
                        <MovieThumbSkeleton />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SwiperPlaylistSkeleton;
