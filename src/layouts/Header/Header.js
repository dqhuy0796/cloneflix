import _ from "lodash";
import { useEffect, useState } from "react";
import { IoGridSharp } from "react-icons/io5";
import { MdNotifications } from "react-icons/md";
import { VscListSelection } from "react-icons/vsc";
import { connect } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { OriginLogo } from "~/components/Icons";
import AvatarButton from "~/components/partial/AvatarButton/AvatarButton";
import GenreSelection from "~/components/partial/GenreSelection";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import Search from "~/components/shared/SearchContainer";
import config from "~/config";

function Header({ type, genres, genreId, searchKeyword, breadcrumb, profile }) {
    const navigation = {
        data: [
            {
                id: 1,
                name: "Home",
                path: "/browse",
            },
            {
                id: 2,
                name: "TV Shows",
                path: "/browse/tv",
            },
            {
                id: 3,
                name: "Movies",
                path: "/browse/movie",
            },
            {
                id: 4,
                name: "Lastest",
                path: "/browse/lastest",
            },
            {
                id: 5,
                name: "My list",
                path: `/browse/mylist/${profile.name}`,
            },
        ],
    };

    const navigate = useNavigate();

    const [isScrolled, setScrolled] = useState(false);

    const handleSetScrolled = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleSetScrolled);

        return () => window.removeEventListener("scroll", handleSetScrolled);
    }, []);

    return (
        <header className={"fixed z-50 left-0 top-0 w-full"}>
            <nav
                className={`flex justify-between px-[60px] h-[68px] ${
                    isScrolled ? "bg-black" : "bg-gradient-to-b from-black via-black/60 to-transparent"
                }`}
            >
                <div className="flex items-center">
                    <Link to={config.routes.home} className={"flex items-center mr-4"}>
                        <OriginLogo className={"h-full max-h-7 w-auto"} />
                    </Link>
                    <ul className="flex items-baseline gap-x-3 list-none">
                        {navigation.data.map((item, index) => (
                            <li key={index} className="h-full">
                                <NavLink
                                    to={item.path}
                                    style={({ isActive }) => (isActive ? { fontWeight: 700, fontSize: "18px" } : {})}
                                    className="flex items-center h-full font-normal text-base text-light-900 hover:text-light-100"
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center justify-end gap-x-2 h-full">
                    <Search />
                    <div className="text-light-900 cursor-pointer">{"Kids"}</div>
                    <IconOnlyButton theme={"transparent"} value={99}>
                        <MdNotifications />
                    </IconOnlyButton>
                    <AvatarButton user={profile} />
                </div>
            </nav>
            {!_.isEmpty(breadcrumb) && (
                <nav className="flex items-center justify-between px-[60px] h-[68px]">
                    <div className="flex items-center gap-x-4 text-lg font-medium text-light-100 hover:text-light-900 ">
                        {breadcrumb.slice(0, breadcrumb.length - 1).map((item, index) => (
                            <span key={index}>
                                <span onClick={() => navigate(-1)} className="cursor-pointer hover:underline">
                                    {item}
                                </span>
                                <span className="ml-4">{">"}</span>
                            </span>
                        ))}
                        <span className="mr-4 text-4xl font-semibold text-light-900">
                            {breadcrumb[breadcrumb.length - 1]}
                        </span>
                        {(type.value === "tv" || type.value === "movie") && (
                            <GenreSelection data={genres} placeholder="Genres" defaultValue={searchKeyword} />
                        )}
                    </div>
                    <div className="flex">
                        <div className="flex items-center justify-center w-10 h-8 text-base text-light-100 border border-light-100 cursor-pointer hover:text-light-900">
                            <VscListSelection />
                        </div>
                        <div className="flex items-center justify-center w-10 h-8 text-base text-light-100 border border-light-100 cursor-pointer hover:text-light-900">
                            <IoGridSharp />
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}

const mapStateToProps = (state) => ({
    type: state.page.type,
    genres: state.page.genres,
    genreId: state.page.genreId,
    currentGenre: state.page.currentGenre,
    searchKeyword: state.page.searchKeyword,
    breadcrumb: state.page.breadcrumb,
    profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
    //
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
