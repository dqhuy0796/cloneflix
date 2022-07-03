import { useEffect, useState } from "react";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import axios from "axios";
import MovieBackground from "~/components/MovieBackground";
import MovieThumb from "~/components/MovieThumb";

function Home() {
    const fakeData = [
        {
            status: true,
            msg: "",
            movie: {
                modified: {
                    time: "2022-05-30T14:56:36.000Z",
                },
                _id: "1",
                name: "Ngôi Trường Xác Sống",
                origin_name: "All of Us Are Dead",
                content:
                    "<p>Phim là câu chuyện xoay quanh hành trình sống còn chống lại xác sống của một nhóm học sinh bị mắc kẹt trong trường học khi xuất hiện một loại virus lây nhiễm có khả năng biến con người thành xác sống đang lây lan khắp thành phố. Đây không chỉ đơn thuần là cuộc đấu tranh với những thứ nguy hiểm và đáng sợ mà còn là thử thách khi đối diện với sự đố kỵ và lòng tham vô đáy của con người.</p>",
                type: "series",
                status: "completed",
                thumb_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-thumb.jpg",
                trailer_url: "",
                time: "60 phút/tập",
                episode_current: "Hoàn Tất (12/12)",
                episode_total: "12 Tập",
                quality: "HD",
                lang: "Vietsub",
                notify: "",
                showtimes:
                    "<p><strong>20:00 Thứ 7, Chủ Nhật</strong> hàng tuần</p>",
                slug: "ngoi-truong-xac-song",
                year: 2021,
                actor: ["Park Ji Hu", "Yoon Chan Young", "Cho Yi Hyun"],
                director: [""],
                category: [
                    {
                        name: "Kinh Dị",
                    },
                ],
                country: [
                    {
                        name: "Hàn Quốc",
                    },
                ],
                is_copyright: "off",
                chieurap: false,
                poster_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-poster.jpg",
                sub_docquyen: "off",
            },
            episodes: [
                {
                    server_name: "Vietsub #1",
                    server_data: [
                        {
                            name: "1",
                            slug: "1",
                            filename: "Ngôi trường xác sống_S01E01_Tập 1",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/c74d97b01eae257e44aa9d5bade97baf",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/16_96388ff6/index.m3u8",
                        },
                        {
                            name: "2",
                            slug: "2",
                            filename: "Ngôi trường xác sống_S01E02_Tập 2",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/70efdf2ec9b086079795c442636b55fb",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/17_19d01bec/index.m3u8",
                        },
                        {
                            name: "3",
                            slug: "3",
                            filename: "Ngôi trường xác sống_S01E03_Tập 3",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/6f4922f45568161a8cdf4ad2299f6d23",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/18_d9a1f51b/index.m3u8",
                        },
                        {
                            name: "4",
                            slug: "4",
                            filename: "Ngôi trường xác sống_S01E04_Tập 4",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1f0e3dad99908345f7439f8ffabdffc4",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/19_2498dbe5/index.m3u8",
                        },
                        {
                            name: "5",
                            slug: "5",
                            filename: "Ngôi trường xác sống_S01E05_Tập 5",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/98f13708210194c475687be6106a3b84",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/20_6abb04db/index.m3u8",
                        },
                        {
                            name: "6",
                            slug: "6",
                            filename: "Ngôi trường xác sống_S01E06_Tập 6",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/3c59dc048e8850243be8079a5c74d079",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/21_8eed3a63/index.m3u8",
                        },
                        {
                            name: "7",
                            slug: "7",
                            filename: "Ngôi trường xác sống_S01E07_Tập 7",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/b6d767d2f8ed5d21a44b0e5886680cb9",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/22_4e9081fc/index.m3u8",
                        },
                        {
                            name: "8",
                            slug: "8",
                            filename: "Ngôi trường xác sống_S01E08_Tập 8",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/37693cfc748049e45d87b8c7d8b9aacd",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/23_17400852/index.m3u8",
                        },
                        {
                            name: "9",
                            slug: "9",
                            filename: "Ngôi trường xác sống_S01E09_Tập 9",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1ff1de774005f8da13f42943881c655f",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/24_f15456c8/index.m3u8",
                        },
                        {
                            name: "10",
                            slug: "10",
                            filename: "Ngôi trường xác sống_S01E10_Tập 10",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/8e296a067a37563370ded05f5a3bf3ec",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/25_b9e986e5/index.m3u8",
                        },
                        {
                            name: "11",
                            slug: "11",
                            filename: "Ngôi trường xác sống_S01E11_Tập 11",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/4e732ced3463d06de0ca9a15b6153677",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/26_2e595e1d/index.m3u8",
                        },
                        {
                            name: "12",
                            slug: "12",
                            filename: "Ngôi trường xác sống_S01E12_Tập 12",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/02e74f10e0327ad868d138f2b4fdd6f0",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/27_e2949d1a/index.m3u8",
                        },
                    ],
                },
            ],
        },
        {
            status: true,
            msg: "",
            movie: {
                modified: {
                    time: "2022-05-30T14:56:36.000Z",
                },
                _id: "2",
                name: "Ngôi Trường Xác Sống",
                origin_name: "All of Us Are Dead",
                content:
                    "<p>Phim là câu chuyện xoay quanh hành trình sống còn chống lại xác sống của một nhóm học sinh bị mắc kẹt trong trường học khi xuất hiện một loại virus lây nhiễm có khả năng biến con người thành xác sống đang lây lan khắp thành phố. Đây không chỉ đơn thuần là cuộc đấu tranh với những thứ nguy hiểm và đáng sợ mà còn là thử thách khi đối diện với sự đố kỵ và lòng tham vô đáy của con người.</p>",
                type: "series",
                status: "completed",
                thumb_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-thumb.jpg",
                trailer_url: "",
                time: "60 phút/tập",
                episode_current: "Hoàn Tất (12/12)",
                episode_total: "12 Tập",
                quality: "HD",
                lang: "Vietsub",
                notify: "",
                showtimes:
                    "<p><strong>20:00 Thứ 7, Chủ Nhật</strong> hàng tuần</p>",
                slug: "ngoi-truong-xac-song",
                year: 2021,
                actor: ["Park Ji Hu", "Yoon Chan Young", "Cho Yi Hyun"],
                director: [""],
                category: [
                    {
                        name: "Kinh Dị",
                    },
                ],
                country: [
                    {
                        name: "Hàn Quốc",
                    },
                ],
                is_copyright: "off",
                chieurap: false,
                poster_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-poster.jpg",
                sub_docquyen: "off",
            },
            episodes: [
                {
                    server_name: "Vietsub #1",
                    server_data: [
                        {
                            name: "1",
                            slug: "1",
                            filename: "Ngôi trường xác sống_S01E01_Tập 1",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/c74d97b01eae257e44aa9d5bade97baf",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/16_96388ff6/index.m3u8",
                        },
                        {
                            name: "2",
                            slug: "2",
                            filename: "Ngôi trường xác sống_S01E02_Tập 2",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/70efdf2ec9b086079795c442636b55fb",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/17_19d01bec/index.m3u8",
                        },
                        {
                            name: "3",
                            slug: "3",
                            filename: "Ngôi trường xác sống_S01E03_Tập 3",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/6f4922f45568161a8cdf4ad2299f6d23",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/18_d9a1f51b/index.m3u8",
                        },
                        {
                            name: "4",
                            slug: "4",
                            filename: "Ngôi trường xác sống_S01E04_Tập 4",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1f0e3dad99908345f7439f8ffabdffc4",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/19_2498dbe5/index.m3u8",
                        },
                        {
                            name: "5",
                            slug: "5",
                            filename: "Ngôi trường xác sống_S01E05_Tập 5",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/98f13708210194c475687be6106a3b84",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/20_6abb04db/index.m3u8",
                        },
                        {
                            name: "6",
                            slug: "6",
                            filename: "Ngôi trường xác sống_S01E06_Tập 6",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/3c59dc048e8850243be8079a5c74d079",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/21_8eed3a63/index.m3u8",
                        },
                        {
                            name: "7",
                            slug: "7",
                            filename: "Ngôi trường xác sống_S01E07_Tập 7",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/b6d767d2f8ed5d21a44b0e5886680cb9",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/22_4e9081fc/index.m3u8",
                        },
                        {
                            name: "8",
                            slug: "8",
                            filename: "Ngôi trường xác sống_S01E08_Tập 8",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/37693cfc748049e45d87b8c7d8b9aacd",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/23_17400852/index.m3u8",
                        },
                        {
                            name: "9",
                            slug: "9",
                            filename: "Ngôi trường xác sống_S01E09_Tập 9",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1ff1de774005f8da13f42943881c655f",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/24_f15456c8/index.m3u8",
                        },
                        {
                            name: "10",
                            slug: "10",
                            filename: "Ngôi trường xác sống_S01E10_Tập 10",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/8e296a067a37563370ded05f5a3bf3ec",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/25_b9e986e5/index.m3u8",
                        },
                        {
                            name: "11",
                            slug: "11",
                            filename: "Ngôi trường xác sống_S01E11_Tập 11",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/4e732ced3463d06de0ca9a15b6153677",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/26_2e595e1d/index.m3u8",
                        },
                        {
                            name: "12",
                            slug: "12",
                            filename: "Ngôi trường xác sống_S01E12_Tập 12",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/02e74f10e0327ad868d138f2b4fdd6f0",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/27_e2949d1a/index.m3u8",
                        },
                    ],
                },
            ],
        },
        {
            status: true,
            msg: "",
            movie: {
                modified: {
                    time: "2022-05-30T14:56:36.000Z",
                },
                _id: "3",
                name: "Ngôi Trường Xác Sống",
                origin_name: "All of Us Are Dead",
                content:
                    "<p>Phim là câu chuyện xoay quanh hành trình sống còn chống lại xác sống của một nhóm học sinh bị mắc kẹt trong trường học khi xuất hiện một loại virus lây nhiễm có khả năng biến con người thành xác sống đang lây lan khắp thành phố. Đây không chỉ đơn thuần là cuộc đấu tranh với những thứ nguy hiểm và đáng sợ mà còn là thử thách khi đối diện với sự đố kỵ và lòng tham vô đáy của con người.</p>",
                type: "series",
                status: "completed",
                thumb_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-thumb.jpg",
                trailer_url: "",
                time: "60 phút/tập",
                episode_current: "Hoàn Tất (12/12)",
                episode_total: "12 Tập",
                quality: "HD",
                lang: "Vietsub",
                notify: "",
                showtimes:
                    "<p><strong>20:00 Thứ 7, Chủ Nhật</strong> hàng tuần</p>",
                slug: "ngoi-truong-xac-song",
                year: 2021,
                actor: ["Park Ji Hu", "Yoon Chan Young", "Cho Yi Hyun"],
                director: [""],
                category: [
                    {
                        name: "Kinh Dị",
                    },
                ],
                country: [
                    {
                        name: "Hàn Quốc",
                    },
                ],
                is_copyright: "off",
                chieurap: false,
                poster_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-poster.jpg",
                sub_docquyen: "off",
            },
            episodes: [
                {
                    server_name: "Vietsub #1",
                    server_data: [
                        {
                            name: "1",
                            slug: "1",
                            filename: "Ngôi trường xác sống_S01E01_Tập 1",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/c74d97b01eae257e44aa9d5bade97baf",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/16_96388ff6/index.m3u8",
                        },
                        {
                            name: "2",
                            slug: "2",
                            filename: "Ngôi trường xác sống_S01E02_Tập 2",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/70efdf2ec9b086079795c442636b55fb",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/17_19d01bec/index.m3u8",
                        },
                        {
                            name: "3",
                            slug: "3",
                            filename: "Ngôi trường xác sống_S01E03_Tập 3",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/6f4922f45568161a8cdf4ad2299f6d23",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/18_d9a1f51b/index.m3u8",
                        },
                        {
                            name: "4",
                            slug: "4",
                            filename: "Ngôi trường xác sống_S01E04_Tập 4",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1f0e3dad99908345f7439f8ffabdffc4",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/19_2498dbe5/index.m3u8",
                        },
                        {
                            name: "5",
                            slug: "5",
                            filename: "Ngôi trường xác sống_S01E05_Tập 5",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/98f13708210194c475687be6106a3b84",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/20_6abb04db/index.m3u8",
                        },
                        {
                            name: "6",
                            slug: "6",
                            filename: "Ngôi trường xác sống_S01E06_Tập 6",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/3c59dc048e8850243be8079a5c74d079",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/21_8eed3a63/index.m3u8",
                        },
                        {
                            name: "7",
                            slug: "7",
                            filename: "Ngôi trường xác sống_S01E07_Tập 7",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/b6d767d2f8ed5d21a44b0e5886680cb9",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/22_4e9081fc/index.m3u8",
                        },
                        {
                            name: "8",
                            slug: "8",
                            filename: "Ngôi trường xác sống_S01E08_Tập 8",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/37693cfc748049e45d87b8c7d8b9aacd",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/23_17400852/index.m3u8",
                        },
                        {
                            name: "9",
                            slug: "9",
                            filename: "Ngôi trường xác sống_S01E09_Tập 9",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1ff1de774005f8da13f42943881c655f",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/24_f15456c8/index.m3u8",
                        },
                        {
                            name: "10",
                            slug: "10",
                            filename: "Ngôi trường xác sống_S01E10_Tập 10",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/8e296a067a37563370ded05f5a3bf3ec",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/25_b9e986e5/index.m3u8",
                        },
                        {
                            name: "11",
                            slug: "11",
                            filename: "Ngôi trường xác sống_S01E11_Tập 11",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/4e732ced3463d06de0ca9a15b6153677",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/26_2e595e1d/index.m3u8",
                        },
                        {
                            name: "12",
                            slug: "12",
                            filename: "Ngôi trường xác sống_S01E12_Tập 12",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/02e74f10e0327ad868d138f2b4fdd6f0",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/27_e2949d1a/index.m3u8",
                        },
                    ],
                },
            ],
        },
        {
            status: true,
            msg: "",
            movie: {
                modified: {
                    time: "2022-05-30T14:56:36.000Z",
                },
                _id: "4",
                name: "Ngôi Trường Xác Sống",
                origin_name: "All of Us Are Dead",
                content:
                    "<p>Phim là câu chuyện xoay quanh hành trình sống còn chống lại xác sống của một nhóm học sinh bị mắc kẹt trong trường học khi xuất hiện một loại virus lây nhiễm có khả năng biến con người thành xác sống đang lây lan khắp thành phố. Đây không chỉ đơn thuần là cuộc đấu tranh với những thứ nguy hiểm và đáng sợ mà còn là thử thách khi đối diện với sự đố kỵ và lòng tham vô đáy của con người.</p>",
                type: "series",
                status: "completed",
                thumb_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-thumb.jpg",
                trailer_url: "",
                time: "60 phút/tập",
                episode_current: "Hoàn Tất (12/12)",
                episode_total: "12 Tập",
                quality: "HD",
                lang: "Vietsub",
                notify: "",
                showtimes:
                    "<p><strong>20:00 Thứ 7, Chủ Nhật</strong> hàng tuần</p>",
                slug: "ngoi-truong-xac-song",
                year: 2021,
                actor: ["Park Ji Hu", "Yoon Chan Young", "Cho Yi Hyun"],
                director: [""],
                category: [
                    {
                        name: "Kinh Dị",
                    },
                ],
                country: [
                    {
                        name: "Hàn Quốc",
                    },
                ],
                is_copyright: "off",
                chieurap: false,
                poster_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-poster.jpg",
                sub_docquyen: "off",
            },
            episodes: [
                {
                    server_name: "Vietsub #1",
                    server_data: [
                        {
                            name: "1",
                            slug: "1",
                            filename: "Ngôi trường xác sống_S01E01_Tập 1",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/c74d97b01eae257e44aa9d5bade97baf",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/16_96388ff6/index.m3u8",
                        },
                        {
                            name: "2",
                            slug: "2",
                            filename: "Ngôi trường xác sống_S01E02_Tập 2",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/70efdf2ec9b086079795c442636b55fb",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/17_19d01bec/index.m3u8",
                        },
                        {
                            name: "3",
                            slug: "3",
                            filename: "Ngôi trường xác sống_S01E03_Tập 3",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/6f4922f45568161a8cdf4ad2299f6d23",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/18_d9a1f51b/index.m3u8",
                        },
                        {
                            name: "4",
                            slug: "4",
                            filename: "Ngôi trường xác sống_S01E04_Tập 4",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1f0e3dad99908345f7439f8ffabdffc4",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/19_2498dbe5/index.m3u8",
                        },
                        {
                            name: "5",
                            slug: "5",
                            filename: "Ngôi trường xác sống_S01E05_Tập 5",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/98f13708210194c475687be6106a3b84",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/20_6abb04db/index.m3u8",
                        },
                        {
                            name: "6",
                            slug: "6",
                            filename: "Ngôi trường xác sống_S01E06_Tập 6",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/3c59dc048e8850243be8079a5c74d079",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/21_8eed3a63/index.m3u8",
                        },
                        {
                            name: "7",
                            slug: "7",
                            filename: "Ngôi trường xác sống_S01E07_Tập 7",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/b6d767d2f8ed5d21a44b0e5886680cb9",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/22_4e9081fc/index.m3u8",
                        },
                        {
                            name: "8",
                            slug: "8",
                            filename: "Ngôi trường xác sống_S01E08_Tập 8",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/37693cfc748049e45d87b8c7d8b9aacd",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/23_17400852/index.m3u8",
                        },
                        {
                            name: "9",
                            slug: "9",
                            filename: "Ngôi trường xác sống_S01E09_Tập 9",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1ff1de774005f8da13f42943881c655f",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/24_f15456c8/index.m3u8",
                        },
                        {
                            name: "10",
                            slug: "10",
                            filename: "Ngôi trường xác sống_S01E10_Tập 10",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/8e296a067a37563370ded05f5a3bf3ec",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/25_b9e986e5/index.m3u8",
                        },
                        {
                            name: "11",
                            slug: "11",
                            filename: "Ngôi trường xác sống_S01E11_Tập 11",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/4e732ced3463d06de0ca9a15b6153677",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/26_2e595e1d/index.m3u8",
                        },
                        {
                            name: "12",
                            slug: "12",
                            filename: "Ngôi trường xác sống_S01E12_Tập 12",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/02e74f10e0327ad868d138f2b4fdd6f0",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/27_e2949d1a/index.m3u8",
                        },
                    ],
                },
            ],
        },
        {
            status: true,
            msg: "",
            movie: {
                modified: {
                    time: "2022-05-30T14:56:36.000Z",
                },
                _id: "5",
                name: "Ngôi Trường Xác Sống",
                origin_name: "All of Us Are Dead",
                content:
                    "<p>Phim là câu chuyện xoay quanh hành trình sống còn chống lại xác sống của một nhóm học sinh bị mắc kẹt trong trường học khi xuất hiện một loại virus lây nhiễm có khả năng biến con người thành xác sống đang lây lan khắp thành phố. Đây không chỉ đơn thuần là cuộc đấu tranh với những thứ nguy hiểm và đáng sợ mà còn là thử thách khi đối diện với sự đố kỵ và lòng tham vô đáy của con người.</p>",
                type: "series",
                status: "completed",
                thumb_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-thumb.jpg",
                trailer_url: "",
                time: "60 phút/tập",
                episode_current: "Hoàn Tất (12/12)",
                episode_total: "12 Tập",
                quality: "HD",
                lang: "Vietsub",
                notify: "",
                showtimes:
                    "<p><strong>20:00 Thứ 7, Chủ Nhật</strong> hàng tuần</p>",
                slug: "ngoi-truong-xac-song",
                year: 2021,
                actor: ["Park Ji Hu", "Yoon Chan Young", "Cho Yi Hyun"],
                director: [""],
                category: [
                    {
                        name: "Kinh Dị",
                    },
                ],
                country: [
                    {
                        name: "Hàn Quốc",
                    },
                ],
                is_copyright: "off",
                chieurap: false,
                poster_url:
                    "https://img.ophim.tv/uploads/movies/ngoi-truong-xac-song-poster.jpg",
                sub_docquyen: "off",
            },
            episodes: [
                {
                    server_name: "Vietsub #1",
                    server_data: [
                        {
                            name: "1",
                            slug: "1",
                            filename: "Ngôi trường xác sống_S01E01_Tập 1",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/c74d97b01eae257e44aa9d5bade97baf",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/16_96388ff6/index.m3u8",
                        },
                        {
                            name: "2",
                            slug: "2",
                            filename: "Ngôi trường xác sống_S01E02_Tập 2",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/70efdf2ec9b086079795c442636b55fb",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/17_19d01bec/index.m3u8",
                        },
                        {
                            name: "3",
                            slug: "3",
                            filename: "Ngôi trường xác sống_S01E03_Tập 3",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/6f4922f45568161a8cdf4ad2299f6d23",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/18_d9a1f51b/index.m3u8",
                        },
                        {
                            name: "4",
                            slug: "4",
                            filename: "Ngôi trường xác sống_S01E04_Tập 4",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1f0e3dad99908345f7439f8ffabdffc4",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/19_2498dbe5/index.m3u8",
                        },
                        {
                            name: "5",
                            slug: "5",
                            filename: "Ngôi trường xác sống_S01E05_Tập 5",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/98f13708210194c475687be6106a3b84",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/20_6abb04db/index.m3u8",
                        },
                        {
                            name: "6",
                            slug: "6",
                            filename: "Ngôi trường xác sống_S01E06_Tập 6",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/3c59dc048e8850243be8079a5c74d079",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/21_8eed3a63/index.m3u8",
                        },
                        {
                            name: "7",
                            slug: "7",
                            filename: "Ngôi trường xác sống_S01E07_Tập 7",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/b6d767d2f8ed5d21a44b0e5886680cb9",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/22_4e9081fc/index.m3u8",
                        },
                        {
                            name: "8",
                            slug: "8",
                            filename: "Ngôi trường xác sống_S01E08_Tập 8",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/37693cfc748049e45d87b8c7d8b9aacd",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/23_17400852/index.m3u8",
                        },
                        {
                            name: "9",
                            slug: "9",
                            filename: "Ngôi trường xác sống_S01E09_Tập 9",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/1ff1de774005f8da13f42943881c655f",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/24_f15456c8/index.m3u8",
                        },
                        {
                            name: "10",
                            slug: "10",
                            filename: "Ngôi trường xác sống_S01E10_Tập 10",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/8e296a067a37563370ded05f5a3bf3ec",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/25_b9e986e5/index.m3u8",
                        },
                        {
                            name: "11",
                            slug: "11",
                            filename: "Ngôi trường xác sống_S01E11_Tập 11",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/4e732ced3463d06de0ca9a15b6153677",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/26_2e595e1d/index.m3u8",
                        },
                        {
                            name: "12",
                            slug: "12",
                            filename: "Ngôi trường xác sống_S01E12_Tập 12",
                            link_embed:
                                "https://aa.nguonphimmoi.com/share/02e74f10e0327ad868d138f2b4fdd6f0",
                            link_m3u8:
                                "https://aa.nguonphimmoi.com/20220212/27_e2949d1a/index.m3u8",
                        },
                    ],
                },
            ],
        },
    ];
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [slugList, setSlugList] = useState([]);

    useEffect(() => {
        // axios
        //     .get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${2}`)
        //     .then((res) => {
        //         let tempList = [];

        //         setSlugList(res.data.items.map((item) => item.slug));
        //         slugList.map((slug) =>
        //             axios
        //                 .get(`https://ophim1.com/phim/${slug}`)
        //                 .then((res) => tempList.push(res.data.movie)),
        //         );

        //         setMovieList(tempList);
        //         console.log(tempList);
        //     });

        setMovieList(fakeData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <>
                <Swiper
                    loop={true}
                    spaceBetween={0}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="h-[80vh] w-[100%] "
                >
                    {fakeData.map((item) => (
                        <SwiperSlide
                            key={item.movie._id}
                            className="h-[100%] w-[100%] bg-slate-400"
                        >
                            <MovieBackground data={item.movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                    }}
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={2}
                    slidesPerView={8}
                    navigation={true}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="h-[20vh] w-[100%] "
                >
                    {fakeData.map((item) => (
                        <SwiperSlide
                            key={item.movie._id}
                            className="h-[100%] w-[100%] bg-slate-400"
                        >
                            <MovieThumb data={item.movie} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        </>
    );
}

export default Home;
