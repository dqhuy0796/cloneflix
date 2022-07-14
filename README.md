homepage

-   thanh navbar (blur) góc trên
-   background là video trailer
-   swiper/carousel danh sách popular
-   nội dung tóm tắt của phim và các chức năng chính (play, favourite, add ...) đc hiển thị ở góc trái của background

---

Data

export interface Genre {
id: number
name: string
}

export interface Movie {
title: string
backdrop_path: string
media_type?: string
release_date?: string
first_air_date: string
genre_ids: number[]
id: number
name: string
origin_country: string[]
original_language: string
original_name: string
overview: string
popularity: number
poster_path: string
vote_average: number
vote_count: number
}
