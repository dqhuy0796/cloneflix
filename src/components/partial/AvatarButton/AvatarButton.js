import { useState } from "react";
import { MdLogout, MdMode, MdOutlineHelpOutline } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import defaultAvatar from "~/assets/images/netflix_avatar.png";
import kidsAvatar from "~/assets/images/netflix_kids.png";

function AvatarButton({ user }) {
    const [isOpen, setOpen] = useState(false);

    const handleToggleDropdown = () => {
        setOpen(!isOpen);
    };

    const dropdown = [
        {
            imageUrl: kidsAvatar,
            title: "Kids",
        },
        {
            icon: <MdMode />,
            title: "Manage Profiles",
        },
        {
            icon: <RiUser3Line />,
            title: "Account",
        },
        {
            icon: <MdOutlineHelpOutline />,
            title: "Help Center",
        },
        {
            icon: <MdLogout className="relative left-1" />,
            title: "Sign out of Netflix",
        },
    ];

    return (
        <div className="relative" onMouseEnter={handleToggleDropdown} onMouseLeave={handleToggleDropdown}>
            <div className="relative pt-[100%] w-8 bg-dark-100 rounded overflow-hidden cursor-pointer">
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={user.avatarUrl || defaultAvatar}
                    alt={user.name}
                />
            </div>
            {isOpen && (
                <ul className="avatar-menu cursor-pointer">
                    {dropdown.map((item, index) => (
                        <li key={index}>
                            <div className="flex items-center gap-x-3 p-2 min-w-[200px] text-light-100 hover:bg-dark-500">
                                <div className="w-8 h-8 rounded overflow-hidden">
                                    {item.imageUrl && (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={item.imageUrl}
                                            alt={item.name}
                                        />
                                    )}
                                    {item.icon && (
                                        <div className="flex items-center justify-center w-full h-full text-xl">
                                            {item.icon}
                                        </div>
                                    )}
                                </div>
                                <p className="text-white  text-sm">{item.title}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AvatarButton;
