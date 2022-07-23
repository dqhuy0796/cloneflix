import { FaBell } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { BiCaretDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { OriginLogo, SquareLogo } from "~/components/Icons";

import config from "~/config";
import Search from "~/components/SearchArea";
import avatar from "~/assets/images/profile_image_5.png";
import { useEffect, useRef, useState } from "react";

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
                path: config.routes.home,
            },
            {
                id: 3,
                name: "Movies",
                path: config.routes.home,
            },
            {
                id: 4,
                name: "Lastest",
                path: config.routes.home,
            },
            {
                id: 5,
                name: "My list",
                path: config.routes.home,
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
    const headerRef = useRef(null);

    const handleGradientBg = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleGradientBg);

        return () => window.removeEventListener("scroll", handleGradientBg);
    }, []);

    return (
        <header
            ref={headerRef}
            className={`fixed flex justify-between z-50 px-4 lg:px-[60px] left-0 top-0 h-[68px] w-full ${
                isScrolled ? "bg-black" : "bg-gradient-to-b from-black via-black/60 to-transparent"
            }`}
        >
            <div className="relative flex items-center justify-start h-full">
                <Link to={config.routes.home} className={"flex items-center mr-4 h-full"}>
                    <OriginLogo className={"hidden lg:block h-full max-h-7 w-auto"} />
                    <SquareLogo className={"block lg:hidden h-full max-h-7 w-auto"} />
                </Link>
                <div className="flex items-center text-[14px] font-bold text-light-500 h-full w-full">
                    <label htmlFor="collapse-menu" className="flex items-center gap-1 p-2 lg:hidden">
                        Browser
                        <BiCaretDown />
                    </label>
                    <input type="checkbox" id="collapse-menu" defaultChecked={false} hidden />
                    <div className="menu hidden absolute top-full left-0 lg:block lg:static animation-float-up lg:animate-none">
                        <ul className="list-none flex flex-col lg:flex-row bg-dark-900/70 lg:bg-transparent">
                            {navigation.data.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={item.path}
                                        className={
                                            "flex items-center justify-center px-16 py-5 lg:p-2 h-auto lg:h-full min-w-max text-[14px] font-bold text-light-500 hover:text-light-100"
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
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
