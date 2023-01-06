import { FaBell } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { OriginLogo } from "~/components/Icons";

import { useEffect, useState } from "react";
import avatar from "~/assets/images/profile_image_5.png";
import Search from "~/components/shared/SearchArea";
import config from "~/config";

function Header() {
    const navigation = {
        data: [
            {
                id: 1,
                name: "Home",
                path: config.routes.home,
            },
            {
                id: 2,
                name: "TV Shows",
                path: config.routes.tvshows,
            },
            {
                id: 3,
                name: "Movies",
                path: config.routes.movies,
            },
            {
                id: 4,
                name: "Lastest",
                path: config.routes.lastest,
            },
            {
                id: 5,
                name: "My list",
                path: config.routes.whislist,
            },
        ],
    };

    const action = {
        data: [
            {
                id: 1,
                name: "Gifts",
                icon: <FiGift />,
                notifyNumber: 2,
            },
            {
                id: 2,
                name: "Notification",
                icon: <FaBell />,
                notifyNumber: 11111,
            },
        ],
    };

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
        <header
            className={`fixed flex justify-between z-50 px-[60px] left-0 top-0 h-[68px] w-full ${
                isScrolled ? "bg-black" : "bg-gradient-to-b from-black via-black/60 to-transparent"
            }`}
        >
            <div className="flex items-center">
                <Link to={config.routes.home} className={"flex items-center mr-4"}>
                    <OriginLogo className={"h-full max-h-7 w-auto"} />
                </Link>
                <ul className="flex items-baseline gap-x-3 list-none bg-dark-900/70 lg:bg-transparent">
                    {navigation.data.map((item, index) => (
                        <li key={index} className="h-full">
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => (isActive ? { fontWeight: 700, fontSize: "18px" } : {})}
                                className="flex items-center h-full text-base text-light-500 hover:text-light-100"
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center justify-end h-full">
                <div>
                    <Search />
                </div>
                <nav>
                    <ul className="flex list-none h-full">
                        {action.data.map((item) => (
                            <li key={item.id}>
                                <button
                                    className={
                                        "hidden md:flex items-center justify-center relative w-12 h-full text-3xl font-bold text-light-100 hover:text-light-500"
                                    }
                                >
                                    {item.notifyNumber && (
                                        <span className="flex items-center justify-center absolute top-0 right-0 h-6 p-1 min-w-[24px] translate-y-[-10%] text-xs text-light-900 bg-primary-color rounded-full">
                                            {item.notifyNumber > 9 ? "9+" : item.notifyNumber}
                                        </span>
                                    )}
                                    {item.icon}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button className="w-10 h-10 ml-4 rounded-lg overflow-hidden">
                                <img src={avatar} alt="" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
